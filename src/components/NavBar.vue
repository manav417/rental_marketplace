<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import AccountsService from "../networking/api-services/accounts.service";
  import { UserStore } from "../stores/userStore.js";
  import LogOut from "./LogOut.vue";
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
  import RegisterModal from './modal/auth/RegisterModal.vue';
  import ResetPassword from './modal/auth/ResetPassword.vue';
  import LoginModal from './modal/auth/Login.vue';
  import ConfirmEmailModal from './modal/auth/ConfirmEmailModal.vue';
  import ForgotPassword from './modal/auth/ForgotPassword.vue';
  import MailVerifyModal from './modal/auth/MailVerify.vue';
  import PhoneModal from './modal/auth/PhoneModal.vue';
  import ConfirmPasswordModal from './modal/auth/ConfirmPasswordModal.vue';
  import UpdateEmailModal from './modal/auth/UpdateEmailModal.vue';

</script>

<template>
  <nav class="border-gray-200 py-3 desktop:py-0 dark:bg-gray-900 bg-white px-4 desktop:px-0">
    <div class="container flex flex-wrap justify-between items-center mx-auto tablet:px-5">
      <div class="flex">
        <RouterLink to="/" class="flex items-center">
            <img src="/img/logo.svg" class="mr-3 h-6 desktop:h-9" alt="Logo" />
        </RouterLink>
      </div>
      <button v-on:click="openMobileMenu" data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg desktop:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg v-if="!mobileMenu" class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        <svg v-else class="w-6 h-6 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      <div v-if="mobileMenu" class="w-full desktop:w-auto order-2" id="navbar-default">
        <ul class="text-[20px] flex items-center flex-col p-4 pr-0 mt-4 rounded-lg border border-gray-100 desktop:flex-row desktop:space-x-8 desktop:mt-0  desktop:border-0 dark:bg-gray-800 desktop:dark:bg-gray-900 dark:border-gray-700 w-full">
          <li v-if="hostProfileID">
            <RouterLink to="/my-listings" class="block py-2 pr-4 pl-3 text-[#3A6472] rounded hover:bg-gray-100 desktop:hover:bg-transparent desktop:border-0 desktop:hover:text-amber-500 desktop:p-0 dark:text-gray-400 desktop:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white desktop:dark:hover:bg-transparent">My Listings</RouterLink>
          </li>
          <li>
            <p @click="goToStayPages" class="cursor-pointer block py-2 pr-4 pl-3 text-[#3A6472] rounded hover:bg-gray-100 desktop:hover:bg-transparent desktop:border-0 desktop:hover:text-amber-500 desktop:p-0 dark:text-gray-400 desktop:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white desktop:dark:hover:bg-transparent">Favorites</p>
          </li>
          <li v-if="isLoggedIn">
            <RouterLink to="/profile" class=" block py-2 pr-4 pl-3 text-[#3A6472] rounded hover:bg-gray-100 desktop:hover:bg-transparent desktop:border-0 desktop:hover:text-amber-500 desktop:p-0 dark:text-gray-400 desktop:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white desktop:dark:hover:bg-transparent">Profile</RouterLink>
          </li>
          <li v-if="!isLoggedIn || (hostProfileID =='' || !hostProfileID)" class="sm:border-r-[1px] sm:pr-8 h-[40px] flex items-center">
            <button v-on:click="becomeHost" class="block py-2 pr-4 pl-3 sm:text-[#3A6472] rounded-3xl sm:bg-[#C1DDD1] w-[180px] desktop:border-0 ">Become a host</button>
          </li>
          <li>
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton class="inline-flex items-center w-full  py-2 bg-white text-sm font-medium">
                  <svg :fill="isAuth ? '#F3A24D' : 'black'" v-if="!isLoggedIn" class="text-black hover:fill-current hover:text-[#F3A24D]" width="29" height="28" viewBox="0 0 29 28" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.402832 14C0.402832 6.26818 6.67101 0 14.4028 0C22.1346 0 28.4028 6.26818 28.4028 14C28.4028 21.7318 22.1346 28 14.4028 28C6.67101 28 0.402832 21.7318 0.402832 14ZM5.37665 21.0535C3.85574 19.1087 2.94829 16.66 2.94829 14C2.94852 12.1812 3.38184 10.3887 4.2124 8.77061C5.04295 7.15256 6.24687 5.75555 7.72454 4.69516C9.2022 3.63477 10.9111 2.94149 12.7099 2.67269C14.5087 2.40389 16.3457 2.56729 18.0688 3.14937C19.7919 3.73146 21.3516 4.71549 22.6189 6.02005C23.8862 7.32461 24.8246 8.91219 25.3566 10.6514C25.8885 12.3907 25.9986 14.2316 25.6778 16.0218C25.357 17.8121 24.6145 19.5002 23.5117 20.9465C22.4413 19.5744 21.0719 18.4648 19.5077 17.7021C17.9435 16.9394 16.2258 16.5438 14.4856 16.5455C12.7225 16.5439 10.983 16.95 9.40284 17.732C7.8227 18.514 6.44476 19.6508 5.37665 21.0535ZM7.18392 22.8938C9.22317 24.5539 11.7733 25.4585 14.4028 25.4545C17.0788 25.4583 19.671 24.5213 21.7261 22.8073C20.9018 21.6565 19.8149 20.7191 18.5556 20.0727C17.2964 19.4264 15.901 19.0898 14.4856 19.0909C13.0522 19.0899 11.6398 19.4351 10.3685 20.0972C9.09726 20.7594 8.00474 21.7188 7.18392 22.8938ZM18.0028 13.7817C18.9575 12.8269 19.4938 11.5321 19.4938 10.1819C19.4938 8.83167 18.9575 7.53677 18.0028 6.58204C17.048 5.62731 15.7531 5.09095 14.4029 5.09095C13.0527 5.09095 11.7578 5.62731 10.8031 6.58204C9.84839 7.53677 9.31202 8.83167 9.31202 10.1819C9.31202 11.5321 9.84839 12.8269 10.8031 13.7817C11.7578 14.7364 13.0527 15.2728 14.4029 15.2728C15.7531 15.2728 17.048 14.7364 18.0028 13.7817ZM16.2028 11.9818C16.6802 11.5044 16.9484 10.857 16.9484 10.1819C16.9484 9.50676 16.6802 8.85932 16.2028 8.38195C15.7255 7.90459 15.078 7.63641 14.4029 7.6364C13.7278 7.63641 13.0804 7.90459 12.603 8.38195C12.1257 8.85932 11.8575 9.50676 11.8575 10.1819C11.8575 10.857 12.1257 11.5044 12.603 11.9818C13.0804 12.4591 13.7278 12.7273 14.4029 12.7273C15.078 12.7273 15.7255 12.4591 16.2028 11.9818Z"/>
                  </svg>
                  <div v-else class="rounded-full">
                    <img v-if="user_pic" class="rounded-full w-[29px] h-[29px]" :src=user_pic alt="user-logo"/>
                    <img v-else class="rounded-full w-[29px] h-[29px]" src="/img/default-logo.png" alt="user-logo"/>
                  </div>
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="origin-top-right absolute sm:right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-2">
                  <div @click="isBecomeHost =  false, isAuth = true" class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a :class="[active ? 'bg-[#F6EEE1] text-gray-900 cursor-pointer' : 'text-gray-700', 'block px-4 py-2 text-sm']">Help</a>
                    </MenuItem>
                    <MenuItem v-if="!isLoggedIn" v-slot="{ active }">
                      <a v-on:click="registerModalOpen" :class="[active ? 'bg-[#F6EEE1] text-gray-900 cursor-pointer' : 'text-gray-700', 'block px-4 py-2 text-sm']">Create Account</a>
                    </MenuItem>
                    <MenuItem v-if="!isLoggedIn" v-slot="{ active }">
                      <a  v-on:click="openLoginModal(true)" :class="[active ? 'bg-[#F6EEE1] text-gray-900 cursor-pointer' : 'text-gray-700', 'block px-4 py-2 text-sm']">Sign in</a>
                    </MenuItem>
                    <MenuItem  v-if="isLoggedIn" v-slot="{ active }">
                      <a :class="[active ? 'bg-[#F6EEE1] text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                        <LogOut class="w-full text-left"></LogOut>
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RegisterModal :showRegisterModal="showRegisterModal" :isStaypage="isStaypage" :isBecomeHost="isBecomeHost" :close="close" :openLoginModal="openLoginModal" :openEmailVerifyModal="openEmailVerifyModal" :facebookLogin="facebookLogin"/>
  <ResetPassword :showResetPassword="showResetPassword" :confirmPasswordModal="confirmPasswordModal" :token="token" :close="close"/>
  <LoginModal :showLoginModal="showLoginModal" :registerModalOpen="registerModalOpen" :facebookLogin="facebookLogin" :close="close" :forgotPassword="openForgotPasswordModal"/>
  <ForgotPassword :showForgotModal="openForgotModal" :close="close" :forgotPassword="openForgotPasswordModal" :confirmEmail="confirmEmail"/>
  <ConfirmEmailModal :openConfirmEmailModal="openConfirmEmailModal" :close="close"/>
  <MailVerifyModal :emailVerifyModal="emailVerifyModal" :close="close" :verifyEmail="verifyEmail" :resendVerifyCode="resendVerifyCode" :updateEmail="updateEmail"/>
  <PhoneModal :showPhoneModal="showPhoneModal" :isSocial="isSocial" :close="close" :createHostProfile="confirmHostProfile"/>
  <ConfirmPasswordModal :showConfirmPasswordModal="showConfirmPasswordModal" :close="close" :gotoLogin="gotoLogin"/>
  <UpdateEmailModal :showUpdateEmailModal="showUpdateEmailModal" :close="close" :emailUpdated="emailUpdated"/>
