import { create } from 'zustand';
import { User, Message, ScheduleItem, Test } from '../types';

interface AppState {
  user: User | null;
  messages: Message[];
  schedule: ScheduleItem[];
  tests: Test[];
  users: User[];
  setUser: (user: User | null) => void;
  addMessage: (message: Message) => void;
  addCoins: (amount: number) => void;
  clickCard: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  messages: [],
  schedule: [],
  tests: [],
  users: [],
  
  setUser: (user) => set({ user }),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
    user: state.user ? {
      ...state.user,
      coins: state.user.coins + 1
    } : null
  })),
  
  addCoins: (amount) => set((state) => ({
    user: state.user ? {
      ...state.user,
      coins: state.user.coins + amount
    } : null
  })),
  
  clickCard: () => set((state) => ({
    user: state.user ? {
      ...state.user,
      coins: state.user.coins + 5
    } : null
  }))
}));