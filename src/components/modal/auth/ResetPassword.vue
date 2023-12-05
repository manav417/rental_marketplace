<script setup lang="ts">
import { UserStore } from "../../../stores/userStore.js";
import AccountsService from "../../../networking/api-services/accounts.service";
</script>
<template>
  <vue-final-modal
    :click-to-close="false"
    v-model="showResetPassword"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full mx-4 p-10 border dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900  w-full sm:w-[560px]"
  >
    <div class='overflow-y-auto'>
      <span v-on:click="close" class="cursor-pointer absolute top-4 right-6"><svg class="w-6 h-6 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
      <div class="flex justify-between items-center">
        <span class="text-[#DE774A] text-[24px] font-bold">Create a new password</span>
      </div>
      <div class="flex-grow overflow-y-auto py-2">
        <p class="text-red-500 mb-1" v-if="register_sever_error!=''">{{register_sever_error}}</p>
        <div class="space-y-2">
          <p class="text-black-300">Enter your new password. It must contain the following:</p>
          <ul class="mt-2 px-3 text-black-300 mb-4">
            <li v-if="!contains_eight_characters  && register_password !=''">· at least 8 characters</li>
            <li v-if="!contains_uppercase && register_password !=''">· an upper and lower letter</li>
            <li v-if="!contains_number && register_password !=''">· a number</li>
            <li v-if="!contains_special_character && register_password !=''">· a symbol (#!%)</li>
          </ul>
          <div class="relative">
            <input @focus="is_focus_password=true"  :type="is_password ? 'text' : 'password'"  @input="checkPassword"  v-model="register_password" name="password" placeholder="Password"
            class="h-[50px] w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
            <span class="absolute right-4 top-[15px]" @click="is_password = !is_password">
              <svg width="32" height="20" viewBox="0 0 32 20"  xmlns="http://www.w3.org/2000/svg">
                <path :fill="is_focus_password ? '#A7A7A7' : '#DEDEDE'" fill-rule="evenodd" clip-rule="evenodd" d="M0 9.9958C0 10.1688 15.1354 32.4184 32 9.9958C15.1354 -12.4143 0 9.83532 0 9.9958ZM16 18C20.4074 18 24 14.4041 24 9.99372C24 5.58332 20.4069 2 16 2C11.5931 2 8 5.59589 8 9.99372C8 14.3915 11.5931 18 16 18ZM20 9.99322C20 12.1988 18.2024 14 16 14C13.7982 14 12 12.1993 12 9.99322C12 7.78712 13.7982 6 16 6C18.2018 6 20 7.78767 20 9.99322Z"/>
              </svg>
            </span>
          </div>
          <div class="relative">
            <input :type="is_password_confirm ? 'text' : 'password'" @focus="is_focus_confirm=true" v-model="confirm_register_password" name="password" placeholder="Confirm Password" @input="confirmPassword"
            class="h-[50px] w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
            <p class="text-red-500 mt-1" v-if="register_confirm_password_error!=''">{{register_confirm_password_error}}</p>
            <span class="absolute right-4 top-[15px]" @click="is_password_confirm = !is_password_confirm">
              <svg width="32" height="20" viewBox="0 0 32 20"  xmlns="http://www.w3.org/2000/svg">
                <path :fill="is_focus_confirm ? '#A7A7A7' : '#DEDEDE'" fill-rule="evenodd" clip-rule="evenodd" d="M0 9.9958C0 10.1688 15.1354 32.4184 32 9.9958C15.1354 -12.4143 0 9.83532 0 9.9958ZM16 18C20.4074 18 24 14.4041 24 9.99372C24 5.58332 20.4069 2 16 2C11.5931 2 8 5.59589 8 9.99372C8 14.3915 11.5931 18 16 18ZM20 9.99322C20 12.1988 18.2024 14 16 14C13.7982 14 12 12.1993 12 9.99322C12 7.78712 13.7982 6 16 6C18.2018 6 20 7.78767 20 9.99322Z"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="mt-4 space-y-2">
          <div class="flex gap-x-2">
            <button v-on:click="submit" type="button" class="w-full px-8 py-2 tex-bold text-white bg-[#F3A24D] rounded-3xl font-bold">Reset Password</button>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script lang="ts">
export default {
  data() {
    const data = {
      register_password: '',
      register_sever_error: '',
      register_password_error: '',
      confirm_register_password: '',
      register_confirm_password_error: '',
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      receive_marketing_emails: false,
      is_focus_password: false,
      is_password: false,
      is_focus_confirm: false,
      is_password_confirm: false
    };
    return data;
  },
  mounted() {
  },
  methods: {

    checkPassword() {
      this.password_length = this.register_password.length;
			const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

      if (this.password_length > 8) {
        this.contains_eight_characters = true;
      } else {
        this.contains_eight_characters = false;
			}

      this.contains_number = /\d/.test(this.register_password);
      this.contains_uppercase = /[A-Z]/.test(this.register_password);
			this.contains_special_character = format.test(this.register_password);

      if (this.contains_eight_characters === true &&
					this.contains_special_character === true &&
					this.contains_uppercase === true &&
					this.contains_number === true) {
						this.valid_password = true;
      } else {
        this.valid_password = false;
      }
    },

    confirmPassword() {
      if(this.register_password == this.confirm_register_password) {
        this.register_confirm_password_error = '';
      }
    },

    submit() {
      if(!this.valid_password) {
        return false;
      }

      if(this.register_password == '' || this.register_password == null) {
        this.register_password_error = 'Password required.';
        return false;
      }
      if(this.register_password != this.confirm_register_password) {
        this.register_confirm_password_error = 'The password confirmation does not match.';
        return false;
      }

      const data = {
        token: this.token,
        password: this.register_password,
      };
      const userStore = UserStore();
      AccountsService.updatePassword(data)
        .then((res) => {
          this.close();
          this.confirmPasswordModal();
        })
    }
  },
  props: ['showResetPassword', 'close', 'confirmPasswordModal', 'token']
};
</script>
