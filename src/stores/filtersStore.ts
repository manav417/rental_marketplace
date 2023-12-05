import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { Filters } from "@/interfaces/Filters";

export const FiltersStore = defineStore({
  id: "FiltersStore",
  state: () => ({
    filters: {
      reviews: useStorage("reviews", "asc"),
      created: useStorage("created", "asc"),
      price: useStorage("price", "asc"),
    },
  }),
  actions: {
    setFilters(filters: Filters) {
      this.filters = filters;
    },
  },
});
