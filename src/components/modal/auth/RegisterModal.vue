<script setup lang="ts">
import { UserStore } from "../../../stores/userStore.js";
import AccountsService from "../../../networking/api-services/accounts.service";
</script>
<template>
  <vue-final-modal
    :click-to-close="false"
    v-model="showRegisterModal"
    classes="flex justify-center items-center"
    :content-class="isBecomeHost ? 'flex relative max-h-full mx-4 border rounded-3xl bg-white  w-full sm:w-[1000px] p-4 sm:p-0 h-[630px]' : 'relative flex flex-col max-h-full mx-4 p-10 border dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900  w-full sm:w-[560px]'"
  >
    <div v-if="isBecomeHost" class="w-[396px] sm:block hidden rounded-l-3xl">
      <img src="/img/host.png" class="rounded-l-3xl w-[396px] h-[630px]"/>
    </div>
    <div :class="isBecomeHost ? 'sm:w-[604px] py-12 sm:px-8 overflow-y-auto' : 'overflow-y-auto'">
      <span v-on:click="close" class="cursor-pointer absolute top-4 right-6"><svg class="w-6 h-6 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
      <div class="flex justify-between items-center">
        <span class="text-[#DE774A] text-[24px] font-bold">{{isBecomeHost ? 'Become a host!' : 'Create Account' }}</span>
        <button v-on:click="loginModalOpen" class="text-[#3A6472] bg-[#C1DDD1] w-[120px] h-[40px] text-[14px] rounded-3xl">Sign in</button>
      </div>
      <div class="flex-grow overflow-y-auto py-4 mt-3">
        <form action="." @submit.prevent="register">
          <p class="text-red-500 mb-3" v-if="register_sever_error!=''">{{register_sever_error}}</p>
          <div class="space-y-2">
            <div>
              <input type="text" v-model="register_firstName" name="firstName" placeholder="First Name"
                class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
                <p class="text-red-500 mt-1" v-if="register_first_error!='' && register_firstName==''">{{register_first_error}}</p>
            </div>
            <div>
              <input type="text" name="lastName" v-model="register_lastName" placeholder="Last Name"
              class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
                <p class="text-red-500 mt-1" v-if="register_last_error!='' && register_lastName==''">{{register_last_error}}</p>
            </div>

            <div>
              <input type="email" v-model="register_email" name="email" placeholder="Email" @input="register_validateEmail"
              class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
                <p class="text-red-500 mt-1" v-if="register_email_error!=''">{{register_email_error}}</p>
            </div>
            <div v-if="isBecomeHost">
              <input type="text" v-model="phone_number" @input="acceptNumber" name="phone" placeholder="(123) 456-7890"
              class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
                <p class="text-red-500 mt-1" v-if="register_phone_error!='' && phone_number==''">{{register_phone_error}}</p>
            </div>
            <div>
              <input type="text" v-model="how_nofi" name="howNofi" placeholder="How did you find Nofie?"
              class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
            </div>
            <div>
              <input type="password"  @input="checkPassword"  v-model="register_password" name="password" placeholder="Password"
              class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
                <ul class="mt-2 px-3 text-red-400">
                  <li v-if="!contains_eight_characters  && register_password !=''">* 8 Characters</li>
                  <li v-if="!contains_number && register_password !=''">* Contains Number</li>
                  <li v-if="!contains_uppercase && register_password !=''">* Contains Uppercase</li>
                  <li v-if="!contains_special_character && register_password !=''">* Contains Special Character</li>
                </ul>
            </div>
            <div>
              <input type="password"  v-model="confirm_register_password" name="password" placeholder="Confirm Password" @input="confirmPassword"
              class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
              <p class="text-red-500 mt-1" v-if="register_confirm_password_error!=''">{{register_confirm_password_error}}</p>
            </div>
          </div>
          <div class="mt-4 space-y-2">
            <div class="flex items-center pl-2">
              <input v-model="receive_marketing_emails" id="checkbox" type="checkbox" value="" class="w-5 h-5 text-[#F3A24D] bg-gray-100 rounded border-gray-300 focus:ring-white dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring- dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox" class="ml-2 text-[14px] font-medium text-gray-900 dark:text-gray-300">Yes! I’d like to stay in touch and receive updates on Nofie.</label>
          </div>
          </div>
          <div class="mt-4 space-y-2">
            <div class="flex gap-x-2">
              <button v-on:click="register" type="button" class="w-full px-8 py-2 tex-bold text-white bg-[#F3A24D] rounded-3xl font-bold">{{isBecomeHost ? 'Become a host' : 'Create Account' }}</button>
            </div>
          </div>
        </form>
        <div class="mt-2 flex items-center">
          <hr class="w-1/2 mt-0"/>
          <span class="mt-0 px-4">Or</span>
          <hr class="w-1/2 mt-0"/>
        </div>
        <div class="sm:flex justify-center">
          <div class="mt-3 space-y-2">
            <div class="flex gap-x-2">
                <div
                    id="signin_button" class="flex justify-center w-full rounded-3xl"
                  >
                </div>
            </div>
          </div>
          <div class="mt-3 space-y-2 sm:ml-2">
            <div class="flex gap-x-2 justify-center">
              <button @click="facebookLogin" type="button" class="border w-52 py-2 items-center rounded-md flex px-3 justify-between">
                <img src="/img/facebook.svg" alt="facebook" class="w-6"/>
                <span class="text-sm">Continue with Facebook</span>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-2 space-y-1">
          <p class="text-[14px] text-center">By creating your account, you agree to our
            <a class="hover:underline cursor-pointer text-[#DE774A]">Terms of user</a> and <a class="text-[#DE774A] hover:underline cursor-pointer">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script lang="ts">
