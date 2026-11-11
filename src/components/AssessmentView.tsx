import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  BRANCH_DEFINITIONS, 
  getQuestionsForTrack, 
  getBranchForTrack, 
  gradeAssessment 
} from '../data/questions';
import { ROLE_BENCHMARKS, calculateSkillMatch, SKILL_CATEGORIES } from '../data/benchmarks';
import { AssessmentResult, Question, SkillLevelName } from '../types';
import { saveAssessmentResult } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Code, 
  Timer, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  XCircle,
  GraduationCap,
  Briefcase,
  Layers,
  Flag,
  RotateCcw,
  Clock,
  Pause,
  Play,
  Award,
  AlertTriangle,
  Check,
  X,
  Filter,
  BarChart3,
  HelpCircle,
  Flame,
  Brain,
  ShieldAlert,
  SlidersHorizontal,
  Building2
} from 'lucide-react';

interface AssessmentViewProps {
  onAssessmentCompleted: (result: AssessmentResult) => void;
  onNavigateToDashboard: () => void;
  onNavigateToRoadmap?: () => void;
  onNavigateToCompanies?: () => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({ 
  onAssessmentCompleted,
  onNavigateToDashboard,
  onNavigateToRoadmap,
  onNavigateToCompanies
}) => {
  const { profile, user, isDemoMode, updateProfile } = useAuth();

  // Track / Role selection
  const initialRoleId = profile?.targetRole || 'cse-sde';
  const [selectedRoleId, setSelectedRoleId] = useState<string>(initialRoleId);
  
  // Active questions for selected track
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(() => getQuestionsForTrack(initialRoleId));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  
  // Assessment Timer state (Default: 25 minutes = 1500 seconds)
  const defaultDurationSeconds = useMemo(() => {
    return Math.max(15 * 60, activeQuestions.length * 90); // 90 seconds per question or minimum 15 mins
  }, [activeQuestions.length]);

  const [timeRemaining, setTimeRemaining] = useState<number>(defaultDurationSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Submission & Results
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedResult, setCompletedResult] = useState<AssessmentResult | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'flagged'>('all');
  const [paletteFilter, setPaletteFilter] = useState<'all' | 'answered' | 'unanswered' | 'flagged'>('all');
  
  // Non-blocking in-app confirmation dialog (replaces window.confirm)
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string;
    message: string;
    confirmLabel: string;
    onConfirm: () => void;
  } | null>(null);

  // Sync if profile targetRole loads later
  useEffect(() => {
    if (profile?.targetRole && profile.targetRole !== selectedRoleId && Object.keys(answers).length === 0 && !completedResult) {
      setSelectedRoleId(profile.targetRole);
      const newQuestions = getQuestionsForTrack(profile.targetRole);
      setActiveQuestions(newQuestions);
      setCurrentIndex(0);
      setTimeRemaining(Math.max(15 * 60, newQuestions.length * 90));
    }
  }, [profile?.targetRole]);

