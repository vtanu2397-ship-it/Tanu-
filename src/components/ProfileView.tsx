import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ROLE_BENCHMARKS } from '../data/benchmarks';
import { BRANCH_DEFINITIONS } from '../data/questions';
import { 
  User, 
  GraduationCap, 
  Target, 
  ShieldCheck, 
  Trash2, 
  Download, 
  Save, 
  CheckCircle2, 
  Briefcase 
} from 'lucide-react';

import { PreparationGoal, AcademicYear } from '../types';
import { ALL_INTEREST_TAGS } from '../data/careerIntelligenceData';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, deleteAccount, user, isDemoMode } = useAuth();
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [university, setUniversity] = useState(profile?.university || '');
  const [branch, setBranch] = useState(profile?.branch || 'cse');
  const [major, setMajor] = useState(profile?.major || 'Computer Science & Engineering');
  const [graduationYear, setGraduationYear] = useState(profile?.graduationYear || '2026');
  const [academicYear, setAcademicYear] = useState<AcademicYear>(profile?.academicYear || '3rd Year');
  const [targetGoal, setTargetGoal] = useState<PreparationGoal>(profile?.targetGoal || 'placement');
  const [targetRole, setTargetRole] = useState(profile?.targetRole || 'cse-sde');
  const [interests, setInterests] = useState<string[]>(profile?.interests || ['System Architecture & Low-Level Code', 'Cloud Computing & DevOps']);
  const [bio, setBio] = useState(profile?.bio || '');
  const [isSaved, setIsSaved] = useState(false);

  // When branch changes, auto-select a default track for that branch if not already compatible
  const handleBranchChange = (newBranchId: string) => {
    setBranch(newBranchId);
    const branchObj = BRANCH_DEFINITIONS.find(b => b.id === newBranchId);
    if (branchObj && branchObj.tracks.length > 0) {
      const isCurrentRoleInBranch = branchObj.tracks.some(t => t.id === targetRole);
      if (!isCurrentRoleInBranch) {
        setTargetRole(branchObj.tracks[0].id);
      }
      setMajor(branchObj.name);
    }
  };

  const toggleInterest = (tag: string) => {
    setInterests(prev => {
      if (prev.includes(tag)) {
        if (prev.length === 1) return prev;
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      displayName,
      university,
      branch,
      major,
      graduationYear,
      academicYear,
      targetGoal,
      targetRole,
      interests,
      bio
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleExportData = () => {
    if (!profile) return;
    const dataStr = JSON.stringify(profile, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_profile_${profile.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.prompt(
      'Type "DELETE" to permanently erase your profile and all associated assessment records from Firestore:'
    );
    if (confirmation === 'DELETE') {
      await deleteAccount();
      alert('Your account and all associated Firestore records have been permanently deleted.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-400" />
            B.Tech Student Profile
          </span>
          {isDemoMode && (
            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Demo Student Profile
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-white mt-1">
          Academic Branch & Career Target
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Select your engineering branch and target placement role. This directly configures your diagnostic question bank and AI mentor curriculum.
        </p>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        {isSaved && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Profile settings successfully updated and saved!</span>
          </div>
        )}
        {/* Primary Preparation Goal Selector */}
        <div className="space-y-2 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <label className="text-xs font-semibold text-slate-200 block">
            Primary Preparation Goal
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTargetGoal('placement')}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                targetGoal === 'placement'
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${
                targetGoal === 'placement' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold block text-white">
                  Campus Placement (Full-Time)
                </span>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Targeted at final-year students (4th year / graduating 2025–2026). In-depth technical rounds, DSA, and core architecture.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTargetGoal('internship')}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                targetGoal === 'internship'
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${
                targetGoal === 'internship' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold block text-white">
                    Summer Internship & PPO
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    2nd & 3rd Year
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Targeted at pre-final & sophomore students. Fast-track fundamentals, resume lab projects, and Pre-Placement Offer strategies.
                </p>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Preferred Name */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Preferred Full Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Alex Chen"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Email (Readonly) */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Email Address (Private)
            </label>
            <input
              type="text"
              value={profile?.email || 'student@university.edu'}
              disabled
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-500 cursor-not-allowed font-mono"
            />
          </div>

          {/* Engineering Branch */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Engineering Branch
            </label>
            <select
              value={branch}
              onChange={(e) => handleBranchChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {BRANCH_DEFINITIONS.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.shortName})
                </option>
              ))}
            </select>
          </div>

          {/* Target Placement Track */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Target Career Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {BRANCH_DEFINITIONS.map(b => (
                <optgroup key={b.id} label={b.name}>
                  {b.tracks.map(t => {
                    const bench = ROLE_BENCHMARKS[t.id];
                    return (
                      <option key={t.id} value={t.id}>
                        {bench?.title || t.title}
                      </option>
                    );
                  })}
                </optgroup>
              ))}
            </select>
          </div>

          {/* College / University */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              College / University
            </label>
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="e.g. National Institute of Technology, BITS Pilani"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Academic Major */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Academic Major / Degree Program
            </label>
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="e.g. B.Tech Computer Science"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Current Academic Year */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Current Academic Year
            </label>
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value as AcademicYear)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="1st Year">1st Year (Freshman)</option>
              <option value="2nd Year">2nd Year (Sophomore - Internship Eligible)</option>
              <option value="3rd Year">3rd Year (Pre-Final - Summer Intern Prime)</option>
              <option value="4th Year">4th Year (Final Year - Campus Placement)</option>
            </select>
          </div>

          {/* Graduation Year */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Expected Graduation Year
            </label>
            <select
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>
        </div>

        {/* Technical Interests */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Technical Passion & Domain Interests (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {ALL_INTEREST_TAGS.map((tag) => {
              const isSelected = interests.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleInterest(tag)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    isSelected
                      ? 'bg-indigo-500/20 text-indigo-200 border-indigo-400/50 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {isSelected && <span className="mr-1 text-indigo-400 font-bold">✓</span>}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Short Bio */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Placement Aspirations & Problem Solving Interests
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Tell us about the kinds of engineering challenges you enjoy tackling (e.g. low-latency systems, ML pipelines, embedded firmware, structural design)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile Changes</span>
          </button>

          <button
            type="button"
            onClick={handleExportData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Data (JSON)</span>
          </button>
        </div>
      </form>

      {/* Data Safety & Privacy Management */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h2 className="text-base font-bold text-white">
            Data Safety, Privacy & Account Deletion
          </h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          SkillPath AI isolates student records per user account in Cloud Firestore. 
          Your diagnostic answers, skill-match scores, and interview sessions are strictly confidential and are never shared or published.
        </p>

        <div className="pt-3">
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Account & Erase All Records</span>
          </button>
          <span className="block text-[11px] text-slate-500 mt-1">
            Permanently deletes your profile, past assessments, AI roadmaps, and mock interview transcripts.
          </span>
        </div>
      </div>
    </div>
  );
};
