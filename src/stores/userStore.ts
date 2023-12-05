import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const UserStore = defineStore({
  id: "UserStore",
  state: () => ({
    isLoggedIn: useStorage("isLoggedIn", false),
    email: useStorage("email", ""),
    receive_marketing_emails: useStorage("receive_marketing_emails", false),
    accessToken: useStorage("accessToken", ""),
    hasProfile: useStorage("hasProfile", false),
    hostProfileID: useStorage("hostProfileID", ""),
    integrationID: useStorage("integrationID", ""),

    isError: false,
    profile_switch: useStorage("profile_switch", 1),

    isVerify: useStorage("isVerify", false),
    isNewsletter: useStorage("isNewsletter", true),
    is_login: useStorage('is_login', false),

    ownerRezData: useStorage("ownerRezData", {}),
    airBnBData: useStorage("airBnBData", {}),
    vrboData: useStorage("vrboData", {}),
    user_pic: useStorage("user_pic", null),
    user_id: useStorage("user_id", null),
    clickedMakers: useStorage("clickedMakers", new Array())
  }),
  actions: {
    logout() {
      this.isLoggedIn = false;
      this.email = "";
      this.accessToken = "";
      this.hasProfile = false;
      this.hostProfileID = "";
      this.integrationID = "";
      this.profile_switch = 1;
      this.isVerify = false;
      this.ownerRezData = {};
      this.airBnBData = {};
      this.vrboData = {};
      this.user_pic = null;
      this.user_id = null;
      this.clickedMakers = new Array();
      this.receive_marketing_emails = false

    },
    getLoginRoute(lat: any, long: any): string {
      let route = "";

      if (this.hostProfileID) {
        route = "/my-listings";
      } else {
        route = `/location-search?city=&state=&longitude=${long}&latitude=${lat}&beds=1&baths=1&page=0&adults=1&children=0&pets=0`;
      }

      return route;
    },
  },
});
