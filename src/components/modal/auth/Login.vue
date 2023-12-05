<script setup lang="ts">
    import { UserStore } from "../../../stores/userStore.js";
    import AccountsService from "../../../networking/api-services/accounts.service";
    </script>
    <template>
        <vue-final-modal
        v-model="showLoginModal"
        :click-to-close="false"
        classes="flex justify-center items-center"
        content-class="relative flex flex-col max-h-full mx-4 p-10 border dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900 sm:w-[560px] w-full"
      >
        <span v-on:click="close" class="cursor-pointer absolute top-4 right-4"><svg class="w-6 h-6 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
        <div class="flex justify-between items-center mt-6">
            <span class="text-[#DE774A] text-[32px] font-bold">Sign in</span>
            <button v-on:click="registerModalOpen" class="text-[#3A6472] bg-[#C1DDD1] w-[170px] h-[40px] text-[14px] rounded-3xl">Create Account</button>
        </div>
        <div class="flex-grow overflow-y-auto py-4 mt-3">
          <form action="." @submit.prevent="login">
            <div class="space-y-4">
              <div>
                <input type="email"  required v-model="login_email" name="email" placeholder="Email" @input="login_validateEmail"
                    class="h-[50px] w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
                    <p class="text-red-500 mt-1" v-if="login_email_error!=''">{{login_email_error}}</p>
              </div>
              <div class="relative">
                <input 
                  :type="is_password ? 'text' : 'password'"
                  required 
                  v-model="login_password" 
                  name="password" 
                  placeholder="Password"
                  class="w-full px-3 h-[50px]  py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]"
                  @focus="is_focus=true"
                >
                  <span class="absolute right-4 top-[15px]" @click="is_password = !is_password">
                    <svg width="32" height="20" viewBox="0 0 32 20"  xmlns="http://www.w3.org/2000/svg">
                      <path :fill="is_focus ? '#A7A7A7' : '#DEDEDE'" fill-rule="evenodd" clip-rule="evenodd" d="M0 9.9958C0 10.1688 15.1354 32.4184 32 9.9958C15.1354 -12.4143 0 9.83532 0 9.9958ZM16 18C20.4074 18 24 14.4041 24 9.99372C24 5.58332 20.4069 2 16 2C11.5931 2 8 5.59589 8 9.99372C8 14.3915 11.5931 18 16 18ZM20 9.99322C20 12.1988 18.2024 14 16 14C13.7982 14 12 12.1993 12 9.99322C12 7.78712 13.7982 6 16 6C18.2018 6 20 7.78767 20 9.99322Z"/>
                    </svg>
                  </span>
                  <p class="text-red-500 mt-1" v-if="login_password_error!='' && login_password==''">{{login_password_error}}</p>
              </div>
            </div>
          </form>
          <div class="mt-4 space-y-2">
            <a href="#" class="text-xs hover:underline text-[#DE774A]" @click="forgotPassword">Forgot password?</a>
          </div>
          <div class="mt-4 space-y-2">
            <div class="flex gap-x-2">
              <button v-on:click="login" type="button" class="w-full px-8 py-2 text-white font-bold bg-[#F3A24D] rounded-3xl">Sign in</button>
            </div>
          </div>
          <div class="mt-6 flex items-center">
            <hr class="w-1/2 mt-0"/>
            <span class="mt-0 px-4">Or</span>
            <hr class="w-1/2 mt-0"/>
          </div>
          <div class="sm:flex text-center justify-center">
            <div class="mt-3 space-y-2">
                <div class="flex gap-x-2">
                    <div
                        id="signin_button_login" class="flex justify-center w-full"
                      >
                    </div>
                </div>
            </div>
            <div class="mt-3 space-y-2 sm: ml-2">
                <div class="flex gap-x-2 justify-center">
                    <button @click="facebookLogin" type="button" class="border w-52 py-2 items-center rounded-md flex px-3 justify-between">
                    <img src="/img/facebook.svg" alt="facebook" class="w-6"/>
                    <span class="text-sm">Continue with Facebook</span>
                    </button>
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
          login_email: '' as string,
          login_password: '' as string,
          is_password: false,
          is_focus: false
        };
        return data;
      },
      mounted() {
      },
      methods: {
        login(){
      if(this.login_email == '') {
        this.login_email_error = 'Email required.';
        return false;
      }else{
        var verified = this.login_validateEmail();
        if(!verified){
          this.login_email_error = 'Please enter a valid email address';
          return false;
        }
      }
      if(this.login_password == '' || this.login_password == null) {
        this.login_password_error = 'Password required.';
        return false;
      }
      const login_form = new FormData();
      login_form.append("username", this.login_email);
      login_form.append("password", this.login_password);
      const userStore = UserStore();
      AccountsService.logInUser(login_form)
        .then(() => {
          this.close();
          return AccountsService.getUser();
        })
        .then(() => {
          if(this.isStaypage) {
            this.$router.push("/stay-pages");
          }else {
            AccountsService.getLocation().then((res) => {
              this.$router.push(userStore.getLoginRoute(res.data.latitude, res.data.longitude));
            });
          }
        });
    },
        login_validateEmail() {
            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.login_email)) {
                this.login_email_error = ''
                return true;
            }else{
                false
            }
        },
        acceptNumber() {
          var x = this.phone_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
          this.phone_number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        },
      },
      props: ['showLoginModal', 'close', 'isStaypage', 'isBecomeHost', 'createHostProfile',  'openEmailVerifyModal', 'registerModalOpen', 'facebookLogin', 'forgotPassword']
    };
    </script>
