import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Exercise {
  id: string;
  type: string;
  name: string;
  duration: number;
  caloriesBurned: number;
  date: string;
  sets?: number;
  reps?: number;
  weight?: number;
}

interface FitnessState {
  exercises: Exercise[];
  addExercise: (exercise: Omit<Exercise, 'id'>) => void;
  removeExercise: (id: string) => void;
  getExercisesByDate: (date: string) => Exercise[];
}

export const useFitnessStore = create<FitnessState>()(
  persist(
    (set, get) => ({
      exercises: [],
      addExercise: (exercise) =>
        set((state) => ({
          exercises: [
            ...state.exercises,
            { ...exercise, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),
      removeExercise: (id) =>
        set((state) => ({
          exercises: state.exercises.filter((exercise) => exercise.id !== id),
        })),
      getExercisesByDate: (date) =>
        get().exercises.filter((exercise) => exercise.date === date),
    }),
    {
      name: 'fitness-storage',
    }
  )
);