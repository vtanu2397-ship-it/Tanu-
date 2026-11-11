import React, { useState, useEffect } from 'react';
import { 
  AssessmentResult, 
  RoleBenchmark 
} from '../types';
import { 
  ROLE_BENCHMARKS, 
  SKILL_CATEGORIES, 
  calculateSkillMatch 
} from '../data/benchmarks';
import { BRANCH_DEFINITIONS, getBranchForTrack } from '../data/questions';
import { useAuth } from '../context/AuthContext';
import { getStudentAssessments } from '../firebase';
import { SkillProgressionVisualization } from './SkillProgressionVisualization';
import { 
  CheckCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Info, 
  Calculator, 
  ChevronDown, 
  ChevronUp, 
  BarChart3, 
  Database, 
  Code2, 
  TrendingUp, 
  Layers, 
  PieChart, 
  GraduationCap, 
  RefreshCw,
  Target,
  Binary,
  Terminal,
  Network,
  Brain,
  BrainCircuit,
  Cloud,
  ShieldCheck,
  Cpu,
  Zap,
  Activity,
  Sliders,
  Flame,
  Wrench,
  Compass,
  Building,
  MapPin,
  HardHat,
  LineChart,
  Calendar,
  ListTodo,
  Award,
  Clock,
  ArrowUpRight,
  Plus,
  Trash2,
  User,
  Briefcase,
  Radio,
  FileCheck,
  ChevronRight
} from 'lucide-react';

interface DashboardViewProps {
  assessment: AssessmentResult | null;
  onNavigateToAssessment: () => void;
  onNavigateToRoadmap: () => void;
  onNavigateToInterview: () => void;
  onNavigateToCompanies?: (companyId?: string) => void;
  onNavigateToProfile?: () => void;
  onNavigateToCareerIntel?: () => void;
  onNavigateToHistory?: () => void;
  onExplainGap: (gapName: string) => void;
}

interface DashboardTask {
  id: string;
  title: string;
  category: string;
  source: 'gap' | 'roadmap' | 'company' | 'custom';
  estimatedMinutes: number;
  priority: 'Critical' | 'High' | 'Medium';
  completed: boolean;
  completedAt?: string;
  targetSkill?: string;
}

