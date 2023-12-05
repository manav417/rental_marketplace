<script setup lang="ts">
</script>
<template>
    <vue-final-modal
        :click-to-close="false"
        v-model="showLabelCreatModal"
        classes="flex justify-center items-start mt-16"
        content-class="relative flex flex-col max-h-full mx-4 p-10 border dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900 sm:w-[560px] w-full"
    >
    <span v-on:click="close" class="cursor-pointer absolute top-4 right-4"><svg class="w-6 h-6 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
    <div class="flex">
        <span class="text-[#DE774A] text-[24px] font-bold">Label Listing</span>
    </div>
      <div class="flex-grow overflow-y-auto py-4 mt-2">
        <form>
            <div class="space-y-4">
              <div>
                <input type="text" v-model="label_name" name="name" placeholder="Enter Listing name"
                class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
                  <p class="text-red-500 mt-1" v-if="label_name_error!='' && label_name==''">{{label_name_error}}</p>
                  <!-- <input type="text" v-model="phone_number" name="phone" placeholder="Phone Number"
                  class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]"> -->
              </div>
            </div>
        </form>
        <div class="mt-6 space-y-2">
            <div class="gap-x-2 text-right">
                <button type="button" class="w-[118px] h-[40px] px-8 py-2 font-bold bg-[#F5F5F5] rounded-3xl text-[#000000] text-[14px]" @click="close">Cancel</button>
                <button type="button" class=" ml-2 w-[118px] h-[40px] px-8 py-2 text-white font-bold bg-[#F3A24D] rounded-3xl text-[14px]" @click="createLabel">Save</button>
            </div>
        </div>
        </div>
    </vue-final-modal>
</template>
<script lang="ts">
  export default {
    data() {
      return {
        label_name: '',
        referred_from: '',
        label_name_error: ''
      };
    },
    mounted() {
    },
    methods: {
      async createLabel() {
        if(this.label_name == '' || this.label_name == null) {
          this.label_name_error = 'Name must be required.';
            return false;
        }else {
          this.addLabel(this.label_name);
        }
      },
    },
    props: ['showLabelCreatModal', 'close', 'addLabel']
  };
</script>
    