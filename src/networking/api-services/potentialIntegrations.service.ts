import axios from "axios";
import { UserStore } from "@/stores/userStore";
import { IntegrationsStore } from "@/stores/integrationsStore";
import type { Integration } from "@/interfaces/Integration";

const userStore = UserStore();

export default {
  async getIntegrationsList(): Promise<Integration[]> {
    return axios
      .get(`${import.meta.env.VITE_CONIFER_API}/potential-integrations`, {
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`,
        },
      })
      .then(({ data }) => {
        const integrationsStore = IntegrationsStore();
        integrationsStore.setList(data);
        return data;
      });
  },
  async putIntegrationsList(id: string): Promise<Integration> {
    return axios.put(
      `${
        import.meta.env.VITE_CONIFER_API
      }/potential-integrations/${id}/increment`,
      null,
      {
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`,
        },
      }
    );
  },
};
