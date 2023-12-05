import { UserStore } from "../../stores/userStore";
import axios from "axios";

export default {
  async register(data: any): Promise<any> {
    return axios.post(
      `${import.meta.env.VITE_CONIFER_API}/users/register`,
      data
    )
  },

  async addIntegration(data: any, label_id: any): Promise<any> {
    const userStore = UserStore();
    return axios.post(
      `${import.meta.env.VITE_CONIFER_API}/listings/labels/${label_id}/integrations`,
        data,
        {headers: { Authorization: `Bearer ${userStore.accessToken}` }},
    )
  },

  async createLabel(name: any): Promise<any> {
    const userStore = UserStore();
    return axios.post(
      `${import.meta.env.VITE_CONIFER_API}/listings/labels`,
        {name: name},
        {headers: { Authorization: `Bearer ${userStore.accessToken}` }},

    )
  },
  async deleteUser(id: any): Promise<any> {
    const userStore = UserStore();
    return axios.post(
      `${import.meta.env.VITE_CONIFER_API}/users/delete`,
        {id: userStore.user_id},
        {headers: { Authorization: `Bearer ${userStore.accessToken}` }},

    )
  },

  async forgotPassWord(data: any): Promise<any> {
    const userStore = UserStore();
    return axios.post(
      `${import.meta.env.VITE_CONIFER_API}/users/forgot-password`,
        data,
        {headers: { Authorization: `Bearer ${userStore.accessToken}` }},

    )
  },

  async faceBookAuth(token: any): Promise<any> {
    return axios.post(
      `${import.meta.env.VITE_CONIFER_API}/facebook/login`,
      {access_token: token}
    ).then((response) => {
      const userStore = UserStore();
      userStore.accessToken = response.data.access_token;
      userStore.email = response.data.email;
      userStore.isLoggedIn = true;
      return response;
    })
  },

  async googleAuth(token: any): Promise<any> {
    return axios.post(
      `${import.meta.env.VITE_CONIFER_API}/google/login`,
      {access_token: token}
    ).then((response) => {
      const userStore = UserStore();
      userStore.accessToken = response.data.access_token;
      userStore.email = response.data.email;
      userStore.isLoggedIn = true;
      return response;
    })
  },

  async profile_switch(any: any): Promise<any> {
    const userStore = UserStore();
    userStore.profile_switch = any
  },

  async logInUser(formData: FormData): Promise<any> {
    return axios
      .post(`${import.meta.env.VITE_CONIFER_API}/users/jwt/login`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const userStore = UserStore();
        userStore.accessToken = response.data.access_token;
        userStore.email = formData.get("username") as string;
        userStore.isLoggedIn = true;
        return response;
      });
  },

  async getLocation(): Promise<any> {
    return axios
      .get('https://ipapi.co/json', {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response);
        return response;
      });
  },
  
  async logInTrapdoor(formData: FormData): Promise<any> {
    return axios
      .post(
        `${import.meta.env.VITE_CONIFER_API}/users/login/trapdoor`, formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        const userStore = UserStore();
        userStore.accessToken = response.data.access_token;
        userStore.email = formData.get("username") as string;
        userStore.isLoggedIn = true;
        return response;
      });
  },

  async getUser(): Promise<any> {
    const userStore = UserStore();
    return axios
      .get(`${import.meta.env.VITE_CONIFER_API}/users/me`, {
        headers: { Authorization: `Bearer ${userStore.accessToken}` },
      })
      .then((response) => {
        userStore.email = response.data.email;
        const host_profile = response.data.host_profile;
        const guest_profile = response.data.profile;
        const profile_id = response.data.profile.id;
        userStore.user_id = response.data.id;
        userStore.receive_marketing_emails = response.data.profile.receive_marketing_emails;
        userStore.isVerify = response.data.is_verified;
        if (!(host_profile || guest_profile)) {
          userStore.hasProfile = false;
        } else {
          userStore.hasProfile = true;

          if (host_profile) {
            userStore.hostProfileID = host_profile.id;

            if (host_profile.integrations.ownerrez) {
              userStore.ownerRezData = host_profile.integrations.ownerrez;
              console.log(userStore.ownerRezData);
            }
            if (host_profile.integrations.airbnb) {
              userStore.airBnBData = host_profile.integrations.airbnb;
            }

            if (host_profile.integrations.vrbo) {
              userStore.vrboData = host_profile.integrations.vrbo;
            }
          } else {
            if (guest_profile) {
              userStore.profile_switch = 2;
            }
          }
        }
        return response;
      });
  },

  async createHostProfile(): Promise<any> {
    const userStore = UserStore();
    return axios
      .post(
        `${import.meta.env.VITE_CONIFER_API}/users/host_profile`,
        {},
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((response) => {
        const host_profile = response.data;
        userStore.hostProfileID = host_profile.id;
        userStore.integrationID = host_profile.integrations?.id;
        userStore.hasProfile = true;

        return response;
      });
  },

  async updateProfile(data: any): Promise<any> {
    const userStore = UserStore();
    return axios
      .put(
        `${import.meta.env.VITE_CONIFER_API}/users/user_profile`,
        data,
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((response) => {
        return response.data;
      });
  },

  async createGuestProfile(): Promise<any> {
    const userStore = UserStore();
    userStore.profile_switch = 2;
    return true
  },

  async createStayPage(data: any): Promise<any> {
    const userStore = UserStore();
    return axios
      .post(
        `${import.meta.env.VITE_CONIFER_API}/favorites`,
        data,
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((response) => {
        return response;
      });
  },

  async editStayPage(data: any): Promise<any> {
    const userStore = UserStore();
    return axios
      .patch(
        `${import.meta.env.VITE_CONIFER_API}/favorites/${data.id}`,
        {name: data.name},
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((response) => {
        return response;
      });
  },

  async deleteStayPage(id: any): Promise<any> {
    const userStore = UserStore();
    return axios
      .delete(
        `${import.meta.env.VITE_CONIFER_API}/favorites/${id}`,
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((response) => {
        return response;
      });
  },

  async getStayPages(): Promise<any> {
    const userStore = UserStore();
    return axios
      .get(
        `${import.meta.env.VITE_CONIFER_API}/favorites`,
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((response) => {
        return response.data;
      });
  },

  async getListsByFavorite(id: any): Promise<any> {
    const userStore = UserStore();
    return axios
      .get(
        `${import.meta.env.VITE_CONIFER_API}/favorites/${id}`,
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((response) => {
        return response.data;
      });
  },

  async addStayPage(ids: any): Promise<any> {
    const userStore = UserStore();
    return axios
      .post(
        `${import.meta.env.VITE_CONIFER_API}/favorites/${ids.page_id}/toggle-listing`,
        {id: ids.list_id},
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((response) => {
        return response.data;
      });
  },

  async sendVerifyCode(email: any): Promise<any> {
    const userStore = UserStore();
    return axios
      .post(
        `${import.meta.env.VITE_CONIFER_API}/users/request-verify-token`,
        {email: userStore.email},
        { headers: { Authorization: `Bearer ${userStore.accessToken}` } }
      )
      .then((response) => {
        return response.data;
      });
  },
};
