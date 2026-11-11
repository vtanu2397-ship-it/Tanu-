import React, { useState, useMemo } from 'react';
import { 
  AssessmentResult, 
  StudentProfile, 
  AcademicYear, 
  PreparationGoal,
  StudentRoleRecommendation,
  CareerRoleIntelligence
} from '../types';
import { 
  ALL_INTEREST_TAGS, 
  CAREER_ROLES_DATABASE, 
  calculateStudentCareerRecommendations 
} from '../data/careerIntelligenceData';
import { BRANCH_DEFINITIONS } from '../data/questions';
import { useAuth } from '../context/AuthContext';
import { 
  BrainCircuit, 
  Sparkles, 
  Target, 
  GraduationCap, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Award, 
  Layers, 
  Briefcase, 
  Clock, 
  Compass, 
  Code2, 
  Cpu, 
  Zap, 
  Wrench, 
  HardHat, 
  Server, 
  LineChart, 
  ChevronRight, 
  Save, 
  Check, 
  Lightbulb, 
  FileText, 
  BookOpen, 
  ExternalLink,
  SlidersHorizontal,
  ChevronDown,
  Building2
} from 'lucide-react';

interface CareerIntelligenceViewProps {
  assessment: AssessmentResult | null;
  onNavigateToAssessment: () => void;
  onNavigateToRoadmap: () => void;
  onNavigateToCompanies?: () => void;
  onNavigateToInterview?: () => void;
}

