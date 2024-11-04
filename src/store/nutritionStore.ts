import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

interface NutritionState {
  meals: Meal[];
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  removeMeal: (id: string) => void;
  getMealsByDate: (date: string) => Meal[];
  getDailyNutrition: (date: string) => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const useNutritionStore = create<NutritionState>()(
  persist(
    (set, get) => ({
      meals: [],
      addMeal: (meal) =>
        set((state) => ({
          meals: [
            ...state.meals,
            { ...meal, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),
      removeMeal: (id) =>
        set((state) => ({
          meals: state.meals.filter((meal) => meal.id !== id),
        })),
      getMealsByDate: (date) => get().meals.filter((meal) => meal.date === date),
      getDailyNutrition: (date) => {
        const meals = get().getMealsByDate(date);
        return meals.reduce(
          (acc, meal) => ({
            calories: acc.calories + meal.calories,
            protein: acc.protein + meal.protein,
            carbs: acc.carbs + meal.carbs,
            fat: acc.fat + meal.fat,
          }),
          { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );
      },
    }),
    {
      name: 'nutrition-storage',
    }
  )
);