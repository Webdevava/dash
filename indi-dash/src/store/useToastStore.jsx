import {create} from "zustand";

const useToastStore = create((set) => ({
  toastMessage: null,
  showToast: (message) => {
    set({ toastMessage: message });
    setTimeout(() => set({ toastMessage: null }), 3000);
  },
}));

export default useToastStore;
