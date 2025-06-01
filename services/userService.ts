import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface UserFormData {
  name: string;
  email: string;
  country: string;
  timestamp: Date;
  quizResults?: {
    profession: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    answers: string[];
    timestamp: Date;
  };
}

export const submitUserForm = async (data: Omit<UserFormData, 'timestamp'>) => {
  try {
    const userRef = collection(db, 'users');
    const docRef = await addDoc(userRef, {
      ...data,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};

export const saveQuizResults = async (userId: string, results: UserFormData['quizResults']) => {
  try {
    const quizRef = collection(db, 'quiz_results');
    const docRef = await addDoc(quizRef, {
      userId,
      ...results,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving quiz results:', error);
    throw error;
  }
};