export const CareerIntelligenceView: React.FC<CareerIntelligenceViewProps> = ({
  assessment,
  onNavigateToAssessment,
  onNavigateToRoadmap,
  onNavigateToCompanies,
  onNavigateToInterview
}) => {
  const { profile, updateProfile, isDemoMode } = useAuth();

  // Interactive parameter state
  const [selectedBranch, setSelectedBranch] = useState<string>(
    profile?.branch || assessment?.branchId || 'cse'
  );
  const [selectedYear, setSelectedYear] = useState<AcademicYear>(
    profile?.academicYear || '3rd Year'
  );
  const [selectedGoal, setSelectedGoal] = useState<PreparationGoal>(
    profile?.targetGoal || 'placement'
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    profile?.interests && profile.interests.length > 0 
      ? profile.interests 
      : ['System Architecture & Low-Level Code', 'Cloud Computing & DevOps']
  );

  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'gaps' | 'projects' | 'progression'>('overview');
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Gemini AI Career Guidance state
  const [aiGuidance, setAiGuidance] = useState<{
    strategicAnalysis: string;
    keyCompetitiveEdge: string;
    immediate90DayActionPlan: string[];
    interviewGotchas: string[];
  } | null>(null);
  const [isLoadingAiGuidance, setIsLoadingAiGuidance] = useState(false);

  // Compute dynamic recommendations based on student's branch, academic year, interests, and assessed skills
  const recommendations: StudentRoleRecommendation[] = useMemo(() => {
    return calculateStudentCareerRecommendations({
      branch: selectedBranch,
      academicYear: selectedYear,
      interests: selectedInterests,
      assessment: assessment,
      targetGoal: selectedGoal
    });
  }, [selectedBranch, selectedYear, selectedInterests, assessment, selectedGoal]);

  // Selected role for deep dive inspection
  const [selectedRoleId, setSelectedRoleId] = useState<string>(() => {
    return recommendations[0]?.role?.id || 'cse-backend-distributed';
  });

  // Ensure active selected role remains valid if recommendations change
  const currentRecommendation = useMemo(() => {
    return recommendations.find(r => r.role.id === selectedRoleId) || recommendations[0];
  }, [recommendations, selectedRoleId]);

  const activeRole: CareerRoleIntelligence = currentRecommendation?.role || CAREER_ROLES_DATABASE[0];

  // Toggle student interest tags
  const toggleInterest = (tag: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(tag)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  // Quick save student preference to profile
  const handleSavePreferences = async () => {
    setIsSavingProfile(true);
    try {
      await updateProfile({
        branch: selectedBranch,
        academicYear: selectedYear,
        targetGoal: selectedGoal,
        interests: selectedInterests
      });
      setIsSavedNotice(true);
      setTimeout(() => setIsSavedNotice(false), 3000);
    } catch (e) {
      console.error('Failed to update profile preferences', e);
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Set active role as target role in student profile
  const handleSetAsTargetRole = async (roleId: string) => {
    setIsSavingProfile(true);
    try {
      await updateProfile({
        targetRole: roleId,
        branch: activeRole.branchId
      });
      setIsSavedNotice(true);
      setTimeout(() => setIsSavedNotice(false), 3000);
    } catch (e) {
      console.error('Failed to set target role', e);
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Trigger Gemini AI Career Strategy Mentor
  const handleFetchAiGuidance = async () => {
    setIsLoadingAiGuidance(true);
    setAiGuidance(null);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('/api/ai/career-guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: profile?.displayName || 'Student',
          branch: selectedBranch,
          academicYear: selectedYear,
          roleTitle: activeRole.title,
          interests: selectedInterests,
          targetGoal: selectedGoal,
          assessedStrengths: currentRecommendation?.strengthsApplied || [],
          missingSkills: currentRecommendation?.missingSkills || []
        }),
        signal: controller.signal
      });

      clearTimeout(timer);
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      setAiGuidance(data);
    } catch (err) {
      clearTimeout(timer);
      console.warn('AI guidance fallback applied:', err);
      // Fallback
      setAiGuidance({
        strategicAnalysis: `As a ${selectedYear} student in ${activeRole.branchName} targeting ${activeRole.title}, you possess a distinctive technical foundation. Technical hiring managers look for evidence of end-to-end implementation and domain curiosity. Aligning your passion in ${selectedInterests[0] || 'core engineering'} with verified assessment proof gives you a strong competitive edge over candidates who rely on generic resumes.`,
        keyCompetitiveEdge: `Deep structural intuition in ${activeRole.branchName} combined with hands-on project artifacts. Explain your architecture decisions with crisp rationale in interview technical discussions.`,
        immediate90DayActionPlan: [
          `Month 1: Bridge priority missing skills in ${currentRecommendation?.missingSkills[0]?.skillName || 'core tools'} through targeted coding or lab exercises.`,
          `Month 2: Build a production capstone addressing realistic constraints with a public GitHub repo or portfolio report.`,
          `Month 3: Conduct mock interview drills practicing behavioral STAR stories and domain edge cases.`
        ],
        interviewGotchas: [
          `Interviewers will test how your system behaves when unexpected boundary values or network timeouts occur.`,
          `Always clarify constraints and verify assumptions before jumping into calculations or code implementation.`
        ]
      });
    } finally {
      clearTimeout(timer);
      setIsLoadingAiGuidance(false);
    }
  };

  const getBranchIcon = (bId: string) => {
    switch (bId) {
      case 'cse': return <Code2 className="w-4 h-4 text-indigo-400" />;
      case 'aiml': return <BrainCircuit className="w-4 h-4 text-purple-400" />;
      case 'ds': return <LineChart className="w-4 h-4 text-emerald-400" />;
      case 'it': return <Server className="w-4 h-4 text-sky-400" />;
      case 'ece': return <Cpu className="w-4 h-4 text-amber-400" />;
      case 'eee': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'mech': return <Wrench className="w-4 h-4 text-rose-400" />;
      case 'civil': return <HardHat className="w-4 h-4 text-orange-400" />;
      default: return <GraduationCap className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Module Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                Adaptive Career Intelligence Suite
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                All 8 B.Tech Branches Supported
              </span>
              {isDemoMode && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Demo Student Mode
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Personalized Career Role Match
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Discover engineering roles tailored to your B.Tech branch, technical interests, academic year stage, and verified assessment competencies. No generic recommendations — every roadmap is customized.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSavePreferences}
              disabled={isSavingProfile}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all shadow-sm"
            >
              {isSavedNotice ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Preferences Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-indigo-400" />
                  <span>Save to My Profile</span>
                </>
              )}
            </button>

            <button
              onClick={onNavigateToAssessment}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify Skills in Assessment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar: Branch, Year, Goal & Interests */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Student Profile Calibration Parameters
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Altering parameters recalculates role fit, gaps, and project advice in real-time
          </span>
        </div>

        {/* Branch Selection Grid */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            1. Select Engineering Branch (8 Branches)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {BRANCH_DEFINITIONS.map((b) => {
              const isSelected = selectedBranch === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBranch(b.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="mb-1.5">{getBranchIcon(b.id)}</div>
                  <span className="text-xs font-bold tracking-tight">{b.shortName}</span>
                  <span className="text-[10px] text-slate-500 truncate w-full">{b.tracks.length} tracks</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Academic Year & Preparation Goal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Academic Year */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              2. Academic Year Stage
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['1st Year', '2nd Year', '3rd Year', '4th Year'] as AcademicYear[]).map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                    selectedYear === yr
                      ? 'bg-indigo-600/30 border-indigo-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              {selectedYear === '1st Year' && 'Focuses on foundational concepts, math intuition, and basic language syntax.'}
              {selectedYear === '2nd Year' && 'Prioritizes core data structures/circuits, exploratory projects, and summer internships.'}
              {selectedYear === '3rd Year' && 'Calibrated for on-campus placement tests, system design, and rigorous interview drills.'}
              {selectedYear === '4th Year' && 'Targeting immediate recruitment rounds, salary negotiation, and portfolio defenses.'}
            </p>
          </div>

          {/* Goal */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              3. Target Recruitment Goal
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedGoal('placement')}
                className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                  selectedGoal === 'placement'
                    ? 'bg-indigo-600/30 border-indigo-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Full-Time Campus Placement
              </button>
              <button
                onClick={() => setSelectedGoal('internship')}
                className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                  selectedGoal === 'internship'
                    ? 'bg-indigo-600/30 border-indigo-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Summer / Pre-Final Internship
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Adapts roadmap milestones, timeline urgency, and project scale to your exact hiring goal.
            </p>
          </div>
        </div>

        {/* Technical Interests Multi-Select Tags */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              4. Technical Passion & Interest Tags ({selectedInterests.length} selected)
            </label>
            <span className="text-[11px] text-indigo-400">Click to toggle passion areas</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_INTEREST_TAGS.map((tag) => {
              const isSelected = selectedInterests.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleInterest(tag)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    isSelected
                      ? 'bg-indigo-500/20 text-indigo-200 border-indigo-400/50 shadow-sm shadow-indigo-500/20'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {isSelected && <span className="mr-1.5 text-indigo-400">✓</span>}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Left: Recommended Roles List, Right: Deep Role Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 cols): Dynamic Role Recommendations */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Ranked Career Role Matches ({recommendations.length})
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">Sorted by Fit %</span>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec) => {
              const isSelected = rec.role.id === selectedRoleId;
              const isTargetInProfile = profile?.targetRole === rec.role.id;

              return (
                <div
                  key={rec.role.id}
                  onClick={() => {
                    setSelectedRoleId(rec.role.id);
                    setAiGuidance(null);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500/80 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  {/* Top Bar inside card */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-slate-800 border border-slate-700/60">
                        {getBranchIcon(rec.role.branchId)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-300">
                            {rec.role.branchName}
                          </span>
                          {rec.isPrimaryBranchMatch && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              Core Branch
                            </span>
                          )}
                          {isTargetInProfile && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              Your Target
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-white leading-snug mt-0.5">
                          {rec.role.title}
                        </h3>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="flex flex-col items-end">
                      <div className={`px-2.5 py-1 rounded-xl text-xs font-extrabold border ${
                        rec.matchScore >= 80 
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : rec.matchScore >= 65
                          ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      }`}>
                        {rec.matchScore}% Match
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1">Starting {rec.role.avgStartingPackage.split('-')[0]}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {rec.role.tagline}
                  </p>

                  {/* Why recommended mini snippet */}
                  <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300 truncate max-w-[85%]">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate text-[11px] text-slate-400">
                        {rec.whyRecommended.primaryReason}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${isSelected ? 'text-indigo-400 translate-x-1' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 cols): Deep Role Intelligence Workspace */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header Card for Active Role */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {activeRole.branchName} Track
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {activeRole.industrySector}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                    activeRole.demandTrend === 'Explosive Growth' 
                      ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  }`}>
                    {activeRole.demandTrend} Demand
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeRole.title}
                </h2>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {activeRole.tagline}
                </p>
              </div>

              {/* Set as Target Role CTA */}
              <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                <button
                  onClick={() => handleSetAsTargetRole(activeRole.id)}
                  disabled={isSavingProfile}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    profile?.targetRole === activeRole.id
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 cursor-default'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {profile?.targetRole === activeRole.id ? '✓ Current Target Role' : 'Set as Target Role'}
                </button>
                <span className="text-[11px] text-slate-400">
                  Est. Entry: <strong className="text-slate-200">{activeRole.avgStartingPackage}</strong>
                </span>
              </div>
            </div>

            {/* Personalized "Why Recommended" Callout */}
            <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Personalized Match Rationale for You
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Branch Synergy
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {currentRecommendation?.whyRecommended.branchSynergy}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Academic Stage ({selectedYear})
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {currentRecommendation?.whyRecommended.academicYearContext}
                  </p>
                </div>
              </div>

              {/* Matched Interests Chips */}
              {currentRecommendation?.whyRecommended.interestOverlap && currentRecommendation.whyRecommended.interestOverlap.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-slate-400 mr-1">Matched Interests:</span>
                  {currentRecommendation.whyRecommended.interestOverlap.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-slate-800 flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1">
              {[
                { id: 'overview', label: 'Strategy & AI Mentor', icon: Lightbulb },
                { id: 'skills', label: 'Required Skills', icon: Layers },
                { id: 'gaps', label: `Skill Gaps (${currentRecommendation?.missingSkills.length || 0})`, icon: AlertTriangle },
                { id: 'projects', label: `Projects (${activeRole.recommendedProjects.length})`, icon: Briefcase },
                { id: 'progression', label: 'Career Trajectory', icon: TrendingUp },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-all ${
                      isActive
                        ? 'border-indigo-500 text-white'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Strategy & AI Career Mentor */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Year-Wise Recommended Strategy */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Target Strategy for {selectedYear} Students
                    </h3>
                    <span className="text-[11px] text-indigo-400">Campus Placement Roadmap</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                        <Target className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-200">Core Milestone:</span>{' '}
                        <span className="text-slate-300">
                          {activeRole.yearWiseStrategy[selectedYear]?.focusGoal}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pl-6 border-l-2 border-indigo-500/30">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Key Action Items:
                      </span>
                      <ul className="space-y-1 list-disc list-inside text-slate-300">
                        {activeRole.yearWiseStrategy[selectedYear]?.keyActionItems.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-slate-400 text-[11px] flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{activeRole.yearWiseStrategy[selectedYear]?.placementTimingAdvice}</span>
                    </div>
                  </div>
                </div>

                {/* Gemini AI Deep Dive Section */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/20 border border-indigo-500/20 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          Gemini Placement Strategy Mentor
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Generates custom 90-day action plans, differentiator positioning, and interview gotchas
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleFetchAiGuidance}
                      disabled={isLoadingAiGuidance}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all shrink-0"
                    >
                      {isLoadingAiGuidance ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Consulting Gemini...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Get Gemini Career Strategy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {aiGuidance && (
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 text-xs animate-in fade-in duration-200">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                          Market Positioning & Strategic Outlook
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {aiGuidance.strategicAnalysis}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                          Your Key Competitive Edge
                        </span>
                        <p className="text-emerald-200 leading-relaxed">
                          {aiGuidance.keyCompetitiveEdge}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                          Immediate 90-Day Placement Sprint
                        </span>
                        <div className="grid grid-cols-1 gap-2">
                          {aiGuidance.immediate90DayActionPlan.map((action, idx) => (
                            <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
                              <span className="text-indigo-400 font-bold shrink-0">{idx + 1}.</span>
                              <span className="text-slate-300">{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {aiGuidance.interviewGotchas.length > 0 && (
                        <div>
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
                            Interview Traps & Gotchas to Avoid
                          </span>
                          <div className="space-y-1.5">
                            {aiGuidance.interviewGotchas.map((gotcha, idx) => (
                              <div key={idx} className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-amber-200/90 flex items-start gap-2">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                <span>{gotcha}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Direct Action Hub */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={onNavigateToAssessment}
                    className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between text-left group transition-all"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                        Take Skill Assessment
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Verify scores against benchmarks
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={onNavigateToRoadmap}
                    className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between text-left group transition-all"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                        Generate 4-Week Roadmap
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Sprint plan for {activeRole.shortTitle}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </button>

                  {onNavigateToCompanies && (
                    <button
                      onClick={onNavigateToCompanies}
                      className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between text-left group transition-all"
                    >
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                          Target Companies Prep
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Google, Microsoft, TCS, L&T
                        </div>
                      </div>
                      <Building2 className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-all" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Required Technical Skills */}
            {activeTab === 'skills' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Core Skills */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Core Technical Competencies (Evaluated in Technical Rounds)
                  </h3>
                  <div className="space-y-3">
                    {activeRole.coreSkills.map(skill => {
                      const verifiedScore = assessment?.skillScores?.[skill.skillKey]?.score;
                      return (
                        <div key={skill.skillKey} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{skill.skillName}</span>
                              <span className="text-[10px] text-slate-400">Weight: {skill.weight}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-slate-400">
                                Benchmark Target: <strong className="text-indigo-300">{skill.targetScore}%</strong>
                              </span>
                              {verifiedScore !== undefined && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                  verifiedScore >= skill.targetScore 
                                    ? 'bg-emerald-500/20 text-emerald-300' 
                                    : 'bg-amber-500/20 text-amber-300'
                                }`}>
                                  Verified: {verifiedScore}%
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-slate-400 leading-relaxed text-[11px]">
                            {skill.description}
                          </p>
                          {/* Progress bar comparing student vs target */}
                          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden flex">
                            <div 
                              className={`h-full ${verifiedScore && verifiedScore >= skill.targetScore ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                              style={{ width: `${verifiedScore || skill.targetScore}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Advanced Skills */}
                {activeRole.advancedSkills.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Advanced Differentiator Skills (For Tier-1 Packages)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeRole.advancedSkills.map(skill => (
                        <div key={skill.skillKey} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-200">{skill.skillName}</span>
                            <span className="text-[10px] text-indigo-400 font-semibold">{skill.targetScore}%</span>
                          </div>
                          <p className="text-slate-400 text-[11px] leading-relaxed">
                            {skill.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Skill Gaps */}
            {activeTab === 'gaps' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Identified Gaps for {activeRole.shortTitle}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Comparing your skills to industry entry criteria
                  </span>
                </div>

                {currentRecommendation?.missingSkills.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <h4 className="text-sm font-bold text-emerald-300">All Benchmark Skills Satisfied!</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Your verified assessment scores meet or surpass all core requirements for {activeRole.title}. Focus on system design and portfolio presentation.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentRecommendation?.missingSkills.map((gap, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className={`w-4 h-4 ${gap.gapSeverity === 'Critical' ? 'text-rose-400' : 'text-amber-400'}`} />
                            <span className="font-bold text-white">{gap.skillName}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            gap.gapSeverity === 'Critical'
                              ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                              : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                          }`}>
                            {gap.gapSeverity} Gap (Target {gap.requiredScore}%)
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {gap.improvementAdvice}
                        </p>
                        <div className="pt-2 flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">
                            Current Est.: <strong className="text-slate-300">{gap.currentScore}%</strong>
                          </span>
                          <button
                            onClick={onNavigateToRoadmap}
                            className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                          >
                            <span>Add to 4-Week Study Plan</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Portfolio Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Recommended Capstone & Portfolio Projects
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Specifically designed to bridge identified gaps
                  </span>
                </div>

                <div className="space-y-4">
                  {activeRole.recommendedProjects.map((project) => (
                    <div key={project.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                              {project.difficulty}
                            </span>
                            <div className="flex items-center gap-1">
                              {project.targetSkillGaps.map(g => (
                                <span key={g} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                                  Bridges {g}
                                </span>
                              ))}
                            </div>
                          </div>
                          <h4 className="text-sm font-bold text-white">
                            {project.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-slate-300 leading-relaxed text-xs">
                        {project.problemStatement}
                      </p>

                      {/* Tools Used */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-slate-400 mr-1">Recommended Tools:</span>
                        {project.toolsUsed.map((tool, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Key Deliverables */}
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Verified Deliverables:
                        </span>
                        <ul className="space-y-0.5 list-disc list-inside text-slate-300 text-[11px]">
                          {project.keyDeliverables.map((del, dIdx) => (
                            <li key={dIdx}>{del}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Hiring Impact */}
                      <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-200 text-[11px] flex items-center gap-2">
                        <Award className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span><strong>Recruiter Value:</strong> {project.portfolioImpact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Career Trajectory & Ladder */}
            {activeTab === 'progression' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Full Career Trajectory & Industry Compensation
                  </h3>
                  <span className="text-[11px] text-slate-400">0 to 10+ Years Growth Path</span>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-500/30">
                  {activeRole.careerProgression.map((stage, idx) => (
                    <div key={idx} className="relative space-y-2">
                      {/* Timeline dot */}
                      <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-slate-900" />
                      
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div>
                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                              Stage {idx + 1} • {stage.experienceYears}
                            </span>
                            <h4 className="text-sm font-bold text-white">
                              {stage.stage}
                            </h4>
                          </div>
                          <span className="text-xs font-extrabold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 self-start sm:self-center">
                            {stage.salaryRange}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-400">
                          <strong>Common Job Titles:</strong> {stage.typicalTitles.join(', ')}
                        </div>

                        {/* Responsibilities */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Core Responsibilities:
                          </span>
                          <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
                            {stage.keyResponsibilities.map((resp, rIdx) => (
                              <li key={rIdx}>{resp}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Critical Skills */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] text-slate-400">Critical Skills:</span>
                          {stage.criticalSkills.map((sk, sIdx) => (
                            <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-300">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
