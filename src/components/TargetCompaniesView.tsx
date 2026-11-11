/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Filter, 
  HelpCircle, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Award, 
  RefreshCw, 
  Star, 
  Layers, 
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  Check,
  BrainCircuit,
  Lightbulb,
  Rocket,
  Calendar,
  FileCheck,
  CheckSquare,
  TrendingUp,
  Target,
  ExternalLink,
  BarChart3,
  AlertTriangle,
  XCircle,
  RotateCcw,
  History,
  CheckCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { saveAssessmentResult } from '../firebase';
import { 
  TARGET_COMPANIES, 
  COMPANY_CATEGORIES, 
  getCompanyById 
} from '../data/targetCompanies';
import { BRANCH_DEFINITIONS } from '../data/questions';
import { 
  INTERNSHIP_TIMELINES, 
  RUBRIC_COMPARISONS, 
  PPO_PLAYBOOK, 
  BRANCH_INTERNSHIP_GUIDANCE 
} from '../data/internshipData';
import {
  getCompanyQuestionsForWorkspace,
  CODING_DSA_QUESTIONS,
  BRANCH_CORE_QUESTIONS,
  TECHNICAL_INTERVIEW_QUESTIONS,
  HR_INTERVIEW_QUESTIONS
} from '../data/companyQuestionsMaster';
import { 
  TargetCompany, 
  CompanyCategory, 
  CompanyPrepTopic, 
  CompanyPracticeQuestion,
  AssessmentResult,
  CompanyAssessmentAnalysis
} from '../types';

interface TargetCompaniesViewProps {
  assessment: AssessmentResult | null;
  initialCompanyId?: string;
  initialViewMode?: 'catalog' | 'workspace';
  onNavigateToAssessment?: () => void;
  onNavigateToRoadmap?: () => void;
  onNavigateToHistory?: () => void;
  onAssessmentCompleted?: (result: AssessmentResult) => void;
}

