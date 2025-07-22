import { create } from "zustand";
import { axiosInstance } from "../config/axiosConfig";
import toast from "react-hot-toast";

export const useAIStore = create((set, get) => ({
  query: "",
  response: "",
  loading: false,

  setQuery: (query) => set({ query }),

  askAI: async () => {
    const state = get();
    if (!state.query.trim()) return;
    set({ loading: true, response: "" });
    try {
      const res = await axiosInstance.post("/ai/ask", { prompt: state.query });
      set({ response: res.data.reply });
    } catch (error) {
      console.error("Error from API:", error);
      set({ response: "Something went wrong." });
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
}));
