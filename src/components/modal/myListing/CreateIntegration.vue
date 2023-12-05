<script setup lang="ts">
import { UserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import dayjs from 'dayjs';
</script>
<template>
  <vue-final-modal
    :click-to-close="false"
    v-model="showCreateIntegrationModal"
    classes="flex justify-center items-start mt-16 sm:px-12"
    content-class="relative flex flex-col min-h-[500px] max-h-full mx-4 p-10 border dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 w-full"
  >
    <span v-on:click="close" class="cursor-pointer absolute top-4 right-4">
      <svg
        class="w-6 h-6 float-right"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </span>
    <div class="flex">
      <span class="text-[#DE774A] text-[24px] font-bold">Add Listing</span>
    </div>
    <div class="flex-grow overflow-y-auto py-4 mt-2">
      <div class="flex items-center justify-between border-b-2 pb-4">
        <p class="text-[16px]">
          <span class="font-bold">{{ "Listing" }}</span>
          &nbsp;
          <span>{{ labelName }}</span>
        </p>
        <div class="flex items-center">
          <p>
            <span class="font-bold">Status</span>
            <span> &nbsp; {{label_status ? label_status === 'Success' ? 'Synced' : label_status : 'Not synced'}}</span>
            <span v-if="label_sync_date"> &nbsp; {{ dayjs(String(label_sync_date)).format("MM/DD/YYYY hh:mm A") }}</span>
          </p>
          <button
            type="button"
            class="ml-6 w-[121px] h-[32px]  text-white font-bold bg-[#F3A24D] hover:bg-[#3A6472] rounded-3xl text-[14px]"
            @click="labelSync"
          >
            Sync Now
          </button>
        </div>
      </div>
      <div class="pl-8">
        <div
          class="mt-3 flex"
          v-for="(inteData, index) in integrations"
        >
          <div class="flex w-full px-2 items-center" v-if="inteData.verification_status == 'Verified'">
            <div class="w-[15%]">
              <div class="relative w-[90%]">
                <span :class="inteData.integration_type ? '' : 'font-bold'">{{
                  inteData.integration_type
                    ? inteData.integration_type
                    : "Select PMS"
                }}</span>
              </div>
            </div>
            <div class="w-[45%]">
              <span>{{inteData.url}}</span>
            </div>
            <div class="w-[45%]">
              <p>
                <span class="font-bold">Verified</span>
                &nbsp;
                <span v-if="inteData.verified_on">{{ dayjs(String(inteData.verified_on)).format("MM/DD/YYYY hh:mm A") }}</span>
              </p>
            </div>
            <div
              class="items-center flex text-[14px] font-bold w-[3%] text-center pt-1 sm:block relative"
            >
              <button
                v-if="inteData.verification_status == 'Verified'"
                class="ml-2 h-[32px] mt-1"
                @click="showDelete[index] = !showDelete[index]"
              >
                <span>
                  <svg
                    width="18"
                    height="4"
                    viewBox="0 0 18 4"
                    class="fill-black hover:fill-[#DE774A]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="2" cy="2" r="2" />
                    <circle cx="8.66699" cy="2" r="2" />
                    <circle cx="15.333" cy="2" r="2" />
                  </svg>
                </span>
              </button>
              <div
                class="absolute bg-white shadow-2xl rounded-md right-1 z-10"
                v-if="showDelete[index]"
              >
                <ul class="py-2 cursor-pointer w-[120px] text-left">
                  <li
                    v-if="index != 0"
                    class="px-4 py-1 hover:bg-[#F6EEE1]"
                  >
                    Move to Top
                  </li>
                  <li
                    class="px-4 py-1 hover:bg-[#F6EEE1]"
                    @click="deleteIntgration(index)"
                  >
                    Delete
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="flex w-full" v-else>
            <div class="w-[15%]">
              <div class="relative w-[90%]">
                <button
                  @click="showDropDown[`${index}`] = !showDropDown[`${index}`]"
                  class="w-full rounded-3xl h-[40px] text-left px-4 flex items-center justify-between bg-[#F5F5F5]"
                >
                  <span :class="inteData.integration_type ? '' : 'font-bold'">{{
                    inteData.integration_type
                      ? inteData.integration_type
                      : "Select PMS"
                  }}</span>
                  <span>
                    <svg
                      width="14"
                      height="11"
                      viewBox="0 0 18 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L9 9L17 1"
                        :stroke="showDropDown[`${index}`] ? '#DE774A' : 'black'"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  class="w-[91%] absolute bg-white shadow-xl rounded-xl z-10"
                  v-if="showDropDown[`${index}`]"
                >
                  <ul class="py-4 cursor-pointer">
                    <li
                      class="px-4 py-1 hover:bg-[#F6EEE1]"
                      @click="changeList('airbnb', index)"
                    >
                      AirBnB
                    </li>
                    <li
                      class="px-4 py-1 hover:bg-[#F6EEE1]"
                      @click="changeList('vrbo', index)"
                    >
                      Vrbo
                    </li>
                  </ul>
                  <div class="px-4">
                    <div class="border"></div>
                    <div class="mt-2">
                      <input
                        placeholder="Search for your PMS"
                        class="pl-4 bg-[#F5F5F5] rounded-3xl w-full h-[37px]"
                      />
                    </div>
                    <div class="mt-1">
                      <ul
                        class="py-4 cursor-pointer"
                        v-if="integrationsList?.length"
                      >
                        <li
                          v-for="integration in integrationsList"
                          :key="integration.name"
                          class="px-4 py-1 hover:bg-[#F6EEE1]"
                          @click="changeIntegration(integration)"
                        >
                          {{ integration.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[85%]">
              <input
                :disabled="inteData.integration_type == null"
                v-model="inteData.url"
                @input="changeUrl(index)"
                class="px-3 w-full h-[40px] focus:border-0 focus:ring-0 outline-none placeholder:text-black placeholder:font-bold bg-[#F5F5F5] rounded-3xl"
                placeholder="Paste listing URL here"
              />
              <div v-if="inteData.verification_status === 'In Progress'">
                <p class="px-2 mt-2 text-[#5A5A5A] text-[14px]">
                  Within 24 hours you will receive a message containing a unique code to your Airbnb account.
                  Enter the code to verify.
                </p>
                <div class="mt-2">
                  <input
                    v-model="inteData.verification_code"
                    class="px-3 w-[261px] h-[32px] focus:border-0 focus:ring-0 outline-none placeholder:text-[#5A5A5A] placeholder:text-[14px] placeholder:font-bold bg-[#F5F5F5] rounded-3xl"
                    placeholder="Enter code"
                  />
                  <button class="border-2 border-[#F3A24D] rounded-3xl w-[121px] h-[32px] ml-4 text-[14px] text-[#5A5A5A] hover:bg-[#F5F5F5]" @click="changeCode(index)">Verify</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-4 border-t-2 mt-4">
          <button
            class="flex items-center"
            @mouseover="isActive = true"
            @mouseleave="isActive = false"
            @click="createIntegrate"
          >
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                :class="isActive ? 'fill-[#DE774A]' : 'fill-[#F3A24D]'"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_948_2474)">
                  <path
                    d="M10 0C4.48594 0 0 4.48594 0 10C0 15.5141 4.48594 20 10 20C15.5141 20 20 15.5141 20 10C20 4.48594 15.5141 0 10 0ZM13.3332 10.8332H10.8332V13.3332C10.8332 13.5542 10.7454 13.7662 10.5891 13.9225C10.4328 14.0788 10.2208 14.1666 9.9998 14.1666C9.77877 14.1666 9.5668 14.0788 9.4105 13.9225C9.25421 13.7662 9.16641 13.5542 9.16641 13.3332V10.8332H6.66641C6.44538 10.8332 6.2334 10.7454 6.0771 10.5891C5.92081 10.4328 5.83301 10.2208 5.83301 9.9998C5.83301 9.77877 5.92081 9.5668 6.0771 9.4105C6.2334 9.25421 6.44538 9.16641 6.66641 9.16641H9.16641V6.66641C9.16641 6.44538 9.25421 6.2334 9.4105 6.0771C9.5668 5.92081 9.77877 5.83301 9.9998 5.83301C10.2208 5.83301 10.4328 5.92081 10.5891 6.0771C10.7454 6.2334 10.8332 6.44538 10.8332 6.66641V9.16641H13.3332C13.5542 9.16641 13.7662 9.25421 13.9225 9.4105C14.0788 9.5668 14.1666 9.77877 14.1666 9.9998C14.1666 10.2208 14.0788 10.4328 13.9225 10.5891C13.7662 10.7454 13.5542 10.8332 13.3332 10.8332Z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_948_2474">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            &nbsp;
            <span :class="isActive ? 'text-[16px] text-[#DE774A]' : 'text-[16px]'"
              >Add PMS integration</span
            >
          </button>
        </div>
      </div>
      <div class="space-y-2 absolute bottom-6 right-8">
        <div class="gap-x-2 text-right">
          <button
            type="button"
            class="w-[118px] h-[32px] px-8  font-bold bg-[#F5F5F5] rounded-3xl text-[#000000] text-[14px] hover:bg-[#DEDEDE]"
            @click="close"
          >
            close
          </button>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>
<script lang="ts">
import ListingService from "@/networking/api-services/listing.service";
import PotentialIntegrationsService from "@/networking/api-services/potentialIntegrations.service";
import { IntegrationsStore } from "@/stores/integrationsStore";
export default {
  data() {
    const userStore = UserStore();
    const integrationsStore = IntegrationsStore();
    const { integrationsList } = storeToRefs(integrationsStore);
    const data = {
      label_name: "",
      referred_from: "",
      label_name_error: "",
      isActive: false,
      showDropDown: {},
      showDelete: {},
      displayText: "Select PMS",
      integrationsList: integrationsList,
      selectedIntegration: null,
      showIntegrationsModal: false,
      integrations: [],
      label_status: null,
      label_sync_date: null
    };
    return data;
  },
  methods: {
    labelSync() {
      ListingService.syncLabel(this.labelId).then(
        (res) => {
          console.log(res);
          if (res.data) {
            this.label_status = res.data.sync_status;
            this.label_sync_date = res.data.last_sync;
          }
          return res;
        }
      );
    },

    deleteIntgration(idx: any) {
      let int_data = this.integrations[idx];
      ListingService.deleteIntegration(this.labelId, int_data['id']).then((res) => {
        this.showDelete[idx] = false;
        this.integrations.splice(idx, 1);
      })
    },

    addIntegration(idx: string) {
      ListingService.addIntegration(this.integrations[idx], this.labelId).then(
        (res) => {
          console.log(res);
          if (res.data) {
            this.integrations[idx] = res.data;
          }
          return res;
        }
      );
    },

    createIntegrate() {
      this.integrations.push({
        integration_type: null,
        url: null,
        selected_for_sync: false,
        verification_status: null,
        verification_code: null,
      });
      this.integrations.map((inte, i) => {
        this.showDropDown[`${i}`] = false;
        this.showDelete[`${i}`] = false;
      });
      console.log(this.showDropDown);
    },

    changeUrl(idx: any) {
      ListingService.addIntegration(this.integrations[idx], this.labelId).then(
        (res) => {
          if (res.data) {
            ListingService.startVerification(res.data.id, this.labelId).then(
              (response) => {
                console.log(response);
                if (response.data) {
                  this.integrations[idx] = response.data;
                }
                return response;
              }
            );
            // this.integrations[idx] = res.data;
          }
          return res;
        }
      );
      // console.log(this.integrations);
    },

    changeCode(idx: any) {
      ListingService.sendCode(this.integrations[idx], this.labelId).then(
        (res) => {
          console.log(res);
          if (res.data) {
            this.integrations[idx] = res.data;
          }
          return res;
        }
      );
      // console.log(this.integrations);
    },

    changeList(txt: string, index: any) {
      this.integrations[index].integration_type = txt;
      this.showDropDown[index] = false;
    },
    changeIntegration(integration: any) {
      this.selectedIntegration = integration;
      this.showIntegrationsModal = true;
      PotentialIntegrationsService.putIntegrationsList(integration.id);
    },
    async createLabel() {
      if (this.label_name == "" || this.label_name == null) {
        this.label_name_error = "Name must be required.";
        return false;
      } else {
        this.addLabel(this.label_name);
      }
    },
    next() {},
  },
  props: ["showCreateIntegrationModal", "close", "labelName", "labelId"],
};
</script>
