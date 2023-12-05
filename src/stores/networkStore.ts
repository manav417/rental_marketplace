import { defineStore } from "pinia";

export const NetworkStore = defineStore({
  id: "NetworkStore",
  state: () => ({
    isError: false,
    errorMessage: "",
  }),
  actions: {},
});
