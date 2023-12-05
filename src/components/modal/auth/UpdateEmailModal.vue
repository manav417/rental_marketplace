<script setup lang="ts">
    import { UserStore } from "../../../stores/userStore.js";
    import AccountsService from "../../../networking/api-services/accounts.service";
    </script>
    <template>
        <vue-final-modal
        v-model="showUpdateEmailModal"
        :click-to-close="false"
        classes="flex justify-center items-start mt-16"
        content-class="relative flex flex-col max-h-full mx-4 p-10 border dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900 sm:w-[560px] w-full"
      >
        <span v-on:click="close" class="cursor-pointer absolute top-4 right-4"><svg class="w-6 h-6 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
        <div class="mt-6">
            <p class="text-[#DE774A] text-[24px] font-bold">Update your email</p>
            <p class="text-[16px] text-[#333333] mt-2">Enter the email linked with your Nofie account.</p>
        </div>
        <div class="flex-grow overflow-y-auto py-4 mt-2">
          <div class="space-y-4">
            <div>
              <input type="email"  required v-model="email" name="email" placeholder="Email" @input="login_validateEmail"
                  class="h-[50px] w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
                  <p class="text-red-500 mt-1" v-if="email_error!=''">{{email_error}}</p>
            </div>

          </div>
          <div class="mt-4 space-y-2">
            <div class="flex gap-x-2">
              <button v-on:click="submit" type="button" class="w-full px-8 py-2 text-white font-bold bg-[#F3A24D] hover:bg-[#3A6472] rounded-3xl">Submit</button>
            </div>
          </div>
        </div>
      </vue-final-modal>
    </template>

    <script lang="ts">
    export default {
      data() {
        const data = {
          email_error: '',
          email: '' as string,
        };
        return data;
      },
      mounted() {
      },
      methods: {
        submit() {
          if(this.email == '') {
            this.email_error = 'Email required.';
            return false;
          }else{
            var verified = this.login_validateEmail();
            if(!verified){
              this.email_error = 'Please enter a valid email address';
              return false;
            }
          }

          const userStore = UserStore();
          
          AccountsService.updateEmail({email: this.email})
            .then(() => {
              AccountsService.getUser();
              this.emailUpdated();
              // return AccountsService.getUser();
            })
          },
          login_validateEmail() {
              if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) {
                  this.email_error = ''
                  return true;
              }else{
                  false
              }
          },
      },
      props: ['showUpdateEmailModal', 'close', 'confirmEmail', 'forgotPassword', 'emailUpdated']
    };
    </script>
