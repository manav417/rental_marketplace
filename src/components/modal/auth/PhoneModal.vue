<script setup lang="ts">
    import AccountsService from "../../../networking/api-services/accounts.service";
</script>
<template>
    <vue-final-modal
        v-model="showPhoneModal"
        classes="flex justify-center items-center"
        content-class="relative flex flex-col max-h-full mx-4 p-10 border dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900 sm:w-[560px] w-full"
    >
    <span v-on:click="close" class="cursor-pointer absolute top-4 right-4"><svg class="w-6 h-6 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
    <div class="flex justify-center items-center mt-2">
        <span class="text-[#DE774A] text-[32px] font-bold">Become a Host</span>
    </div>
      <div class="flex-grow overflow-y-auto py-4 mt-2">
        <form>
            <div class="space-y-4">
              <div>
                <input type="text" v-model="phone_number" @input="acceptNumber" name="phone" placeholder="(123) 456-7890"
                class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
                  <p class="text-red-500 mt-1" v-if="register_phone_error!='' && phone_number==''">{{register_phone_error}}</p>
                  <!-- <input type="text" v-model="phone_number" name="phone" placeholder="Phone Number"
                  class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]"> -->
              </div>
              <div v-if="isSocial">
                  <input type="text"  v-model="referred_from" name="how" placeholder="How did you find Nofie?"
                  class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
              </div>
            </div>
        </form>
        <div class="mt-6 space-y-2">
            <div class="flex gap-x-2">
                <button type="button" class="w-full px-8 py-2 text-white font-bold bg-[#F3A24D] rounded-3xl" @click="updateProfile">Next</button>
            </div>
        </div>
        </div>
    </vue-final-modal>
</template>
<script lang="ts">
  export default {
    data() {
      const data = {
        phone_number: '',
        referred_from: '',
        register_phone_error: ''
      };
      return data;
    },
    mounted() {
    },
    methods: {
    async updateProfile() {
      if(this.phone_number == '' || this.phone_number == null) {
        this.register_phone_error = 'Phone Number required.';
          return false;
      }
      let res = await AccountsService.updateProfile({phone_number: this.phone_number, referred_from: this.referred_from});
      if(res) {
        this.savePhoneNumber();
      }
    },
    acceptNumber() {
      var x = this.phone_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.phone_number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    },
    savePhoneNumber() {
      this.close();
      this.createHostProfile();
    },
    },
    props: ['showPhoneModal', 'close', 'isSocial', 'createHostProfile']
  };
</script>
