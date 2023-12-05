<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { UserStore } from "../../../stores/userStore.js";
</script>
<template>
  <vue-final-modal
    :click-to-close="false"
    v-model="emailVerifyModal"
    classes="flex justify-center items-start mt-16"
    content-class="relative flex flex-col max-h-full mx-4 p-10 border dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900 sm:w-[560px] w-full"
  >
    <span v-on:click="verifyEmail" class="cursor-pointer absolute top-4 right-4"><svg class="w-6 h-6 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
    <div class="flex justify-center items-center mt-6">
      <span class="text-[#DE774A] text-[32px] font-bold">Email Verification</span>
    </div>
    <span class="text-[] text-center mt-2">
      Please check you email. We’ve sent a verification link to
      <br/>
      <span class="text-[18px] text-[#DE774A] underline">{{email}}</span>
    </span>
    <div class="flex-grow overflow-y-auto py-3">
      <form class="owner-rez-form">
        <div class="space-y-2">
          <div class="text-center mt-6">
            <p class="text-[18px] text-center mt-2">
              Didn't get your email?
            </p>
            <p>
              <span class="cursor-pointer text-[18px]  text-[#DE774A] underline" @click="resendVerifyCode"> Resend </span>
              <span> Or </span>
              <span class="cursor-pointer text-[18px]  text-[#DE774A] underline" @click="updateEmail"> Update your email address </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  </vue-final-modal>
</template>
<script lang="ts">
  export default {
    data() {
      const userStore = UserStore();
      const { email: email } = storeToRefs(userStore);
      const data = {
        email: email
      };
      return data;
    },
    mounted() {
    },
    methods: {
    },
    props: ['emailVerifyModal', 'close', 'verifyEmail', 'resendVerifyCode', 'updateEmail']
  };
</script>

