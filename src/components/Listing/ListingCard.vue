<script setup lang="ts">
import type { PropType } from "vue";
import type { Listing } from "../../interfaces/Listing";
</script>

<template>
  <div
    :class="selected? 'sm:flex border border-[#F3A24D] rounded-xl mb-3 cursor-pointer sm:h-[142px]' : 'sm:flex border border-[#DEDEDE] rounded-xl mb-3 cursor-pointer sm:h-[142px] hover:shadow-md'"
  >
    <div class="flex-col-1 sm:w-[190px]"  @click="navigateToDetail(listing.id)">
      <img
        class="object-fill sm:rounded-bl-lg sm:rounded-tr-none  rounded-tl-lg rounded-tr-lg sm:h-[140px]  sm:w-[190px] w-full"
        :src="listing.images[0].url"
        alt=""
      />
    </div>

    <div class="flex flex-col sm:w-[calc(100%-190px)] sm:px-4 py-2 px-4 sm:h-[140px]">
      <div class="flex-1 text-[16px] flex items-center justify-between" @click="navigateToDetail(listing.id)">
        <span class="font-bold truncate w-[220px] sm:w-full">
          {{ listing.name }}
        </span>
        <div class="flex items-center">
          <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.21836 5.42154L5.36389 4.81906L7.21706 1.06212C7.26767 0.959255 7.35094 0.875985 7.45381 0.82537C7.71178 0.698016 8.02527 0.804145 8.15425 1.06212L10.0074 4.81906L14.153 5.42155C14.2672 5.43787 14.3717 5.49175 14.4517 5.57339C14.5485 5.6728 14.6018 5.80655 14.5999 5.94523C14.5981 6.08392 14.5413 6.21621 14.442 6.31302L11.4426 9.23727L12.1512 13.3665C12.1678 13.4625 12.1572 13.5613 12.1205 13.6516C12.0839 13.742 12.0226 13.8202 11.9437 13.8775C11.8649 13.9348 11.7715 13.9688 11.6743 13.9757C11.5771 13.9827 11.4798 13.9622 11.3936 13.9167L7.68566 11.9672L3.97769 13.9167C3.87646 13.9706 3.75891 13.9886 3.64625 13.969C3.36215 13.92 3.17112 13.6506 3.2201 13.3665L3.92871 9.23727L0.929361 6.31302C0.847724 6.23302 0.793844 6.12852 0.777517 6.01423C0.733432 5.7285 0.932626 5.464 1.21836 5.42154Z" fill="black"/>
          </svg>
          <span class="text-gray-500">
            {{listing.rating}}
          </span>
          <span class="text-gray-500">
            ({{listing.total_reviews }})
          </span>
        </div>
      </div>
      <!-- <div class="flex-1">
        {{ listing.address.city }}, {{ listing.address.state }}
      </div> -->
      <div class="flex-1" @click="navigateToDetail(listing.id)">
        BRD: {{ listing.beds }} BTH: {{ listing.baths }}  &nbsp; &nbsp; (Sleeps {{ listing.max_guests }})
      </div>
      <!-- <div class="flex-1 mt-8">${{ listing.average_price }}/night <span class="text-gray-500">- &nbsp; $1058 total</span></div> -->
      <div class="flex items-center sm:mt-8 mt-4">
        <div class="flex-1" v-html="price"></div>
        <button @click="deleteLink(listing.id)" v-if="isMyListing" class="bg-[#F5F5F5] hover:bg-[#CDCDCD] w-[144px] h-[30px] rounded-3xl text-[14px]">Delete Listing</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    listing: {
      type: Object as PropType<Listing>,
      required: true,
    },
    hasEnteredDates: {
      type: Boolean,
      required: false,
      default: false,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  emits: ["listDelete"],
  data() {
    const data = {
      isMyListing: false,
    };
    return data;
  },
  mounted() {
    if(window.location.pathname === '/my-listings') {
      this.isMyListing = true
    }
    for (const image of this.listing.images) {
      continue;
    }
  },
  methods: {
    deleteLink(id: any) {
      this.$emit("listDelete", id);
    },

    navigateToDetail(id: string) {
      this.$router.push(`/listing-detail/${id}`);
    },
  },
  computed: {
    price() {
      if (this.hasEnteredDates) {
        return `<span class="font-bold">$${this.listing.dated_average_price }</span>/night - $${this.listing.dated_total_price } total`;
      } else {
        return `<span class="font-bold">$${this.listing.average_price}</span>/night (average)`;
      }
    }
  },
};
</script>
