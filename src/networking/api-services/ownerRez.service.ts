import { UserStore } from "../../stores/userStore";
import axios from "axios";

export default {
  async saveOwnerRezID(ownerRezAccountID: string): Promise<any> {
    const userStore = UserStore();
    return axios
      .post(
        `${import.meta.env.VITE_CONIFER_API}/ownerrez/integrate`,
        {
          account_id: ownerRezAccountID,
        },
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((res) => {
        console.log(res);
        return res;
      }).catch(e => {
        // get error
        console.log("===================error==========");
        console.log(e.response);
        return e.response;

      });
  },
  async syncOwnerRez(): Promise<any> {
    const userStore = UserStore();
    return axios
      .post(
        `${import.meta.env.VITE_CONIFER_API}/ownerrez/sync`,
        {},
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((response) => {
        userStore.ownerRezData = response.data;
        return response;
      }).catch((e) => {
        // handle error
        console.log("=================e=============")
        console.log(e);
      });
  },
  async removeOwnerRez(): Promise<any> {
    const userStore = UserStore();
    return axios
      .post(
        `${import.meta.env.VITE_CONIFER_API}/ownerrez/disassociate`,
        {},
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((response) => {
        userStore.ownerRezData = {};
        return response;
      });
  },
};
