import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError } from '../lib/error-handler';
import { OperationType, UserProfile, RoiCalculation, QuotationRequest } from '../types';

export const dbService = {
  // User Profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const path = `users/${userId}`;
    try {
      const docSnap = await getDoc(doc(db, path));
      return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  },

  async createUserProfile(profile: UserProfile): Promise<void> {
    const path = `users/${profile.uid}`;
    try {
      await setDoc(doc(db, path), {
        ...profile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    const path = `users/${userId}`;
    try {
      await updateDoc(doc(db, path), {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  // ROI Calculations
  async saveRoiCalculation(calc: Omit<RoiCalculation, 'id' | 'createdAt'>): Promise<string | undefined> {
    const path = `users/${calc.userId}/calculations`;
    try {
      const docRef = await addDoc(collection(db, path), {
        ...calc,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async getRoiCalculations(userId: string): Promise<RoiCalculation[]> {
    const path = `users/${userId}/calculations`;
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as RoiCalculation[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  // Quotation Requests
  async createQuotationRequest(request: Omit<QuotationRequest, 'id' | 'status' | 'createdAt'>): Promise<string | undefined> {
    const path = `quotations`;
    try {
      const docRef = await addDoc(collection(db, path), {
        ...request,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async getUserQuotations(userId: string): Promise<QuotationRequest[]> {
    const path = `quotations`;
    try {
      const q = query(collection(db, path), where('userId', '==', userId), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as QuotationRequest[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  }
};