  // Countdown Timer Hook
  useEffect(() => {
    if (!completedResult && isTimerRunning && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmitOnExpiry();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, completedResult, timeRemaining]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer urgency style
  const timerWarningClass = useMemo(() => {
    if (timeRemaining <= 60) return 'text-rose-400 bg-rose-500/10 border-rose-500/30 animate-pulse';
    if (timeRemaining <= 300) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-indigo-300 bg-slate-950 border-slate-800';
  }, [timeRemaining]);

  // Auto-submit when timer hits 00:00 (non-blocking)
  const handleAutoSubmitOnExpiry = () => {
    executeSubmit();
  };

  const applyRoleChange = (newRoleId: string) => {
    const newQuestions = getQuestionsForTrack(newRoleId);
    setSelectedRoleId(newRoleId);
    setActiveQuestions(newQuestions);
    setCurrentIndex(0);
    setAnswers({});
    setFlaggedIds(new Set());
    setCompletedResult(null);
    setShowReview(false);
    setTimeRemaining(Math.max(15 * 60, newQuestions.length * 90));
    setIsTimerRunning(true);

    if (profile) {
      updateProfile({ targetRole: newRoleId });
    }
  };

  // Handle track / role switch (non-blocking in-app confirmation)
  const handleRoleChange = (newRoleId: string) => {
    if (newRoleId === selectedRoleId) return;
    const answeredCount = Object.keys(answers).length;
    if (answeredCount > 0 && !completedResult) {
      setConfirmDialog({
        title: 'Switch Preparation Track?',
        message: 'Switching engineering tracks will reset your active answers and timer for this session. Do you wish to continue?',
        confirmLabel: 'Yes, Switch Track',
        onConfirm: () => {
          setConfirmDialog(null);
          applyRoleChange(newRoleId);
        }
      });
      return;
    }

    applyRoleChange(newRoleId);
  };

  const currentQuestion = activeQuestions[currentIndex] || activeQuestions[0];
  const totalQuestions = activeQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flaggedIds.size;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const currentBenchmark = ROLE_BENCHMARKS[selectedRoleId] || ROLE_BENCHMARKS['cse-sde'] || Object.values(ROLE_BENCHMARKS)[0];
  const currentBranch = getBranchForTrack(selectedRoleId);

  // Toggle selection
  const handleSelectOption = (optionId: string) => {
    if (completedResult) return;
    if (!currentQuestion) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  // Clear current response
  const handleClearCurrentResponse = () => {
    if (!currentQuestion || completedResult) return;
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  // Toggle flag for review
  const handleToggleFlagCurrent = () => {
    if (!currentQuestion) return;
    setFlaggedIds(prev => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Prompt Submit without blocking window.confirm
  const handlePromptSubmit = () => {
    if (isSubmitting) return;

    if (answeredCount < totalQuestions) {
      const unanswered = totalQuestions - answeredCount;
      setConfirmDialog({
        title: 'Submit Incomplete Assessment?',
        message: `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}${flaggedCount > 0 ? ` and ${flaggedCount} flagged for review` : ''}. Unanswered questions will receive 0 points. Would you like to submit and grade now?`,
        confirmLabel: 'Submit & Calculate Score',
        onConfirm: () => {
          setConfirmDialog(null);
          executeSubmit();
        }
      });
      return;
    }

    executeSubmit();
  };

  const executeSubmit = async () => {
    setIsSubmitting(true);
    setIsTimerRunning(false);

    try {
      // 1. Grade dynamically against active track questions
      const graded = gradeAssessment(answers, activeQuestions);

      // 2. Compute benchmark matching
      const benchmark = currentBenchmark;
      const matchDetails = calculateSkillMatch(graded.skillScores as any, benchmark);

      const assessmentId = `assess-${Date.now()}`;
      const studentId = user?.uid || profile?.id || 'demo-student';

      const result: AssessmentResult = {
        id: assessmentId,
        studentId,
        branchId: currentBranch?.id || benchmark.branchId,
        roleId: benchmark.id,
        roleTitle: benchmark.title,
        completedAt: new Date().toISOString(),
        overallScore: matchDetails.overallScore,
        skillScores: graded.skillScores as any,
        answers,
        strengths: matchDetails.strengths,
        priorityGaps: matchDetails.priorityGaps,
        matchSteps: matchDetails.steps,
        status: 'completed',
        createdAt: new Date().toISOString()
      };

      // 3. Persist to Firestore if authenticated
      if (user && !isDemoMode) {
        await saveAssessmentResult(user.uid, result);
      }

      try {
        localStorage.setItem('skillpath_latest_assessment', JSON.stringify(result));
        const prevHist: AssessmentResult[] = JSON.parse(localStorage.getItem('skillpath_assessment_history') || '[]');
        const updatedHist = [result, ...prevHist.filter(x => x.id !== result.id)].slice(0, 30);
        localStorage.setItem('skillpath_assessment_history', JSON.stringify(updatedHist));
      } catch (e) {
        console.warn('Local storage write error in AssessmentView:', e);
      }

      setCompletedResult(result);
      onAssessmentCompleted(result);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    } catch (err) {
      console.error('Error submitting assessment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset & Retake with non-blocking in-app confirmation
  const handleRetake = () => {
    setConfirmDialog({
      title: 'Retake Diagnostic Assessment?',
      message: 'Retaking will clear your active selections and reset the timer. Previous recorded attempts remain safely preserved in your History.',
      confirmLabel: 'Yes, Retake Assessment',
      onConfirm: () => {
        setConfirmDialog(null);
        setAnswers({});
        setFlaggedIds(new Set());
        setCompletedResult(null);
        setShowReview(false);
        setCurrentIndex(0);
        setTimeRemaining(defaultDurationSeconds);
        setIsTimerRunning(true);
      }
    });
  };

  // Filter questions in palette
  const filteredPaletteIndices = useMemo(() => {
    return activeQuestions.map((q, idx) => ({ q, idx })).filter(({ q }) => {
      if (paletteFilter === 'answered') return Boolean(answers[q.id]);
      if (paletteFilter === 'unanswered') return !answers[q.id];
      if (paletteFilter === 'flagged') return flaggedIds.has(q.id);
      return true;
    });
  }, [activeQuestions, answers, flaggedIds, paletteFilter]);

  // Difficulty badge helper
  const getDifficultyBadge = (difficulty: string, points: number) => {
    switch (difficulty) {
      case 'beginner':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Beginner • {points} pts
          </span>
        );
      case 'intermediate':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
            Intermediate • {points} pts
          </span>
        );
      case 'advanced':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 uppercase tracking-wider">
            Advanced • {points} pts
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
            {difficulty} • {points} pts
          </span>
        );
    }
  };

  // ==========================================
  // VIEW 1: ASSESSMENT SUMMARY & SKILL ANALYSIS
  // ==========================================
  if (completedResult && !showReview) {
    const correctCount = activeQuestions.filter(q => completedResult.answers[q.id] === q.correctOptionId).length;
    const accuracyPct = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    const totalMaxPoints = activeQuestions.reduce((acc, q) => acc + q.points, 0);
    const earnedPoints = activeQuestions
      .filter(q => completedResult.answers[q.id] === q.correctOptionId)
      .reduce((acc, q) => acc + q.points, 0);

    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
        
        {/* Hero Evaluation Card */}
        <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Diagnostic Evaluation Graded
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {completedResult.roleTitle}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Technical Placement Score Report
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                Diagnostic score computed from transparent points, verified competencies, and industry placement benchmarks.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowReview(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Review Questions & Explanations</span>
              </button>
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                <span>Retake</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Benchmark Fit
              </span>
              <p className="text-3xl font-extrabold text-indigo-400 mt-1">
                {completedResult.overallScore}%
              </p>
              <span className="text-[10px] text-slate-500">Weighted against role</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Points Earned
              </span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-1">
                {earnedPoints} <span className="text-sm text-slate-500 font-normal">/ {totalMaxPoints}</span>
              </p>
              <span className="text-[10px] text-slate-500">{accuracyPct}% accuracy on attempted</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Questions Correct
              </span>
              <p className="text-3xl font-extrabold text-white mt-1">
                {correctCount} <span className="text-sm text-slate-500 font-normal">/ {totalQuestions}</span>
              </p>
              <span className="text-[10px] text-slate-500">{totalQuestions - correctCount} incorrect or skipped</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Priority Gaps
              </span>
              <p className="text-3xl font-extrabold text-amber-400 mt-1">
                {completedResult.priorityGaps.length}
              </p>
              <span className="text-[10px] text-slate-500">Skills below target score</span>
            </div>
          </div>
        </div>

        {/* Skill-Wise Performance Analysis Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              <div>
                <h2 className="text-base font-bold text-white">
                  Skill-Wise Performance Breakdown
                </h2>
                <p className="text-xs text-slate-400">
                  Detailed category mastery, question counts, and verifiable evidence recorded for each engineering discipline.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Evaluated Categories: {Object.keys(completedResult.skillScores).length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(completedResult.skillScores).map(([catKey, data]) => {
              const skillMeta = SKILL_CATEGORIES[catKey] || { name: catKey.replace(/_/g, ' ').toUpperCase(), description: '' };
              const benchmarkTarget = currentBenchmark.skills[catKey]?.targetScore || 70;
              const isMet = data.score >= benchmarkTarget;

              return (
                <div key={catKey} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-sm text-white block">
                        {skillMeta.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {data.questionsCorrect} of {data.questionsTotal} Questions Correct
                      </span>
                    </div>

                    <div className="text-right">
                      <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full border ${
                        isMet 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {data.score}% ({data.level})
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Target: {benchmarkTarget}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden flex">
                    <div 
                      className={`h-full ${isMet ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${Math.min(data.score, 100)}%` }}
                    />
                  </div>

                  {/* Evidence Items */}
                  {data.evidence && data.evidence.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Recorded Skill Evidence:
                      </span>
                      <ul className="space-y-1">
                        {data.evidence.slice(0, 3).map((item: string, eIdx: number) => {
                          const isSuccess = item.startsWith('Correctly');
                          return (
                            <li key={eIdx} className="flex items-start gap-1.5 text-[11px]">
                              {isSuccess ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              ) : (
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              )}
                              <span className={isSuccess ? 'text-slate-300' : 'text-amber-200/90'}>
                                {item}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Next Action Routing CTAs */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onNavigateToDashboard}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md"
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex flex-wrap items-center gap-3">
              {onNavigateToRoadmap && (
                <button
                  onClick={onNavigateToRoadmap}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  Generate 4-Week AI Roadmap
                </button>
              )}
              {onNavigateToCompanies && (
                <button
                  onClick={onNavigateToCompanies}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Practice Target Companies</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    );
  }

  // ==========================================
  // VIEW 2: QUESTION REVIEW MODE WITH EXPLANATIONS
  // ==========================================
  if (completedResult && showReview) {
    const filteredReviewQuestions = activeQuestions.filter(q => {
      const chosen = completedResult.answers[q.id];
      const isCorrect = chosen === q.correctOptionId;
      if (reviewFilter === 'correct') return isCorrect;
      if (reviewFilter === 'incorrect') return !isCorrect;
      if (reviewFilter === 'flagged') return flaggedIds.has(q.id);
      return true;
    });

    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {completedResult.roleTitle}
              </span>
              <span className="text-xs text-slate-400">
                Score: <strong className="text-indigo-400">{completedResult.overallScore}%</strong>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">
              Assessment Solutions & Detailed Explanations
            </h1>
            <p className="text-xs text-slate-400">
              Review correct answers, distractor rationales, and verified concept explanations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReview(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              Back to Score Breakdown
            </button>
            <button
              onClick={handleRetake}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Retake</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            Filter Solutions:
          </span>
          {[
            { id: 'all', label: `All (${activeQuestions.length})` },
            { id: 'incorrect', label: `Incorrect (${activeQuestions.filter(q => completedResult.answers[q.id] !== q.correctOptionId).length})` },
            { id: 'correct', label: `Correct (${activeQuestions.filter(q => completedResult.answers[q.id] === q.correctOptionId).length})` },
            { id: 'flagged', label: `Flagged (${flaggedIds.size})` }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setReviewFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                reviewFilter === f.id
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Questions Solution Cards */}
        <div className="space-y-6">
          {filteredReviewQuestions.map((q, idx) => {
            const chosenId = completedResult.answers[q.id];
            const isCorrect = chosenId === q.correctOptionId;
            const isFlagged = flaggedIds.has(q.id);

            return (
              <div 
                key={q.id}
                className={`p-6 sm:p-7 rounded-2xl bg-slate-900 border transition-all ${
                  isCorrect ? 'border-emerald-500/30' : 'border-rose-500/30'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      Q{activeQuestions.indexOf(q) + 1}.
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700/60">
                      {q.categoryLabel}
                    </span>
                    {getDifficultyBadge(q.difficulty, q.points)}
                    {isFlagged && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Flag className="w-3 h-3 fill-amber-400 text-amber-400" />
                        Flagged
                      </span>
                    )}
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border ${
                    isCorrect 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                    {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    {isCorrect ? `Correct (+${q.points} pts)` : 'Incorrect (0 pts)'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {q.title}: {q.question}
                </h3>

                {/* Code Snippet if present */}
                {q.codeSnippet && (
                  <div className="my-3.5 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                    <div className="px-4 py-1.5 bg-slate-900/80 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-sky-400" />
                      <span>Code Snippet</span>
                    </div>
                    <pre className="p-4 text-xs font-mono text-sky-300 overflow-x-auto leading-relaxed">
                      <code>{q.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {/* Options Review List */}
                <div className="mt-4 space-y-2.5">
                  {q.options.map((opt) => {
                    const isSelectedByUser = opt.id === chosenId;
                    const isTheCorrectOption = opt.id === q.correctOptionId;

                    return (
                      <div
                        key={opt.id}
                        className={`p-3.5 rounded-xl border text-xs transition-all ${
                          isTheCorrectOption
                            ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                            : isSelectedByUser
                            ? 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                            : 'bg-slate-950/50 border-slate-800/80 text-slate-400'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                            isTheCorrectOption 
                              ? 'bg-emerald-500 text-white' 
                              : isSelectedByUser 
                              ? 'bg-rose-500 text-white' 
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {isTheCorrectOption ? '✓' : isSelectedByUser ? '✗' : '•'}
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium text-slate-200 leading-snug">
                              {opt.text}
                            </p>
                            <p className="text-[11px] leading-relaxed opacity-90">
                              {opt.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Concept Tested Footer */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Concept Tested: <strong className="text-indigo-300">{q.conceptTested}</strong></span>
                  <span className="font-mono">Question ID: {q.id}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: ACTIVE ASSESSMENT WORKSPACE
  // ==========================================
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Branch & Role Selection Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Universal B.Tech Skill Diagnostic
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Verified Benchmarks
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                {currentBranch?.name || 'Engineering Placement Track'}
              </h1>
            </div>
          </div>

          {/* Role selector dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Assessment Track</span>
                <select
                  value={selectedRoleId}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer"
                >
                  {BRANCH_DEFINITIONS.map(branch => (
                    <optgroup key={branch.id} label={branch.name}>
                      {branch.tracks.map(t => (
                        <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                          {t.title} ({branch.shortName})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Evaluated Chips */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Sections Tested:
          </span>
          {Object.keys(currentBenchmark.skills).map(sk => {
            const meta = SKILL_CATEGORIES[sk] || { name: sk.replace(/_/g, ' ') };
            return (
              <span 
                key={sk} 
                className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300 font-medium"
              >
                {meta.name}
              </span>
            );
          })}
        </div>
      </div>

      {/* 2. Top Assessment Status Bar: Timer, Progress, Question Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Progress info */}
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ({progressPercent}% Complete)
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
              <span>Answered: <strong className="text-emerald-400 font-mono">{answeredCount}</strong></span>
              <span>•</span>
              <span>Remaining: <strong className="text-slate-300 font-mono">{totalQuestions - answeredCount}</strong></span>
              <span>•</span>
              <span>Flagged: <strong className="text-amber-400 font-mono">{flaggedCount}</strong></span>
            </div>
          </div>
        </div>

        {/* Right: Assessment Timer Controls */}
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${timerWarningClass}`}>
            <Clock className="w-4 h-4 shrink-0" />
            <div className="text-left font-mono">
              <span className="text-xs block font-bold leading-none">
                {formatTime(timeRemaining)}
              </span>
              <span className="text-[9px] uppercase tracking-wider block opacity-75">
                {isTimerRunning ? 'Time Remaining' : 'Timer Paused'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsTimerRunning(prev => !prev)}
            className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
            title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
          >
            {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* 3. Main Grid: Left Side Question Palette, Right Side Active Question */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (4 cols): Question Navigation Palette */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Question Palette</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">
              {activeQuestions.length} Total
            </span>
          </div>

          {/* Palette Filter Pills */}
          <div className="grid grid-cols-4 gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'answered', label: `Ans (${answeredCount})` },
              { id: 'unanswered', label: `Left (${totalQuestions - answeredCount})` },
              { id: 'flagged', label: `Flag (${flaggedCount})` },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setPaletteFilter(f.id as any)}
                className={`py-1 rounded-lg text-[10px] font-medium border text-center transition-all ${
                  paletteFilter === f.id
                    ? 'bg-indigo-600/30 border-indigo-500 text-white'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Question Grid Buttons */}
          <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 max-h-72 overflow-y-auto p-1 scrollbar-none">
            {filteredPaletteIndices.map(({ q, idx }) => {
              const isAnswered = Boolean(answers[q.id]);
              const isFlagged = flaggedIds.has(q.id);
              const isCurrent = idx === currentIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative h-9 rounded-xl text-xs font-mono font-bold flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 shadow-md shadow-indigo-600/25 scale-105'
                      : isAnswered
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                      : isFlagged
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{idx + 1}</span>
                  {isFlagged && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/40 border border-emerald-500/60" />
                Answered
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500/40 border border-amber-500/60" />
                Flagged for Review
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-slate-950 border border-slate-800" />
                Unanswered
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-indigo-600" />
                Current Question
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (8 cols): Question Detail & Options */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Question Header & Action Tools */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="text-xs font-semibold text-slate-300">
                {currentQuestion.categoryLabel}
              </span>
              {getDifficultyBadge(currentQuestion.difficulty, currentQuestion.points)}
            </div>

            {/* Question Quick Tools: Flag & Clear */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleFlagCurrent}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  flaggedIds.has(currentQuestion.id)
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${flaggedIds.has(currentQuestion.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>{flaggedIds.has(currentQuestion.id) ? 'Flagged' : 'Flag'}</span>
              </button>

              {answers[currentQuestion.id] && (
                <button
                  onClick={handleClearCurrentResponse}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-950 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Clear selected option"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Question Prompt */}
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              {currentQuestion.title}
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
              {currentQuestion.question}
            </p>
          </div>

          {/* Code Snippet Box if present */}
          {currentQuestion.codeSnippet && (
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner">
              <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-sky-400" />
                  Code / Schema Reference
                </span>
                <span className="text-[10px] text-slate-500">Syntax Verified</span>
              </div>
              <pre className="p-4 text-xs font-mono text-sky-300 overflow-x-auto leading-relaxed">
                <code>{currentQuestion.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Options Selection */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.id;
              return (
                <label
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/10 ring-1 ring-indigo-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-950'
                  }`}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    checked={isSelected}
                    onChange={() => handleSelectOption(option.id)}
                    className="mt-0.5 h-4 w-4 text-indigo-600 border-slate-700 bg-slate-900 focus:ring-indigo-500"
                  />
                  <span className="text-xs sm:text-sm leading-relaxed">
                    {option.text}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Bottom Step Navigation & Final Submit */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-3">
              {currentIndex < totalQuestions - 1 ? (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/20"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}

              {/* Submit Button always accessible or prominent on last question */}
              <button
                onClick={handlePromptSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-600/25"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'Grading Responses...' : 'Submit Assessment'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* In-app Non-blocking Confirmation Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{confirmDialog.title}</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {confirmDialog.message}
            </p>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/20"
              >
                {confirmDialog.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
