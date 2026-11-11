import React, { useState, useMemo } from 'react';
import { AssessmentResult, SkillLevelName } from '../types';
import { SKILL_CATEGORIES } from '../data/benchmarks';
import { 
  TrendingUp, 
  TrendingDown, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Zap, 
  Sparkles, 
  BarChart3, 
  Target, 
  ArrowUpRight, 
  Activity, 
  Layers, 
  RotateCcw, 
  Info,
  Sliders,
  ChevronRight,
  ShieldCheck,
  Flame
} from 'lucide-react';

export interface SkillProgressionVisualizationProps {
  assessments: AssessmentResult[];
  activeSkillKey?: string;
  variant?: 'full' | 'compact';
  onSelectAssessment?: (assessment: AssessmentResult) => void;
  onRetakeAssessment?: () => void;
}

interface ProgressionPoint {
  sessionIndex: number;
  sessionNumber: number;
  id: string;
  date: string;
  fullDate: string;
  roleTitle: string;
  companyName?: string;
  score: number;
  level: SkillLevelName;
  questionsTotal: number;
  questionsCorrect: number;
  strengths: string[];
  gaps: string[];
  rawAssessment: AssessmentResult;
}

interface SkillTrajectory {
  key: string;
  name: string;
  color: string;
  points: ProgressionPoint[];
  startScore: number;
  latestScore: number;
  delta: number;
  startLevel: SkillLevelName;
  latestLevel: SkillLevelName;
  avgVelocity: number;
  hasTargetBenchmark: boolean;
  targetBenchmark: number;
  isBenchmarkMet: boolean;
}

// Preset color palette for distinct multi-skill trajectory lines
const SKILL_COLOR_PALETTE = [
  '#6366f1', // Indigo (Overall)
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#14b8a6', // Teal
  '#f97316', // Orange
  '#3b82f6', // Blue
  '#84cc16'  // Lime
];

function getLevelFromName(score: number): SkillLevelName {
  if (score >= 80) return 'Advanced';
  if (score >= 60) return 'Proficient';
  if (score >= 40) return 'Developing';
  return 'Novice';
}

