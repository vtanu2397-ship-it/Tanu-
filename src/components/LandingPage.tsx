import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BRANCH_DEFINITIONS } from '../data/questions';
import { 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  BrainCircuit, 
  Target, 
  Code2, 
  Database, 
  Zap, 
  GraduationCap,
  ChevronRight,
  Cpu,
  Server,
  Wrench,
  HardHat,
  LineChart,
  Binary,
  Building2
} from 'lucide-react';

interface LandingPageProps {
  onStartAssessment: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartAssessment, onExploreDemo }) => {
  const { profile, signInWithGoogle, signInAsDemoStudent } = useAuth();

  const branchIcons: Record<string, any> = {
    Code2: Code2,
    BrainCircuit: BrainCircuit,
    LineChart: LineChart,
    Server: Server,
    Cpu: Cpu,
    Zap: Zap,
    Wrench: Wrench,
    HardHat: HardHat
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Universal B.Tech Campus Placement & Internship Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Master Your Technical Placements Across <br />
              <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                All Engineering Branches
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Replace resume guesswork with <span className="text-white font-medium">verifiable technical skill assessment</span>. 
              Diagnose gaps for SDE, AI/ML, Data Analytics, Cloud, VLSI, Power, Manufacturing, or Structural roles and receive personalized Gemini AI roadmaps.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {profile ? (
                <>
                  <button
                    onClick={onExploreDemo}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Open Student Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onStartAssessment}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                  >
                    <span>Start Skill Assessment</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={signInWithGoogle}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-xl shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Sign In & Select Track</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      signInAsDemoStudent();
                      onExploreDemo();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                  >
                    <span>Instant Demo (No Sign-in)</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </>
              )}
            </div>

            {/* Micro proof badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>8 Core B.Tech Branches</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Transparent Scoring Rules</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Private & Isolated Student Records</span>
              </div>
            </div>
          </div>

          {/* Engineering Branches Grid Showcase */}
          <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Comprehensive Curriculum
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  8 Engineering Branches • Dedicated Career Tracks
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Click any track in your assessment to evaluate
              </span>
            </div>

            {/* Branch cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {BRANCH_DEFINITIONS.map((branch) => {
                const IconComponent = branchIcons[branch.icon] || Code2;
                return (
                  <div 
                    key={branch.id}
                    onClick={onStartAssessment}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block leading-tight">{branch.shortName}</span>
                        <span className="text-[10px] text-slate-400">{branch.tracks[0]?.title}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {branch.description}
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{branch.tracks[0]?.categories.length} Categories</span>
                      <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">Start →</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-[11px] text-slate-500 text-center italic">
              * Includes Computer Science (SDE), AI & Machine Learning, Data Science & Analytics (featuring full Data Analyst Intern track), IT Systems, ECE (VLSI/Embedded), Electrical (EEE), Mechanical, and Civil Engineering.
            </p>
          </div>

        </div>
      </div>

      {/* Target Companies Feature Banner */}
      <div className="py-12 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                <Building2 className="w-4 h-4" />
                <span>Dedicated Module: Target Company Preparation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Preparing for Specific Campus Recruitment Drives?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you are aiming for Tier-1 Product giants like <strong>Google, Microsoft, and Amazon</strong>, mass recruiters like <strong>TCS, Infosys, Accenture, Wipro, and Cognizant</strong>, or core leaders like <strong>L&T</strong>, SkillPath AI adapts your preparation to the exact hiring rounds, aptitude patterns, and discipline core subjects for your engineering branch.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                {['Google', 'Microsoft', 'Amazon', 'TCS Ninja & Digital', 'Infosys DSE/SP', 'Accenture ASE', 'Wipro Turbo', 'Cognizant GenC', 'L&T GET'].map((name) => (
                  <span key={name} className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  if (!profile) signInAsDemoStudent();
                  onExploreDemo();
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Explore Company Trackers</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Section */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white tracking-tight">How SkillPath AI Empowers Engineering Students</h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            From branch-specific diagnostic assessments to actionable portfolio projects and mock interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 text-indigo-400">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">1. Branch-Wise Diagnostics</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Modular question banks covering core disciplines from DSA and OS to VLSI, Power Systems, Thermodynamics, and Data Analytics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-5 text-sky-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">2. Career Intelligence</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Compare your actual scores against role benchmarks. See your exact match formula, evidence logs, and prioritized skill gaps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-5 text-teal-400">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">3. Real AI Mentor (Gemini)</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Generates a personalized 4-week study curriculum, plain-English gap breakdowns, and hands-on portfolio projects for your chosen track.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">4. Safe & Private Records</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Stored securely in Firebase Firestore. Your assessment is strictly private to your account, and you can delete your data anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-900 border-t border-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to know your placement readiness?
          </h2>
          <p className="mt-3 text-slate-400 text-sm max-w-lg mx-auto">
            Take the diagnostic assessment for your engineering branch. Uncover strengths, bridge your gaps, and prepare for interviews.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={onStartAssessment}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
            >
              Start Diagnostic Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
