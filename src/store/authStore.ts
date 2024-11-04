import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Simulated user database
const users: User[] = [];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, password: string) => {
        // Simulate API call
        const user = users.find(u => u.email === email);
        if (!user) {
          throw new Error('User not found');
        }
        set({ isAuthenticated: true, user });
      },
      register: async (name: string, email: string, password: string) => {
        // Simulate API call
        if (users.some(u => u.email === email)) {
          throw new Error('Email already exists');
        }
        const newUser = {
          id: users.length + 1,
          name,
          email,
        };
        users.push(newUser);
        set({ isAuthenticated: true, user: newUser });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);