function getLevelColor(level: SkillLevelName): { text: string; bg: string; border: string } {
  switch (level) {
    case 'Advanced':
      return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
    case 'Proficient':
      return { text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' };
    case 'Developing':
      return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
    case 'Novice':
    default:
      return { text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' };
  }
}

export const SkillProgressionVisualization: React.FC<SkillProgressionVisualizationProps> = ({
  assessments = [],
  activeSkillKey: initialActiveSkillKey = 'overall',
  variant = 'full',
  onSelectAssessment,
  onRetakeAssessment
}) => {
  // Allow toggling simulated demo sessions if student only has 1 or 0 assessments
  const [useSimulationPreview, setUseSimulationPreview] = useState<boolean>(false);
  const [selectedSkillKey, setSelectedSkillKey] = useState<string>(initialActiveSkillKey);
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(null);
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');

  // Simulated progression sequence for students with < 2 assessments who want to preview multi-session trends
  const simulatedAssessments: AssessmentResult[] = useMemo(() => {
    const base = assessments[0];
    const now = Date.now();
    const day = 86400000;
    return [
      {
        id: 'sim-1',
        studentId: base?.studentId || 'student-demo',
        roleId: base?.roleId || 'cse-sde',
        roleTitle: base?.roleTitle || 'Diagnostic Assessment - SDE Track',
        completedAt: new Date(now - 30 * day).toISOString(),
        overallScore: 48,
        skillScores: {
          programming: { score: 50, level: 'Developing', levelNum: 2, questionsTotal: 5, questionsCorrect: 3, evidence: [] },
          dsa: { score: 40, level: 'Developing', levelNum: 2, questionsTotal: 5, questionsCorrect: 2, evidence: [] },
          dbms: { score: 45, level: 'Developing', levelNum: 2, questionsTotal: 4, questionsCorrect: 2, evidence: [] },
          os: { score: 55, level: 'Developing', levelNum: 2, questionsTotal: 4, questionsCorrect: 2, evidence: [] },
          aptitude: { score: 52, level: 'Developing', levelNum: 2, questionsTotal: 4, questionsCorrect: 2, evidence: [] }
        },
        answers: {},
        strengths: ['Basic OOP Fundamentals', 'Syntax Comprehension'],
        priorityGaps: [],
        status: 'completed',
        createdAt: new Date(now - 30 * day).toISOString()
      },
      {
        id: 'sim-2',
        studentId: base?.studentId || 'student-demo',
        roleId: base?.roleId || 'cse-sde',
        roleTitle: 'Week 4 Progress Review',
        completedAt: new Date(now - 20 * day).toISOString(),
        overallScore: 61,
        skillScores: {
          programming: { score: 65, level: 'Proficient', levelNum: 3, questionsTotal: 5, questionsCorrect: 3, evidence: [] },
          dsa: { score: 55, level: 'Developing', levelNum: 2, questionsTotal: 5, questionsCorrect: 3, evidence: [] },
          dbms: { score: 60, level: 'Proficient', levelNum: 3, questionsTotal: 4, questionsCorrect: 2, evidence: [] },
          os: { score: 62, level: 'Proficient', levelNum: 3, questionsTotal: 4, questionsCorrect: 2, evidence: [] },
          aptitude: { score: 65, level: 'Proficient', levelNum: 3, questionsTotal: 4, questionsCorrect: 3, evidence: [] }
        },
        answers: {},
        strengths: ['Time Complexity Analysis', 'Database Indexing'],
        priorityGaps: [],
        status: 'completed',
        createdAt: new Date(now - 20 * day).toISOString()
      },
      {
        id: 'sim-3',
        studentId: base?.studentId || 'student-demo',
        roleId: base?.roleId || 'cse-sde',
        roleTitle: 'TCS & Top Tech Prep Drill',
        companyName: 'TCS Prep',
        completedAt: new Date(now - 9 * day).toISOString(),
        overallScore: 73,
        skillScores: {
          programming: { score: 78, level: 'Proficient', levelNum: 3, questionsTotal: 5, questionsCorrect: 4, evidence: [] },
          dsa: { score: 70, level: 'Proficient', levelNum: 3, questionsTotal: 5, questionsCorrect: 3, evidence: [] },
          dbms: { score: 72, level: 'Proficient', levelNum: 3, questionsTotal: 4, questionsCorrect: 3, evidence: [] },
          os: { score: 68, level: 'Proficient', levelNum: 3, questionsTotal: 4, questionsCorrect: 3, evidence: [] },
          aptitude: { score: 76, level: 'Proficient', levelNum: 3, questionsTotal: 4, questionsCorrect: 3, evidence: [] }
        },
        answers: {},
        strengths: ['Dynamic Programming Memoization', 'SQL Window Queries'],
        priorityGaps: [],
        status: 'completed',
        createdAt: new Date(now - 9 * day).toISOString()
      },
      {
        id: 'sim-4',
        studentId: base?.studentId || 'student-demo',
        roleId: base?.roleId || 'cse-sde',
        roleTitle: base?.roleTitle || 'Placement Benchmark Evaluation',
        companyName: base?.companyName || 'Google Prep',
        completedAt: new Date().toISOString(),
        overallScore: base?.overallScore && base.overallScore > 73 ? base.overallScore : 84,
        skillScores: {
          programming: { score: 88, level: 'Advanced', levelNum: 4, questionsTotal: 5, questionsCorrect: 4, evidence: [] },
          dsa: { score: 82, level: 'Advanced', levelNum: 4, questionsTotal: 5, questionsCorrect: 4, evidence: [] },
          dbms: { score: 80, level: 'Advanced', levelNum: 4, questionsTotal: 4, questionsCorrect: 3, evidence: [] },
          os: { score: 78, level: 'Proficient', levelNum: 3, questionsTotal: 4, questionsCorrect: 3, evidence: [] },
          aptitude: { score: 85, level: 'Advanced', levelNum: 4, questionsTotal: 4, questionsCorrect: 3, evidence: [] }
        },
        answers: {},
        strengths: ['Graph Traversal BFS/DFS', 'ACID Isolation Guarantees', 'Memory Segmentation'],
        priorityGaps: [],
        status: 'completed',
        createdAt: new Date().toISOString()
      }
    ];
  }, [assessments]);

  // Determine active assessment list (chronologically sorted oldest -> newest)
  const activeAssessments = useMemo(() => {
    const listToUse = useSimulationPreview ? simulatedAssessments : assessments;
    if (!listToUse || listToUse.length === 0) return [];

    // Deduplicate by ID
    const seen = new Set<string>();
    const unique = listToUse.filter((a) => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });

    // Sort ascending by completedAt / createdAt
    return [...unique].sort((a, b) => {
      const timeA = new Date(a.completedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.completedAt || b.createdAt || 0).getTime();
      return timeA - timeB;
    });
  }, [assessments, useSimulationPreview, simulatedAssessments]);

  // Build progression trajectories for Overall score and every distinct skill
  const { trajectories, allSkillKeys } = useMemo(() => {
    if (activeAssessments.length === 0) {
      return { trajectories: {} as Record<string, SkillTrajectory>, allSkillKeys: [] };
    }

    const discoveredSkills = new Set<string>();
    activeAssessments.forEach((a) => {
      if (a.skillScores) {
        Object.keys(a.skillScores).forEach((k) => discoveredSkills.add(k));
      }
    });

    const skillKeysArray = Array.from(discoveredSkills);
    const trajMap: Record<string, SkillTrajectory> = {};

    // 1. Overall Trajectory
    const overallPoints: ProgressionPoint[] = activeAssessments.map((a, idx) => {
      const d = new Date(a.completedAt || a.createdAt);
      return {
        sessionIndex: idx,
        sessionNumber: idx + 1,
        id: a.id,
        date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        fullDate: d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        roleTitle: a.roleTitle || 'Diagnostic Assessment',
        companyName: a.companyName,
        score: Math.round(a.overallScore || 0),
        level: getLevelFromName(a.overallScore || 0),
        questionsTotal: Object.values(a.skillScores || {}).reduce((acc, curr) => acc + (curr.questionsTotal || 0), 0),
        questionsCorrect: Object.values(a.skillScores || {}).reduce((acc, curr) => acc + (curr.questionsCorrect || 0), 0),
        strengths: a.strengths || [],
        gaps: (a.priorityGaps || []).map((g) => g.skillName || g.skill),
        rawAssessment: a
      };
    });

    const startOverall = overallPoints[0]?.score || 0;
    const latestOverall = overallPoints[overallPoints.length - 1]?.score || 0;
    const deltaOverall = latestOverall - startOverall;
    const velocityOverall = overallPoints.length > 1 ? Number((deltaOverall / (overallPoints.length - 1)).toFixed(1)) : 0;

    trajMap['overall'] = {
      key: 'overall',
      name: 'Overall Placement Readiness',
      color: '#6366f1',
      points: overallPoints,
      startScore: startOverall,
      latestScore: latestOverall,
      delta: deltaOverall,
      startLevel: getLevelFromName(startOverall),
      latestLevel: getLevelFromName(latestOverall),
      avgVelocity: velocityOverall,
      hasTargetBenchmark: true,
      targetBenchmark: 75,
      isBenchmarkMet: latestOverall >= 75
    };

    // 2. Individual Skills Trajectories
    skillKeysArray.forEach((skillKey, colorIdx) => {
      const color = SKILL_COLOR_PALETTE[(colorIdx + 1) % SKILL_COLOR_PALETTE.length];
      const points: ProgressionPoint[] = [];

      activeAssessments.forEach((a, idx) => {
        const d = new Date(a.completedAt || a.createdAt);
        const skillDetail = a.skillScores?.[skillKey];
        if (skillDetail) {
          points.push({
            sessionIndex: idx,
            sessionNumber: idx + 1,
            id: a.id,
            date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            fullDate: d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            roleTitle: a.roleTitle,
            companyName: a.companyName,
            score: Math.round(skillDetail.score || 0),
            level: skillDetail.level || getLevelFromName(skillDetail.score || 0),
            questionsTotal: skillDetail.questionsTotal || 0,
            questionsCorrect: skillDetail.questionsCorrect || 0,
            strengths: a.strengths || [],
            gaps: (a.priorityGaps || []).map((g) => g.skillName || g.skill),
            rawAssessment: a
          });
        }
      });

      if (points.length > 0) {
        const start = points[0].score;
        const latest = points[points.length - 1].score;
        const delta = latest - start;
        const velocity = points.length > 1 ? Number((delta / (points.length - 1)).toFixed(1)) : 0;
        const meta = SKILL_CATEGORIES[skillKey];
        const prettyName = meta?.name || skillKey.split('_').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

        trajMap[skillKey] = {
          key: skillKey,
          name: prettyName,
          color,
          points,
          startScore: start,
          latestScore: latest,
          delta,
          startLevel: points[0].level,
          latestLevel: points[points.length - 1].level,
          avgVelocity: velocity,
          hasTargetBenchmark: true,
          targetBenchmark: 75,
          isBenchmarkMet: latest >= 75
        };
      }
    });

    return { trajectories: trajMap, allSkillKeys: ['overall', ...skillKeysArray] };
  }, [activeAssessments]);

  // Current active trajectory
  const activeTrajectory = trajectories[selectedSkillKey] || trajectories['overall'] || null;

  // Selected or hovered point
  const focusedPointIndex = hoveredPointIndex !== null ? hoveredPointIndex : (selectedPointIndex !== null ? selectedPointIndex : (activeTrajectory ? activeTrajectory.points.length - 1 : null));
  const focusedPoint = activeTrajectory && focusedPointIndex !== null ? activeTrajectory.points[focusedPointIndex] : null;

  // Global metrics across all skills
  const progressionStats = useMemo<{
    totalSkillsTracked: number;
    skillsImproved: number;
    benchmarksMet: number;
    overallDelta: number;
    fastestSkill: SkillTrajectory | null;
  } | null>(() => {
    if (!activeTrajectory) return null;
    const skillsList: SkillTrajectory[] = Object.values(trajectories).filter((t) => t.key !== 'overall');
    const skillsImproved = skillsList.filter((s) => s.delta > 0).length;
    const benchmarksMet = skillsList.filter((s) => s.isBenchmarkMet).length;
    
    // Find fastest improving skill
    let fastestSkill: SkillTrajectory | null = null;
    skillsList.forEach((s) => {
      if (!fastestSkill || s.delta > fastestSkill.delta) {
        fastestSkill = s;
      }
    });

    return {
      totalSkillsTracked: skillsList.length,
      skillsImproved,
      benchmarksMet,
      overallDelta: trajectories['overall']?.delta || 0,
      fastestSkill
    };
  }, [trajectories, activeTrajectory]);

  // SVG Chart Dimensions & Scale Math
  const chartWidth = 760;
  const chartHeight = variant === 'compact' ? 220 : 260;
  const padding = { top: 30, right: 30, bottom: 45, left: 45 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // X coordinate calculation
  const getX = (pointIndex: number, totalPoints: number) => {
    if (totalPoints <= 1) return padding.left + innerWidth / 2;
    return padding.left + (pointIndex / (totalPoints - 1)) * innerWidth;
  };

  // Y coordinate calculation (0% at bottom, 100% at top)
  const getY = (score: number) => {
    const clamped = Math.max(0, Math.min(100, score));
    return padding.top + innerHeight - (clamped / 100) * innerHeight;
  };

  // Generate SVG path for a points array
  const createSvgPath = (points: ProgressionPoint[], totalPointsCount: number) => {
    if (points.length === 0) return '';
    if (points.length === 1) {
      const x = getX(0, totalPointsCount);
      const y = getY(points[0].score);
      return `M ${x} ${y} L ${x} ${y}`;
    }

    let d = '';
    points.forEach((pt, idx) => {
      const x = getX(pt.sessionIndex, totalPointsCount);
      const y = getY(pt.score);
      if (idx === 0) {
        d += `M ${x} ${y}`;
      } else {
        const prevPt = points[idx - 1];
        const prevX = getX(prevPt.sessionIndex, totalPointsCount);
        const prevY = getY(prevPt.score);
        // Smooth cubic bezier curve
        const cpX1 = prevX + (x - prevX) / 2;
        const cpY1 = prevY;
        const cpX2 = prevX + (x - prevX) / 2;
        const cpY2 = y;
        d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
      }
    });
    return d;
  };

  // Generate SVG area fill path
  const createSvgAreaPath = (points: ProgressionPoint[], totalPointsCount: number) => {
    if (points.length <= 1) return '';
    const linePath = createSvgPath(points, totalPointsCount);
    const lastX = getX(points[points.length - 1].sessionIndex, totalPointsCount);
    const firstX = getX(points[0].sessionIndex, totalPointsCount);
    const bottomY = padding.top + innerHeight;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  const totalSessionsCount = activeAssessments.length;

  if (activeAssessments.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center space-y-4">
        <Activity className="w-10 h-10 text-indigo-400 mx-auto" />
        <h3 className="text-base font-bold text-white">No Progression Data Yet</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Complete diagnostic assessments or company test drills to begin plotting your skill mastery trajectory.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onRetakeAssessment && (
            <button
              onClick={onRetakeAssessment}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
            >
              Start First Assessment
            </button>
          )}
          <button
            onClick={() => setUseSimulationPreview(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Preview Progression Model</span>
          </button>
        </div>
      </div>
    );
  }

  const isSingleSession = totalSessionsCount === 1 && !useSimulationPreview;

  return (
    <div className={`space-y-6 ${variant === 'compact' ? '' : 'p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl'}`}>
      
      {/* 1. Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              Skill Progression & Velocity Engine
            </span>
            {useSimulationPreview && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Simulated 4-Session Preview Active
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Historical Skill Progression Over Time
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track category-by-category score growth, mastery transitions, and velocity toward placement cutoffs.
          </p>
        </div>

        {/* View Mode & Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Toggle Single vs All Skills */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('single')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                viewMode === 'single'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Focused Skill</span>
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                viewMode === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Multi-Skill Compare</span>
            </button>
          </div>

          {/* If student has only 1 recorded session, allow previewing simulation */}
          {assessments.length <= 1 && (
            <button
              onClick={() => setUseSimulationPreview(!useSimulationPreview)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 border ${
                useSimulationPreview
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Toggle multi-session progression simulation to preview charts"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{useSimulationPreview ? 'Show Actual Baseline' : 'Preview 4-Session Growth'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Notice for 1 single assessment */}
      {isSingleSession && (
        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 flex items-start justify-between gap-4 text-xs">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-indigo-200">
                Initial Baseline Recorded ({activeTrajectory?.latestScore}% Overall)
              </p>
              <p className="text-slate-400 mt-0.5">
                You have completed 1 diagnostic assessment. As you take additional company practice drills or retake assessments, your chronological progression curves and velocity rates will dynamically plot here.
              </p>
            </div>
          </div>
          <button
            onClick={() => setUseSimulationPreview(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 shrink-0 transition-colors"
          >
            Preview Multi-Session Curve
          </button>
        </div>
      )}

      {/* 2. Key Progression Metric Badges */}
      {progressionStats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Card 1: Overall Gain */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Readiness Gain</span>
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-2xl font-black font-mono ${progressionStats.overallDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {progressionStats.overallDelta >= 0 ? `+${progressionStats.overallDelta}%` : `${progressionStats.overallDelta}%`}
              </span>
              <span className="text-[10px] text-slate-500">
                from Session #1
              </span>
            </div>
          </div>

          {/* Card 2: Highest Velocity Skill */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Top Growth Skill</span>
              <Flame className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="mt-2">
              <span className="text-sm font-bold text-white truncate block">
                {progressionStats.fastestSkill?.name || 'All Core Skills'}
              </span>
              <span className="text-[10px] font-mono font-semibold text-emerald-400">
                {progressionStats.fastestSkill ? `+${progressionStats.fastestSkill.delta}% overall improvement` : 'Balanced Progress'}
              </span>
            </div>
          </div>

          {/* Card 3: Benchmarks Satisfied */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Placement Ready (≥75%)</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-indigo-400 font-mono">
                {progressionStats.benchmarksMet}
                <span className="text-xs text-slate-500 font-normal"> / {progressionStats.totalSkillsTracked}</span>
              </span>
              <span className="text-[10px] text-slate-500">Competencies</span>
            </div>
          </div>

          {/* Card 4: Average Session Velocity */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Session Velocity</span>
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">
                +{activeTrajectory?.avgVelocity || 0}%
              </span>
              <span className="text-[10px] text-slate-500">avg / test</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Skill Selector Tabs (For Single Mode) */}
      {viewMode === 'single' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Select Skill Trajectory to Inspect:</span>
            <span className="text-[10px] text-slate-500">{allSkillKeys.length} Available Metrics</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {allSkillKeys.map((key) => {
              const traj = trajectories[key];
              if (!traj) return null;
              const isSelected = selectedSkillKey === key;
              const levelStyle = getLevelColor(traj.latestLevel);

              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedSkillKey(key);
                    setSelectedPointIndex(null);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-2 ${
                    isSelected
                      ? 'bg-slate-800 text-white border-indigo-500 shadow-md ring-1 ring-indigo-500/20'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: traj.color }}
                  />
                  <span>{traj.name}</span>
                  <span className="font-mono text-[11px] font-bold text-slate-200">
                    {traj.latestScore}%
                  </span>
                  {traj.delta !== 0 && (
                    <span className={`text-[10px] font-mono ${traj.delta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {traj.delta > 0 ? `+${traj.delta}%` : `${traj.delta}%`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Multi-skill Legend (For Multi Mode) */}
      {viewMode === 'all' && (
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center gap-3 text-xs">
          <span className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider">Comparative Series:</span>
          {Object.values(trajectories).map((traj) => (
            <button
              key={traj.key}
              onClick={() => {
                setSelectedSkillKey(traj.key);
                setViewMode('single');
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: traj.color }} />
              <span>{traj.name}</span>
              <strong className="font-mono text-slate-100">{traj.latestScore}%</strong>
            </button>
          ))}
        </div>
      )}

      {/* 4. Interactive Graphical SVG Canvas */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 sm:p-6 overflow-hidden">
        
        {/* Trajectory Header Summary */}
        {activeTrajectory && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: activeTrajectory.color }} />
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{viewMode === 'all' ? 'All Assessed Skills Comparison' : activeTrajectory.name}</span>
                  {activeTrajectory.isBenchmarkMet && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Placement Benchmark Satisfied
                    </span>
                  )}
                </h3>
                <span className="text-[11px] text-slate-400">
                  {viewMode === 'all' 
                    ? `Comparing ${Object.keys(trajectories).length} distinct competency dimensions over ${totalSessionsCount} recorded milestones`
                    : `Tracking progression from ${activeTrajectory.startScore}% (${activeTrajectory.startLevel}) to ${activeTrajectory.latestScore}% (${activeTrajectory.latestLevel})`
                  }
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-0.5 border-t border-dashed border-amber-400/80 inline-block" />
                <span>Cutoff (75%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-0.5 bg-indigo-500 inline-block" />
                <span>Proficient (60%)</span>
              </div>
            </div>
          </div>
        )}

        {/* SVG Viewport */}
        <div className="relative w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-auto overflow-visible select-none"
            style={{ minWidth: '480px' }}
          >
            <defs>
              {/* Linear Gradients for Area Fills */}
              {Object.values(trajectories).map((traj) => (
                <linearGradient key={`grad-${traj.key}`} id={`grad-${traj.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={traj.color} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={traj.color} stopOpacity="0.0" />
                </linearGradient>
              ))}

              {/* Grid pattern / benchmark line styles */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Mastery Level Bands */}
            {/* Advanced: 80-100 */}
            <rect
              x={padding.left}
              y={getY(100)}
              width={innerWidth}
              height={getY(80) - getY(100)}
              fill="rgba(16, 185, 129, 0.03)"
            />
            {/* Proficient: 60-80 */}
            <rect
              x={padding.left}
              y={getY(80)}
              width={innerWidth}
              height={getY(60) - getY(80)}
              fill="rgba(99, 102, 241, 0.03)"
            />
            {/* Developing: 40-60 */}
            <rect
              x={padding.left}
              y={getY(60)}
              width={innerWidth}
              height={getY(40) - getY(60)}
              fill="rgba(245, 158, 11, 0.02)"
            />

            {/* Horizontal Grid Lines */}
            {[0, 20, 40, 60, 75, 80, 100].map((score) => {
              const y = getY(score);
              const isBenchmark = score === 75;
              return (
                <g key={score}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={padding.left + innerWidth}
                    y2={y}
                    stroke={isBenchmark ? '#f59e0b' : '#1e293b'}
                    strokeWidth={isBenchmark ? 1.5 : 1}
                    strokeDasharray={isBenchmark ? '4 4' : score === 0 || score === 100 ? 'none' : '2 3'}
                    strokeOpacity={isBenchmark ? 0.8 : 0.6}
                  />
                  {/* Y Axis Label */}
                  <text
                    x={padding.left - 8}
                    y={y + 3}
                    textAnchor="end"
                    className={`text-[9px] font-mono ${isBenchmark ? 'fill-amber-400 font-bold' : 'fill-slate-500'}`}
                  >
                    {score}%
                  </text>
                </g>
              );
            })}

            {/* Target 75% Benchmark Badge Marker on right edge */}
            <g transform={`translate(${padding.left + innerWidth - 75}, ${getY(75) - 10})`}>
              <rect
                width="75"
                height="18"
                rx="4"
                fill="rgba(245, 158, 11, 0.15)"
                stroke="#f59e0b"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="37" y="12" textAnchor="middle" className="text-[9px] font-bold fill-amber-300 font-mono">
                Target 75%
              </text>
            </g>

            {/* Multi-skill mode: render all lines */}
            {viewMode === 'all' && (
              <>
                {Object.values(trajectories).map((traj) => {
                  const pathD = createSvgPath(traj.points, totalSessionsCount);
                  return (
                    <g key={`all-traj-${traj.key}`}>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={traj.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all hover:stroke-width-3"
                      />
                      {/* Dots */}
                      {traj.points.map((pt, ptIdx) => {
                        const cx = getX(pt.sessionIndex, totalSessionsCount);
                        const cy = getY(pt.score);
                        return (
                          <circle
                            key={`${traj.key}-${ptIdx}`}
                            cx={cx}
                            cy={cy}
                            r="3.5"
                            fill={traj.color}
                            stroke="#020617"
                            strokeWidth="1.5"
                            className="cursor-pointer transition-transform hover:scale-125"
                          />
                        );
                      })}
                    </g>
                  );
                })}
              </>
            )}

            {/* Single mode: render focused trajectory line & area */}
            {viewMode === 'single' && activeTrajectory && (
              <g key={`single-traj-${activeTrajectory.key}`}>
                {/* Area under curve */}
                <path
                  d={createSvgAreaPath(activeTrajectory.points, totalSessionsCount)}
                  fill={`url(#grad-${activeTrajectory.key})`}
                />

                {/* Primary Stroke Line */}
                <path
                  d={createSvgPath(activeTrajectory.points, totalSessionsCount)}
                  fill="none"
                  stroke={activeTrajectory.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Vertical Cursor Guide when hovering or focused */}
                {focusedPoint && (
                  <line
                    x1={getX(focusedPoint.sessionIndex, totalSessionsCount)}
                    y1={padding.top}
                    x2={getX(focusedPoint.sessionIndex, totalSessionsCount)}
                    y2={padding.top + innerHeight}
                    stroke="#475569"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Interactive Point Nodes */}
                {activeTrajectory.points.map((pt, ptIdx) => {
                  const cx = getX(pt.sessionIndex, totalSessionsCount);
                  const cy = getY(pt.score);
                  const isFocused = focusedPointIndex === ptIdx;

                  return (
                    <g
                      key={`pt-${pt.id}-${ptIdx}`}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedPointIndex(ptIdx);
                        if (onSelectAssessment) onSelectAssessment(pt.rawAssessment);
                      }}
                      onMouseEnter={() => setHoveredPointIndex(ptIdx)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                    >
                      {/* Halo ring if focused */}
                      {isFocused && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="9"
                          fill="none"
                          stroke={activeTrajectory.color}
                          strokeWidth="2"
                          opacity="0.6"
                          className="animate-pulse"
                        />
                      )}

                      {/* Main node dot */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isFocused ? 6 : 4.5}
                        fill={pt.score >= 75 ? '#10b981' : activeTrajectory.color}
                        stroke="#0f172a"
                        strokeWidth="2.5"
                        className="transition-all"
                      />

                      {/* Score label above point */}
                      <text
                        x={cx}
                        y={cy - 10}
                        textAnchor="middle"
                        className={`text-[10px] font-mono font-bold ${
                          isFocused ? 'fill-white' : 'fill-slate-300'
                        }`}
                      >
                        {pt.score}%
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* X Axis Session Markers */}
            {activeAssessments.map((a, idx) => {
              const cx = getX(idx, totalSessionsCount);
              const cy = padding.top + innerHeight;
              const d = new Date(a.completedAt || a.createdAt);
              const labelDate = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
              const isFocused = focusedPointIndex === idx;

              return (
                <g key={`x-axis-${a.id}-${idx}`}>
                  {/* Tick */}
                  <line x1={cx} y1={cy} x2={cx} y2={cy + 5} stroke="#334155" strokeWidth="1" />
                  
                  {/* Session number pill */}
                  <text
                    x={cx}
                    y={cy + 18}
                    textAnchor="middle"
                    className={`text-[10px] font-mono font-bold ${isFocused ? 'fill-indigo-300' : 'fill-slate-400'}`}
                  >
                    S{idx + 1}
                  </text>

                  {/* Date label */}
                  <text
                    x={cx}
                    y={cy + 30}
                    textAnchor="middle"
                    className="text-[9px] fill-slate-500 font-sans"
                  >
                    {labelDate}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 5. Focused Session Deep-Dive Drawer */}
      {focusedPoint && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 shadow-lg space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-mono font-black text-indigo-400 text-sm">
                S#{focusedPoint.sessionNumber}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-white">
                    {focusedPoint.roleTitle}
                  </h4>
                  {focusedPoint.companyName && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {focusedPoint.companyName}
                    </span>
                  )}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getLevelColor(focusedPoint.level).bg} ${getLevelColor(focusedPoint.level).text} ${getLevelColor(focusedPoint.level).border} border`}>
                    {focusedPoint.level}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{focusedPoint.fullDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
                  {activeTrajectory?.name || 'Evaluated Score'}
                </span>
                <span className="text-2xl font-black font-mono text-indigo-400">
                  {focusedPoint.score}%
                </span>
              </div>

              {onSelectAssessment && (
                <button
                  onClick={() => onSelectAssessment(focusedPoint.rawAssessment)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <span>Load Into Dashboard</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick snapshot strengths & gaps */}
          {(focusedPoint.strengths.length > 0 || focusedPoint.gaps.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-900 text-xs">
              {focusedPoint.strengths.length > 0 && (
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    Demonstrated Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {focusedPoint.strengths.slice(0, 3).map((st, i) => (
                      <span key={i} className="text-[11px] text-slate-300">
                        • {st}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {focusedPoint.gaps.length > 0 && (
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Priority Gaps Noted in Session
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {focusedPoint.gaps.slice(0, 3).map((gp, i) => (
                      <span key={i} className="text-[11px] text-slate-300">
                        • {gp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 6. Competency Growth Leaderboard (For Full Variant) */}
      {variant === 'full' && (
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>Assessed Competencies Growth Summary</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.values(trajectories).map((traj) => {
              const isSelected = selectedSkillKey === traj.key;
              const hasGain = traj.delta > 0;
              const levelStyle = getLevelColor(traj.latestLevel);

              return (
                <div
                  key={traj.key}
                  onClick={() => {
                    setSelectedSkillKey(traj.key);
                    setViewMode('single');
                  }}
                  className={`p-3.5 rounded-xl bg-slate-950 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 ring-1 ring-indigo-500/30'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white truncate max-w-[180px]">
                      {traj.name}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${levelStyle.bg} ${levelStyle.text}`}>
                      {traj.latestLevel}
                    </span>
                  </div>

                  {/* Progress bar with baseline & target marker */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400">
                        {traj.startScore}% <span className="text-slate-600">→</span>{' '}
                        <strong className="text-white">{traj.latestScore}%</strong>
                      </span>
                      <span className={`font-bold ${hasGain ? 'text-emerald-400' : traj.delta < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                        {hasGain ? `+${traj.delta}%` : `${traj.delta}%`}
                      </span>
                    </div>

                    <div className="relative w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      {/* Benchmark marker at 75% */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-10"
                        style={{ left: '75%' }}
                        title="Placement Cutoff (75%)"
                      />
                      {/* Active progress */}
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, traj.latestScore)}%`,
                          backgroundColor: traj.color
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