export default {
  data() {
    const data = {
      how_nofi: '' as string,
      // isBecomeHost: false,
      register_sever_error: '',
      isSocial: false,
      register_firstName: '' as string,
      register_lastName: '' as string,
      register_email: '' as string,
      register_password: '' as string,
      login_email_error: '',
      login_password_error: '',
      register_email_error: '',
      register_first_error: '',
      register_last_error: '',
      register_phone_error: '',
      register_password_error: '',
      phone_number: '' as string,
      confirm_register_password: '',
      register_confirm_password_error: '',
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      receive_marketing_emails: false
    };
    return data;
  },
  mounted() {
  },
  methods: {
    register_validateEmail() {
      if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.register_email)) {
        this.register_email_error = ''
        return true;
      }else{
        false
      }
    },

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

    acceptNumber() {
      var x = this.phone_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.phone_number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    },
    loginModalOpen() {
      this.close();
      this.openLoginModal(true);
    },
    register() {
      if(!this.valid_password) {
        return false;
      }
      if(this.register_firstName == '' || this.register_firstName == null) {
        this.register_first_error = 'First Name required.';
        return false;
      }
      if(this.register_lastName == '' || this.register_lastName == null) {
        this.register_last_error = 'Last Name required.';
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
      if(this.register_email == '') {
        this.register_email_error = 'Email required.';
        return false;
      }else{
        var verified = this.register_validateEmail();
        if(!verified){
          this.register_email_error = 'Please enter a valid email address';
          return false;
        }
      }
      if(this.isBecomeHost) {
        if(this.phone_number == '' || this.phone_number == null) {
          this.register_phone_error = 'Phone Number required.';
          return false;
        }
      }
      const data = {
        email: this.register_email,
        password: this.register_password,
        profile: {
          first_name: this.register_firstName,
          last_name: this.register_lastName,
          phone_number: this.phone_number,
          referred_from: this.how_nofi,
          receive_marketing_emails: this.receive_marketing_emails
        },
      };
      const userStore = UserStore();
      AccountsService.register(data)
        .then((data) => {
          console.log(data);
          if(data && data.status === 201) {
            const form = new FormData();
            form.append("username", this.register_email);
            form.append("password", this.register_password);
            return AccountsService.logInUser(form);
          }else{
            this.register_sever_error = data.msg
          }
        })
        .then(() => {
          return AccountsService.getUser();
        })
        .then(() => {
          this.close();
          this.openEmailVerifyModal();
        });
    }
  },
  props: ['showRegisterModal', 'close', 'isStaypage', 'isBecomeHost', 'createHostProfile',  'openEmailVerifyModal', 'openLoginModal', 'facebookLogin']
};
</script>
