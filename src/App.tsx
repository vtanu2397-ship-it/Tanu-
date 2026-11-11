/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AssessmentView } from './components/AssessmentView';
import { DashboardView } from './components/DashboardView';
import { CareerIntelligenceView } from './components/CareerIntelligenceView';
import { RoadmapView } from './components/RoadmapView';
import { TargetCompaniesView } from './components/TargetCompaniesView';
import { MockInterviewView } from './components/MockInterviewView';
import { HistoryView } from './components/HistoryView';
import { ProfileView } from './components/ProfileView';
import { AssessmentResult } from './types';
import { getStudentAssessments } from './firebase';
import { BookOpen, X, Sparkles, CheckCircle2 } from 'lucide-react';

function AppContent() {
  const { profile, user, isDemoMode, isLoading } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [latestAssessment, setLatestAssessment] = useState<AssessmentResult | null>(null);
  
  const [targetCompanyId, setTargetCompanyId] = useState<string>('google');
  const [companyViewMode, setCompanyViewMode] = useState<'catalog' | 'workspace'>('workspace');
  
  // Gap explanation modal state
  const [gapModalSkill, setGapModalSkill] = useState<string | null>(null);
  const [gapExplanationData, setGapExplanationData] = useState<any | null>(null);
  const [isLoadingGap, setIsLoadingGap] = useState(false);

  // If user logs in and was on landing page, move to dashboard (or assessment)
  useEffect(() => {
    if (profile && currentTab === 'landing') {
      setCurrentTab(latestAssessment ? 'dashboard' : 'dashboard');
    }
  }, [profile]);

  // Load existing assessment from Firestore when authenticated
  useEffect(() => {
    async function fetchAssessments() {
      if (user && !isDemoMode) {
        try {
          const list = await getStudentAssessments(user.uid);
          if (list && list.length > 0) {
            setLatestAssessment(list[0]);
          } else {
            const stored = localStorage.getItem('skillpath_latest_assessment');
            if (stored) {
              setLatestAssessment(JSON.parse(stored));
            }
          }
        } catch (err) {
          console.warn('Could not load assessments from Firestore:', err);
          const stored = localStorage.getItem('skillpath_latest_assessment');
          if (stored) {
            setLatestAssessment(JSON.parse(stored));
          }
        }
      } else {
        try {
          const stored = localStorage.getItem('skillpath_latest_assessment');
          if (stored) {
            setLatestAssessment(JSON.parse(stored));
          }
        } catch {}
      }
    }
    fetchAssessments();
  }, [user]);

  const handleNavigateToCompanies = (companyId?: string) => {
    if (companyId) {
      setTargetCompanyId(companyId);
    }
    setCompanyViewMode('workspace');
    setCurrentTab('companies');
  };

  const handleExplainGap = async (skillName: string) => {
    setGapModalSkill(skillName);
    setIsLoadingGap(true);
    setGapExplanationData(null);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch('/api/ai/explain-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillName,
          currentScore: 50,
          roleTitle: latestAssessment?.roleTitle || 'Data Analyst Intern'
        }),
        signal: controller.signal
      });

      clearTimeout(timer);
      if (!response.ok) throw new Error('Failed to explain gap');
      const data = await response.json();
      setGapExplanationData(data);
    } catch (err) {
      clearTimeout(timer);
      console.warn('Using instant diagnostic fallback for gap explanation:', err);
      // Fallback
      setGapExplanationData({
        analogy: `Think of ${skillName} like calibrating a precision instrument: without rigorous baseline checks, small deviations compound into false conclusions downstream.`,
        workplaceContext: `On active engineering and tech placement teams, ${skillName} is essential for verifiable execution, automated testing, and reproducible results.`,
        commonPitfall: `Assuming standard happy-path inputs without verifying edge cases, null records, or boundary constraints.`,
        threeDaySprint: [
          `Day 1: Study core syntax rules and solve 5 targeted practice problems.`,
          `Day 2: Build a minimal script or module verifying calculations against synthetic edge cases.`,
          `Day 3: Articulate your algorithmic reasoning out loud as if in a live technical interview.`
        ]
      });
    } finally {
      clearTimeout(timer);
      setIsLoadingGap(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-3" />
        <p className="text-xs font-mono">Initializing SkillPath AI...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'companies') {
            setCompanyViewMode('catalog');
          }
          setCurrentTab(tab);
        }}
        hasAssessment={Boolean(latestAssessment)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            onStartAssessment={() => setCurrentTab('assessment')}
            onExploreDemo={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            assessment={latestAssessment}
            onNavigateToAssessment={() => setCurrentTab('assessment')}
            onNavigateToRoadmap={() => setCurrentTab('roadmap')}
            onNavigateToInterview={() => setCurrentTab('interview')}
            onNavigateToCompanies={handleNavigateToCompanies}
            onNavigateToProfile={() => setCurrentTab('profile')}
            onNavigateToCareerIntel={() => setCurrentTab('career-intel')}
            onNavigateToHistory={() => setCurrentTab('history')}
            onExplainGap={handleExplainGap}
          />
        )}

        {currentTab === 'career-intel' && (
          <CareerIntelligenceView
            assessment={latestAssessment}
            onNavigateToAssessment={() => setCurrentTab('assessment')}
            onNavigateToRoadmap={() => setCurrentTab('roadmap')}
            onNavigateToCompanies={handleNavigateToCompanies}
            onNavigateToInterview={() => setCurrentTab('interview')}
          />
        )}

        {currentTab === 'assessment' && (
          <AssessmentView
            onAssessmentCompleted={(result) => {
              setLatestAssessment(result);
            }}
            onNavigateToDashboard={() => setCurrentTab('dashboard')}
            onNavigateToRoadmap={() => setCurrentTab('roadmap')}
            onNavigateToCompanies={handleNavigateToCompanies}
          />
        )}

        {currentTab === 'roadmap' && (
          <RoadmapView
            assessment={latestAssessment}
            onNavigateToAssessment={() => setCurrentTab('assessment')}
            onNavigateToInterview={() => setCurrentTab('interview')}
          />
        )}

        {currentTab === 'companies' && (
          <TargetCompaniesView
            assessment={latestAssessment}
            initialCompanyId={targetCompanyId}
            initialViewMode={companyViewMode}
            onNavigateToAssessment={() => setCurrentTab('assessment')}
            onNavigateToRoadmap={() => setCurrentTab('roadmap')}
            onNavigateToHistory={() => setCurrentTab('history')}
            onAssessmentCompleted={(result) => {
              setLatestAssessment(result);
            }}
          />
        )}

        {currentTab === 'interview' && (
          <MockInterviewView
            assessment={latestAssessment}
            onNavigateToDashboard={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'history' && (
          <HistoryView
            currentAssessment={latestAssessment}
            onSelectAssessment={(a) => {
              setLatestAssessment(a);
              setCurrentTab('dashboard');
            }}
            onRetakeAssessment={() => setCurrentTab('assessment')}
          />
        )}

        {currentTab === 'profile' && <ProfileView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SkillPath AI — Student Career Intelligence Platform.</p>
          <p className="text-[11px] text-slate-600">
            Transparent Skill Diagnostics • Verifiable Evidence • Gemini AI Mentorship
          </p>
        </div>
      </footer>

      {/* Gap Explanation Modal */}
      {gapModalSkill && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setGapModalSkill(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                AI Gap Deep Dive
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-4">
              Understanding: {gapModalSkill}
            </h3>

            {isLoadingGap ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                <div className="w-8 h-8 border-3 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-2" />
                <span>Consulting Gemini Mentor...</span>
              </div>
            ) : gapExplanationData ? (
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-indigo-300 font-bold uppercase tracking-wider block mb-1">
                    The Everyday Analogy
                  </span>
                  <p className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed">
                    {gapExplanationData.analogy}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    Why Real Teams Care On The Job
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {gapExplanationData.workplaceContext}
                  </p>
                </div>

                <div>
                  <span className="text-amber-400 font-bold uppercase tracking-wider block mb-1">
                    Common Junior Pitfall
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {gapExplanationData.commonPitfall}
                  </p>
                </div>

                <div>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider block mb-1.5">
                    3-Day Sprint to Close This Gap
                  </span>
                  <ul className="space-y-1.5">
                    {gapExplanationData.threeDaySprint?.map((dayText: string, i: number) => (
                      <li key={i} className="text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{dayText}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setGapModalSkill(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
