import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Compass, 
  BarChart3, 
  CheckCircle2, 
  Map, 
  MessageSquare, 
  Building2,
  History, 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  Sparkles,
  BrainCircuit 
} from 'lucide-react';
import { ROLE_BENCHMARKS } from '../data/benchmarks';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  hasAssessment: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, hasAssessment }) => {
  const { profile, user, isDemoMode, signInWithGoogle, signInAsDemoStudent, signOut } = useAuth();

  const navItems = [
    { id: 'landing', label: 'Home', icon: Compass, public: true },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, requiresAuth: true },
    { id: 'career-intel', label: 'Career Intel', icon: BrainCircuit, requiresAuth: true },
    { id: 'assessment', label: 'Skill Assessment', icon: CheckCircle2, requiresAuth: true, highlight: !hasAssessment },
    { id: 'roadmap', label: 'AI Roadmap', icon: Map, requiresAuth: true },
    { id: 'companies', label: 'Target Companies', icon: Building2, requiresAuth: true },
    { id: 'interview', label: 'Mock Interview', icon: MessageSquare, requiresAuth: true },
    { id: 'history', label: 'History', icon: History, requiresAuth: true },
    { id: 'profile', label: 'Profile', icon: UserIcon, requiresAuth: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => onSelectTab(profile ? 'dashboard' : 'landing')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  SkillPath AI
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Student Edition
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Career Intelligence Platform</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              
              if (item.requiresAuth && !profile) {
                return null;
              }

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white bg-indigo-600/30 border border-indigo-500/40 shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Auth / Account Controls */}
          <div className="flex items-center gap-3">
            {profile ? (
              <div className="flex items-center gap-3">
                <div 
                  onClick={() => onSelectTab('profile')}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {profile.displayName ? profile.displayName.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-medium text-slate-200 leading-tight">
                      {profile.displayName || 'Student'}
                    </p>
                    <p className="text-[10px] text-slate-400 leading-tight truncate max-w-[130px]">
                      {isDemoMode ? 'Demo Student' : (ROLE_BENCHMARKS[profile.targetRole]?.title || 'Engineering Student')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={signOut}
                  title="Sign out"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={signInAsDemoStudent}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                >
                  Explore as Demo Student
                </button>
                <button
                  onClick={signInWithGoogle}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 rounded-lg shadow-md shadow-indigo-600/20 transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In with Google
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        {profile && (
          <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-800 gap-2 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-white bg-indigo-600/30 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
