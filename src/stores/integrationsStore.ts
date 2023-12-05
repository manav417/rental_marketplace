import { defineStore } from "pinia";
import type { Integration } from "@/interfaces/Integration";

interface IntegrationsStoreState {
  integrationsList: Integration[] | null;
}

export const IntegrationsStore = defineStore({
  id: "IntegrationsStore",
  state: () =>
    ({
      integrationsList: null,
    } as IntegrationsStoreState),
  actions: {
    setList(list: Integration[]) {
      this.integrationsList = list;
    },
  },
});
