import { UserStore } from "../../stores/userStore";
import axios from "axios";
import { useStorage } from "@vueuse/core";

export default {
  async syncVrbo(data: any): Promise<any> {
    const userStore = UserStore();
    return axios
      .post(
        `${import.meta.env.VITE_CONIFER_API}/vrbo/sync`,
        {urls: data},
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((response) => {
        console.log(response);
        if(response.status === 200) {
          userStore.vrboData = response.data
        }
        return response;
      });
  },

  async startVerification(id: any): Promise<any> {
    const userStore = UserStore();
    return axios
      .post(
        `${import.meta.env.VITE_CONIFER_API}/vrbo/url/${id}/start-verification`,
        {},
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
  },

  async verifyCode(id: any, verificationCode: any): Promise<any> {
    const userStore = UserStore();
    return axios
      .post(
        `${import.meta.env.VITE_CONIFER_API}/vrbo/url/${id}/verify-code`,
        {code: verificationCode},
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
  },

  async updateConnectionUrl(id: any, connectionURL: any): Promise<any> {
    const userStore = UserStore();
    return axios
      .put(
        `${import.meta.env.VITE_CONIFER_API}/vrbo/url/${id}/update-connection-url`,
        {url: connectionURL},
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
  },

  async removeLink(id: any): Promise<any> {
    const userStore = UserStore();
    return axios
      .delete(
        `${import.meta.env.VITE_CONIFER_API}/vrbo/url/${id}`,
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((response) => {
        console.log(response);
        if(response.status === 200) {
          userStore.vrboData = response.data;
        }
        return response;
      });
  },

};
