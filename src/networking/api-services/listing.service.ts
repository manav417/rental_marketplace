import { UserStore } from "../../stores/userStore";
import axios from "axios";

const userStore = UserStore();

export default {
  async listListingLabels(): Promise<any> {
    const userStore = UserStore();
    return axios
      .get(`${import.meta.env.VITE_CONIFER_API}/listings/labels`, {
        headers: { Authorization: `Bearer ${userStore.accessToken}` },
      })
      .then((response) => {
        console.log(response);
        return response;
      });
  },

  async addIntegration(data: any, label_id: string): Promise<any> {
    const userStore = UserStore();
    return axios.post(
      `${
        import.meta.env.VITE_CONIFER_API
      }/listings/labels/${label_id}/integrations`,
      data,
      { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
    );
  },

  async syncLabel(label_id: string): Promise<any> {
    const userStore = UserStore();
    return axios.post(
      `${
        import.meta.env.VITE_CONIFER_API
      }/listings/labels/${label_id}/sync`,
      {},
      { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
    );
  },

  async startVerification(id: any, label_id: string): Promise<any> {
    const userStore = UserStore();
    return axios.post(
      `${
        import.meta.env.VITE_CONIFER_API
      }/listings/labels/${label_id}/integrations/${id}/start-verification`,
      {},
      { headers: { Authorization: `Bearer ${userStore.accessToken}` } },
    );
  },

  async sendCode(data: any, label_id: string): Promise<any> {
    const userStore = UserStore();
    return axios.post(
      `${
        import.meta.env.VITE_CONIFER_API
      }/listings/labels/${label_id}/integrations/${data.id}/verify-code`,
      {code: data.verification_code},
      { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
    );
  },

  async deleteIntegration(
    label_id: string,
    integration_id: string
  ): Promise<any> {
    const userStore = UserStore();
    return axios.delete(
      `${
        import.meta.env.VITE_CONIFER_API
      }/listings/labels/${label_id}/integrations/${integration_id}`,
      { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
    );
  },

  async createLabel(name: any): Promise<any> {
    const userStore = UserStore();
    return axios.post(
      `${import.meta.env.VITE_CONIFER_API}/listings/labels`,
      { name: name },
      { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
    );
  },

  async listLisings(): Promise<any> {
    return axios.get(`${import.meta.env.VITE_CONIFER_API}/listings/search`, {
      headers: { Authorization: `Bearer ${userStore.accessToken}` },
    });
  },

  async getListing(id: string): Promise<any> {
    const now = new Date().getTime();
    return axios.get(
      `${import.meta.env.VITE_CONIFER_API}/listings/${id}?timestamp=${now}`
    );
  },

  async getFavoritePages(id: string): Promise<any> {
    return axios.get(
      `${import.meta.env.VITE_CONIFER_API}/listings/${id}/favorites-containers`,
      {
        headers: { Authorization: `Bearer ${userStore.accessToken}` },
      }
    );
  },

  async getLabel(id: any): Promise<any> {
    const now = new Date().getTime();
    return axios.get(`${import.meta.env.VITE_CONIFER_API}/listings/labels/${id}?timestamp=${now}`,
      {
        headers: { Authorization: `Bearer ${userStore.accessToken}` },
      }
    );
  },
};
