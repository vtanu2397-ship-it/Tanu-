import React, { useState, useEffect } from 'react';
import { AssessmentResult } from '../types';
import { useAuth } from '../context/AuthContext';
import { getStudentAssessments } from '../firebase';
import { SkillProgressionVisualization } from './SkillProgressionVisualization';
import { 
  History, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RotateCcw,
  BarChart2,
  Layers,
  Sparkles
} from 'lucide-react';

interface HistoryViewProps {
  currentAssessment: AssessmentResult | null;
  onSelectAssessment: (assessment: AssessmentResult) => void;
  onRetakeAssessment: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  currentAssessment,
  onSelectAssessment,
  onRetakeAssessment
}) => {
  const { user, isDemoMode } = useAuth();
  const [historyList, setHistoryList] = useState<AssessmentResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'progression' | 'sessions' | 'all'>('all');

  useEffect(() => {
    async function loadHistory() {
      if (user && !isDemoMode) {
        setIsLoading(true);
        try {
          const docs = await getStudentAssessments(user.uid);
          if (docs && docs.length > 0) {
            setHistoryList(docs);
          } else {
            const localHist: AssessmentResult[] = JSON.parse(localStorage.getItem('skillpath_assessment_history') || '[]');
            if (currentAssessment && !localHist.some((x) => x.id === currentAssessment.id)) {
              localHist.unshift(currentAssessment);
            }
            setHistoryList(localHist.length > 0 ? localHist : (currentAssessment ? [currentAssessment] : []));
          }
        } catch (err) {
          console.error('Error loading history:', err);
          const localHist: AssessmentResult[] = JSON.parse(localStorage.getItem('skillpath_assessment_history') || '[]');
          setHistoryList(localHist.length > 0 ? localHist : (currentAssessment ? [currentAssessment] : []));
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const localHist: AssessmentResult[] = JSON.parse(localStorage.getItem('skillpath_assessment_history') || '[]');
          if (currentAssessment && !localHist.some((x) => x.id === currentAssessment.id)) {
            localHist.unshift(currentAssessment);
          }
          setHistoryList(localHist.length > 0 ? localHist : (currentAssessment ? [currentAssessment] : []));
        } catch {
          setHistoryList(currentAssessment ? [currentAssessment] : []);
        }
      }
    }

    loadHistory();
  }, [user, currentAssessment]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-indigo-400" />
              Assessment History & Progress Tracking
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">
            Skill Progression & Trajectory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor how your skill-match score and category proficiencies evolve over time across multiple test sessions.
          </p>
        </div>

        <button
          onClick={onRetakeAssessment}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Take New Assessment</span>
        </button>
      </div>

      {isLoading && (
        <div className="p-12 text-center text-slate-400 text-xs">
          Loading past assessments...
        </div>
      )}

      {!isLoading && historyList.length === 0 && (
        <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <BarChart2 className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Assessment History Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
            You haven't completed any skill evaluations yet. Take your first diagnostic test to start tracking progress.
          </p>
          <button
            onClick={onRetakeAssessment}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
          >
            Start First Assessment
          </button>
        </div>
      )}

      {/* Graphical Skill Progression Visualization */}
      {!isLoading && historyList.length > 0 && (
        <SkillProgressionVisualization
          assessments={historyList}
          variant="full"
          onSelectAssessment={onSelectAssessment}
          onRetakeAssessment={onRetakeAssessment}
        />
      )}

      {/* Progression Timeline List Header */}
      {!isLoading && historyList.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-400" />
                <span>Recorded Assessment Sessions Log</span>
              </h3>
              <p className="text-xs text-slate-400">
                Detailed breakdown of each evaluation session with scores, category ratings, and demonstrated competencies.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
              {historyList.length} Sessions Logged
            </span>
          </div>

          <div className="space-y-4">
          {historyList.map((item, index) => {
            const isCurrent = currentAssessment?.id === item.id;
            const dateStr = new Date(item.completedAt || item.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={item.id}
                className={`p-6 rounded-2xl bg-slate-900 border transition-all ${
                  isCurrent 
                    ? 'border-indigo-500 shadow-lg ring-1 ring-indigo-500/30' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Session #{historyList.length - index}
                      </span>
                      {item.companyName && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          {item.companyName}
                        </span>
                      )}
                      <span className="text-xs font-medium text-slate-300">
                        {item.roleTitle}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          Active in Dashboard
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {dateStr}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {item.strengths?.length || 0} Strengths
                      </span>
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        {item.priorityGaps?.length || 0} Priority Gaps
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Skill Match</span>
                      <span className="text-3xl font-black text-indigo-400 font-mono">
                        {item.overallScore}%
                      </span>
                    </div>

                    {!isCurrent && (
                      <button
                        onClick={() => onSelectAssessment(item)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1"
                      >
                        <span>Load Results</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Skill mini-breakdown pills */}
                {item.skillScores && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                    {Object.entries(item.skillScores).map(([k, v]: [string, any]) => (
                      <span 
                        key={k} 
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {k.toUpperCase()}: <strong className="text-indigo-400">{v.score}%</strong> ({v.level})
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          </div>
        </div>
      )}
    </div>
  );
};
