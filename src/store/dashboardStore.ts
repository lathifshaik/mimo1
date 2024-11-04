import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DashboardState {
  streak: number;
  coins: number;
  lastActivity: Date | null;
  updateStreak: () => void;
  addCoins: (amount: number) => void;
  logActivity: (activity: string, coinsEarned: number) => void;
  activities: Array<{
    id: string;
    type: string;
    timestamp: Date;
    coinsEarned: number;
  }>;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      streak: 0,
      coins: 0,
      lastActivity: null,
      activities: [],

      updateStreak: () => {
        const { lastActivity } = get();
        const now = new Date();
        const lastDate = lastActivity ? new Date(lastActivity) : null;

        if (!lastDate) {
          set({ streak: 1, lastActivity: now });
          return;
        }

        const isConsecutiveDay = 
          now.getDate() - lastDate.getDate() === 1 ||
          (now.getDate() === 1 && lastDate.getMonth() !== now.getMonth());

        if (isConsecutiveDay) {
          set(state => ({ streak: state.streak + 1, lastActivity: now }));
        } else if (now.getDate() !== lastDate.getDate()) {
          set({ streak: 1, lastActivity: now });
        }
      },

      addCoins: (amount: number) => {
        set(state => ({ coins: state.coins + amount }));
      },

      logActivity: (type: string, coinsEarned: number) => {
        const activity = {
          id: Math.random().toString(36).substr(2, 9),
          type,
          timestamp: new Date(),
          coinsEarned
        };

        set(state => ({
          activities: [activity, ...state.activities].slice(0, 50),
          coins: state.coins + coinsEarned
        }));

        get().updateStreak();
      }
    }),
    {
      name: 'dashboard-storage'
    }
  )
);