interface DashboardMilestone {
  id: string;
  week: number;
  title: string;
  description: string;
  verifiableCriteria: string;
  completed: boolean;
  completedAt?: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  assessment,
  onNavigateToAssessment,
  onNavigateToRoadmap,
  onNavigateToInterview,
  onNavigateToCompanies,
  onNavigateToProfile,
  onNavigateToCareerIntel,
  onNavigateToHistory,
  onExplainGap
}) => {
  const { profile, user, isDemoMode } = useAuth();

  // Role benchmark selector
  const defaultRoleId = assessment?.roleId || profile?.targetRole || 'cse-sde';
  const [selectedRoleId, setSelectedRoleId] = useState<string>(defaultRoleId);
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);
  const [chartMode, setChartMode] = useState<'radar' | 'bar' | 'progression'>('radar');

  // Past assessments history
  const [recentAssessments, setRecentAssessments] = useState<AssessmentResult[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Active benchmark
  const benchmark: RoleBenchmark = ROLE_BENCHMARKS[selectedRoleId] || ROLE_BENCHMARKS['cse-sde'] || Object.values(ROLE_BENCHMARKS)[0];
  const initialSkillKey = Object.keys(benchmark.skills)[0] || 'programming';
  const [activeEvidenceSkill, setActiveEvidenceSkill] = useState<string>(initialSkillKey);

  // Task & Milestone state (stored in localStorage keyed by user id)
  const storageUserId = user?.uid || profile?.id || 'guest-student';
  const tasksKey = `skillpath_tasks_${storageUserId}`;
  const milestonesKey = `skillpath_milestones_${storageUserId}`;

  const [tasks, setTasks] = useState<DashboardTask[]>([]);
  const [milestones, setMilestones] = useState<DashboardMilestone[]>([]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'Critical' | 'High' | 'Medium'>('High');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Load past assessments from Firestore or local
  useEffect(() => {
    async function loadAssessments() {
      if (user && !isDemoMode) {
        setIsLoadingHistory(true);
        try {
          const list = await getStudentAssessments(user.uid);
          if (list && list.length > 0) {
            setRecentAssessments(list);
          } else {
            const localHist: AssessmentResult[] = JSON.parse(localStorage.getItem('skillpath_assessment_history') || '[]');
            if (assessment && !localHist.some((x) => x.id === assessment.id)) {
              localHist.unshift(assessment);
            }
            setRecentAssessments(localHist.length > 0 ? localHist : (assessment ? [assessment] : []));
          }
        } catch (e) {
          console.warn('Could not load assessment history:', e);
          const localHist: AssessmentResult[] = JSON.parse(localStorage.getItem('skillpath_assessment_history') || '[]');
          setRecentAssessments(localHist.length > 0 ? localHist : (assessment ? [assessment] : []));
        } finally {
          setIsLoadingHistory(false);
        }
      } else {
        try {
          const localHist: AssessmentResult[] = JSON.parse(localStorage.getItem('skillpath_assessment_history') || '[]');
          if (assessment && !localHist.some((x) => x.id === assessment.id)) {
            localHist.unshift(assessment);
          }
          setRecentAssessments(localHist.length > 0 ? localHist : (assessment ? [assessment] : []));
        } catch {
          setRecentAssessments(assessment ? [assessment] : []);
        }
      }
    }
    loadAssessments();
  }, [user, assessment, isDemoMode]);

  // Load / initialize tasks & milestones
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(tasksKey);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        // Initialize dynamic tasks based on assessment gaps or branch defaults
        const initialTasks: DashboardTask[] = [];
        
        if (assessment && assessment.priorityGaps && assessment.priorityGaps.length > 0) {
          assessment.priorityGaps.slice(0, 3).forEach((gap, idx) => {
            initialTasks.push({
              id: `task-gap-${idx}-${Date.now()}`,
              title: `Close Gap: ${gap.skillName} (${gap.studentScore}% -> ${gap.targetScore}%)`,
              category: gap.skill,
              source: 'gap',
              estimatedMinutes: 60,
              priority: gap.importance || 'High',
              completed: false,
              targetSkill: gap.skillName
            });
          });
        } else {
          initialTasks.push(
            {
              id: `task-default-1`,
              title: `Complete Diagnostic Skill Assessment for ${benchmark.title}`,
              category: 'Assessment',
              source: 'gap',
              estimatedMinutes: 20,
              priority: 'Critical',
              completed: !!assessment
            },
            {
              id: `task-default-2`,
              title: `Review Core Fundamentals for ${benchmark.branchName}`,
              category: 'Core Concepts',
              source: 'roadmap',
              estimatedMinutes: 45,
              priority: 'High',
              completed: false
            }
          );
        }

        // Add company prep task
        initialTasks.push({
          id: `task-company-1`,
          title: `Drill Target Company Technical & Coding Questions (TCS / Google / L&T)`,
          category: 'Company Prep',
          source: 'company',
          estimatedMinutes: 45,
          priority: 'High',
          completed: false
        });

        // Add mock interview task
        initialTasks.push({
          id: `task-interview-1`,
          title: `Run AI Mock Technical Interview for ${benchmark.title}`,
          category: 'Mock Interview',
          source: 'roadmap',
          estimatedMinutes: 30,
          priority: 'Medium',
          completed: false
        });

        setTasks(initialTasks);
        localStorage.setItem(tasksKey, JSON.stringify(initialTasks));
      }

      // Initialize milestones
      const storedMilestones = localStorage.getItem(milestonesKey);
      if (storedMilestones) {
        setMilestones(JSON.parse(storedMilestones));
      } else {
        const branchShort = profile?.branch || 'cse';
        let branchMilestones: DashboardMilestone[] = [];

        if (branchShort === 'cse' || branchShort === 'it') {
          branchMilestones = [
            {
              id: 'm1',
              week: 1,
              title: 'DSA Tree & Graph Traversal Fluency',
              description: 'Implement LCA, cycle detection, and topological sorting without IDE auto-complete.',
              verifiableCriteria: '10 Medium problems solved under 25 mins each',
              completed: (assessment?.overallScore || 0) >= 70
            },
            {
              id: 'm2',
              week: 2,
              title: 'DBMS ACID & B+ Tree Index Optimization',
              description: 'Eliminate sequential table scans on multi-table joins using composite indices.',
              verifiableCriteria: 'Execution plan verified via EXPLAIN ANALYZE',
              completed: false
            },
            {
              id: 'm3',
              week: 3,
              title: 'Operating Systems & Concurrency Locks',
              description: 'Resolve deadlocks, race conditions, and simulate virtual memory page replacement.',
              verifiableCriteria: 'Thread-safe queue with mutexes implemented',
              completed: false
            },
            {
              id: 'm4',
              week: 4,
              title: 'Full Placement Mock Interview & Capstone',
              description: 'Complete end-to-end technical simulation and capstone project walkthrough.',
              verifiableCriteria: 'AI Technical interview score >= 75%',
              completed: false
            }
          ];
        } else if (branchShort === 'aiml' || branchShort === 'ds') {
          branchMilestones = [
            {
              id: 'm1',
              week: 1,
              title: 'Vectorized NumPy & Pandas Pipeline',
              description: 'Build zero-loop ETL preprocessing for 100k+ record datasets.',
              verifiableCriteria: 'Data cleaning pipeline benchmarked',
              completed: (assessment?.overallScore || 0) >= 70
            },
            {
              id: 'm2',
              week: 2,
              title: 'Supervised ML Tuning & Cross-Validation',
              description: 'Address class imbalance via SMOTE, calibrate ROC-AUC and precision-recall trade-offs.',
              verifiableCriteria: 'F1-score improvement verified',
              completed: false
            },
            {
              id: 'm3',
              week: 3,
              title: 'Deep Learning & Neural Network Backprop',
              description: 'Implement custom loss functions and gradient descent with Adam optimizer.',
              verifiableCriteria: 'PyTorch/TensorFlow model trained with validation curves',
              completed: false
            },
            {
              id: 'm4',
              week: 4,
              title: 'End-to-End AI Model Deployment',
              description: 'Serve inference endpoint via FastAPI and Docker container.',
              verifiableCriteria: 'REST API response under 100ms verified',
              completed: false
            }
          ];
        } else {
          // General engineering / Core branches
          branchMilestones = [
            {
              id: 'm1',
              week: 1,
              title: 'Core Discipline Fundamentals Verification',
              description: `Master fundamental equations and diagnostic principles for ${benchmark.branchName}.`,
              verifiableCriteria: 'Diagnostic assessment score >= 70%',
              completed: (assessment?.overallScore || 0) >= 65
            },
            {
              id: 'm2',
              week: 2,
              title: 'Discipline Problem Solving & Calculations',
              description: 'Solve real-world industrial and campus recruitment technical design problems.',
              verifiableCriteria: 'Core technical exercise rubric met',
              completed: false
            },
            {
              id: 'm3',
              week: 3,
              title: 'Technical Tools & Simulation Software',
              description: 'Demonstrate domain tools (MATLAB, AutoCAD, SPICE, SolidWorks, or Python).',
              verifiableCriteria: 'Domain simulation verified',
              completed: false
            },
            {
              id: 'm4',
              week: 4,
              title: 'Core Company Technical Interview Readiness',
              description: 'Clear technical viva and domain interview questions with structured STAR answers.',
              verifiableCriteria: 'Core interview evaluation passed',
              completed: false
            }
          ];
        }

        setMilestones(branchMilestones);
        localStorage.setItem(milestonesKey, JSON.stringify(branchMilestones));
      }
    } catch (e) {
      console.warn('Error reading tasks/milestones from localStorage:', e);
    }
  }, [tasksKey, milestonesKey, assessment, benchmark, profile?.branch]);

  // Sync if selected role changes
  useEffect(() => {
    if (!benchmark.skills[activeEvidenceSkill]) {
      setActiveEvidenceSkill(Object.keys(benchmark.skills)[0] || 'programming');
    }
  }, [selectedRoleId]);

  // Dynamic skill match
  const matchResult = assessment && assessment.skillScores
    ? calculateSkillMatch(assessment.skillScores, benchmark)
    : null;

  const currentScore = matchResult ? matchResult.overallScore : (assessment?.overallScore || 0);

  // Task actions
  const toggleTask = (taskId: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          completed: !t.completed,
          completedAt: !t.completed ? new Date().toISOString() : undefined
        };
      }
      return t;
    });
    setTasks(updated);
    try {
      localStorage.setItem(tasksKey, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const deleteTask = (taskId: string) => {
    const updated = tasks.filter(t => t.id !== taskId);
    setTasks(updated);
    try {
      localStorage.setItem(tasksKey, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    const newTask: DashboardTask = {
      id: `task-custom-${Date.now()}`,
      title: newTaskInput.trim(),
      category: 'Self-Study',
      source: 'custom',
      estimatedMinutes: 45,
      priority: newTaskPriority,
      completed: false
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    setNewTaskInput('');
    setIsAddingTask(false);
    try {
      localStorage.setItem(tasksKey, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const toggleMilestone = (milestoneId: string) => {
    const updated = milestones.map(m => {
      if (m.id === milestoneId) {
        return {
          ...m,
          completed: !m.completed,
          completedAt: !m.completed ? new Date().toISOString() : undefined
        };
      }
      return m;
    });
    setMilestones(updated);
    try {
      localStorage.setItem(milestonesKey, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  // Icon mapping helper
  const getCategoryIcon = (catKey: string) => {
    const iconName = SKILL_CATEGORIES[catKey]?.icon;
    switch (iconName) {
      case 'Code2': return Code2;
      case 'Binary': return Binary;
      case 'Database': return Database;
      case 'Terminal': return Terminal;
      case 'Network': return Network;
      case 'FileCode2': return Code2;
      case 'Brain': return Brain;
      case 'BrainCircuit': return BrainCircuit;
      case 'Sparkles': return Sparkles;
      case 'BarChart2': return TrendingUp;
      case 'LineChart': return LineChart;
      case 'Sheet': return Layers;
      case 'PieChart': return PieChart;
      case 'Lightbulb': return Sparkles;
      case 'Cloud': return Cloud;
      case 'ShieldCheck': return ShieldCheck;
      case 'Cpu': return Cpu;
      case 'Layers': return Layers;
      case 'HardDrive': return Cpu;
      case 'Zap': return Zap;
      case 'Activity': return Activity;
      case 'Sliders': return Sliders;
      case 'Flame': return Flame;
      case 'Wrench': return Wrench;
      case 'Compass': return Compass;
      case 'Building': return Building;
      case 'MapPin': return MapPin;
      case 'HardHat': return HardHat;
      default: return BarChart3;
    }
  };

  // Current branch details
  const currentBranchDef = BRANCH_DEFINITIONS.find(b => b.id === (profile?.branch || 'cse')) || BRANCH_DEFINITIONS[0];
  const completedTasksCount = tasks.filter(t => t.completed).length;
  const completedMilestonesCount = milestones.filter(m => m.completed).length;

  // Radar chart calculations
  const benchmarkSkillEntries = Object.entries(benchmark.skills);
  const radarSkillCount = benchmarkSkillEntries.length;
  const radarRadius = 100;
  const radarCenter = 135;

  const studentPolygonPoints = benchmarkSkillEntries.map(([catKey, req], idx) => {
    const studentScore = assessment?.skillScores?.[catKey]?.score || 0;
    const angle = (Math.PI * 2 / radarSkillCount) * idx - Math.PI / 2;
    const r = (Math.min(studentScore, 100) / 100) * radarRadius;
    const x = radarCenter + r * Math.cos(angle);
    const y = radarCenter + r * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const targetPolygonPoints = benchmarkSkillEntries.map(([_, req], idx) => {
    const targetScore = req.targetScore;
    const angle = (Math.PI * 2 / radarSkillCount) * idx - Math.PI / 2;
    const r = (Math.min(targetScore, 100) / 100) * radarRadius;
    const x = radarCenter + r * Math.cos(angle);
    const y = radarCenter + r * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. PERSONALIZED STUDENT PROFILE & BRANCH HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
          
          {/* Student Info */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-indigo-500/25 shrink-0">
              {(profile?.displayName || user?.displayName || 'S').charAt(0).toUpperCase()}
            </div>
            
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {profile?.displayName || user?.displayName || 'Engineering Scholar'}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {profile?.targetGoal === 'internship' ? 'Summer Internship Track' : 'Campus Placement Track'}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-indigo-300 font-medium">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  {currentBranchDef.name} ({currentBranchDef.shortName})
                </span>
                <span>•</span>
                <span>{profile?.university || 'B.Tech Engineering'}</span>
                <span>•</span>
                <span className="font-mono text-slate-300">
                  {profile?.academicYear || '3rd Year (Pre-Final)'} • Class of {profile?.graduationYear || '2026'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Profile Actions & Role Benchmark Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Target Role</span>
                <select
                  value={selectedRoleId}
                  onChange={(e) => setSelectedRoleId(e.target.value)}
                  className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer"
                >
                  {BRANCH_DEFINITIONS.map(branch => (
                    <optgroup key={branch.id} label={branch.name}>
                      {branch.tracks.map(t => {
                        const b = ROLE_BENCHMARKS[t.id];
                        return (
                          <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                            {b?.title || t.title}
                          </option>
                        );
                      })}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {onNavigateToCareerIntel && (
              <button
                onClick={onNavigateToCareerIntel}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                <span>Career Intel Matches</span>
              </button>
            )}

            {onNavigateToProfile && (
              <button
                onClick={onNavigateToProfile}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Profile Settings</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Diagnostic Notice if No Assessment */}
        {!assessment && (
          <div className="mt-6 p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Baseline Assessment Recommended</h4>
                <p className="text-xs text-slate-300">
                  Take the diagnostic test for {currentBranchDef.shortName} to calculate your verified placement readiness score and unlock tailored roadmap milestones.
                </p>
              </div>
            </div>
            <button
              onClick={onNavigateToAssessment}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 shrink-0"
            >
              <span>Start Diagnostic Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 2. CORE READINESS STATS & INTERACTIVE VISUALIZATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Placement Readiness Score Gauge Card */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4 text-indigo-400" />
                Placement Readiness
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300">
                {benchmark.title}
              </span>
            </div>

            {/* Circular Gauge Graphic */}
            <div className="mt-6 flex flex-col items-center justify-center relative">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-slate-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  {/* Target Benchmark Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-slate-700/60"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 40 * 0.75} ${2 * Math.PI * 40 * 0.25}`}
                    fill="transparent"
                  />
                  {/* Dynamic Student Score Progress Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className={`${
                      currentScore >= 75
                        ? 'stroke-emerald-400'
                        : currentScore >= 50
                        ? 'stroke-indigo-500'
                        : 'stroke-amber-400'
                    } transition-all duration-1000 ease-out`}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - (currentScore || 0) / 100)}
                    fill="transparent"
                  />
                </svg>

                {/* Score Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-black text-white tracking-tight">
                    {currentScore}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {assessment ? 'Verified Match' : 'Estimated Target'}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4 text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  currentScore >= 75
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : currentScore >= 50
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {currentScore >= 75 
                    ? 'Placement Ready Foundation' 
                    : currentScore >= 50 
                    ? 'Developing (Targeted Gaps)' 
                    : assessment 
                    ? 'Early Technical Foundation' 
                    : 'Awaiting Diagnostic'}
                </span>
                <p className="text-xs text-slate-400 mt-2">
                  Target threshold for {benchmark.title} is ~75% across core rubrics.
                </p>
              </div>
            </div>
          </div>

          {/* Formula Link */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => setShowFormulaDetails(!showFormulaDetails)}
              className="w-full flex items-center justify-between text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                {showFormulaDetails ? 'Hide Mathematical Proof' : 'View Transparent Calculation Formula'}
              </span>
              {showFormulaDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Technical Skills Progress & Interactive Chart Card */}
        <div className="lg:col-span-2 rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-400" />
                  <span>Technical Skills Diagnostic Matrix</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Assessed levels across required competencies for {benchmark.title}.
                </p>
              </div>

              {/* Chart Mode Toggle */}
              <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setChartMode('radar')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    chartMode === 'radar'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Radar Matrix
                </button>
                <button
                  onClick={() => setChartMode('bar')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    chartMode === 'bar'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Bar Comparison
                </button>
                <button
                  onClick={() => setChartMode('progression')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    chartMode === 'progression'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Progression Over Time</span>
                </button>
              </div>
            </div>

            {/* Interactive Chart Canvas */}
            <div className="mt-4">
              {chartMode === 'radar' ? (
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-2">
                  {/* SVG Spider Radar */}
                  <div className="relative shrink-0">
                    <svg width="270" height="270" className="overflow-visible">
                      {/* Web concentric rings: 25%, 50%, 75%, 100% */}
                      {[0.25, 0.5, 0.75, 1.0].map((level, ringIdx) => (
                        <circle
                          key={ringIdx}
                          cx={radarCenter}
                          cy={radarCenter}
                          r={radarRadius * level}
                          fill="none"
                          className="stroke-slate-800/80"
                          strokeDasharray={level < 1.0 ? '2 3' : 'none'}
                          strokeWidth="1"
                        />
                      ))}

                      {/* Web axis spokes */}
                      {benchmarkSkillEntries.map((_, idx) => {
                        const angle = (Math.PI * 2 / radarSkillCount) * idx - Math.PI / 2;
                        const x = radarCenter + radarRadius * Math.cos(angle);
                        const y = radarCenter + radarRadius * Math.sin(angle);
                        return (
                          <line
                            key={idx}
                            x1={radarCenter}
                            y1={radarCenter}
                            x2={x}
                            y2={y}
                            className="stroke-slate-800"
                            strokeWidth="1"
                          />
                        );
                      })}

                      {/* Target benchmark polygon */}
                      <polygon
                        points={targetPolygonPoints}
                        fill="rgba(100, 116, 139, 0.15)"
                        className="stroke-slate-400"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />

                      {/* Student score polygon */}
                      <polygon
                        points={studentPolygonPoints}
                        fill="rgba(99, 102, 241, 0.3)"
                        className="stroke-indigo-400"
                        strokeWidth="2"
                      />

                      {/* Data vertex dots */}
                      {benchmarkSkillEntries.map(([catKey, req], idx) => {
                        const studentScore = assessment?.skillScores?.[catKey]?.score || 0;
                        const angle = (Math.PI * 2 / radarSkillCount) * idx - Math.PI / 2;
                        const r = (Math.min(studentScore, 100) / 100) * radarRadius;
                        const x = radarCenter + r * Math.cos(angle);
                        const y = radarCenter + r * Math.sin(angle);
                        const isSelected = activeEvidenceSkill === catKey;

                        return (
                          <g key={idx} className="cursor-pointer" onClick={() => setActiveEvidenceSkill(catKey)}>
                            <circle
                              cx={x}
                              cy={y}
                              r={isSelected ? 6 : 4}
                              className={`${
                                studentScore >= req.targetScore 
                                  ? 'fill-emerald-400 stroke-slate-900' 
                                  : 'fill-indigo-400 stroke-slate-900'
                              } transition-all`}
                              strokeWidth="2"
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Competency labels & quick details */}
                  <div className="flex-1 space-y-2 w-full">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Competency Breakdown
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {benchmarkSkillEntries.map(([catKey, req]) => {
                        const student = assessment?.skillScores?.[catKey] || { score: 0, level: 'Novice' };
                        const isSatisfied = student.score >= req.targetScore;
                        const isSelected = activeEvidenceSkill === catKey;
                        const meta = SKILL_CATEGORIES[catKey] || { name: catKey };

                        return (
                          <div
                            key={catKey}
                            onClick={() => setActiveEvidenceSkill(catKey)}
                            className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-indigo-950/40 border-indigo-500 text-white'
                                : 'bg-slate-950/50 border-slate-800/80 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between font-semibold">
                              <span className="truncate">{meta.name}</span>
                              <span className={isSatisfied ? 'text-emerald-400' : 'text-amber-400'}>
                                {student.score}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                              <span>Target: {req.targetScore}%</span>
                              <span className={`px-1.5 py-0.2 rounded font-mono ${
                                isSatisfied ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                              }`}>
                                {isSatisfied ? 'Met' : `Gap: -${req.targetScore - student.score}%`}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : chartMode === 'bar' ? (
                /* Bar Comparison View */
                <div className="space-y-3.5 py-2">
                  {benchmarkSkillEntries.map(([catKey, req]) => {
                    const student = assessment?.skillScores?.[catKey] || { score: 0, level: 'Novice' };
                    const isSatisfied = student.score >= req.targetScore;
                    const meta = SKILL_CATEGORIES[catKey] || { name: catKey };

                    return (
                      <div 
                        key={catKey}
                        onClick={() => setActiveEvidenceSkill(catKey)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          activeEvidenceSkill === catKey
                            ? 'bg-slate-950 border-indigo-500 ring-1 ring-indigo-500/30'
                            : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-white">{meta.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 text-[11px]">
                              You: <strong className="text-indigo-400">{student.score}%</strong> / Target: <strong>{req.targetScore}%</strong>
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isSatisfied ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                            }`}>
                              {isSatisfied ? 'Ready' : `Gap: -${req.targetScore - student.score}%`}
                            </span>
                          </div>
                        </div>

                        {/* Comparative Bar */}
                        <div className="relative h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="absolute top-0 bottom-0 w-1 bg-slate-400 z-10"
                            style={{ left: `${req.targetScore}%` }}
                            title={`Target: ${req.targetScore}%`}
                          />
                          <div 
                            className={`h-full rounded-full transition-all duration-700 ${
                              isSatisfied ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-indigo-500 to-amber-500'
                            }`}
                            style={{ width: `${student.score}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Progression Timeline View */
                <div className="py-2">
                  <SkillProgressionVisualization
                    assessments={recentAssessments}
                    variant="compact"
                    onRetakeAssessment={onNavigateToAssessment}
                    onSelectAssessment={(a) => {
                      if (onNavigateToHistory) onNavigateToHistory();
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Footer */}
          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Student Score
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400 ml-2" /> Target Benchmark
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={onNavigateToRoadmap}
                className="px-3.5 py-1.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Roadmap</span>
              </button>
              <button
                onClick={onNavigateToAssessment}
                className="px-3 py-1.5 rounded-xl font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Test</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TRANSPARENT FORMULA BREAKDOWN (COLLAPSIBLE) */}
      {showFormulaDetails && matchResult && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-indigo-500/30 shadow-2xl transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">
                Skill-Match Mathematical Formula & Transparent Proof
              </h3>
            </div>
            <span className="text-xs font-mono text-indigo-300">
              Match = Σ [ Weight × Min(1.0, StudentScore / TargetScore) ]
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            SkillPath AI calculates readiness using bounded weighted ratios. Each competency contributes proportional points up to its benchmark target without unverified score inflation.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="py-2 pr-4">Skill Category</th>
                  <th className="py-2 px-4">Role Weight</th>
                  <th className="py-2 px-4">Student Score</th>
                  <th className="py-2 px-4">Target Score</th>
                  <th className="py-2 px-4">Achievement Ratio</th>
                  <th className="py-2 pl-4 text-right">Points Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {matchResult.steps.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="py-2.5 pr-4 text-slate-200 font-sans font-medium">{s.skill}</td>
                    <td className="py-2.5 px-4 text-slate-400">{s.weight}%</td>
                    <td className="py-2.5 px-4 text-indigo-300">{s.studentScore}%</td>
                    <td className="py-2.5 px-4 text-slate-400">{s.targetScore}%</td>
                    <td className="py-2.5 px-4 text-slate-300">{s.ratio}%</td>
                    <td className="py-2.5 pl-4 text-right font-bold text-white">+{s.contribution} pts</td>
                  </tr>
                ))}
                <tr className="bg-indigo-950/20 font-bold border-t border-indigo-500/30">
                  <td colSpan={5} className="py-3 pr-4 text-indigo-300 font-sans">
                    Total Weighted Skill-Match Score:
                  </td>
                  <td className="py-3 pl-4 text-right text-indigo-300 text-sm">
                    {matchResult.overallScore}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. UPCOMING LEARNING TASKS & COMPLETED MILESTONES (SIDE BY SIDE) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Upcoming Learning Tasks Card */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ListTodo className="w-5 h-5 text-indigo-400" />
                  <span>Upcoming Learning Tasks</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Actionable sprints prioritized from your verified gaps and branch track.
                </p>
              </div>

              <button
                onClick={() => setIsAddingTask(!isAddingTask)}
                className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors"
                title="Add Custom Task"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Add Task Form */}
            {isAddingTask && (
              <form onSubmit={handleAddTask} className="mt-4 p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <input
                  type="text"
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  placeholder="e.g., Practice 5 Sliding Window problems on LeetCode..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Priority:</span>
                    <select
                      value={newTaskPriority}
                      onChange={(e: any) => setNewTaskPriority(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1"
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingTask(false)}
                      className="px-2.5 py-1 text-slate-400 hover:text-white text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg transition-colors"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Tasks List */}
            <div className="mt-4 space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      task.completed
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                          task.completed
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                            : 'border-slate-700 hover:border-indigo-500 text-transparent'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <div className="min-w-0">
                        <span className={`text-xs font-medium block leading-snug ${
                          task.completed ? 'line-through text-slate-400' : 'text-slate-200'
                        }`}>
                          {task.title}
                        </span>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px]">
                          <span className={`px-2 py-0.5 rounded-full font-bold ${
                            task.priority === 'Critical'
                              ? 'bg-rose-500/20 text-rose-300'
                              : task.priority === 'High'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-indigo-500/20 text-indigo-300'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-slate-500 font-mono">~{task.estimatedMinutes}m</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 truncate">{task.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {task.targetSkill && (
                        <button
                          onClick={() => onExplainGap(task.targetSkill!)}
                          className="p-1 text-slate-400 hover:text-indigo-400 transition-colors"
                          title="Explain Gap"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete Task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 text-center py-6">All tasks completed! Click + to add new focus topics.</p>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>{completedTasksCount} of {tasks.length} tasks completed</span>
            <button
              onClick={onNavigateToRoadmap}
              className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>View Full 4-Week Sprints</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Completed Learning Milestones Card */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span>Learning Milestones Progress</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verifiable technical achievements aligned with campus recruitment standards.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {completedMilestonesCount} / {milestones.length}
                </span>
                <span className="text-[10px] text-slate-500 block">Milestones</span>
              </div>
            </div>

            {/* Overall Milestones Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                <span>Placement Milestone Velocity</span>
                <span className="font-mono text-emerald-400">
                  {milestones.length > 0 ? Math.round((completedMilestonesCount / milestones.length) * 100) : 0}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-700"
                  style={{
                    width: `${milestones.length > 0 ? (completedMilestonesCount / milestones.length) * 100 : 0}%`
                  }}
                />
              </div>
            </div>

            {/* Milestones List */}
            <div className="mt-4 space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {milestones.map((m) => (
                <div
                  key={m.id}
                  onClick={() => toggleMilestone(m.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    m.completed
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                        m.completed
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                          : 'border-slate-700 text-transparent'
                      }`}>
                        <CheckCircle className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-800 text-indigo-300">
                            W{m.week}
                          </span>
                          <h4 className={`text-xs font-bold ${m.completed ? 'text-emerald-200' : 'text-white'}`}>
                            {m.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          {m.description}
                        </p>
                        <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1.5">
                          <FileCheck className="w-3 h-3 text-indigo-400" />
                          <span>Proof: {m.verifiableCriteria}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      m.completed
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {m.completed ? 'Achieved' : 'In Progress'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Click any milestone to toggle verification</span>
            <span className="text-emerald-400 font-medium">Verifiable in AI Mock Interview</span>
          </div>
        </div>
      </div>

      {/* 5. RECENT ASSESSMENT RESULTS & EVIDENCE EXPLORER */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Recent Assessment Results & Evidence Logs</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified proof generated directly from your diagnostic answers for {benchmark.title}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Inspecting Competency:</span>
            <select
              value={activeEvidenceSkill}
              onChange={(e) => setActiveEvidenceSkill(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none"
            >
              {Object.keys(benchmark.skills).map((k) => (
                <option key={k} value={k}>
                  {SKILL_CATEGORIES[k]?.name || k.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Evidence Cards */}
        <div className="space-y-4">
          {assessment && assessment.skillScores?.[activeEvidenceSkill]?.evidence?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {assessment.skillScores[activeEvidenceSkill].evidence.map((ev, idx) => {
                const isPositive = ev.startsWith('Correctly');
                return (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-2xl border text-xs flex items-start gap-3 ${
                      isPositive 
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' 
                        : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                    }`}
                  >
                    <span className="font-bold text-base mt-0.5">{isPositive ? '✓' : '⚠️'}</span>
                    <div>
                      <span className="leading-relaxed block">{ev}</span>
                      <span className="text-[10px] opacity-75 font-mono block mt-1">
                        Category: {SKILL_CATEGORIES[activeEvidenceSkill]?.name || activeEvidenceSkill}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 text-center text-xs text-slate-400">
              <Info className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
              <p>No specific question evidence logged for this competency yet.</p>
              <button
                onClick={onNavigateToAssessment}
                className="mt-3 px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition-colors"
              >
                Run Diagnostic for this Track
              </button>
            </div>
          )}
        </div>

        {/* Recent Assessment Sessions History Mini-Table */}
        {recentAssessments.length > 0 && (
          <div className="pt-4 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Assessment History Log ({recentAssessments.length} Recorded Sessions)
              </h4>
              <button
                onClick={() => {
                  if (onNavigateToHistory) {
                    onNavigateToHistory();
                  } else {
                    setChartMode('progression');
                    window.scrollTo({ top: 700, behavior: 'smooth' });
                  }
                }}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                <span>View Full Skill Progression Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {recentAssessments.slice(0, 3).map((a, i) => (
                <div 
                  key={a.id || i} 
                  onClick={() => {
                    setChartMode('progression');
                    window.scrollTo({ top: 700, behavior: 'smooth' });
                  }}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer text-xs group"
                >
                  <div className="flex items-center justify-between font-semibold mb-1">
                    <span className="text-white truncate group-hover:text-indigo-300 transition-colors">{a.roleTitle}</span>
                    <span className="text-indigo-400 font-mono font-bold">{a.overallScore}%</span>
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center justify-between">
                    <span>{new Date(a.completedAt || a.createdAt).toLocaleDateString()}</span>
                    <span className="text-emerald-400">{a.strengths?.length || 0} Strengths</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 6. RECOMMENDED NEXT STEPS (SMART ACTION ENGINE) */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Recommended Next Steps For Placement Success</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Personalized action items derived from your current readiness benchmark and engineering discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Action 1: Close Highest Priority Gap */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Priority #1 Gap
              </span>
              <h4 className="text-sm font-bold text-white mb-1.5">
                {matchResult?.priorityGaps[0]?.skillName || 'Strengthen Algorithms'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {matchResult?.priorityGaps[0]?.recommendation || 'Consult the AI mentor for structured conceptual analogies and 3-day sprints.'}
              </p>
            </div>
            <button
              onClick={() => onExplainGap(matchResult?.priorityGaps[0]?.skillName || 'Data Structures')}
              className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
            >
              <span>Explain With AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 2: Practice Target Companies */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block mb-1">
                Recruitment Drills
              </span>
              <h4 className="text-sm font-bold text-white mb-1.5">
                Target Company Prep
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Practice specific aptitude, DSA, and technical rounds for Google, TCS, Microsoft, Infosys, and L&T GET.
              </p>
            </div>
            {onNavigateToCompanies ? (
              <button
                onClick={() => onNavigateToCompanies('tcs')}
                className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-sky-600/20"
              >
                <span>Drill Company Tests</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>

          {/* Action 3: AI Mock Interview */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                Live Simulation
              </span>
              <h4 className="text-sm font-bold text-white mb-1.5">
                AI Mock Interview
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Experience role-specific technical questioning and instant coaching on real-world scenarios.
              </p>
            </div>
            <button
              onClick={onNavigateToInterview}
              className="mt-4 w-full py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Launch Interview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 4: Personalized 4-Week Sprints */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
                Structured Path
              </span>
              <h4 className="text-sm font-bold text-white mb-1.5">
                4-Week AI Roadmap
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Step-by-step curriculum with hands-on capstone portfolio projects targeting your exact branch.
              </p>
            </div>
            <button
              onClick={onNavigateToRoadmap}
              className="mt-4 w-full py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
