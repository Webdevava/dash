// store/useSidebarStore.js
import {create} from "zustand";

const useSidebarStore = create((set) => ({
  isSidebarExpanded: true,
  toggleSidebar: () =>
    set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded })),
  setSidebarExpanded: (expanded) => set({ isSidebarExpanded: expanded }),
}));

export default useSidebarStore;