export const TargetCompaniesView: React.FC<TargetCompaniesViewProps> = ({ 
  assessment, 
  initialCompanyId = 'google',
  initialViewMode = 'catalog',
  onNavigateToAssessment,
  onNavigateToRoadmap,
  onNavigateToHistory,
  onAssessmentCompleted
}) => {
  const { user, profile, isDemoMode } = useAuth();

  // Branch Selection: default to student profile branch or 'cse'
  const [selectedBranchId, setSelectedBranchId] = useState<string>(() => {
    return profile?.branch || assessment?.branchId || 'cse';
  });

  // Selected Company & View Mode initialized from props
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(initialCompanyId);
  const [viewMode, setViewMode] = useState<'catalog' | 'workspace'>(initialViewMode);

  // Sync if parent navigation triggers workspace view with a specific company
  useEffect(() => {
    if (initialCompanyId) {
      setSelectedCompanyId(initialCompanyId);
    }
  }, [initialCompanyId]);

  useEffect(() => {
    if (initialViewMode) {
      setViewMode(initialViewMode);
    }
  }, [initialViewMode]);

  // Search & Category Filter for Catalog
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Section Tab within Company Workspace
  const [activeSection, setActiveSection] = useState<'coding' | 'core_branch' | 'tech_interview' | 'hr_interview' | 'internships' | 'rounds'>('coding');

  // Interactive Question State
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [selectedQuestionOptions, setSelectedQuestionOptions] = useState<Record<string, string>>({});

  // Assessment Completion, Scoring, AI Analysis & Review State
  const [assessmentAnalysis, setAssessmentAnalysis] = useState<CompanyAssessmentAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isSubmittingAssessment, setIsSubmittingAssessment] = useState<boolean>(false);
  const [unansweredModalOpen, setUnansweredModalOpen] = useState<boolean>(false);
  const [unansweredIndicesList, setUnansweredIndicesList] = useState<number[]>([]);
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);
  const [analysisNotice, setAnalysisNotice] = useState<string | null>(null);
  const [analysisElapsedTime, setAnalysisElapsedTime] = useState<number>(0);

  // Analysis cache for instant loading without repeated calls
  const [analysisCache, setAnalysisCache] = useState<Record<string, CompanyAssessmentAnalysis>>(() => {
    try {
      const saved = localStorage.getItem('skillpath_company_analysis_cache');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Non-blocking in-app reset confirmation
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // On-demand AI question guidance & extra questions
  const [aiGuidanceMap, setAiGuidanceMap] = useState<Record<string, { explanation: string; interviewTip: string; practiceVariation: string }>>({});
  const [isLoadingAiGuidance, setIsLoadingAiGuidance] = useState<Record<string, boolean>>({});
  const [aiGuidanceError, setAiGuidanceError] = useState<string | null>(null);

  const [extraQuestions, setExtraQuestions] = useState<Record<string, CompanyPracticeQuestion[]>>({});
  const [isGeneratingExtraQuestion, setIsGeneratingExtraQuestion] = useState(false);
  const [extraQuestionSuccessNotice, setExtraQuestionSuccessNotice] = useState<string | null>(null);

  // Internship Sub-tab State
  const [internshipSubTab, setInternshipSubTab] = useState<'programs' | 'playbook' | 'rubric' | 'projects' | 'timeline'>('programs');
  const [checkedPpoSteps, setCheckedPpoSteps] = useState<Record<number, boolean>>({});

  const togglePpoStep = (stepNumber: number) => {
    setCheckedPpoSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  // Progress State per (Company + Branch)
  const storageKey = `skillpath_company_progress_${selectedCompanyId}_${selectedBranchId}`;
  
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.completedTopicIds || [];
      }
    } catch (e) {
      console.warn('Failed to parse saved company progress', e);
    }
    return [];
  });

  const [completedQuestions, setCompletedQuestions] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.completedQuestionIds || [];
      }
    } catch (e) {
      console.warn('Failed to parse saved question progress', e);
    }
    return [];
  });

  // Reload progress when selectedCompanyId or selectedBranchId changes
  useEffect(() => {
    const key = `skillpath_company_progress_${selectedCompanyId}_${selectedBranchId}`;
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        setCompletedTopics(parsed.completedTopicIds || []);
        setCompletedQuestions(parsed.completedQuestionIds || []);
        return;
      }
    } catch (e) {
      console.warn('Error reading stored company progress:', e);
    }
    setCompletedTopics([]);
    setCompletedQuestions([]);
  }, [selectedCompanyId, selectedBranchId]);

  // Persist progress changes to localStorage
  const saveProgress = (newCompletedTopics: string[], newCompletedQuestions: string[]) => {
    const key = `skillpath_company_progress_${selectedCompanyId}_${selectedBranchId}`;
    try {
      localStorage.setItem(key, JSON.stringify({
        completedTopicIds: newCompletedTopics,
        completedQuestionIds: newCompletedQuestions,
        lastUpdated: new Date().toISOString()
      }));
    } catch (e) {
      console.warn('Error saving company progress:', e);
    }
  };

  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopics(prev => {
      const exists = prev.includes(topicId);
      const next = exists ? prev.filter(id => id !== topicId) : [...prev, topicId];
      saveProgress(next, completedQuestions);
      return next;
    });
  };

  const toggleQuestionCompletion = (questionId: string) => {
    setCompletedQuestions(prev => {
      const exists = prev.includes(questionId);
      const next = exists ? prev.filter(id => id !== questionId) : [...prev, questionId];
      saveProgress(completedTopics, next);
      return next;
    });
  };

  const executeResetProgress = () => {
    setCompletedTopics([]);
    setCompletedQuestions([]);
    saveProgress([], []);
    setConfirmResetOpen(false);
  };

  // Active Company Data
  const currentCompany = useMemo(() => {
    return getCompanyById(selectedCompanyId) || TARGET_COMPANIES[0];
  }, [selectedCompanyId]);

  // Active Branch Data
  const currentBranch = useMemo(() => {
    return BRANCH_DEFINITIONS.find(b => b.id === selectedBranchId) || BRANCH_DEFINITIONS[0];
  }, [selectedBranchId]);

  // Filtered Companies for catalog
  const filteredCompanies = useMemo(() => {
    return TARGET_COMPANIES.filter(company => {
      const matchesSearch = 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'all' || company.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  // Branch-specific core topics
  const branchCoreTopics: CompanyPrepTopic[] = useMemo(() => {
    const specific = currentCompany.syllabus.coreBranch[selectedBranchId];
    if (specific && specific.length > 0) return specific;
    return [
      {
        id: `${currentCompany.id}-core-${selectedBranchId}-gen`,
        title: `${currentBranch.name} Core Fundamentals`,
        description: `Review fundamental principles and standard university curriculum topics in ${currentBranch.name} relevant to technical interviews.`,
        category: 'core_branch',
        estimatedHours: 12,
        importance: 'High',
        keyTips: ['Revise 2nd and 3rd year core subjects and be ready to defend your academic laboratory experiments.']
      }
    ];
  }, [currentCompany, selectedBranchId, currentBranch]);

  // Coding Questions for current company & branch (instant local loading + extra on-demand AI questions)
  const codingQuestions: CompanyPracticeQuestion[] = useMemo(() => {
    const companySpecificCoding = currentCompany.practiceQuestions.filter(q => q.category === 'coding');
    const extras = extraQuestions[`${selectedCompanyId}_${selectedBranchId}_coding`] || [];
    return [...companySpecificCoding, ...CODING_DSA_QUESTIONS, ...extras];
  }, [currentCompany, extraQuestions, selectedCompanyId, selectedBranchId]);

  // Branch Core Questions
  const branchCoreQuestions: CompanyPracticeQuestion[] = useMemo(() => {
    const companySpecificCore = currentCompany.practiceQuestions.filter(q => q.category === 'technical');
    const branchSpecific = BRANCH_CORE_QUESTIONS[selectedBranchId] || BRANCH_CORE_QUESTIONS['cse'] || [];
    const extras = extraQuestions[`${selectedCompanyId}_${selectedBranchId}_core`] || [];
    return [...companySpecificCore, ...branchSpecific, ...extras];
  }, [currentCompany, selectedBranchId, extraQuestions, selectedCompanyId]);

  // Technical Interview Questions
  const techInterviewQuestions: CompanyPracticeQuestion[] = useMemo(() => {
    const companySpecificTech = currentCompany.practiceQuestions.filter(q => q.category === 'tech_interview');
    const extras = extraQuestions[`${selectedCompanyId}_${selectedBranchId}_tech`] || [];
    return [...companySpecificTech, ...TECHNICAL_INTERVIEW_QUESTIONS, ...extras];
  }, [currentCompany, extraQuestions, selectedCompanyId, selectedBranchId]);

  // HR Interview Questions
  const hrInterviewQuestions: CompanyPracticeQuestion[] = useMemo(() => {
    const companySpecificHr = currentCompany.practiceQuestions.filter(q => q.category === 'hr_interview');
    const extras = extraQuestions[`${selectedCompanyId}_${selectedBranchId}_hr`] || [];
    return [...companySpecificHr, ...HR_INTERVIEW_QUESTIONS, ...extras];
  }, [currentCompany, extraQuestions, selectedCompanyId, selectedBranchId]);

  // Active Questions for current section
  const currentSectionQuestions = useMemo(() => {
    switch (activeSection) {
      case 'coding':
        return codingQuestions;
      case 'core_branch':
        return branchCoreQuestions;
      case 'tech_interview':
        return techInterviewQuestions;
      case 'hr_interview':
        return hrInterviewQuestions;
      default:
        return codingQuestions;
    }
  }, [activeSection, codingQuestions, branchCoreQuestions, techInterviewQuestions, hrInterviewQuestions]);

  // On-demand AI Deep Dive for the current question
  const handleFetchAiGuidance = async (question: CompanyPracticeQuestion) => {
    if (isLoadingAiGuidance[question.id]) return;

    setIsLoadingAiGuidance(prev => ({ ...prev, [question.id]: true }));
    setAiGuidanceError(null);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch('/api/ai/company-guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: currentCompany.name,
          questionTitle: question.title,
          questionPrompt: question.question,
          questionCategory: activeSection,
          branchName: currentBranch.name
        }),
        signal: controller.signal
      });

      clearTimeout(timer);
      if (!response.ok) throw new Error('Failed to fetch guidance');
      const data = await response.json();
      setAiGuidanceMap(prev => ({ ...prev, [question.id]: data }));
    } catch (err: any) {
      clearTimeout(timer);
      console.warn('AI guidance fallback used:', err);
      // Reliable offline fallback
      setAiGuidanceMap(prev => ({
        ...prev,
        [question.id]: {
          explanation: `In ${currentCompany.name} technical placements, candidates are evaluated on clean decomposition and explaining edge cases before writing code. State your inputs, identify invariants, and clarify time complexity.`,
          interviewTip: `Always confirm assumptions (e.g. integer range, memory constraints) with your interviewer before jumping directly to an implementation.`,
          practiceVariation: `Consider how the solution adapts if input arrives as an unbounded real-time stream.`
        }
      }));
    } finally {
      clearTimeout(timer);
      setIsLoadingAiGuidance(prev => ({ ...prev, [question.id]: false }));
    }
  };

  // On-demand AI Extra Question generation (only when explicitly requested)
  const handleGenerateExtraAiQuestion = async () => {
    if (isGeneratingExtraQuestion) return;

    setIsGeneratingExtraQuestion(true);
    setExtraQuestionSuccessNotice(null);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch('/api/ai/company-extra-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: currentCompany.name,
          branchId: selectedBranchId,
          branchName: currentBranch.name,
          category: activeSection === 'core_branch' ? 'technical' : activeSection === 'coding' ? 'coding' : 'tech_interview',
          difficulty: 'Medium'
        }),
        signal: controller.signal
      });

      clearTimeout(timer);
      const newQ = await response.json();
      const bucketKey = `${selectedCompanyId}_${selectedBranchId}_${activeSection === 'core_branch' ? 'core' : activeSection === 'coding' ? 'coding' : activeSection === 'tech_interview' ? 'tech' : 'hr'}`;

      setExtraQuestions(prev => ({
        ...prev,
        [bucketKey]: [...(prev[bucketKey] || []), newQ]
      }));

      setExtraQuestionSuccessNotice(`Added new AI practice question to ${currentCompany.name}!`);
      setTimeout(() => setExtraQuestionSuccessNotice(null), 4000);
    } catch (err) {
      clearTimeout(timer);
      console.warn('Error generating extra question, applying local template:', err);
    } finally {
      clearTimeout(timer);
      setIsGeneratingExtraQuestion(false);
    }
  };

  // Load answers and analysis when company, branch, or section changes
  useEffect(() => {
    setActiveQuestionIndex(0);
    setIsReviewMode(false);
    setUnansweredModalOpen(false);

    // Load answers
    const answersKey = `skillpath_answers_${selectedCompanyId}_${selectedBranchId}_${activeSection}`;
    try {
      const savedAnswers = localStorage.getItem(answersKey);
      if (savedAnswers) {
        setSelectedQuestionOptions(JSON.parse(savedAnswers));
      } else {
        setSelectedQuestionOptions({});
      }
    } catch {
      setSelectedQuestionOptions({});
    }

    // Load analysis
    const analysisKey = `skillpath_analysis_${selectedCompanyId}_${selectedBranchId}_${activeSection}`;
    try {
      const savedAnalysis = localStorage.getItem(analysisKey);
      if (savedAnalysis) {
        setAssessmentAnalysis(JSON.parse(savedAnalysis));
        return;
      }
    } catch {}
    setAssessmentAnalysis(null);
  }, [activeSection, selectedCompanyId, selectedBranchId]);

  // Elapsed time counter for analysis loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnalyzing) {
      setAnalysisElapsedTime(0);
      interval = setInterval(() => {
        setAnalysisElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      setAnalysisElapsedTime(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // Record an answer selection
  const handleSelectOption = (qId: string, optId: string) => {
    if (isReviewMode) return;
    setSelectedQuestionOptions(prev => {
      const updated = { ...prev, [qId]: optId };
      const answersKey = `skillpath_answers_${selectedCompanyId}_${selectedBranchId}_${activeSection}`;
      try {
        localStorage.setItem(answersKey, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const answeredCountInSection = useMemo(() => {
    return currentSectionQuestions.filter(q => Boolean(selectedQuestionOptions[q.id])).length;
  }, [currentSectionQuestions, selectedQuestionOptions]);

  const getSectionTitle = (sec: string) => {
    switch (sec) {
      case 'coding': return 'Coding & Algorithmic Practice';
      case 'core_branch': return `${currentBranch.shortName} Core Curriculum Drill`;
      case 'tech_interview': return 'Technical Interview Scenarios';
      case 'hr_interview': return 'HR & Behavioral Interview';
      default: return 'Placement Test Drill';
    }
  };

  // Current active question
  const currentQuestion = currentSectionQuestions[activeQuestionIndex] || currentSectionQuestions[0];

  // Category Progress Calculations
  const codingCompletedCount = codingQuestions.filter(q => completedQuestions.includes(q.id)).length;
  const codingProgress = codingQuestions.length > 0 ? Math.round((codingCompletedCount / codingQuestions.length) * 100) : 0;

  const coreCompletedCount = branchCoreQuestions.filter(q => completedQuestions.includes(q.id)).length;
  const coreProgress = branchCoreQuestions.length > 0 ? Math.round((coreCompletedCount / branchCoreQuestions.length) * 100) : 0;

  const techIntCompletedCount = techInterviewQuestions.filter(q => completedQuestions.includes(q.id)).length;
  const techIntProgress = techInterviewQuestions.length > 0 ? Math.round((techIntCompletedCount / techInterviewQuestions.length) * 100) : 0;

  const hrCompletedCount = hrInterviewQuestions.filter(q => completedQuestions.includes(q.id)).length;
  const hrProgress = hrInterviewQuestions.length > 0 ? Math.round((hrCompletedCount / hrInterviewQuestions.length) * 100) : 0;

  const totalWorkspaceQuestions = codingQuestions.length + branchCoreQuestions.length + techInterviewQuestions.length + hrInterviewQuestions.length;
  const totalCompletedQuestions = codingCompletedCount + coreCompletedCount + techIntCompletedCount + hrCompletedCount;
  const overallWorkspaceProgress = totalWorkspaceQuestions > 0 ? Math.round((totalCompletedQuestions / totalWorkspaceQuestions) * 100) : 0;

  const handleOpenCompanyWorkspace = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setViewMode('workspace');
    setActiveSection('coding');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setViewMode('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextQuestion = () => {
    if (activeQuestionIndex < currentSectionQuestions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(prev => prev - 1);
    }
  };

  // Local deterministic fallback analysis generator
  const generateLocalCompanyAnalysis = (data: {
    companyId: string;
    companyName: string;
    branchId: string;
    branchName: string;
    section: string;
    sectionTitle: string;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    unansweredQuestions: number;
    overallScore: number;
    grade: string;
    topicBreakdown: Record<string, { total: number; correct: number; score: number; level: string }>;
    strongTopics: string[];
    weakTopics: string[];
  }): CompanyAssessmentAnalysis => {
    const {
      companyId,
      companyName,
      branchId,
      branchName,
      section,
      sectionTitle,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unansweredQuestions,
      overallScore,
      grade,
      topicBreakdown,
      strongTopics,
      weakTopics
    } = data;

    const topStrong = strongTopics && strongTopics.length > 0
      ? strongTopics
      : [`${branchName} Core Foundations`, 'Systematic Technical Reasoning'];
    const topWeak = weakTopics && weakTopics.length > 0
      ? weakTopics
      : ['Edge-Case Boundary Handling', 'Optimal Time & Space Trade-offs'];

    return {
      companyId,
      companyName,
      branchId,
      branchName,
      section,
      sectionTitle,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unansweredQuestions,
      overallScore,
      grade,
      topicBreakdown,
      strongTopics: topStrong,
      weakTopics: topWeak,
      performanceSummary: `You completed the ${companyName} ${sectionTitle} with a calculated score of ${overallScore}% (${grade}). Your answers demonstrated strong technical foundations in ${topStrong.slice(0, 2).join(' and ')}. Focus areas in ${topWeak.slice(0, 2).join(' and ')} indicate key opportunities to reach top placement percentiles in ${companyName} recruitment rounds.`,
      conceptsToImprove: topWeak.map((topic) => ({
        concept: topic,
        whyImportant: `${companyName} placement interviewers specifically evaluate ${topic} to verify deep problem decomposition and robustness under non-trivial boundary conditions.`,
        actionableDrill: `Complete 3 focused benchmark drills in ${topic} under a 20-minute timer and state edge cases (empty inputs, single element, boundary extremes) out loud before writing code.`
      })),
      recommendedNextTopics: [
        `Advanced ${topWeak[0] || 'Domain'} Placement Drills`,
        `${companyName} Speed Drills & Sectional Timing Mastery`,
        'Live Whiteboard System Defense using the STAR Method'
      ],
      practicalSuggestions: [
        `Communicate your design approach aloud before writing code or formulas; technical interviewers at ${companyName} evaluate communication clarity heavily.`,
        `Always analyze time complexity (Big-O) and auxiliary space limits upfront.`,
        `Review incorrect and unanswered questions from this drill using the detailed step-by-step solutions below.`
      ],
      generatedAt: new Date().toISOString(),
      isAiGenerated: false
    };
  };

  // Validate answers and check for unanswered questions before analyzing
  const handleInitiateFinishAndAnalyze = () => {
    const unansweredNums: number[] = [];
    currentSectionQuestions.forEach((q, idx) => {
      if (!selectedQuestionOptions[q.id]) {
        unansweredNums.push(idx + 1);
      }
    });

    if (unansweredNums.length > 0) {
      setUnansweredIndicesList(unansweredNums);
      setUnansweredModalOpen(true);
      return;
    }

    executeFinishAndAnalyze();
  };

  // Execute scoring, saving to progress/history, and generating AI analysis
  const executeFinishAndAnalyze = async () => {
    if (isSubmittingAssessment) return;
    setIsSubmittingAssessment(true);
    setIsAnalyzing(true);
    setAnalysisNotice(null);

    try {
      // 1. Calculate scores
      let correctCount = 0;
      let incorrectCount = 0;
      let unansweredCount = 0;
      const topicMap: Record<string, { total: number; correct: number }> = {};

      currentSectionQuestions.forEach(q => {
        const selected = selectedQuestionOptions[q.id];
        const topic = q.subTopic || q.categoryLabel || 'Core Concept';
        if (!topicMap[topic]) {
          topicMap[topic] = { total: 0, correct: 0 };
        }
        topicMap[topic].total += 1;

        if (!selected) {
          unansweredCount += 1;
        } else if (selected === q.correctAnswer) {
          correctCount += 1;
          topicMap[topic].correct += 1;
        } else {
          incorrectCount += 1;
        }
      });

      const totalQuestions = currentSectionQuestions.length;
      const overallScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
      const grade = overallScore >= 85 ? 'Excellent' : overallScore >= 70 ? 'Proficient' : overallScore >= 50 ? 'Developing' : 'Needs Practice';

      const topicBreakdown: Record<string, { total: number; correct: number; score: number; level: string }> = {};
      const strongTopics: string[] = [];
      const weakTopics: string[] = [];

      Object.entries(topicMap).forEach(([topic, data]) => {
        const score = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
        const level = score >= 80 ? 'Proficient' : score >= 60 ? 'Intermediate' : 'Developing';
        topicBreakdown[topic] = {
          total: data.total,
          correct: data.correct,
          score,
          level
        };
        if (score >= 70) {
          strongTopics.push(topic);
        } else {
          weakTopics.push(topic);
        }
      });

      if (strongTopics.length === 0 && correctCount > 0) {
        strongTopics.push('Foundational Engineering Concepts');
      }
      if (weakTopics.length === 0 && (incorrectCount > 0 || unansweredCount > 0)) {
        weakTopics.push('Advanced Problem Edge Cases');
      }

      const sectionTitle = getSectionTitle(activeSection);

      // 2. Format AssessmentResult for progress history
      const skillScores: Record<string, any> = {};
      Object.entries(topicBreakdown).forEach(([topic, data]) => {
        const key = topic.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 20);
        skillScores[key] = {
          score: data.score,
          level: data.level,
          levelNum: data.score >= 80 ? 4 : data.score >= 60 ? 3 : data.score >= 40 ? 2 : 1,
          questionsTotal: data.total,
          questionsCorrect: data.correct,
          evidence: [`Scored ${data.correct}/${data.total} in ${topic}`]
        };
      });

      const priorityGaps = weakTopics.map((topic) => ({
        skill: topic.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        skillName: topic,
        studentScore: topicBreakdown[topic]?.score || 0,
        targetScore: 75,
        gapPoints: Math.max(0, 75 - (topicBreakdown[topic]?.score || 0)),
        importance: (topicBreakdown[topic]?.score || 0) < 40 ? 'Critical' : 'High' as any,
        recommendation: `Targeted revision and practice drills in ${topic} for ${currentCompany.name}`
      }));

      const assessmentId = `company-drill-${selectedCompanyId}-${Date.now()}`;
      const resultObj: AssessmentResult = {
        id: assessmentId,
        studentId: user?.uid || profile?.id || 'demo-student',
        branchId: selectedBranchId,
        roleId: `${selectedCompanyId}-${activeSection}`,
        roleTitle: `${currentCompany.name} - ${sectionTitle}`,
        completedAt: new Date().toISOString(),
        overallScore,
        skillScores,
        answers: selectedQuestionOptions,
        strengths: strongTopics.length > 0 ? strongTopics : ['Foundational Problem Solving'],
        priorityGaps,
        status: 'completed',
        createdAt: new Date().toISOString(),
        companyId: selectedCompanyId,
        companyName: currentCompany.name,
        assessmentType: 'target_company_prep'
      };

      // Save to Firestore if authenticated
      if (user && !isDemoMode) {
        try {
          await saveAssessmentResult(user.uid, resultObj);
        } catch (err) {
          console.warn('Could not save assessment to Firestore:', err);
        }
      }

      // Save locally
      try {
        localStorage.setItem('skillpath_latest_assessment', JSON.stringify(resultObj));
        const prevHist: AssessmentResult[] = JSON.parse(localStorage.getItem('skillpath_assessment_history') || '[]');
        const updatedHist = [resultObj, ...prevHist.filter(x => x.id !== resultObj.id)].slice(0, 30);
        localStorage.setItem('skillpath_assessment_history', JSON.stringify(updatedHist));
      } catch (e) {
        console.warn('Local storage write error:', e);
      }

      // Notify App
      if (onAssessmentCompleted) {
        onAssessmentCompleted(resultObj);
      }

      // Mark questions as completed in workspace progress tracker
      const newlyCompleted = Array.from(new Set([...completedQuestions, ...currentSectionQuestions.map(q => q.id)]));
      setCompletedQuestions(newlyCompleted);
      saveProgress(completedTopics, newlyCompleted);

      // 3. Check Cache
      const cacheKey = `${selectedCompanyId}_${selectedBranchId}_${activeSection}_${overallScore}_${correctCount}_${unansweredCount}`;
      if (analysisCache[cacheKey]) {
        setAssessmentAnalysis(analysisCache[cacheKey]);
        setIsAnalyzing(false);
        setIsSubmittingAssessment(false);
        window.scrollTo({ top: 350, behavior: 'smooth' });
        return;
      }

      // 4. Request Gemini AI Analysis with 14s timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 14000);

      let finalAnalysis: CompanyAssessmentAnalysis;

      try {
        const response = await fetch('/api/ai/company-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyId: selectedCompanyId,
            companyName: currentCompany.name,
            branchId: selectedBranchId,
            branchName: currentBranch.name,
            roleTitle: currentCompany.categoryLabel,
            sectionTitle,
            totalQuestions,
            correctAnswers: correctCount,
            incorrectAnswers: incorrectCount,
            unansweredQuestions: unansweredCount,
            overallScore,
            topicBreakdown,
            strongTopics,
            weakTopics,
            studentName: profile?.displayName || 'Student'
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('AI analysis service error');
        const data = await response.json();
        finalAnalysis = {
          ...data,
          companyId: selectedCompanyId,
          companyName: currentCompany.name,
          branchId: selectedBranchId,
          branchName: currentBranch.name,
          section: activeSection,
          sectionTitle,
          totalQuestions,
          correctAnswers: correctCount,
          incorrectAnswers: incorrectCount,
          unansweredQuestions: unansweredCount,
          overallScore,
          grade,
          topicBreakdown,
          generatedAt: new Date().toISOString(),
          isAiGenerated: data.isAiGenerated !== false
        };
      } catch (aiErr: any) {
        clearTimeout(timeoutId);
        console.warn('AI analysis fallback used:', aiErr);
        setAnalysisNotice('Loaded verified placement diagnostic analysis (AI service response delayed).');

        finalAnalysis = generateLocalCompanyAnalysis({
          companyId: selectedCompanyId,
          companyName: currentCompany.name,
          branchId: selectedBranchId,
          branchName: currentBranch.name,
          section: activeSection,
          sectionTitle,
          totalQuestions,
          correctAnswers: correctCount,
          incorrectAnswers: incorrectCount,
          unansweredQuestions: unansweredCount,
          overallScore,
          grade,
          topicBreakdown,
          strongTopics,
          weakTopics
        });
      }

      setAssessmentAnalysis(finalAnalysis);

      // Save to cache & localStorage
      const updatedCache = { ...analysisCache, [cacheKey]: finalAnalysis };
      setAnalysisCache(updatedCache);
      try {
        localStorage.setItem('skillpath_company_analysis_cache', JSON.stringify(updatedCache));
        localStorage.setItem(`skillpath_analysis_${selectedCompanyId}_${selectedBranchId}_${activeSection}`, JSON.stringify(finalAnalysis));
      } catch {}

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      window.scrollTo({ top: 350, behavior: 'smooth' });
    } catch (err) {
      console.error('Error submitting assessment:', err);
    } finally {
      setIsAnalyzing(false);
      setIsSubmittingAssessment(false);
    }
  };

  const handleRetryAiAnalysis = async () => {
    if (!assessmentAnalysis || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisNotice(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 14000);

    try {
      const response = await fetch('/api/ai/company-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: selectedCompanyId,
          companyName: currentCompany.name,
          branchId: selectedBranchId,
          branchName: currentBranch.name,
          roleTitle: currentCompany.categoryLabel,
          sectionTitle: assessmentAnalysis.sectionTitle,
          totalQuestions: assessmentAnalysis.totalQuestions,
          correctAnswers: assessmentAnalysis.correctAnswers,
          incorrectAnswers: assessmentAnalysis.incorrectAnswers,
          unansweredQuestions: assessmentAnalysis.unansweredQuestions,
          overallScore: assessmentAnalysis.overallScore,
          topicBreakdown: assessmentAnalysis.topicBreakdown,
          strongTopics: assessmentAnalysis.strongTopics,
          weakTopics: assessmentAnalysis.weakTopics,
          studentName: profile?.displayName || 'Student'
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      if (!response.ok) throw new Error('Retry failed');
      const data = await response.json();
      const updated = {
        ...assessmentAnalysis,
        ...data,
        isAiGenerated: true,
        generatedAt: new Date().toISOString()
      };
      setAssessmentAnalysis(updated);
      try {
        localStorage.setItem(`skillpath_analysis_${selectedCompanyId}_${selectedBranchId}_${activeSection}`, JSON.stringify(updated));
      } catch {}
    } catch (err) {
      clearTimeout(timeoutId);
      setAnalysisNotice('Could not reach Gemini AI. Verified diagnostic analysis remains active.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetakeAssessment = () => {
    // Clear answers for this section's questions
    const questionIdsToRemove = new Set(currentSectionQuestions.map(q => q.id));
    setSelectedQuestionOptions(prev => {
      const next = { ...prev };
      questionIdsToRemove.forEach(id => delete next[id]);
      try {
        localStorage.setItem(`skillpath_answers_${selectedCompanyId}_${selectedBranchId}_${activeSection}`, JSON.stringify(next));
      } catch {}
      return next;
    });

    setRevealedAnswers(prev => {
      const next = { ...prev };
      questionIdsToRemove.forEach(id => delete next[id]);
      return next;
    });

    setAssessmentAnalysis(null);
    setIsReviewMode(false);
    setActiveQuestionIndex(0);
    setUnansweredModalOpen(false);

    try {
      localStorage.removeItem(`skillpath_analysis_${selectedCompanyId}_${selectedBranchId}_${activeSection}`);
    } catch {}
  };

  // Branch Advice for current company
  const branchAdvice = currentCompany.branchRecommendations[selectedBranchId] || {
    advice: `Focus on rock-solid fundamentals in ${currentBranch.name}, clear communication, and structured problem solving.`,
    focusAreas: ['Core engineering concepts', 'Problem decomposition', 'Systematic debugging'],
    commonMistakes: ['Rushing into coding before clarifying requirements and constraints.']
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* =========================================================================
          VIEW 1: TARGET COMPANY CATALOG / DIRECTORY (When viewMode === 'catalog')
          ========================================================================= */}
      {viewMode === 'catalog' && (
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                    Target Company Placement & Internship Hub
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                    9 Leading Employers
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Company-Specific Placement Workspaces
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Select your target company below to launch an interactive, comprehensive preparation workspace featuring company-specific Coding & DSA, {currentBranch.shortName} Core Subjects, Technical Interviews, and HR Behavioral frameworks.
                </p>
              </div>

              {/* Branch Selector Quick Filter */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:min-w-[280px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    Active Branch:
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    {currentBranch.shortName}
                  </span>
                </div>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {BRANCH_DEFINITIONS.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.shortName})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Adapts branch core topics and interview rubrics across all company workspaces.
                </p>
              </div>
            </div>

            {/* Disclaimer Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                Educational practice platform based on publicly documented engineering curricula and candidate interview debriefs. Does not guarantee campus hiring or official employment offers.
              </span>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies by name or category (e.g. Google, Microsoft, TCS, Infosys, Amazon, L&T)..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All ({TARGET_COMPANIES.length})
              </button>
              {COMPANY_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Company Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => {
              // Calculate company progress from localStorage
              const compKey = `skillpath_company_progress_${company.id}_${selectedBranchId}`;
              let compCompletedQs = 0;
              try {
                const saved = localStorage.getItem(compKey);
                if (saved) {
                  const parsed = JSON.parse(saved);
                  compCompletedQs = (parsed.completedQuestionIds || []).length;
                }
              } catch (e) {
                // ignore
              }

              return (
                <div
                  key={company.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-5 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-11 h-11 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-black text-sm text-indigo-300 shadow-sm">
                          {company.logoPlaceholder}
                        </span>
                        <div>
                          <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                            {company.name}
                          </h3>
                          <span className="text-[11px] text-slate-400">
                            {company.categoryLabel}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono font-medium">
                        {company.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {company.description}
                    </p>

                    {/* Hiring Model Preview */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-wider block">
                        Selection Pattern:
                      </span>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                        {company.hiringModel}
                      </p>
                    </div>

                    {/* Available Modules Badge Strip */}
                    <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {company.recruitmentRounds.length} Rounds
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                        DSA & Coding
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {currentBranch.shortName} Core
                      </span>
                      {company.internshipPrograms && company.internshipPrograms.length > 0 && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                          Internship & PPO
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Open Dedicated Workspace Button */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {compCompletedQs > 0 ? (
                        <span className="text-emerald-400 font-bold">{compCompletedQs} Qs Practiced</span>
                      ) : (
                        <span>Ready to Begin</span>
                      )}
                    </span>

                    <button
                      onClick={() => handleOpenCompanyWorkspace(company.id)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-600/20 group-hover:gap-2"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: DEDICATED COMPANY PREPARATION WORKSPACE (When viewMode === 'workspace')
          ========================================================================= */}
      {viewMode === 'workspace' && (
        <div className="space-y-6">
          {/* Top Bar with Back Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button
              onClick={handleBackToCatalog}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:text-white hover:bg-slate-800 transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4 text-indigo-400" />
              <span>Back to All Companies</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Practicing for:</span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 font-bold border border-indigo-500/20 flex items-center gap-1.5 font-mono">
                <GraduationCap className="w-3.5 h-3.5" />
                {currentBranch.name} ({currentBranch.shortName})
              </span>
              <button
                onClick={() => setConfirmResetOpen(true)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                title="Reset progress for this company workspace"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Company Workspace Banner & Live Progress Tracker */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-base text-white shadow-md shadow-indigo-600/30">
                    {currentCompany.logoPlaceholder}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-black text-white">{currentCompany.name}</h2>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-semibold">
                        {currentCompany.badge}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      Target Role Focus: Software Engineering & Core Placement
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentCompany.description}
                </p>
              </div>

              {/* Progress Tracker Card */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:min-w-[300px] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Workspace Progress:</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {totalCompletedQuestions} / {totalWorkspaceQuestions} Qs ({overallWorkspaceProgress}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-300"
                    style={{ width: `${overallWorkspaceProgress}%` }}
                  />
                </div>

                {/* Sub-category Progress Badges */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1 text-slate-400">
                  <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800/80">
                    Coding & DSA: <strong className="text-indigo-300">{codingProgress}%</strong>
                  </div>
                  <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800/80">
                    {currentBranch.shortName} Core: <strong className="text-indigo-300">{coreProgress}%</strong>
                  </div>
                  <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800/80">
                    Tech Interview: <strong className="text-indigo-300">{techIntProgress}%</strong>
                  </div>
                  <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800/80">
                    HR Interview: <strong className="text-indigo-300">{hrProgress}%</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Advice Callout */}
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Strategy for {currentBranch.name} Students</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {branchAdvice.advice}
              </p>
            </div>

            {/* Preparation Sections Navigation Tabs */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
              {[
                { id: 'coding', label: `Coding & DSA (${codingCompletedCount}/${codingQuestions.length})`, icon: Code2 },
                { id: 'core_branch', label: `${currentBranch.shortName} Core Subjects (${coreCompletedCount}/${branchCoreQuestions.length})`, icon: GraduationCap },
                { id: 'tech_interview', label: `Technical Interview (${techIntCompletedCount}/${techInterviewQuestions.length})`, icon: Layers },
                { id: 'hr_interview', label: `HR Interview (${hrCompletedCount}/${hrInterviewQuestions.length})`, icon: UserCheck },
                { id: 'internships', label: `Summer Internship & PPO (${(currentCompany.internshipPrograms || []).length} Tracks)`, icon: Rocket },
                { id: 'rounds', label: `Recruitment Rounds (${currentCompany.recruitmentRounds.length})`, icon: Building2 }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeSection === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id as any)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              WORKSPACE SECTION: INTERACTIVE PRACTICE QUESTIONS & WORKSPACE
              (Renders for 'coding', 'core_branch', 'tech_interview', 'hr_interview')
              ========================================================================= */}
          {['coding', 'core_branch', 'tech_interview', 'hr_interview'].includes(activeSection) && (
            <div className="space-y-6">
              {/* State 1: Currently Generating AI Performance Analysis */}
              {isAnalyzing && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 sm:p-14 text-center space-y-4 shadow-xl animate-in fade-in duration-200">
                  <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      Analyzing your performance...
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Evaluating answers against {currentCompany.name}'s placement benchmarks and {currentBranch.name} placement criteria.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-indigo-300">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Elapsed: {analysisElapsedTime}s (Safety threshold: 14s)</span>
                  </div>
                </div>
              )}

              {/* State 2: Assessment Analysis Report Display */}
              {!isAnalyzing && assessmentAnalysis && !isReviewMode && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Status Banner */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <CheckCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          Assessment Completed & Evaluated
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Saved to Progress History
                          </span>
                        </h4>
                        <p className="text-xs text-slate-400">
                          {assessmentAnalysis.companyName} • {assessmentAnalysis.sectionTitle} • {currentBranch.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => setIsReviewMode(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Review Question Solutions</span>
                      </button>

                      <button
                        onClick={handleRetakeAssessment}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-800"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                        <span>Retake Test</span>
                      </button>
                    </div>
                  </div>

                  {/* Fallback Notice if AI service was delayed */}
                  {analysisNotice && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{analysisNotice}</span>
                      </div>
                      <button
                        onClick={handleRetryAiAnalysis}
                        disabled={isAnalyzing}
                        className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-semibold text-[11px] shrink-0 transition-colors cursor-pointer self-start sm:self-auto"
                      >
                        Retry Analysis
                      </button>
                    </div>
                  )}

                  {/* Scorecard Hero Banner */}
                  <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      {/* Left score ring */}
                      <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                          Placement Readiness
                        </span>
                        <div className="relative flex items-center justify-center mb-3">
                          <div className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center ${
                            assessmentAnalysis.overallScore >= 80 
                              ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' 
                              : assessmentAnalysis.overallScore >= 60 
                              ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' 
                              : 'border-amber-500 shadow-lg shadow-amber-500/20'
                          }`}>
                            <span className="text-3xl font-black text-white font-mono">
                              {assessmentAnalysis.overallScore}%
                            </span>
                            <span className={`text-[11px] font-bold uppercase tracking-wider ${
                              assessmentAnalysis.overallScore >= 80 ? 'text-emerald-400' : assessmentAnalysis.overallScore >= 60 ? 'text-indigo-400' : 'text-amber-400'
                            }`}>
                              {assessmentAnalysis.grade}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 w-full pt-3 border-t border-slate-800 text-center">
                          <div>
                            <span className="text-[10px] text-slate-500 block">Correct</span>
                            <span className="text-sm font-mono font-bold text-emerald-400">{assessmentAnalysis.correctAnswers}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">Incorrect</span>
                            <span className="text-sm font-mono font-bold text-rose-400">{assessmentAnalysis.incorrectAnswers}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">Skipped</span>
                            <span className="text-sm font-mono font-bold text-slate-400">{assessmentAnalysis.unansweredQuestions}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Executive Summary */}
                      <div className="lg:col-span-8 space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-indigo-400" />
                            {assessmentAnalysis.isAiGenerated ? 'Gemini AI Performance Analysis' : 'Verified Diagnostic Performance Analysis'}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {new Date(assessmentAnalysis.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white">
                          Evaluation for {assessmentAnalysis.companyName}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                          {assessmentAnalysis.performanceSummary}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <button
                            onClick={() => setIsReviewMode(true)}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>Review Questions & Solutions</span>
                          </button>

                          {onNavigateToRoadmap && (
                            <button
                              onClick={onNavigateToRoadmap}
                              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <TrendingUp className="w-4 h-4 text-emerald-400" />
                              <span>Go to AI Roadmap</span>
                            </button>
                          )}

                          {onNavigateToHistory && (
                            <button
                              onClick={onNavigateToHistory}
                              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <History className="w-4 h-4 text-indigo-400" />
                              <span>View in Progress History</span>
                            </button>
                          )}

                          <button
                            onClick={handleRetryAiAnalysis}
                            disabled={isAnalyzing}
                            className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin text-indigo-400' : ''}`} />
                            <span>Retry Analysis</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Topic Breakdown Cards */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-indigo-400" />
                        Topic-Wise Skill Breakdown
                      </h4>
                      <span className="text-xs text-slate-400 font-mono">
                        {Object.keys(assessmentAnalysis.topicBreakdown).length} Focus Topics Evaluated
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Object.entries(assessmentAnalysis.topicBreakdown).map(([topic, data]) => (
                        <div key={topic} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-200 truncate pr-2" title={topic}>
                              {topic}
                            </span>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                              data.score >= 80 
                                ? 'bg-emerald-500/20 text-emerald-300' 
                                : data.score >= 60 
                                ? 'bg-indigo-500/20 text-indigo-300' 
                                : 'bg-amber-500/20 text-amber-300'
                            }`}>
                              {data.score}%
                            </span>
                          </div>

                          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                data.score >= 80 ? 'bg-emerald-500' : data.score >= 60 ? 'bg-indigo-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${data.score}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                            <span>{data.correct} of {data.total} correct</span>
                            <span className="text-slate-500">{data.level}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strong Topics & Weak Topics / Concepts to Improve Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Strong Topics */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Demonstrated Strengths</h4>
                          <p className="text-xs text-slate-400">High accuracy concepts in this assessment</p>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        {assessmentAnalysis.strongTopics.map((topic, i) => (
                          <div key={i} className="p-3 rounded-xl bg-slate-950 border border-emerald-500/20 flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <div className="text-xs text-slate-300 leading-snug">
                              <strong className="text-white block mb-0.5">{topic}</strong>
                              Solid conceptual clarity and correct execution demonstrated on practice questions.
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Weak Topics & Concepts That Need Improvement */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Concepts Needing Improvement</h4>
                          <p className="text-xs text-slate-400">Priority areas to strengthen before placement rounds</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {assessmentAnalysis.conceptsToImprove.map((item, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/20 space-y-1.5">
                            <span className="text-xs font-bold text-amber-300 block">
                              {item.concept}
                            </span>
                            <p className="text-[11px] text-slate-300 leading-relaxed">
                              <strong className="text-slate-400">Why {assessmentAnalysis.companyName} tests this: </strong>
                              {item.whyImportant}
                            </p>
                            <div className="pt-1.5 border-t border-slate-800 text-[11px] text-emerald-400/90 font-mono">
                              ⚡ Actionable Drill: {item.actionableDrill}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recommended Next Topics & Practical Suggestions */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recommended Next Topics */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Target className="w-4 h-4 text-indigo-400" />
                        Recommended Next Topics
                      </h4>
                      <div className="space-y-2">
                        {assessmentAnalysis.recommendedNextTopics.map((top, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
                            <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                              {idx + 1}
                            </span>
                            <span>{top}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Practical Preparation Suggestions */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        Practical Suggestions for {assessmentAnalysis.companyName}
                      </h4>
                      <div className="space-y-2">
                        {assessmentAnalysis.practicalSuggestions.map((sug, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                            <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                            <span>{sug}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* State 3: Interactive Practice Questions & Review Mode */}
              {(!assessmentAnalysis || isReviewMode) && !isAnalyzing && (
                <div className="space-y-6">
                  {/* Review Mode Banner */}
                  {isReviewMode && assessmentAnalysis && (
                    <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
                          <CheckSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">
                            Review Mode: {currentCompany.name} • {assessmentAnalysis.sectionTitle}
                          </span>
                          <span className="text-[11px] text-slate-300">
                            Score: <strong className="text-emerald-400 font-mono">{assessmentAnalysis.overallScore}%</strong> ({assessmentAnalysis.correctAnswers}/{assessmentAnalysis.totalQuestions} Correct)
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsReviewMode(false)}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Return to Analysis Report</span>
                      </button>
                    </div>
                  )}

                  {/* Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {activeSection === 'coding' && <Code2 className="w-5 h-5 text-indigo-400" />}
                        {activeSection === 'core_branch' && <GraduationCap className="w-5 h-5 text-indigo-400" />}
                        {activeSection === 'tech_interview' && <Layers className="w-5 h-5 text-indigo-400" />}
                        {activeSection === 'hr_interview' && <UserCheck className="w-5 h-5 text-indigo-400" />}

                        {activeSection === 'coding' && 'Coding & Algorithmic Problem Solving'}
                        {activeSection === 'core_branch' && `${currentBranch.name} (${currentBranch.shortName}) Core Curriculum`}
                        {activeSection === 'tech_interview' && 'Technical Interview Scenarios & Conceptual Questions'}
                        {activeSection === 'hr_interview' && 'HR Interview & Behavioral STAR Responses'}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {activeSection === 'coding' && 'Master Arrays, Strings, Searching, Sorting, Linked Lists, Trees, Graphs, and Dynamic Programming.'}
                        {activeSection === 'core_branch' && `Tailored questions in ${currentBranch.shortName} domain subjects tested in technical placement rounds.`}
                        {activeSection === 'tech_interview' && 'Role-specific engineering scenarios, project architecture defense, and system diagnostics.'}
                        {activeSection === 'hr_interview' && 'Common behavioral interview inquiries with high-scoring sample answers and STAR guides.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {extraQuestionSuccessNotice && (
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 animate-in fade-in duration-150">
                          {extraQuestionSuccessNotice}
                        </span>
                      )}

                      {!isReviewMode && (
                        <button
                          onClick={handleGenerateExtraAiQuestion}
                          disabled={isGeneratingExtraQuestion}
                          className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          {isGeneratingExtraQuestion ? (
                            <>
                              <div className="w-3 h-3 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
                              <span>Generating...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                              <span>+ 1 More AI Question</span>
                            </>
                          )}
                        </button>
                      )}

                      {!isReviewMode && answeredCountInSection > 0 && (
                        <button
                          onClick={handleInitiateFinishAndAnalyze}
                          disabled={isSubmittingAssessment}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                          <span>Finish & Analyze</span>
                        </button>
                      )}

                      <span className="text-xs text-slate-400 font-mono">
                        Question {activeQuestionIndex + 1} of {currentSectionQuestions.length}
                      </span>
                    </div>
                  </div>

                  {/* Question Navigator Pill Bar */}
                  {currentSectionQuestions.length > 0 && (
                    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                        <span className="text-[11px] font-semibold text-slate-400 shrink-0 font-mono pr-1">
                          Questions:
                        </span>
                        {currentSectionQuestions.map((q, idx) => {
                          const isAnswered = Boolean(selectedQuestionOptions[q.id]);
                          const isCurrent = idx === activeQuestionIndex;
                          const isCorrect = isReviewMode && selectedQuestionOptions[q.id] === q.correctAnswer;
                          const isIncorrect = isReviewMode && isAnswered && selectedQuestionOptions[q.id] !== q.correctAnswer;

                          let pillStyle = 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700';
                          if (isReviewMode) {
                            if (isCorrect) {
                              pillStyle = 'bg-emerald-950/70 text-emerald-300 border-emerald-500/60 font-bold';
                            } else if (isIncorrect) {
                              pillStyle = 'bg-rose-950/70 text-rose-300 border-rose-500/60 font-bold';
                            } else {
                              pillStyle = 'bg-slate-900 text-slate-500 border-slate-800';
                            }
                          } else if (isAnswered) {
                            pillStyle = 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/40 font-bold';
                          }

                          if (isCurrent) {
                            pillStyle += ' ring-2 ring-indigo-400 font-bold';
                          }

                          return (
                            <button
                              key={q.id}
                              onClick={() => setActiveQuestionIndex(idx)}
                              className={`w-7 h-7 rounded-lg text-xs font-mono flex items-center justify-center border transition-all cursor-pointer shrink-0 ${pillStyle}`}
                              title={`Question ${idx + 1}: ${isAnswered ? 'Answered' : 'Unanswered'}`}
                            >
                              {idx + 1}
                            </button>
                          );
                        })}
                      </div>

                      <span className="text-[11px] text-slate-400 font-mono shrink-0 hidden sm:inline">
                        {answeredCountInSection} / {currentSectionQuestions.length} answered
                      </span>
                    </div>
                  )}

                  {/* Interactive Question Card */}
                  {currentQuestion ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative">
                      {/* Question Meta Strip */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30">
                            Q{activeQuestionIndex + 1} of {currentSectionQuestions.length}
                          </span>
                          {currentQuestion.subTopic && (
                            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                              {currentQuestion.subTopic}
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                            currentQuestion.difficulty === 'Easy' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : currentQuestion.difficulty === 'Medium'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {currentQuestion.difficulty}
                          </span>

                          {isReviewMode && (
                            selectedQuestionOptions[currentQuestion.id] === currentQuestion.correctAnswer ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                              </span>
                            ) : selectedQuestionOptions[currentQuestion.id] ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30 flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5" /> Incorrect
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-bold border border-slate-700 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" /> Unanswered
                              </span>
                            )
                          )}
                        </div>

                        {/* Completion Status Toggle */}
                        {!isReviewMode && (
                          <button
                            onClick={() => toggleQuestionCompletion(currentQuestion.id)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                              completedQuestions.includes(currentQuestion.id)
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                            }`}
                          >
                            {completedQuestions.includes(currentQuestion.id) ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span>Mastered & Completed</span>
                              </>
                            ) : (
                              <>
                                <Circle className="w-4 h-4 text-slate-500" />
                                <span>Mark as Completed</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {/* Question Title & Prompt */}
                      <div className="space-y-3">
                        <h4 className="text-base sm:text-lg font-bold text-white">
                          {currentQuestion.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                          {currentQuestion.question}
                        </p>
                      </div>

                      {/* Code Snippet (if present) */}
                      {currentQuestion.codeSnippet && (
                        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                          <code>{currentQuestion.codeSnippet}</code>
                        </pre>
                      )}

                  {/* Options (if multiple choice) */}
                  {currentQuestion.options && currentQuestion.options.length > 0 && (
                    <div className="space-y-2.5">
                      <span className="text-xs font-semibold text-slate-400 block">
                        Select the correct technical approach:
                      </span>
                      {currentQuestion.options.map((opt) => {
                        const isPicked = selectedQuestionOptions[currentQuestion.id] === opt.id;
                        const isCorrect = currentQuestion.correctAnswer === opt.id;
                        const isRevealed = revealedAnswers[currentQuestion.id];
                        const showStatus = isRevealed || isPicked;

                        let style = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';
                        if (showStatus) {
                          if (isCorrect) {
                            style = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium';
                          } else if (isPicked && !isCorrect) {
                            style = 'bg-rose-950/40 border-rose-500 text-rose-300';
                          }
                        }

                        return (
                          <button
                            key={opt.id}
                            disabled={isReviewMode}
                            onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                            className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${style} ${isReviewMode ? 'cursor-default' : 'cursor-pointer'}`}
                          >
                            <span className="w-5 h-5 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5">
                              {opt.id.toUpperCase()}
                            </span>
                            <span className="flex-1 leading-snug">{opt.text}</span>

                            {isReviewMode && isPicked && isCorrect && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                                <Check className="w-3 h-3" /> Your Answer (Correct)
                              </span>
                            )}

                            {isReviewMode && isPicked && !isCorrect && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1 shrink-0">
                                <XCircle className="w-3 h-3" /> Your Answer (Incorrect)
                              </span>
                            )}

                            {isReviewMode && !isPicked && isCorrect && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                                <Check className="w-3 h-3" /> Correct Option
                              </span>
                            )}

                            {!isReviewMode && showStatus && isCorrect && (
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* STAR Framework Breakdown (for HR / Behavioral Questions) */}
                  {currentQuestion.starGuide && (
                    <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
                      <span className="font-bold text-indigo-300 flex items-center gap-1.5 text-xs">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        STAR Framework Answer Structure
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                          <strong className="text-slate-300 block mb-0.5">Situation:</strong>
                          <span className="text-slate-400">{currentQuestion.starGuide.situation}</span>
                        </div>
                        <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                          <strong className="text-slate-300 block mb-0.5">Task:</strong>
                          <span className="text-slate-400">{currentQuestion.starGuide.task}</span>
                        </div>
                        <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                          <strong className="text-slate-300 block mb-0.5">Action:</strong>
                          <span className="text-slate-400">{currentQuestion.starGuide.action}</span>
                        </div>
                        <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                          <strong className="text-slate-300 block mb-0.5">Result:</strong>
                          <span className="text-slate-400">{currentQuestion.starGuide.result}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Answer, Local Explanation & On-Demand AI Mentorship */}
                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={() => {
                          setRevealedAnswers(prev => ({
                            ...prev,
                            [currentQuestion.id]: !prev[currentQuestion.id]
                          }));
                        }}
                        className="px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{revealedAnswers[currentQuestion.id] ? 'Hide Solution' : 'View Detailed Solution & Explanation'}</span>
                      </button>

                      {/* On-demand AI Deep Dive button (only called when user clicks) */}
                      <button
                        onClick={() => handleFetchAiGuidance(currentQuestion)}
                        disabled={isLoadingAiGuidance[currentQuestion.id]}
                        className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {isLoadingAiGuidance[currentQuestion.id] ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
                            <span>Consulting Gemini AI...</span>
                          </>
                        ) : (
                          <>
                            <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Ask Gemini AI Deep Dive</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Local Detailed Solution */}
                    {revealedAnswers[currentQuestion.id] && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-2 animate-in fade-in duration-150">
                        <strong className="text-emerald-400 block text-xs uppercase tracking-wider font-bold">
                          Step-by-Step Technical Explanation:
                        </strong>
                        <p>{currentQuestion.explanation}</p>
                      </div>
                    )}

                    {/* On-Demand AI Mentorship Deep Dive Card */}
                    {aiGuidanceMap[currentQuestion.id] && (
                      <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-900 border border-indigo-500/40 text-xs text-slate-200 space-y-3.5 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between pb-2 border-b border-indigo-500/20">
                          <span className="font-bold text-indigo-300 flex items-center gap-1.5 text-xs">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Gemini AI Placement Intelligence • {currentCompany.name} Derivation</span>
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Verified Placement Standard
                          </span>
                        </div>

                        <div>
                          <strong className="text-slate-300 block mb-1 font-semibold uppercase text-[10px] tracking-wider">
                            Optimal Engineering Approach:
                          </strong>
                          <p className="leading-relaxed text-slate-300 whitespace-pre-line">
                            {aiGuidanceMap[currentQuestion.id].explanation}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                            <strong className="text-amber-300 block mb-1 font-semibold text-[11px] flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-400" />
                              Interview Communication Tip:
                            </strong>
                            <p className="text-slate-400 leading-relaxed text-[11px]">
                              {aiGuidanceMap[currentQuestion.id].interviewTip}
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                            <strong className="text-indigo-300 block mb-1 font-semibold text-[11px] flex items-center gap-1">
                              <Layers className="w-3 h-3 text-indigo-400" />
                              Edge-Case Variation:
                            </strong>
                            <p className="text-slate-400 leading-relaxed text-[11px]">
                              {aiGuidanceMap[currentQuestion.id].practiceVariation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pagination Controls */}
                  <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={handlePrevQuestion}
                      disabled={activeQuestionIndex === 0}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Question</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-mono">
                        Question {activeQuestionIndex + 1} of {currentSectionQuestions.length}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        ({answeredCountInSection}/{currentSectionQuestions.length} Answered)
                      </span>
                    </div>

                    {/* Navigation Right: Next Question OR Finish & Analyze */}
                    {isReviewMode ? (
                      activeQuestionIndex < currentSectionQuestions.length - 1 ? (
                        <button
                          onClick={handleNextQuestion}
                          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-indigo-600/20 cursor-pointer"
                        >
                          <span>Next Question</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsReviewMode(false)}
                          className="w-full sm:w-auto px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                          <span>Back to Analysis Report</span>
                        </button>
                      )
                    ) : (
                      activeQuestionIndex < currentSectionQuestions.length - 1 ? (
                        <button
                          onClick={handleNextQuestion}
                          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-indigo-600/20 cursor-pointer"
                        >
                          <span>Next Question</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleInitiateFinishAndAnalyze}
                          disabled={isSubmittingAssessment}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
                        >
                          <Sparkles className="w-4 h-4 text-emerald-200" />
                          <span>Finish & Analyze</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
                  No practice questions available for this filter.
                </div>
              )}
            </div>
          )}

          {/* Unanswered Questions Validation Modal */}
              {unansweredModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Unanswered Questions Detected</h4>
                        <p className="text-xs text-slate-400">Review before finalizing placement evaluation</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      You have answered <strong className="text-emerald-400">{currentSectionQuestions.length - unansweredIndicesList.length}</strong> of{' '}
                      <strong className="text-white">{currentSectionQuestions.length}</strong> questions in this assessment.
                    </p>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <span className="text-[11px] font-semibold text-slate-400 block font-mono">
                        Unanswered Questions ({unansweredIndicesList.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {unansweredIndicesList.map(qNum => (
                          <button
                            key={qNum}
                            onClick={() => {
                              setUnansweredModalOpen(false);
                              setActiveQuestionIndex(qNum - 1);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-mono font-bold transition-colors cursor-pointer"
                          >
                            Q{qNum}
                          </button>
                        ))}
                      </div>
                      <p className="text-[11px] text-amber-300/80 mt-1">
                        Unanswered questions will be scored as 0 marks in your placement benchmark evaluation.
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => {
                          setUnansweredModalOpen(false);
                          if (unansweredIndicesList.length > 0) {
                            setActiveQuestionIndex(unansweredIndicesList[0] - 1);
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Review Unanswered
                      </button>

                      <button
                        onClick={() => {
                          setUnansweredModalOpen(false);
                          executeFinishAndAnalyze();
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
                      >
                        Submit & Analyze Anyway
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              WORKSPACE SECTION: SUMMER INTERNSHIP & PPO HUB (When activeSection === 'internships')
              ========================================================================= */}
          {activeSection === 'internships' && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-sky-950/40 border border-indigo-500/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        {currentCompany.name} Summer Internship & PPO Guide
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                          2nd & 3rd Year Focus
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Targeted internship programs, hiring rubrics, college project blueprints, and the 6-step PPO conversion playbook.
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 font-mono font-bold text-xs border border-indigo-500/20">
                    {currentBranch.shortName}
                  </span>
                </div>

                {/* Sub-Navigation Pills */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
                  {[
                    { id: 'programs', label: `${currentCompany.name} Tracks (${(currentCompany.internshipPrograms || []).length})`, icon: Building2 },
                    { id: 'playbook', label: 'PPO Playbook (6 Rules)', icon: CheckSquare },
                    { id: 'rubric', label: 'Intern vs Placement Rubric', icon: FileCheck },
                    { id: 'projects', label: `${currentBranch.shortName} College Blueprints`, icon: Lightbulb },
                    { id: 'timeline', label: 'B.Tech Hiring Calendar', icon: Calendar }
                  ].map(sub => {
                    const SubIcon = sub.icon;
                    const isSubActive = internshipSubTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setInternshipSubTab(sub.id as any)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                          isSubActive
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        <SubIcon className="w-3.5 h-3.5" />
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-View 1: Company Programs */}
              {internshipSubTab === 'programs' && (
                <div className="space-y-4">
                  {(currentCompany.internshipPrograms && currentCompany.internshipPrograms.length > 0) ? (
                    <div className="space-y-4">
                      {currentCompany.internshipPrograms.map((prog) => (
                        <div 
                          key={prog.id}
                          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h5 className="text-base font-bold text-white">{prog.name}</h5>
                                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-mono border border-indigo-500/30">
                                  {prog.targetYear}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400">
                                Duration: <span className="text-slate-200 font-medium">{prog.duration}</span> • Timeline: <span className="text-indigo-400 font-medium">{prog.applicationTimeline}</span>
                              </p>
                            </div>

                            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-right sm:min-w-[200px]">
                              <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                                Stipend Benchmark
                              </span>
                              <span className="text-xs font-mono font-bold text-emerald-400">
                                {prog.stipendBenchmark}
                              </span>
                              <span className="text-[9px] text-slate-500 block mt-0.5">
                                *Sample estimate based on public student data
                              </span>
                            </div>
                          </div>

                          {/* Selection Process Flow */}
                          <div className="space-y-2 pt-2 border-t border-slate-800/60">
                            <span className="text-xs font-semibold text-slate-300 block">
                              Evaluation & Selection Process:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                              {prog.selectionProcess.map((step, idx) => (
                                <div key={idx} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs space-y-1">
                                  <span className="text-[10px] font-mono text-indigo-400 font-bold block">
                                    Step {idx + 1}
                                  </span>
                                  <p className="text-slate-300 leading-snug">{step}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Evaluation Focus Points */}
                          <div className="space-y-1.5">
                            <span className="text-xs font-semibold text-slate-300 block">
                              Core Skills Tested:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {prog.evaluationFocus.map((focus, idx) => (
                                <span 
                                  key={idx}
                                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  {focus}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* PPO Conversion Advice */}
                          <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs space-y-1">
                            <div className="flex items-center gap-1.5 text-indigo-300 font-bold text-[11px] uppercase tracking-wider">
                              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                              <span>Pre-Placement Offer (PPO) Conversion Strategy</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">{prog.ppoConversionGuidance}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-2">
                      <p className="text-xs text-slate-300">
                        {currentCompany.name} conducts seasonal internship hiring through general campus placement drives and competitive hackathons.
                      </p>
                      <p className="text-xs text-slate-500">
                        Explore the PPO Playbook and Hiring Calendars for general 2nd & 3rd year internship preparation.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Sub-View 2: PPO Playbook */}
              {internshipSubTab === 'playbook' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                        The 6-Step PPO Conversion Master Playbook
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        How high-performing B.Tech summer interns convert an 8-to-12-week internship into a full-time return offer.
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {Object.values(checkedPpoSteps).filter(Boolean).length} / {PPO_PLAYBOOK.length} Rules Completed
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PPO_PLAYBOOK.map((item) => {
                      const isChecked = Boolean(checkedPpoSteps[item.step]);
                      return (
                        <div 
                          key={item.step}
                          className={`bg-slate-900 border rounded-2xl p-5 space-y-3 transition-colors ${
                            isChecked ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <span className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                                isChecked ? 'bg-emerald-500 text-slate-950' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              }`}>
                                {item.step}
                              </span>
                              <div>
                                <h5 className="text-xs font-bold text-white">{item.rule}</h5>
                                <span className="text-[11px] text-indigo-400 font-medium block">{item.tagline}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => togglePpoStep(item.step)}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                isChecked 
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                                  : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                              }`}
                              title="Mark rule understood"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            {item.explanation}
                          </p>

                          <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                              Actionable Checklist:
                            </span>
                            <ul className="space-y-1">
                              {item.actionableChecklist.map((task, idx) => (
                                <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sub-View 3: Rubric */}
              {internshipSubTab === 'rubric' && (
                <div className="space-y-4">
                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="p-3.5 font-semibold text-slate-300 w-1/4">Evaluation Dimension</th>
                          <th className="p-3.5 font-semibold text-indigo-400 w-1/3">Summer Internship (2nd & 3rd Year)</th>
                          <th className="p-3.5 font-semibold text-slate-300 w-1/3">Campus Placement (Final Year)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {RUBRIC_COMPARISONS.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-3.5 font-semibold text-white">
                              {row.dimension}
                              <span className="text-[10px] text-slate-500 font-normal block mt-1">
                                {row.tipForStudents}
                              </span>
                            </td>
                            <td className="p-3.5 text-slate-300 leading-relaxed bg-indigo-950/10">
                              {row.internshipExpectation}
                            </td>
                            <td className="p-3.5 text-slate-400 leading-relaxed">
                              {row.placementExpectation}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sub-View 4: Branch Projects */}
              {internshipSubTab === 'projects' && (
                <div className="space-y-4">
                  {BRANCH_INTERNSHIP_GUIDANCE[selectedBranchId] && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {BRANCH_INTERNSHIP_GUIDANCE[selectedBranchId].recommendedCollegeProjects.map((proj, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="text-sm font-bold text-white">{proj.title}</h5>
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono border border-amber-500/20 shrink-0">
                              Blueprint {idx + 1}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                              Architecture & Focus:
                            </span>
                            <p className="text-xs text-slate-300">{proj.focus}</p>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                              Tech Stack:
                            </span>
                            <span className="text-xs font-mono text-indigo-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 inline-block">
                              {proj.techStack}
                            </span>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1 text-xs">
                            <span className="text-emerald-400 font-semibold text-[11px] block">
                              Why Recruiters Value This:
                            </span>
                            <p className="text-slate-400 leading-snug">{proj.whyRecruitersValueIt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sub-View 5: Timeline */}
              {internshipSubTab === 'timeline' && (
                <div className="space-y-4">
                  {INTERNSHIP_TIMELINES.map((phase, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                            {idx + 1}
                          </span>
                          <div>
                            <h5 className="text-sm font-bold text-white">{phase.season}</h5>
                            <span className="text-xs text-indigo-400 font-mono">{phase.timeline}</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
                          {phase.targetYear}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
                          <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block">
                            Hiring Events:
                          </span>
                          <ul className="space-y-1">
                            {phase.keyEvents.map((evt, i) => (
                              <li key={i} className="text-slate-300 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                                <span>{evt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
                          <span className="text-emerald-400 font-semibold uppercase text-[10px] tracking-wider block">
                            Student Actions:
                          </span>
                          <ul className="space-y-1">
                            {phase.actionItems.map((act, i) => (
                              <li key={i} className="text-slate-300 flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              WORKSPACE SECTION: RECRUITMENT ROUNDS & SYLLABUS (When activeSection === 'rounds')
              ========================================================================= */}
          {activeSection === 'rounds' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  {currentCompany.name} Full Recruitment Process
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {currentCompany.recruitmentRounds.length} Stages
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentCompany.recruitmentRounds.map((round) => (
                  <div 
                    key={round.roundNumber}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-bold text-xs border border-indigo-500/30">
                        Round {round.roundNumber}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {round.format}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-white">
                      {round.name}
                    </h4>

                    <div className="space-y-1.5 text-xs">
                      <p className="text-slate-300">
                        <strong className="text-slate-400">Focus:</strong> {round.focus}
                      </p>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-indigo-300 text-[11px] flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{round.tips}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* In-app Reset Confirmation Dialog */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Reset Preparation Progress?</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to reset your practice progress for <strong className="text-white">{currentCompany.name}</strong> ({currentBranch.shortName})? Your completed topic and question markers for this company will be cleared.
            </p>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmResetOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={executeResetProgress}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-md shadow-rose-600/20 cursor-pointer"
              >
                Reset Progress
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
