<script setup lang="ts">
import AirBnbService from "@/networking/api-services/airBnb.service";
import AccountsService from "@/networking/api-services/accounts.service";
import { UserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import dayjs from 'dayjs';
</script>

<template>
  <div class="mt-3">

    <div v-for="airbnbLink in airBnBData.urls">
      <div
        class="p-3 px-4 bg-[#F5F5F5] sm:rounded-3xl rounded-xl mt-3 hover:bg-gray-100 cursor-pointer relative flex items-center sm:h-[40px]"
      >
        <div class="sm:flex w-full items-center">
          <p v-if="airbnbLink.sync_status === 'Failed'" class="bg-red-200 px-2">
            {{ airbnbLink.reason_failed }}
          </p>
          <p class="sm:w-[40%] truncate">{{ airbnbLink.url }}</p>
          <p class="sm:w-[20%]">
            {{ dayjs(String(airbnbLink.last_sync)).format("MM/DD/YYYY hh:mm") }}
          </p>
          <p class="sm:w-[10%]">
            <span class="font-bold">{{ airbnbLink.sync_status }}</span>
          </p>
          <p class="sm:w-[10%]">
            <span class="font-bold">{{ airbnbLink.verification_status }}</span>
          </p>
          <p class="sm:w-[20%] flex sm:justify-center justify-end">
            <span
              v-if="airbnbLink.sync_status == 'Success'"
              @click="syncAirBnBUrl(airbnbLink.url)"
              class="text-sm text-[#DE774A] font-bold"
              >Sync Now</span
            >
            <span
              @click="deleteLink(airbnbLink.id)"
              class="text-sm sm:ml-8 text-[#83858A] font-bold"
              >Remove</span
            >
          </p>
        </div>
      </div>

      <div v-if="airbnbLink.sync_status == 'Success'">
        <div
          v-if="airbnbLink.verification_status == 'Unverified'"
          class="w-11/12 float-right align: middle"
        >
          <div class="w-2/12 inline-block">
            <strong>Update Connection URL:</strong>
          </div>
          <div class="w-8/12 inline-block">
            In order to update your Connection Url, we need to verify that you own this listing.
          </div>
          <div class="w-2/12 inline-block">
            <button @click="startVerification(airbnbLink)"
              class="w-3/12 mt-3 sm:w-[200px] w-full rounded-3xl  h-[40px] bg-[#F3A24D] px-4 flex items-center justify-center text-white"
            >Start Verification</button>
          </div>
        </div>

        <div
          v-if="airbnbLink.verification_status == 'In Progress'"
          class="w-11/12 float-right align: middle"
        >
          <div class="w-2/12 inline-block">
            <strong>Update Connection URL:</strong>
          </div>
          <div class="w-6/12 inline-block">
            Within 24 hours you will receive a message containing a unique code to your Airbnb account. Copy that code and paste it here.
          </div>
          <div class="w-4/12 inline-block">
            <input
              @input="pasteLink"
              v-model="airbnbLink.verificationCode"
              placeholder="verification code"
              class="inline m-auto placeholder:bold focus:ring-1 focus:ring-orange-600 p-3 px-4 bg-[#F5F5F5] rounded-3xl mt-3 hover:bg-gray-100 cursor-pointer relative items-center h-[40px]"
            />
            <button
              class="mt-3 sm:w-[200px] w-6/12 inline rounded-3xl h-[40px] bg-[#F3A24D] px-4 items-center justify-center text-white"
              @click="verifyCode(airbnbLink)"
            >Verify Code</button>
          </div>
        </div>

        <div
          v-if="airbnbLink.verification_status == 'Verified'"
          class="w-11/12 float-right align: middle"
        >
          <div class="w-2/12 inline-block">
            <strong>Update Connection URL:</strong>
          </div>

          <div class="w-8/12 inline-block">
            <input
              @input="pasteLink"
              v-model="airbnbLink.connection_url"
              :placeholder="airbnbLink.url"
              class="placeholder:bold focus:ring-1 focus:ring-orange-600 p-3 px-4 bg-[#F5F5F5] rounded-3xl mt-3 hover:bg-gray-100 cursor-pointer relative flex items-center h-[40px] w-full"
            />
          </div>
          <div class="w-2/12 inline-block">
            <button
              @click="updateConnectionUrl(airbnbLink)"
              class="m-auto sm:w-[200px] w-full rounded-3xl h-[40px] bg-[#F3A24D] px-4 flex items-center justify-center text-white"
            >
              Update
            </button>
          </div>
        </div>

        <div class="clear-both"></div>
      </div>
      <div class="mt-8 mb-8 w-11/12 m-auto border"></div>
    </div>

    <div
      class="p-3 px-4 bg-[#F5F5F5] sm:rounded-3xl rounded-xl mt-3 hover:bg-gray-100 cursor-pointer relative flex items-center sm:h-[40px]"
      v-for="(link, i) in newLinkList"
      :key="i"
    >
      <div class="sm:flex w-full items-center">
        <p class="sm:w-[50%] truncate">{{link}}</p>
        <p class="sm:w-[20%]">--</p>
        <p class="sm:w-[10%]"><span>--</span></p>
        <p class="sm:w-[20%] flex sm:justify-center justify-end">
          <span @click="syncAirBnB(i)" class="text-sm text-[#DE774A] font-bold">Sync Now</span>
          <span
            @click="deleteNewLink(i)"
            class="text-sm ml-8 text-[#83858A] font-bold"
            >Remove</span
          >
        </p>
      </div>
    </div>

    <div class="w-full">
      <input
        @input="pasteLink"
        v-model="newLink"
        placeholder="Paste Airbnb property URL here"
        class="placeholder:bold truncate focus:ring-1 focus:ring-orange-600 p-3 px-4 bg-[#F5F5F5] rounded-3xl mt-3 hover:bg-gray-100 cursor-pointer relative flex items-center h-[40px] w-full"
      />
    </div>
  </div>
  <!-- delete modal -->
  <vue-final-modal
    :click-to-close="false"
    v-model="openDeleteModal"
    classes="flex justify-center items-center px-10"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
  >
    <span v-on:click="openDeleteModal = false" class="cursor-pointer">
      <svg
        class="w-4 h-4 float-right"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </span>
    <span class="text-md font-bold text-center mt-3">
      <slot name="title">Do you want to remove this listing?</slot>
    </span>
    <div class="flex-grow overflow-y-auto py-2">
      <div class="mt-4 space-y-2 text-center">
        <button
          @click="removeSyncLink"
          type="button"
          class="px-8 py-1 text-blue-100 bg-blue-700"
        >
          Delete
        </button>
      </div>
    </div>
  </vue-final-modal>

  <vue-final-modal
    :click-to-close="false"
    v-model="isSyncing"
    classes="flex justify-center items-center px-10"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
  >
    <span class="text-md font-bold text-center mt-3">
      <slot name="title">Syncing Listing....</slot>
    </span>
  </vue-final-modal>

  <vue-final-modal
    :click-to-close="true"
    v-model="isSaved"
    classes="flex justify-center items-center px-10"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
  >
    <span v-on:click="isSaved = false" class="cursor-pointer">
      <svg
        class="w-4 h-4 float-right"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </span>
    <span class="text-md font-bold text-center mt-3">
      <slot name="title">Saved</slot>

      <button
        @click="isSaved = false"
        class="m-auto mt-4 sm:w-[200px] w-full rounded-3xl h-[40px] bg-[#F3A24D] px-4 flex items-center justify-center text-white"
      >
        Ok
      </button>
    </span>
  </vue-final-modal>
</template>

<script lang="ts">
export default {
  data() {
    const userStore = UserStore();
    const {airBnBData: airBnBData} = storeToRefs(userStore);

    const data = {
      isSyncing: false,
      isSaved: false,
      openAirBnBModal: false,
      links: new Array(),
      airBnBData: airBnBData,
      openDeleteModal: false,
      removeKey: '',
      newLink: '',
      newLinkList: new Array(),
    };
    return data;
  },
  methods: {
    pasteLink() {
      if(this.newLink != '') {
        this.newLinkList.push(this.newLink);
        this.newLink = '';
        this.changeAirBnBurls(this.newLinkList);
      }
    },

    deleteNewLink(i:any) {
      this.newLinkList.splice(i, 1);
      this.changeAirBnBurls(this.newLinkList);
    },

    async syncAirBnBUrl(airbnbUrl) {
      const vm = this;

      this.isSyncing = true;
      AirBnbService.syncAirBnB([airbnbUrl])
        .then((response) => {
          if (response.data) {
            vm.airBnBData.urls = response.data.urls;
          }
          vm.isSyncing = false;
        })
        .catch((error) => {
          AccountsService.getUser();
          this.isSyncing = false;
        });
    },

    async syncAirBnB(i: any) {
      const vm = this;

      this.isSyncing = true;
      AirBnbService.syncAirBnB([this.newLinkList[i]])
        .then((response) => {
          if (response.data) {
            vm.airBnBData.urls = response.data.urls;
          }
          vm.isSyncing = false;
        })
        .catch((error) => {
          AccountsService.getUser();
          this.isSyncing = false;
        });
    },

    async startVerification(airbnbUrl: any) {
      let res = await AirBnbService.startVerification(airbnbUrl.id);
      if (res.data) {
        this.airBnBData.urls = res.data.urls;
      }
    },

    async verifyCode(airbnbUrl: any) {
      if (airbnbUrl.verificationCode) {
        let res = await AirBnbService.verifyCode(airbnbUrl.id, airbnbUrl.verificationCode);
        if (res.data) {
          this.airBnBData.urls = res.data.urls;
        }
      }
    },

    async updateConnectionUrl(airbnbUrl: any) {
      let res = await AirBnbService.updateConnectionUrl(airbnbUrl.id, airbnbUrl.connection_url);
      if (res.data) {
        this.airBnBData.urls = res.data.urls;
        this.isSaved = true;
      }
    },

    async deleteLink(id: string) {
      this.removeKey = id;
      this.openDeleteModal = true;
    },

    async removeSyncLink() {
      let res = await AirBnbService.removeLink(this.removeKey);
      if(res.status === 200) {
        AccountsService.getUser();
        this.openDeleteModal = false;
      }
    }
  },
  props: ['changeAirBnBurls']
};
</script>
