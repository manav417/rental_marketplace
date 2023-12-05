<script setup lang="ts">
import axios from "axios";
import { UserStore } from "../../stores/userStore.js";
import type { Listing } from "../../interfaces/Listing";
import CreateIntegration from "@/components/modal/myListing/CreateIntegration.vue"
import ListingService from "../../networking/api-services/listing.service";
import LocationSearchMap from "../location/LocationSearchMap.vue";
import type { MapMarker } from "@/interfaces/MapMarker";
</script>

<template>
  <div class="container mx-auto px-5">
    <div :class="listingLabels.length > 0 ? 'flex items-center justify-between  border-b-2 pb-4' : 'flex items-center justify-between mb-8'">
      <h1 class="text-xl font-bold">My Listings</h1>
      <span v-if="getListingLength() > 0" class="hidden sm:block">{{getListingLength()}} &nbsp; properties listed</span>
      <a v-if="listingLabels.length" @click="goToHostPage()"><button class="text-white font-bold rounded-3xl hover:bg-[#3A6472] bg-[#F3A24D] h-[32px] w-[139px]">Add Listing</button></a>
    </div>
    <div>
      <p v-if="!listingLabels.length">No Listings have been Synced with Nofie</p>
    </div>

    <div class="flex">
      <div class="sm:w-6/12 pr-4 w-full">
        <div v-for="label in listingLabels" :key="label.id">
          <div class="border-b-2 py-4">
            <div class="flex items-center justify-between">
              <p>
                <span class="font-bold">
                  Listing
                </span>
                <span>
                  &nbsp;{{label.name}}
                </span>
              </p>
              <div
                class="items-center flex text-[14px] text-center pt-1 sm:block relative"
              >
                <button
                  class="ml-2 h-[32px] mt-1"
                  @click="selectLabel(label.id)"
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
                  class="absolute bg-white shadow-2xl rounded-md -right-2  z-10 top-10"
                  v-if="selectedLabel == label.id"
                >
                  <ul class="py-2 cursor-pointer w-[130px] text-left">
                    <li
                      @click="goToEditPage(label.id)"
                      class="px-4 py-1 hover:bg-[#F5F5F5]"
                    >
                      Edit
                    </li>
                    <li
                      class="px-4 py-1 hover:bg-[#F5F5F5]"
                      @click="showDeleteLabelModal(label.name)"
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="mt-4 flex w-full">
              <div>
                <img v-if="label.listing" :src="label.listing.images[0].url" class="w-[140px] h-[109px] rounded-2xl"/>
                <img v-else="label.listing" src="/img/blank.png" class="w-[140px] h-[109px] rounded-2xl"/>
              </div>
              <div class="w-[calc(100%-150px)] sm:px-8 px-2">
                <div class="flex justify-between">
                    <p class="font-bold w-[30%]">PMS</p>
                    <p class="font-bold w-[30%]">Rating</p>
                    <p class="font-bold w-[30%] hidden sm:block">Avg Nightly Price</p>
                    <p class="font-bold w-[30%] sm:hidden">Avg</p>
                </div>
                <div class="flex justify-between py-1" v-for="integration in label.integrations">
                  <p class="w-[30%]">{{integration.integration_type}}</p>
                  <p class="w-[30%]">{{integration.rating}}</p>
                  <p class="w-[30%]">{{'$'+ integration.average_price}}</p>
              </div>
              </div>
            </div>
          </div>
      </div>
      </div>
      <div class="sm:w-6/12 w-full pl-4 rounded-xl pt-6 hidden sm:block" v-if="getListingLength() > 0">
        <LocationSearchMap
          @bounds_changed="getMapBounds"
          @center_changed="onMapCenterChanged"
          :markers="markers"
          :selected="selectedListing"
          @marker-click="selectListing($event)"
        />
      </div>
    </div>
    <a  v-if="!listingLabels.length" @click="goToHostPage()"><button class="mt-4 text-white font-bold rounded-3xl hover:bg-[#3A6472] bg-[#F3A24D] h-[40px] w-[170px]">Add Listing</button></a>

    <vue-final-modal
      :click-to-close="false"
      v-model="isDelete"
      classes="flex justify-center items-start mt-16"
      content-class="relative flex flex-col max-h-full mx-4 p-5 border dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 sm:w-[560px] w-full"
    >
      <span v-on:click="isDelete=false" class="cursor-pointer absolute top-4 right-4"><svg class="w-6 h-6 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
      <div class="flex items-center">
        <span class="text-[#DE774A] text-[20px] font-bold">Delete Listing</span>
      </div>
      <span class="text-[16px] mt-4 font-bold">
        Are you sure you want to delete listing {{selectedLabelName}}?
      </span>
      <div class="mt-8 text-right">
        <button @click="isDelete=false" class="bg-[#F5F5F5] text-[14px] rounded-3xl h-[40px] w-[118px]">Cancel</button>
        <button @click="deleteList" class="bg-[#F3A24D] text-white font-bold rounded-3xl sm:w-[198px] w-[160px] h-[40px] ml-2 hover:bg-[#3A6472]">Delete Listing</button>
      </div>
    </vue-final-modal>
    <CreateIntegration :showCreateIntegrationModal="showCreateIntegrationModal" :close="modalClose" :labelName="labelName" :labelId="labelId"/>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    const data = {
      listings: Array<Listing>(),
      isDelete: false,
      deleteId: null,
      showLabelCreatModal: false,
      showCreateIntegrationModal: false,
      labelName: '',
      labelId: null,
      listingLabels: [],
      selectedListing: "",
      markers: [],
      selectedLabel: null,
      selectedLabelName: '',
    };
    return data;
  },
  methods: {
    onMapCenterChanged() {},

    getMapBounds(event: any) {},
    selectListing(id: string) {
      this.selectedListing = id;
    },

    goToEditPage(id: string) {
      this.$router.push(`/host-listing?id=${id}`);
    },

    selectLabel(id: any) {
      if (this.selectedLabel === id) {
        this.selectedLabel = null;
      } else{
        this.selectedLabel = id;
      }
    },

    getListingLength() {
      let count = 0;
      for(var i = 0; i < this.listingLabels.length; i++) {
        if(this.listingLabels[i].sync_status === 'Success'){
          count ++
        }
      }
      return count;
    },
    modalClose() {
      this.showLabelCreatModal = false,
      this.showCreateIntegrationModal = false
    },

    addLabel(name: string) {
      ListingService.createLabel(name).then((res) => {
        console.log(res);
        if(res.data) {
          this.labelName = res.data.name;
          this.labelId = res.data.id;
          this.showCreateIntegrationModal = true;
        }
      })
    },

    listDelete(id: any) {
      this.deleteId = id;
      this.isDelete = true;
    },

    deleteList() {
      const vm = this;
      const userStore = UserStore();
      axios
        .delete(
          `${import.meta.env.VITE_CONIFER_API}/listings/labels/${vm.selectedLabel}`,
          {
            headers: { Authorization: `Bearer ${userStore.accessToken}` },
          }
        )
        .then(function (response) {
          if (response.status === 200) {
            vm.isDelete = false;
            vm.getList();
          }
        });
    },

    getList() {
      const vm = this;
      const userStore = UserStore();
      ListingService.listListingLabels().then(function (response) {
        console.log(response);
        vm.listingLabels = response.data;
        for (let i = 0; i < response.data.length; i++) {
          const listing = response.data[i];
          if (listing.sync_status === "Success"){
            const position = {
              lat: parseFloat(listing.listing.address.latitude.toString()),
              lng: parseFloat(listing.listing.address.longitude.toString()),
            };
            vm.markers.push({ id: listing.listing.id, title: listing.listing.name, position: position, images: listing.listing.images, beds: listing.listing.beds, baths: listing.listing.baths, rating: listing.listing.rating, total_reviews: listing.listing.total_reviews, average_price: listing.listing.average_price });
          }
        }
      });
    },
    goToHostPage() {
      this.$router.push(`/host-listing`);
    },

    goToListingDetailPage(id: any) {
      this.$router.push(`/listing-detail/${id}`);
    },
    showDeleteLabelModal(name: string) {
      this.selectedLabelName = name;
      this.isDelete = true;
    }
  },
  mounted() {
    this.getList();
  },
};
</script>
