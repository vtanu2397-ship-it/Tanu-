import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  AssessmentResult, 
  RoadmapPlan, 
  RoleBenchmark, 
  WeeklyPlanItem 
} from '../types';
import { ROLE_BENCHMARKS } from '../data/benchmarks';
import { generatePersonalizedFallbackRoadmap } from '../data/fallbackRoadmaps';
import { useAuth } from '../context/AuthContext';
import { saveStudentRoadmap, getStudentRoadmaps } from '../firebase';
import { 
  Map, 
  Sparkles, 
  Calendar, 
  FolderGit2, 
  Lightbulb, 
  CheckCircle, 
  CheckCircle2,
  Clock, 
  ArrowRight, 
  Download, 
  RefreshCw, 
  BookOpen, 
  ShieldCheck,
  AlertCircle,
  Zap,
  X,
  Target,
  GraduationCap,
  Award,
  TrendingUp,
  CheckSquare,
  Square,
  Code2,
  Layers,
  ChevronRight,
  Flame,
  Check
} from 'lucide-react';

interface RoadmapViewProps {
  assessment: AssessmentResult | null;
  onNavigateToAssessment: () => void;
  onNavigateToInterview: () => void;
  initialGapToExplain?: string | null;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  assessment,
  onNavigateToAssessment,
  onNavigateToInterview,
  initialGapToExplain
}) => {
  const { profile, user, isDemoMode } = useAuth();
  const [roadmap, setRoadmap] = useState<RoadmapPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'plan' | 'projects' | 'gaps'>('plan');
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<'all' | '30-day' | '60-day' | '90-day'>('all');

  const roleKey = assessment?.roleId || profile?.targetRole || 'cse-sde';
  const benchmark: RoleBenchmark = ROLE_BENCHMARKS[roleKey] || Object.values(ROLE_BENCHMARKS)[0];
  const cacheKey = assessment ? `skillpath_roadmap_90d_${assessment.id}_${roleKey}` : null;
  const progressStorageKey = `skillpath_roadmap_progress_${assessment?.id || roleKey}`;

  // Interactive Task Completion Tracker
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(progressStorageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading saved roadmap progress:', e);
    }
    return [];
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const isRequestingRef = useRef<boolean>(false);

  // Timer counter for loading feedback (max 20s safety limit)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isLoading) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  // Clean up any in-flight request when unmounting
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Check cache (sessionStorage or Firestore) or trigger auto-generation
  useEffect(() => {
    async function loadRoadmap() {
      if (!assessment) return;

      // 1. Check local session cache first to eliminate repeated network calls
      if (cacheKey) {
        try {
          const cached = sessionStorage.getItem(cacheKey);
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed && parsed.weeklyPlan && parsed.weeklyPlan.length > 0) {
              setRoadmap(parsed);
              setIsLoading(false);
              return;
            }
          }
        } catch (e) {
          console.warn('Session cache read error:', e);
        }
      }

      // 2. If authenticated, check Firestore for stored roadmap
      if (user && !isDemoMode) {
        try {
          const savedList = await getStudentRoadmaps(user.uid);
          if (savedList && savedList.length > 0) {
            const matching = savedList.find(
              (r) => r.assessmentId === assessment.id || r.roleId === roleKey
            ) || savedList[0];

            if (matching && matching.weeklyPlan && matching.weeklyPlan.length > 0) {
              setRoadmap(matching);
              if (matching.completedTaskIds && matching.completedTaskIds.length > 0) {
                setCompletedTaskIds(matching.completedTaskIds);
              }
              if (cacheKey) {
                sessionStorage.setItem(cacheKey, JSON.stringify(matching));
              }
              setIsLoading(false);
              return;
            }
          }
        } catch (err) {
          console.warn('Could not fetch saved roadmaps from Firestore:', err);
        }
      }

      // 3. If no cached roadmap exists, generate one
      generateRoadmap(false);
    }

    loadRoadmap();
  }, [assessment?.id, roleKey]);

  const generateRoadmap = async (forceRefresh = false) => {
    if (!assessment) return;
    if (isRequestingRef.current) return;

    // Check cache if not forcing refresh
    if (!forceRefresh && cacheKey) {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          setRoadmap(JSON.parse(cached));
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.warn('Cache error:', e);
      }
    }

    isRequestingRef.current = true;
    setIsLoading(true);
    setError(null);
    setElapsedSeconds(0);

    // Setup strict 20-second client timeout
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 20000);

    try {
      const response = await fetch('/api/ai/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentProfile: profile,
          assessmentResult: assessment,
          roleBenchmark: benchmark
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data: RoadmapPlan = await response.json();
      setRoadmap(data);

      // Cache in sessionStorage for instant return visits
      if (cacheKey) {
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(data));
        } catch (e) {
          console.warn('Session cache write error:', e);
        }
      }

      // Save to Firestore if authenticated
      if (user && !isDemoMode) {
        await saveStudentRoadmap(user.uid, data);
      }

      if ((data as any)._meta?.isFallback) {
        setError(
          (data as any)._meta.notice ||
          'AI generation reached threshold. Instantly loaded your personalized 90-day diagnostic study plan.'
        );
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn('Error in roadmap generation:', err?.message || err);

      const isTimeout =
        err?.name === 'AbortError' ||
        err?.message?.includes('timeout') ||
        err?.message?.includes('aborted');

      setError(
        isTimeout
          ? 'AI generation reached the 20-second safety limit. Instantly loaded your verified 90-day placement roadmap.'
          : 'Could not connect to AI service. Instantly loaded your verified 90-day diagnostic roadmap.'
      );

      // Instantly generate and display personalized fallback based on actual student scores & branch
      const fallback = generatePersonalizedFallbackRoadmap(assessment, benchmark, profile);
      setRoadmap(fallback);

      if (cacheKey) {
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(fallback));
        } catch (e) {
          console.warn('Cache write error:', e);
        }
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
      isRequestingRef.current = false;
      abortControllerRef.current = null;
    }
  };

  const handleSkipToFastPlan = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsLoading(false);
    isRequestingRef.current = false;
    setError('Loaded instant diagnostic 30/60/90-day curriculum based on your verified assessment scores.');
    const fallback = generatePersonalizedFallbackRoadmap(assessment, benchmark, profile);
    setRoadmap(fallback);
    if (cacheKey) {
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(fallback));
      } catch (e) {
        console.warn('Cache error:', e);
      }
    }
  };

  // Toggle individual task completion
  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTaskIds((prev) => {
      const next = prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId];

      try {
        localStorage.setItem(progressStorageKey, JSON.stringify(next));
      } catch (e) {
        console.warn('Error saving roadmap task progress:', e);
      }

      if (user && !isDemoMode && roadmap) {
        saveStudentRoadmap(user.uid, { ...roadmap, completedTaskIds: next }).catch(console.warn);
      }

      return next;
    });
  };

  // Compile list of all tasks across all weeks for progress calculation
  const allTasksList = useMemo(() => {
    if (!roadmap?.weeklyPlan) return [];
    const list: { id: string; phase: '30-day' | '60-day' | '90-day'; type: string; title: string }[] = [];
    
    roadmap.weeklyPlan.forEach((week) => {
      const phase = week.phase || (week.weekNumber <= 4 ? '30-day' : week.weekNumber <= 8 ? '60-day' : '90-day');

      // Objectives (Learning Topics)
      week.objectives?.forEach((obj, i) => {
        list.push({ id: `w${week.weekNumber}-obj-${i}`, phase, type: 'topic', title: obj });
      });

      // Hands-On Tasks (Practical Assignments)
      week.handsOnTasks?.forEach((task, i) => {
        list.push({ id: `w${week.weekNumber}-task-${i}`, phase, type: 'practical', title: task });
      });

      // Revision Tasks
      week.revisionTasks?.forEach((rev, i) => {
        list.push({ id: `w${week.weekNumber}-rev-${i}`, phase, type: 'revision', title: rev });
      });

      // Weekly Milestone
      if (week.learningMilestone) {
        list.push({ id: `w${week.weekNumber}-milestone`, phase, type: 'milestone', title: week.learningMilestone });
      }
    });

    return list;
  }, [roadmap]);

  // Task Progress Calculations
  const totalTasks = allTasksList.length;
  const completedCount = allTasksList.filter((t) => completedTaskIds.includes(t.id)).length;
  const overallProgressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  // Phase-specific counts
  const phase30Tasks = allTasksList.filter((t) => t.phase === '30-day');
  const phase30Done = phase30Tasks.filter((t) => completedTaskIds.includes(t.id)).length;
  const phase30Percent = phase30Tasks.length > 0 ? Math.round((phase30Done / phase30Tasks.length) * 100) : 0;

  const phase60Tasks = allTasksList.filter((t) => t.phase === '60-day');
  const phase60Done = phase60Tasks.filter((t) => completedTaskIds.includes(t.id)).length;
  const phase60Percent = phase60Tasks.length > 0 ? Math.round((phase60Done / phase60Tasks.length) * 100) : 0;

  const phase90Tasks = allTasksList.filter((t) => t.phase === '90-day');
  const phase90Done = phase90Tasks.filter((t) => completedTaskIds.includes(t.id)).length;
  const phase90Percent = phase90Tasks.length > 0 ? Math.round((phase90Done / phase90Tasks.length) * 100) : 0;

  // Filtered weeks based on selected phase pill
  const filteredWeeks: WeeklyPlanItem[] = useMemo(() => {
    if (!roadmap?.weeklyPlan) return [];
    if (selectedPhaseFilter === 'all') return roadmap.weeklyPlan;
    return roadmap.weeklyPlan.filter((w) => {
      const phase = w.phase || (w.weekNumber <= 4 ? '30-day' : w.weekNumber <= 8 ? '60-day' : '90-day');
      return phase === selectedPhaseFilter;
    });
  }, [roadmap, selectedPhaseFilter]);

  const handleDownloadPlan = () => {
    if (!roadmap) return;
    const textData = JSON.stringify(
      {
        ...roadmap,
        completedTaskIds,
        progress: {
          totalTasks,
          completedCount,
          overallProgressPercent,
          phase30Percent,
          phase60Percent,
          phase90Percent
        }
      },
      null,
      2
    );
    const blob = new Blob([textData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillPath_90Day_Roadmap_${assessment?.roleId || 'Placement'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!assessment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
          <Map className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Diagnostic Assessment Required</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            The AI Roadmap dynamically synthesizes your personalized 30, 60, and 90-day placement preparation plan from your verified engineering scores and skill gaps. Take the diagnostic assessment first.
          </p>
          <button
            onClick={onNavigateToAssessment}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span>Launch Skill Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const existingSkills = roadmap?.existingSkills || assessment.strengths || ['Core Programming', 'Domain Foundations'];
  const identifiedGaps = roadmap?.identifiedGaps || (assessment.priorityGaps || []).map((g: any) => typeof g === 'string' ? g : g.skillName || g.skill);
  const studentScore = roadmap?.studentScore ?? assessment.overallScore ?? 72;
  const branchDisplayName = roadmap?.branchName || benchmark.branchName || profile?.branch?.toUpperCase() || 'Engineering';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>30 / 60 / 90-Day Placement Trajectory</span>
            </span>
            <span className="text-xs text-slate-400 font-mono bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span>{branchDisplayName}</span>
            </span>
            <span className="text-xs text-slate-400 font-mono bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
              Target: <strong className="text-white">{benchmark.title}</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Personalized Placement Preparation Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Multi-phase placement roadmap tailored to your branch ({branchDisplayName}), target career role ({benchmark.title}), verified assessment performance ({studentScore}%), existing technical skills, and identified skill gaps.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => generateRoadmap(true)}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? `Synthesizing (${elapsedSeconds}s)...` : 'Regenerate Plan'}</span>
          </button>
          {roadmap && (
            <button
              onClick={handleDownloadPlan}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Loading State Guardian (Never hangs indefinitely) */}
      {isLoading && (
        <div className="p-10 text-center rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 animate-in fade-in duration-150">
          <div className="relative w-14 h-14 mx-auto">
            <div className="w-14 h-14 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold text-indigo-300">
              {elapsedSeconds}s
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>Synthesizing Personalized 30, 60 & 90-Day Roadmap...</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto leading-relaxed">
              Analyzing verified performance ({studentScore}%) for {benchmark.title} in {branchDisplayName}. Structuring weekly milestones, practical assignments, project recommendations, and revision tasks. (Max 20s timeout guard).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              1. Assessment Scores Grounded
            </span>
            <span className="px-2.5 py-1 rounded-full bg-indigo-950/80 text-indigo-200 border border-indigo-500/30 font-mono flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              2. 30/60/90-Day Milestones
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-800/60 text-slate-400 font-mono">
              3. Max 20s Safety Guard
            </span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSkipToFastPlan}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 transition-all shadow-sm cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Skip waiting & view Instant Diagnostic Plan</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Error / Timeout Notice Banner */}
      {error && !isLoading && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start justify-between gap-3 shadow-md animate-in fade-in duration-150">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-100">Roadmap Diagnostic Notice</p>
              <p className="text-amber-200/90 mt-0.5 leading-relaxed">{error}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => generateRoadmap(true)}
              className="text-[11px] font-semibold text-amber-300 hover:text-amber-100 underline transition-colors cursor-pointer"
            >
              Retry AI
            </button>
            <button
              onClick={() => setError(null)}
              className="p-1 text-amber-400 hover:text-amber-200 rounded-md hover:bg-amber-500/20 transition-colors cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Main Roadmap Content */}
      {roadmap && !isLoading && (
        <>
          {/* Section A: Student Diagnostic Profile & Placement Horizon */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Card (7 cols): Diagnostic Inputs & Strategy Summary */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-indigo-400" />
                    <span>Verified Placement Profile Baseline</span>
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    <span>Diagnostic Score: {studentScore}%</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {roadmap.overview}
                </p>

                {/* Existing Technical Skills vs Identified Gaps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" />
                      Existing Technical Skills ({existingSkills.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {existingSkills.slice(0, 4).map((sk: string, i: number) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-rose-400" />
                      Priority Skill Gaps ({identifiedGaps.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {identifiedGaps.slice(0, 4).map((gap: string, i: number) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 font-medium">
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Integrity Tag */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  Grounded in university engineering curricula and campus recruitment interview rubrics.
                </span>
              </div>
            </div>

            {/* Right Card (5 cols): Overall Preparation Progress Tracker */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-slate-800 p-6 shadow-xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Curriculum Progress Tracker</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {completedCount} / {totalTasks} Tasks ({overallProgressPercent}%)
                  </span>
                </div>

                {/* Main Progress Bar */}
                <div className="mt-4 space-y-2">
                  <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${overallProgressPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Check off learning topics, practical assignments, and revision tasks below to record your verified preparation progress.
                  </p>
                </div>

                {/* Phase-wise Breakdown Progress Badges */}
                <div className="grid grid-cols-3 gap-2 pt-4">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                    <span className="text-[10px] font-bold uppercase text-amber-400 block mb-0.5">
                      30-Day
                    </span>
                    <span className="text-sm font-mono font-bold text-white block">
                      {phase30Percent}%
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">
                      {phase30Done}/{phase30Tasks.length} Done
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                    <span className="text-[10px] font-bold uppercase text-indigo-400 block mb-0.5">
                      60-Day
                    </span>
                    <span className="text-sm font-mono font-bold text-white block">
                      {phase60Percent}%
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">
                      {phase60Done}/{phase60Tasks.length} Done
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                    <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-0.5">
                      90-Day
                    </span>
                    <span className="text-sm font-mono font-bold text-white block">
                      {phase90Percent}%
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">
                      {phase90Done}/{phase90Tasks.length} Done
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Task progress saved automatically</span>
                <span className="text-indigo-400 font-medium">Verifiable in Mock Drills</span>
              </div>
            </div>
          </div>

          {/* Section B: 30 / 60 / 90-Day Strategic Milestone Goals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 30-Day Sprint Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-lg space-y-2 relative overflow-hidden group hover:border-amber-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Phase 1: 30-Day Sprint
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">Weeks 1–4</span>
              </div>
              <h4 className="text-sm font-bold text-white">Foundation & Priority Gap Elimination</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {roadmap.thirtyDayGoal || "Master core domain equations, foundational data structures, and eliminate highest priority assessment gaps."}
              </p>
            </div>

            {/* 60-Day Mid-Term Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/30 shadow-lg space-y-2 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Phase 2: 60-Day Mid-Term
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">Weeks 5–8</span>
              </div>
              <h4 className="text-sm font-bold text-white">Advanced Systems & Capstone Execution</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {roadmap.sixtyDayGoal || "Design scalable intermediate systems, toolchains, and construct a full-featured capstone project on GitHub."}
              </p>
            </div>

            {/* 90-Day Placement Ready Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-lg space-y-2 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Phase 3: 90-Day Placement Ready
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">Weeks 9–12</span>
              </div>
              <h4 className="text-sm font-bold text-white">Recruitment Drills & Final Revision</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {roadmap.ninetyDayGoal || "Execute timed company-specific tests, architectural whiteboard defense, and comprehensive multi-week revision."}
              </p>
            </div>
          </div>

          {/* Section C: Sub-Navigation Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('plan')}
                className={`pb-2 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'plan'
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>30 / 60 / 90-Day Action Curriculum</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`pb-2 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'projects'
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FolderGit2 className="w-4 h-4 text-emerald-400" />
                <span>Portfolio Projects ({(roadmap.portfolioProjects || []).length})</span>
              </button>

              <button
                onClick={() => setActiveTab('gaps')}
                className={`pb-2 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'gaps'
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Skill Gap Explanations ({(roadmap.gapExplanations || []).length})</span>
              </button>
            </div>

            {/* Phase Filter Quick Selector (when activeTab === 'plan') */}
            {activeTab === 'plan' && (
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
                <span className="text-[11px] text-slate-500 font-medium mr-1 hidden sm:inline">Filter:</span>
                {[
                  { id: 'all', label: 'All 90 Days' },
                  { id: '30-day', label: '30-Day Sprint' },
                  { id: '60-day', label: '60-Day Mid' },
                  { id: '90-day', label: '90-Day Master' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedPhaseFilter(f.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                      selectedPhaseFilter === f.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* TAB 1: 30 / 60 / 90-DAY ACTION CURRICULUM */}
          {activeTab === 'plan' && (
            <div className="space-y-6">
              {filteredWeeks.map((week) => {
                const phase = week.phase || (week.weekNumber <= 4 ? '30-day' : week.weekNumber <= 8 ? '60-day' : '90-day');
                const milestoneTaskId = `w${week.weekNumber}-milestone`;
                const isMilestoneDone = completedTaskIds.includes(milestoneTaskId);

                return (
                  <div 
                    key={week.weekNumber}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6 hover:border-slate-700/80 transition-colors"
                  >
                    {/* Week Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <span className={`w-10 h-10 rounded-xl font-mono font-bold text-sm flex items-center justify-center border shadow-sm ${
                          phase === '30-day'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : phase === '60-day'
                            ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        }`}>
                          W{week.weekNumber}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-bold text-white">{week.title}</h3>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase ${
                              phase === '30-day'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : phase === '60-day'
                                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}>
                              {phase === '30-day' ? '30-Day Sprint' : phase === '60-day' ? '60-Day Mid-Term' : '90-Day Placement Ready'}
                            </span>
                          </div>
                          <span className="text-xs text-indigo-300 font-medium">Focus Competency: {week.focusSkill}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>~{week.estimatedHours || 10} hours study target</span>
                      </div>
                    </div>

                    {/* Section Grid: Learning Topics, Practical Assignments, and Revision Tasks */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                      {/* Column 1: Learning Topics */}
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                        <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-indigo-400">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Learning Topics</span>
                        </h4>
                        <ul className="space-y-2">
                          {week.objectives?.map((obj, i) => {
                            const taskId = `w${week.weekNumber}-obj-${i}`;
                            const isDone = completedTaskIds.includes(taskId);
                            return (
                              <li 
                                key={i}
                                onClick={() => toggleTaskCompletion(taskId)}
                                className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-all ${
                                  isDone
                                    ? 'bg-emerald-950/20 text-emerald-200 line-through opacity-80'
                                    : 'text-slate-300 hover:bg-slate-900'
                                }`}
                              >
                                {isDone ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                                )}
                                <span className="leading-snug">{obj}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Column 2: Practical Hands-On Assignments */}
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                        <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-emerald-400">
                          <Code2 className="w-3.5 h-3.5" />
                          <span>Practical Assignments</span>
                        </h4>
                        <ul className="space-y-2">
                          {week.handsOnTasks?.map((task, i) => {
                            const taskId = `w${week.weekNumber}-task-${i}`;
                            const isDone = completedTaskIds.includes(taskId);
                            return (
                              <li 
                                key={i}
                                onClick={() => toggleTaskCompletion(taskId)}
                                className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-all ${
                                  isDone
                                    ? 'bg-emerald-950/20 text-emerald-200 line-through opacity-80'
                                    : 'text-slate-300 hover:bg-slate-900'
                                }`}
                              >
                                {isDone ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                                )}
                                <span className="leading-snug">{task}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Column 3: Revision & Self-Audit Tasks */}
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                        <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-amber-400">
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Revision & Self-Audit</span>
                        </h4>
                        <ul className="space-y-2">
                          {(week.revisionTasks || [
                            `Review core equations and notes from previous week`,
                            `Conduct a timed 15-minute concept retention audit`
                          ]).map((rev, i) => {
                            const taskId = `w${week.weekNumber}-rev-${i}`;
                            const isDone = completedTaskIds.includes(taskId);
                            return (
                              <li 
                                key={i}
                                onClick={() => toggleTaskCompletion(taskId)}
                                className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-all ${
                                  isDone
                                    ? 'bg-emerald-950/20 text-emerald-200 line-through opacity-80'
                                    : 'text-slate-300 hover:bg-slate-900'
                                }`}
                              >
                                {isDone ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                                )}
                                <span className="leading-snug">{rev}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>

                    {/* Integrated Project Recommendation (if specified) */}
                    {week.projectRecommendation && (
                      <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                            <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Recommended Practical Project: {week.projectRecommendation.title}</span>
                          </span>
                          <div className="flex items-center gap-1">
                            {week.projectRecommendation.tools?.map((tool: string, tIdx: number) => (
                              <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono border border-slate-800">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {week.projectRecommendation.description}
                        </p>
                      </div>
                    )}

                    {/* Verifiable Weekly Milestone Checkbox Card */}
                    <div 
                      onClick={() => toggleTaskCompletion(milestoneTaskId)}
                      className={`p-4 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                        isMilestoneDone
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                          : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isMilestoneDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-500 shrink-0" />
                        )}
                        <div>
                          <span className="text-xs font-bold text-white block">
                            Week {week.weekNumber} Verifiable Milestone:
                          </span>
                          <span className={`text-xs ${isMilestoneDone ? 'text-emerald-300 line-through' : 'text-slate-300'}`}>
                            {week.learningMilestone}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full uppercase font-bold shrink-0 ${
                        isMilestoneDone
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isMilestoneDone ? 'Achieved' : 'Mark Achieved'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: PORTFOLIO PROJECTS (3 MILESTONE PROJECTS) */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roadmap.portfolioProjects?.map((proj, idx) => {
                const phaseLabel = proj.phase || (idx === 0 ? '30-day' : idx === 1 ? '60-day' : '90-day');
                return (
                  <div 
                    key={idx}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono ${
                          phaseLabel === '30-day'
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : phaseLabel === '60-day'
                            ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                            : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        }`}>
                          {phaseLabel === '30-day' ? '30-Day Project' : phaseLabel === '60-day' ? '60-Day Capstone' : '90-Day Placement Showcase'}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">#{idx + 1}</span>
                      </div>

                      <h3 className="text-base font-bold text-white leading-snug">{proj.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {proj.problemStatement}
                      </p>

                      {/* Gaps Targeted */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Bridges Priority Gaps:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.targetGaps?.map((g, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tools & Libraries */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Tools & Frameworks:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.toolsUsed?.map((tool, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-medium font-mono">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables Checklist */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Deliverables Checklist:
                        </span>
                        <ul className="space-y-1.5">
                          {proj.deliverables?.map((del, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="text-emerald-400 font-bold shrink-0">✓</span>
                              <span className="leading-snug">{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                      <strong className="text-indigo-300 font-semibold block mb-0.5">Suggested Open Dataset / Spec:</strong>
                      <p className="text-slate-400 text-[10px] leading-relaxed">{proj.datasetSuggestion}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: SKILL GAP EXPLANATIONS */}
          {activeTab === 'gaps' && (
            <div className="space-y-6">
              {roadmap.gapExplanations?.map((exp, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4"
                >
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                    <BookOpen className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <h3 className="text-base font-bold text-white">{exp.skill}</h3>
                      <span className="text-xs text-indigo-300 font-mono">Conceptual Diagnostic Deep-Dive</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="text-indigo-300 font-bold uppercase tracking-wider block mb-1">
                        Intuitive Real-World Analogy
                      </span>
                      <p className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed text-xs sm:text-sm">
                        {exp.plainEnglishExplanation}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                        Why Placement Interviewers Evaluate This
                      </span>
                      <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                        {exp.whyItMattersInRole}
                      </p>
                    </div>

                    <div>
                      <span className="text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                        Fastest 3-Step Practice Routine to Close This Gap
                      </span>
                      <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                        {exp.fastestWayToMaster}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section D: Next Steps Routing Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-sky-950/30 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Ready to test your concept retention?</span>
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                Experience simulated technical questioning on your priority gaps and practice the STAR response framework in an AI Mock Interview.
              </p>
            </div>
            <button
              onClick={onNavigateToInterview}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/25 transition-all whitespace-nowrap cursor-pointer"
            >
              Start AI Mock Interview
            </button>
          </div>
        </>
      )}
    </div>
  );
};
