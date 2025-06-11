
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  userType: 'client' | 'admin' | 'employee' | null;
  login: (user: User, type: 'client' | 'admin' | 'employee') => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      userType: null,
      login: (user, type) => set({ user, userType: type }),
      logout: () => set({ user: null, userType: null }),
      updateUser: (updatedUser) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updatedUser } });
        }
      },
    }),
    {
      name: 'barbershop-auth',
    }
  )
);
