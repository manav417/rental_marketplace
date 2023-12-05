<script setup lang="ts">
import { storeToRefs } from "pinia";
import { UserStore } from "@/stores/userStore";
import AccountsService from "../../networking/api-services/accounts.service";
</script>

<template>
  <div class="container mx-auto px-5">
    <h1 class="pb-7 text-xl font-bold mt-6">Profile</h1>
    <div class="mb-4">
      <span v-if="!isVerify" class="bg-[#F6EEE1] rounded-md px-3 py-2"><span>Your email is not verified yet. Please check your email or </span><span class="text-[#DE774A] cursor-pointer" @click="resendVeifyLink">Resend</span> <span> verification link.</span></span>
      <p class="mt-4"><span class="font-bold">Email: </span>{{ email }}</p>
      <div class="mt-4 space-y-2">
        <div class="flex items-center mr-4">
          <input v-model="receive_marketing_emails" @change="updateProfile" id="checkbox" type="checkbox" value="" class="w-5 h-5 text-[#F3A24D] bg-gray-100 rounded border-gray-300 focus:ring-white dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring- dark:bg-gray-700 dark:border-gray-600">
          <label for="checkbox" class="ml-2 text-[14px] font-medium text-gray-900 dark:text-gray-300">Yes! I’d like to stay in touch and receive updates on Nofie.</label>
        </div>
      </div>
    </div>
    <button @click="showDelteModal=true" class="font-bold">Delete Account</button>
    <vue-final-modal
      :click-to-close="false"
      v-model="showDelteModal"
      classes="flex justify-center items-center px-10"
      content-class="relative flex flex-col max-h-full mx-4 p-10 border dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900 sm:w-[560px] w-full"
    >
      <span v-on:click="showDelteModal=false" class="cursor-pointer absolute top-4 right-4"><svg class="w-6 h-6 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
      <div class="flex justify-center items-center mt-4">
        <span class="text-[#DE774A] text-[32px] font-bold">Delete Account</span>
      </div>
      <span class="text-[18px]  text-center mt-2">
        Are you sure you want to delete your Nofie account? This can NOT be undone.
      </span>
      <div class="flex-grow overflow-y-auto py-3">
      <div class="mt-4 space-y-2">
          <div class="flex gap-x-2">
            <button type="button" @click="deleteProfile" class="w-full px-8 py-2 text-white bg-[#F3A24D] rounded-3xl">Yes, I'm Sure</button>
          </div>
      </div>
      </div>
    </vue-final-modal>
    <vue-final-modal
      :click-to-close="false"
      v-model="emailVerifyModal"
      classes="flex justify-center items-center"
      content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
    >
      <span v-on:click="emailVerifyModal=false" class="cursor-pointer"><svg class="w-5 h-5  float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
      <span class="text-xl font-bold text-center mt-4">
        <slot name="title">Please check your email address</slot>
      </span>
      <span class="text-xs text-center mt-2">
        We've sent a verify link to <br/>
        <span class="text-xs text-blue-500">{{email}}</span>
      </span>
      <div class="flex-grow overflow-y-auto py-3">
        <form class="owner-rez-form">
          <div class="space-y-2">
            <!-- <div>
              <input type="text" v-model="digitalCode" name="accountId" placeholder="6-digit code"
                class="w-full px-3 py-2 text-blue-800 border border-blue-300 rounded-md bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-300">
            </div> -->
            <div class="flex gap-x-2">
              <button type="button" @click="emailVerifyModal=false" class="w-72 px-8 py-2 text-blue-100 bg-blue-600 rounded-md">Yes</button>
            </div>
          </div>
        </form>
      </div>
    </vue-final-modal>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    const userStore = UserStore();
    const { profile_switch: profile_switch } = storeToRefs(userStore);
    const { hostProfileID: hostProfileID } = storeToRefs(userStore);
    const { isVerify: isVerify } = storeToRefs(userStore);
    const { receive_marketing_emails: receive_marketing_emails } = storeToRefs(userStore);
    const data = {
      email: userStore.email,
      isVerify: isVerify,
      profile_switch: profile_switch,
      emailVerifyModal: false,
      hostProfileID: hostProfileID,
      showDelteModal: false,
      receive_marketing_emails: receive_marketing_emails
    };
    return data;
  },
  created() {
    AccountsService.getUser();
  },
  methods: {
    updateProfile() {
      const userStore = UserStore();
      return AccountsService.updateProfile({receive_marketing_emails: userStore.receive_marketing_emails}).then((res) => {
        AccountsService.getUser();
      });
    },
    resendVeifyLink() {
      const userStore = UserStore();
        return AccountsService.sendVerifyCode(userStore.email).then((res) => {
          this.emailVerifyModal = true;
        });
    },
    deleteProfile() {
      const userStore = UserStore();
      return AccountsService.deleteUser(userStore.user_id).then((res) => {
        userStore.logout();
        this.$router.push("/");
        this.showDelteModal = false;
      })
    }
  },
};
</script>
