<script setup lang="ts">
import OwnerRezService from "@/networking/api-services/ownerRez.service";
import { UserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import Loading from 'vue-loading-overlay';
import dayjs from 'dayjs';
</script>

<template>
  <div v-if="ownerRezData.id">
    <h2 class="font-bold">OwnerRez</h2>

    <div class="flex flex-row">
      <div class="basis-1/2">
        <p v-if="ownerRezData.sync_status === 'Failed'" class="bg-red-200 px-2">
          {{ownerRezData.reason_failed}}
        </p>
        <p>Account ID: {{ ownerRezData.account_id }}</p>
        <p>
          Status: <span>{{ownerRezData.sync_status}}</span
          >
        </p>
        <p v-if="ownerRezData.last_sync" class="flex flex-row">
          Last synce date: {{dayjs(String(ownerRezData.last_sync)).format('MM/DD/YYYY hh:mm')}}
      </p>
      </div>
      <div class="basis-1/2 text-right">
        <button
          v-if="ownerRezData.sync_status == 'Success'"
          @click="syncOwnerRez"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 mr-3 rounded-full"
        >
          Sync Now
        </button>

        <button
          @click="removeOwnerRez"
          class="justify-between bg-red-500 hover:bg-red-700  text-white font-bold py-1  px-4 rounded-full itmes-center"
        >
          <div class="w-full flex items-center">
            Remove
            <loading class="ml-2" :width="20" :height="20" :active.sync="isLoading"></loading>
          </div>
        </button>
      </div>
    </div>
  </div>

  <div
    @click="showOwnerRezForm = !showOwnerRezForm"
    v-else-if="!showOwnerRezForm"
    class="border-2 border-black-500/50 p-7 rounded-xl mb-4 cursor-pointer"
  >
    <h3>OwnerRez</h3>
  </div>

  <div v-else class="border-2 border-black-500/50 p-7 rounded-xl">
    <button @click="showOwnerRezForm = !showOwnerRezForm">OwnerRez</button>

    <div class="pt-4">
      <form class="owner-rez-form" action="." @submit.prevent="submitOwnerRez">
        <div class="pb-7">
          <label
            for="ownerRezAccountID"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Account ID</label
          >

          <input
            type="text"
            id="ownerRezAccountID"
            v-model="ownerRezAccountID"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div class="w-full text-right">
          <input
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            value="Submit"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    const userStore = UserStore();
    const { ownerRezData: ownerRezData } = storeToRefs(userStore);
    const data = {
      email: userStore.email,
      showOwnerRezForm: false as boolean,
      ownerRezAccountID: "ora7ccdcde3cx",
      isLoading: false,
      ownerRezData: ownerRezData
    };
    return data;
  },
  methods: {
    submitOwnerRez() {
      OwnerRezService.saveOwnerRezID(this.ownerRezAccountID)
        .then(() => {
          return OwnerRezService.syncOwnerRez();
        })
        .then(() => {
          this.$router.push("/my-listings");
        });
    },
    syncOwnerRez() {
      OwnerRezService.syncOwnerRez();
    },
    async removeOwnerRez() {
      this.isLoading = true
      let removed = await OwnerRezService.removeOwnerRez();
      if(removed) {
        this.isLoading = false;
        this.$router.push("/my-listings");
      }
    },
  },
};
</script>
