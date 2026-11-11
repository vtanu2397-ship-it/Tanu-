import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  getDoc, 
  setDoc, 
  getDocs, 
  collection, 
  query, 
  orderBy, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { StudentProfile, AssessmentResult, RoadmapPlan, MockInterviewSession } from './types';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Must use firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Verify connection on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase client offline warning: verify internet connectivity.", error);
    }
  }
}
testConnection();

// Mandatory Error Handling conforming to FirestoreErrorInfo
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// ================= USER PROFILE HELPERS =================

export async function getUserProfile(userId: string): Promise<StudentProfile | null> {
  const path = `users/${userId}`;
  try {
    const snap = await getDoc(doc(db, 'users', userId));
    if (!snap.exists()) return null;
    return snap.data() as StudentProfile;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
}

export async function saveUserProfile(profile: StudentProfile): Promise<void> {
  const path = `users/${profile.id}`;
  try {
    await setDoc(doc(db, 'users', profile.id), profile, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ================= ASSESSMENTS HELPERS =================

export async function saveAssessmentResult(userId: string, assessment: AssessmentResult): Promise<void> {
  const path = `users/${userId}/assessments/${assessment.id}`;
  try {
    await setDoc(doc(db, 'users', userId, 'assessments', assessment.id), assessment);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getStudentAssessments(userId: string): Promise<AssessmentResult[]> {
  const path = `users/${userId}/assessments`;
  try {
    const colRef = collection(db, 'users', userId, 'assessments');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => d.data() as AssessmentResult);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

// ================= ROADMAP HELPERS =================

export async function saveStudentRoadmap(userId: string, roadmap: RoadmapPlan): Promise<void> {
  const roadmapId = roadmap.id || `roadmap-${Date.now()}`;
  const path = `users/${userId}/roadmaps/${roadmapId}`;
  try {
    await setDoc(doc(db, 'users', userId, 'roadmaps', roadmapId), {
      ...roadmap,
      id: roadmapId,
      studentId: userId,
      createdAt: roadmap.createdAt || new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getStudentRoadmaps(userId: string): Promise<RoadmapPlan[]> {
  const path = `users/${userId}/roadmaps`;
  try {
    const colRef = collection(db, 'users', userId, 'roadmaps');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => d.data() as RoadmapPlan);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

// ================= MOCK INTERVIEW HELPERS =================

export async function saveInterviewSession(userId: string, session: MockInterviewSession): Promise<void> {
  const path = `users/${userId}/interviews/${session.id}`;
  try {
    await setDoc(doc(db, 'users', userId, 'interviews', session.id), session);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getStudentInterviews(userId: string): Promise<MockInterviewSession[]> {
  const path = `users/${userId}/interviews`;
  try {
    const colRef = collection(db, 'users', userId, 'interviews');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => d.data() as MockInterviewSession);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

// ================= PRIVACY & ACCOUNT DELETION =================
// Satisfies: "Include a way to delete a student's account and associated records."
export async function deleteStudentAccountAndAllRecords(userId: string): Promise<void> {
  try {
    // 1. Delete all assessments
    const assessCol = collection(db, 'users', userId, 'assessments');
    const assessSnap = await getDocs(assessCol);
    for (const docItem of assessSnap.docs) {
      await deleteDoc(docItem.ref);
    }

    // 2. Delete all roadmaps
    const roadmapsCol = collection(db, 'users', userId, 'roadmaps');
    const roadSnap = await getDocs(roadmapsCol);
    for (const docItem of roadSnap.docs) {
      await deleteDoc(docItem.ref);
    }

    // 3. Delete all interviews
    const interviewCol = collection(db, 'users', userId, 'interviews');
    const intSnap = await getDocs(interviewCol);
    for (const docItem of intSnap.docs) {
      await deleteDoc(docItem.ref);
    }

    // 4. Delete root student profile
    await deleteDoc(doc(db, 'users', userId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `users/${userId}`);
  }
}

export { onAuthStateChanged, signInWithPopup, fbSignOut };
export type { User };
