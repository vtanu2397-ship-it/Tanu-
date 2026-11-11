import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  fbSignOut, 
  onAuthStateChanged, 
  User,
  getUserProfile, 
  saveUserProfile,
  deleteStudentAccountAndAllRecords
} from '../firebase';
import { StudentProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: StudentProfile | null;
  isLoading: boolean;
  isDemoMode: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAsDemoStudent: () => void;
  signOut: () => Promise<void>;
  updateProfile: (updated: Partial<StudentProfile>) => Promise<void>;
  deleteAccount: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_ID = 'demo-student-stanford-2026';
const DEMO_PROFILE: StudentProfile = {
  id: DEMO_USER_ID,
  email: 'alex.chen@university.edu',
  displayName: 'Alex Chen',
  university: 'National Institute of Technology',
  branch: 'cse',
  major: 'Computer Science & Engineering',
  graduationYear: '2026',
  targetRole: 'cse-sde',
  bio: 'Pre-final year B.Tech student focusing on algorithmic problem solving, scalable systems, and campus recruitment preparation.',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Sync Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (isDemoMode) {
        setIsLoading(false);
        return;
      }

      setUser(currentUser);
      if (currentUser) {
        try {
          let studentProfile = await getUserProfile(currentUser.uid);
          if (!studentProfile) {
            // Bootstrap initial profile
            studentProfile = {
              id: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Student',
              university: 'Engineering College',
              branch: 'cse',
              major: 'B.Tech Engineering',
              graduationYear: '2026',
              targetRole: 'cse-sde',
              bio: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            await saveUserProfile(studentProfile);
          }
          setProfile(studentProfile);
        } catch (err) {
          console.error('Error fetching student profile:', err);
        }
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [isDemoMode]);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setIsDemoMode(false);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      // If popup was blocked or failed in sandbox, alert gracefully
      if (error?.code === 'auth/popup-blocked') {
        alert('Popup was blocked by your browser settings. You can click "Explore as Demo Student" to test immediately.');
      } else if (error?.code === 'auth/popup-closed-by-user') {
        // User closed modal
      } else {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signInAsDemoStudent = () => {
    setIsDemoMode(true);
    setUser(null);
    setProfile(DEMO_PROFILE);
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    if (isDemoMode) {
      setIsDemoMode(false);
      setProfile(null);
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      await fbSignOut(auth);
      setProfile(null);
      setUser(null);
    } catch (error) {
      console.error('Sign-out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updated: Partial<StudentProfile>) => {
    if (!profile) return;
    const newProfile: StudentProfile = {
      ...profile,
      ...updated,
      updatedAt: new Date().toISOString()
    };
    setProfile(newProfile);

    if (!isDemoMode && user) {
      await saveUserProfile(newProfile);
    }
  };

  const deleteAccount = async () => {
    if (isDemoMode) {
      setIsDemoMode(false);
      setProfile(null);
      setUser(null);
      return;
    }

    if (user) {
      await deleteStudentAccountAndAllRecords(user.uid);
      await fbSignOut(auth);
      setUser(null);
      setProfile(null);
    }
  };

  const refreshProfile = async () => {
    if (user && !isDemoMode) {
      const p = await getUserProfile(user.uid);
      if (p) setProfile(p);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isDemoMode,
        signInWithGoogle,
        signInAsDemoStudent,
        signOut,
        updateProfile,
        deleteAccount,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
