import { create } from 'zustand';
import type { ActiveView } from './types';

interface DashboardState {
  activeView: ActiveView;
  sidebarOpen: boolean;
  setActiveView: (view: ActiveView) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
  activeView: 'dashboard',
  sidebarOpen: false,
  setActiveView: (view) => set({ activeView: view }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

export default useDashboardStore;
