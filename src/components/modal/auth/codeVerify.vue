<script setup lang="ts">
import { UserStore } from "../../../stores/userStore.js";
import AccountsService from "../../../networking/api-services/accounts.service";
</script>
<template>
  <vue-final-modal
    :click-to-close="false"
    v-model="emailVerifyModal"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
  >
    <span v-on:click="emailVerifyModal=false" class="cursor-pointer"><svg class="w-5 h-5  float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
    <span class="text-xl font-bold text-center mt-4">
      <slot name="title">Verify your email address</slot>
    </span>
    <span class="text-xs text-center mt-2">
      We've sent a 6-digit verification code to <br/>
      <span class="text-xs text-blue-500">{{register_email}}</span>
    </span>
    <div class="flex-grow overflow-y-auto py-3">
      <form class="owner-rez-form">
        <div class="space-y-2">
          <div>
            <input type="text" v-model="digitalCode" name="accountId" placeholder="6-digit code"
              class="w-full px-3 py-2 text-blue-800 border border-blue-300 rounded-md bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-300">
          </div>
          <div class="flex gap-x-2">
            <button type="button" @click="verifyCode" class="w-72 px-8 py-2 text-blue-100 bg-blue-600 rounded-md">Verify</button>
          </div>
          <div class="text-center mt-2">
            <span class="text-xs text-center mt-2">
              Didn't get your email? <span class="text-xs text-blue-500"> Resend the code</span> or <br/>
              <span class="text-xs text-blue-500 cursor-pointer" @click="emailUpdateModal=true">update your email address</span>.
            </span>
          </div>
        </div>
      </form>
    </div>
  </vue-final-modal>
</template>

<script lang="ts">
export default {
  name: "VTailwindModal",
  inheritAttrs: false,
  emits: ["close"],
  data() {
    const data = {
      emailVerifyModal: true,
      register_firstName: '' as string,
      register_lastName: '' as string,
      register_email: '' as string,
      register_password: '' as string,
      digitalCode: '' as string,
      emailUpdateModal: false,
    };
    return data;
  },
  mounted() {
  },
  methods: {
    register() {
      const data = {
        email: this.register_email,
        password: this.register_password,
        profile: {
          first_name: this.register_firstName,
          last_name: this.register_lastName,
        },
      };
      const userStore = UserStore();
      AccountsService.register(data)
        .then(() => {
          const form = new FormData();
          form.append("username", this.register_email);
          form.append("password", this.register_password);
          return AccountsService.logInUser(form);
        })
        .then(() => {
          return AccountsService.getUser();
        })
        .then(() => {
          this.$router.push(userStore.getLoginRoute());
        });
    },
    verifyCode() {
      this.emailVerifyModal = false;
    }
  }
};
</script>
