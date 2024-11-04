import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  id: number;
  name: string;
  age: number;
  weight: number;
  height: number;
  goals: string[];
  dietaryRestrictions: string[];
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active';
  targetCalories: number;
  exercisePreferences: {
    workoutTypes: string[];
    intensity: string;
    frequency: string;
    duration: string;
  };
  healthConditions: {
    conditions: string[];
    medications: string;
    injuries: string;
    additionalNotes: string;
  };
}

interface UserState {
  profile: UserProfile | null;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      updateProfile: (newProfile) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...newProfile } : newProfile as UserProfile,
        })),
    }),
    {
      name: 'user-storage',
    }
  )
);