</template>

<script lang="ts">
export default {
  data() {
    const userStore = UserStore();

    const { isLoggedIn: isLoggedIn } = storeToRefs(userStore);
    const { hostProfileID: hostProfileID } = storeToRefs(userStore);
    const { isVerify: isVerify } = storeToRefs(userStore);
    const { is_login: is_login} = storeToRefs(userStore);
    const { user_pic: user_pic} = storeToRefs(userStore);
    const data = {
      isAuth: false,
      isLoggedIn: isLoggedIn,
      hostProfileID: hostProfileID,
      isVerify: isVerify,
      showLoginModal: is_login,
      mobileMenu: false,
      showRegisterModal: false,
      showCreatProfileModal: false,
      emailVerifyModal: false,
      emailUpdateModal: false,
      showPhoneModal: false,
      isBecomeHost: false,
      isSocial: false,
      showCreateAirBnbModal: false,
      isStaypage: false,
      isOptionsExpanded: false,
      selectedOption: "1x",
      laterBecome: false,
      user_pic: user_pic,
      openForgotModal: false,
      openConfirmEmailModal: false,
      showResetPassword: false,
      showConfirmPasswordModal: false,
      token: null,
      showUpdateEmailModal: false
    };
    return data;
  },
  mounted() {
    let screenWidth = screen.width;
    if(screenWidth > 768) {this.mobileMenu = true};
    window.addEventListener('load', () => {
      window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: this.handleCredentialResponse
      });

      window.google.accounts.id.renderButton(
          document.getElementById("signin_button"),
          { theme: "outline", size: "large", text: "continue_with" }  // customization attributes
      );

      window.google.accounts.id.renderButton(
        document.getElementById("signin_button_login"),
        { theme: "outline", size: "large", text: "continue_with" }  // customization attributes
      );

    });
    const queryString = window.location.search;
    const pathname = window.location.pathname;

    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    console.log(pathname)
    if(pathname === '/reset-password') {
      this.showResetPassword = true;
      this.token = token
    }

  },
  methods: {
    emailUpdated() {
      this.emailVerifyModal = true;
      this.showUpdateEmailModal = false;
    },

    updateEmail() {
      this.emailVerifyModal = false;
      this.showUpdateEmailModal = true;
     },
    gotoLogin() {
      this.showConfirmPasswordModal = false
      this.showLoginModal = true
    },
    confirmPasswordModal() {
      this.showResetPassword = false;
      this.showConfirmPasswordModal = true
    },
    confirmEmail() {
      this.openConfirmEmailModal = true
    },
    close() {
      this.showRegisterModal = false;
      this.showLoginModal = false;
      this.emailVerifyModal = false;
      this.showCreatProfileModal = false;
      this.showPhoneModal = false;
      this.isAuth = false;
      this.openForgotModal = false;
      this.openConfirmEmailModal = false;
      this.showResetPassword = false;
      this.showConfirmPasswordModal = false,
      this.showUpdateEmailModal = false
    },

    openEmailVerifyModal() {
      this.emailVerifyModal = true;
      if(this.isBecomeHost) {
        this.createHostProfile();
      }else{
        const userStore = UserStore();
        AccountsService.getLocation().then((res) => {
            this.$router.push(userStore.getLoginRoute(res.data.latitude, res.data.longitude));
        });
      }
    },

    savePhoneNumber(){
      this.showPhoneModal = false;
      this.$router.push("/my-listings");
    },

    verifyEmail() {
      this.emailVerifyModal = false;
    },

    becomeHost() {
      this.isBecomeHost = true;
      if(this.isLoggedIn) {
        this.laterBecome = true;
        this.showPhoneModal = true;
        // this.createHostProfile();
      }else{
        this.showRegisterModal = true;
      }
    },

    async handleCredentialResponse(googleUser: any) {
      let that = this;
      const userStore = UserStore();
      userStore.user_pic = jwt_decode(googleUser.credential).picture;
      AccountsService.googleAuth(googleUser.credential).then((res) => {
        if( res.status ) {
          that.showLoginModal = false;
          that.showRegisterModal = false;
          return AccountsService.getUser();
        }
      }).then(() => {
        if(that.isBecomeHost) {
          that.isSocial = true;
          that.createHostProfile();
        }else {
          if(userStore.hasProfile) {
            if(that.isStaypage) {
              that.$router.push("/stay-pages");
            }else {
              that.$router.push(userStore.getLoginRoute());
            }
            return false;
          }
          that.isSocial = true;
        }
      });
    },

    setOption(option: any) {
      this.selectedOption = option;
      this.isOptionsExpanded = false;
    },
    openMobileMenu() {
      this.mobileMenu = !this.mobileMenu;
    },

    registerModalOpen() {
      this.showLoginModal = false;
      this.showRegisterModal = true;
      this. isStaypage = false;
    },

    openLoginModal(key: boolean) {
      this.showLoginModal = key;
      this.showRegisterModal = false;
      this. isStaypage = false;
    },

    confirmHostProfile() {
      if(this.isBecomeHost) {
        if(this.isSocial) {
          this.$router.push("/my-listings");
        }else if(this.laterBecome) {
          AccountsService.createHostProfile().then(() => {
            this.$router.push("/my-listings");
          });
        }
      }
    },

    createHostProfile() {
      AccountsService.createHostProfile().then(() => {
        if(this.isBecomeHost) {
          if(this.isSocial) {
            this.showPhoneModal = true;
          }else{
            this.$router.push("/my-listings");
          }
        }
      });
    },
    resendVerifyCode() {
      const userStore = UserStore();
      return AccountsService.sendVerifyCode(userStore.email).then((res) => {
        this.emailVerifyModal = false;
      });
    },
    gotToHomepage() {
      this.$router.push("/");
      this.close();
    },
    async facebookLogin() {
      let that = this;
      const userStore = UserStore();
      await FB.login(function(response: any){
      if (!response.authResponse) return;
      FB.api("/me", {fields: "id,name,picture"}, function(res)  {
        userStore.user_pic = `${res.picture.data.url}`;
      });
      AccountsService.faceBookAuth(response.authResponse.accessToken).then((res) => {
        if( res.status ) {
          that.showLoginModal = false;
          that.showRegisterModal = false;
          return AccountsService.getUser();
        }
      }).then(() => {
        if(that.isBecomeHost) {
          if(userStore.hostProfileID) {
            that.$router.push(userStore.getLoginRoute());
          }else {
            that.isSocial = true;
            that.createHostProfile();
          }
        }else {
          if(userStore.hasProfile) {
            if(that.isStaypage) {
              that.$router.push("/stay-pages");
            }else {
              that.$router.push(userStore.getLoginRoute());
            }
            return false;
          }
          that.isSocial = true;
          // that.showCreatProfileModal = true;
        }
      });
      }, {scope: 'email, public_profile'});
    },
    goToStayPages() {
      if(this.isLoggedIn) {
        this.$router.push("/stay-pages");
      }else {
        this.isStaypage = true;
        this.showLoginModal = true;
      }
    },
    openForgotPasswordModal() {
      this.openForgotModal = true;
    }
  },
};
</script>
<style lang="css" scoped>
  #signin_button > div{
    widows: 100%;
  }
  #mc_embed_signup{
    background:#fff;
    clear:left;
    font: 14px Helvetica,Arial,sans-serif;
    width: 600px;
    text-align: center;
  }
  .focused {
    background-color: red !important;
  }
</style>
