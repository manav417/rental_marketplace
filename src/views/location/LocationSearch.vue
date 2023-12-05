<script setup lang="ts">
import { FiltersStore } from "@/stores/filtersStore";
import { storeToRefs } from "pinia";
import GuestsForm from "@/components/forms/GuestsForm.vue";
import ListingFiltersFormModal from "@/components/forms/ListingFiltersFormModal.vue";
import LocationSearchBar from "./LocationSearchBar.vue";
import LocationSearchMap from "./LocationSearchMap.vue";
import PersonIcon from "@/assets/images/icons/person.svg";
import type { Listing } from "@/interfaces/Listing";
import type { MapMarker } from "@/interfaces/MapMarker";
import debounce from "lodash.debounce";
import ListingCard from "@/components/Listing/ListingCard.vue";
</script>

<template>
  <div class="container mx-auto px-5">
    <div class="sm:flex items-center">
      <div class="flex">
        <LocationSearchBar
          :params="params"
          @change-destination-and-dates="onChangeDestinationAndDates($event)"
        />
        <button class="w-[35px] h-[35px] rounded-full border border-[#DE774A] ml-3 sm:hidden" @click="showGuestAndRooms=!showGuestAndRooms">
          <span v-if="!showGuestAndRooms">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8751 23.0042C15.8728 23.5565 16.3186 24.0023 16.8709 24C17.4232 23.9977 17.8728 23.5481 17.8751 22.9958L17.8979 17.5378L22.9958 17.5165C23.5481 17.5142 23.9977 17.0646 24 16.5123C24.0023 15.96 23.5565 15.5142 23.0042 15.5165L17.9062 15.5378L17.9252 10.9958C17.9275 10.4435 17.4817 9.9977 16.9294 10C16.3771 10.0023 15.9275 10.4519 15.9252 11.0042L15.9062 15.5461L11.0042 15.5666C10.4519 15.5689 10.0023 16.0185 10 16.5708C9.9977 17.1231 10.4435 17.5689 10.9958 17.5666L15.8979 17.5461L15.8751 23.0042Z" fill="black"/>
            </svg>
          </span>
          <span v-else>
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1" y1="-1" x2="13.0001" y2="-1" transform="matrix(0.999991 -0.00417747 -0.00417747 0.999991 9.99585 17.5708)" stroke="black" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
        </button>
      </div>
      <div class="w-full sm:flex items-center gap-x-2 sm:ml-4 mt-3 sm:mt-0" v-if="showGuestAndRooms">
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-1 items-center pl-3 pointer-events-none"
          >
            <span>
              <svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 15.5C22 16.5609 21.5786 17.5783 20.8284 18.3284C20.0783 19.0786 19.0609 19.5 18 19.5C16.9391 19.5 15.9217 19.0786 15.1716 18.3284C14.4214 17.5783 14 16.5609 14 15.5C14 14.4391 14.4214 13.4217 15.1716 12.6716C15.9217 11.9214 16.9391 11.5 18 11.5C19.0609 11.5 20.0783 11.9214 20.8284 12.6716C21.5786 13.4217 22 14.4391 22 15.5ZM20 15.5C20 16.0304 19.7893 16.5391 19.4142 16.9142C19.0391 17.2893 18.5304 17.5 18 17.5C17.4696 17.5 16.9609 17.2893 16.5858 16.9142C16.2107 16.5391 16 16.0304 16 15.5C16 14.9696 16.2107 14.4609 16.5858 14.0858C16.9609 13.7107 17.4696 13.5 18 13.5C18.5304 13.5 19.0391 13.7107 19.4142 14.0858C19.7893 14.4609 20 14.9696 20 15.5Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18 7.5C11.925 7.5 7 12.425 7 18.5C7 24.575 11.925 29.5 18 29.5C24.075 29.5 29 24.575 29 18.5C29 12.425 24.075 7.5 18 7.5ZM9 18.5C9 20.59 9.713 22.514 10.908 24.042C11.7472 22.9399 12.8299 22.0467 14.0714 21.4323C15.313 20.8179 16.6797 20.4988 18.065 20.5C19.4323 20.4987 20.7819 20.8095 22.0109 21.4088C23.2399 22.008 24.316 22.8799 25.157 23.958C26.0234 22.8216 26.6068 21.4952 26.8589 20.0886C27.111 18.682 27.0244 17.2355 26.6065 15.869C26.1886 14.5024 25.4512 13.255 24.4555 12.23C23.4598 11.205 22.2343 10.4319 20.8804 9.97451C19.5265 9.51716 18.0832 9.38877 16.6699 9.59997C15.2565 9.81117 13.9138 10.3559 12.7528 11.1891C11.5917 12.0222 10.6458 13.1199 9.99323 14.3912C9.34065 15.6625 9.00018 17.071 9 18.5V18.5ZM18 27.5C15.9339 27.5031 13.9303 26.7923 12.328 25.488C12.9729 24.5647 13.8313 23.8109 14.8302 23.2907C15.829 22.7705 16.9388 22.4992 18.065 22.5C19.1772 22.4991 20.2735 22.7636 21.2629 23.2714C22.2524 23.7793 23.1064 24.5159 23.754 25.42C22.1393 26.7667 20.1026 27.5029 18 27.5V27.5Z" fill="black"/>
              </svg>
            </span>
          </div>
          <input
            type="text"
            :value="guestsButtonText"
            @click="showGuestsForm = !showGuestsForm"
            class="h-[40px] bg-[#F5F5F5] placeholder-[#000000] w-full border-0 text-gray-900 sm:text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Guests"
            readonly
          />
          <GuestsForm
            :show-form="showGuestsForm"
            :params="params"
            @guests-changed="onGuestsChange($event)"
          />
        </div>
        <div class="flex mt-4 sm:mt-0">
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-1 items-center pl-3 pointer-events-none"
            >
            <span>
              <svg width="24" height="21" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7 0.75C4.92893 0.75 3.25 2.42893 3.25 4.5V8.82501C1.53832 9.17247 0.25 10.6858 0.25 12.5V19.5V20.25H1H27H27.75V19.5V12.5C27.75 10.6858 26.4617 9.17247 24.75 8.82501V4.5C24.75 2.42893 23.0711 0.75 21 0.75H7ZM23.25 8.75V4.5C23.25 3.25736 22.2426 2.25 21 2.25H7C5.75736 2.25 4.75 3.25736 4.75 4.5V8.75H6.25V8.5C6.25 6.98122 7.48122 5.75 9 5.75H11C12.5188 5.75 13.75 6.98122 13.75 8.5V8.75H14.25V8.5C14.25 6.98122 15.4812 5.75 17 5.75H19C20.5188 5.75 21.75 6.98122 21.75 8.5V8.75H23.25ZM20.25 8.75V8.5C20.25 7.80964 19.6904 7.25 19 7.25H17C16.3096 7.25 15.75 7.80964 15.75 8.5V8.75H20.25ZM12.25 8.75V8.5C12.25 7.80964 11.6904 7.25 11 7.25H9C8.30964 7.25 7.75 7.80964 7.75 8.5V8.75H12.25ZM4 10.25C2.75736 10.25 1.75 11.2574 1.75 12.5V18.75H26.25V12.5C26.25 11.2574 25.2426 10.25 24 10.25H21.75H21H15H14.25H13.75H13H7H6.25H4Z" fill="black"/>
              </svg>
            </span>
            </div>
            <input
              type="text"
              @click="showRoomsAndSpacesForm = !showRoomsAndSpacesForm"
              class="h-[40px] bg-[#F5F5F5] placeholder-[#000000] w-full border-0 text-gray-900 sm:text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Rooms & spaces"
              readonly
            />
            <div v-if="showRoomsAndSpacesForm" class="absolute z-10 bg-white w-[300px] p-4 shadow-2xl rounded-xl">
              <div class="flex">
                <div>
                  <label
                    for="beds"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >Beds</label
                  >
                  <input
                    v-model="params.beds"
                    type="number"
                    min="1"
                    @input="changeBedsAndBaths"
                    class="h-[40px] bg-[#F5F5F5] placeholder-[#000000] w-full border-0 text-gray-900 sm:text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div class="ml-2">
                  <label
                    for="baths"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >Baths</label
                  >
                  <input
                    v-model="params.baths"
                    @input="changeBedsAndBaths"
                    type="number"
                    min="1"
                    class="h-[40px] bg-[#F5F5F5] placeholder-[#000000] w-full border-0 text-gray-900 sm:text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="relative ml-auto sm:ml-2" style="display: none;">
            <button
              class="flex text-white items-center bg-blue-700 hover:bg-blue-800 rounded-3xl py-3 px-5 justify-center"
              @click="showFiltersModal = !showFiltersModal"
            >
              <span class="mr-2 mt-0.5">
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path stroke="currentColor" d="M2.892 8.392h2.081"></path>
                  <path
                    stroke="currentColor"
                    d="M4.973 8.392A1.513 1.513 0 118 8.391a1.513 1.513 0 01-3.027.001z"
                    clip-rule="evenodd"
                  ></path>
                  <path stroke="currentColor" d="M8 3.852H1.378"></path>
                  <path
                    stroke="currentColor"
                    d="M11.027 3.852a1.513 1.513 0 11-3.026 0 1.513 1.513 0 013.026 0z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    stroke="currentColor"
                    d="M10.709 8.392h2.399M11.027 3.852h3.595M5.896 12.906h4.162"
                  ></path>
                </svg>
              </span>
              <span class="text-[18px]">Sort</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 gap-4 mt-6">
      <div class="h-screen overflow-y-scroll sm:pr-4 relative" v-if="is_list">
        <div v-for="listing in listings" :key="listing.id">
          <div>
            <ListingCard :listing="listing" :hasEnteredDates="hasEnteredDates" :selected="selectedListing == listing.id" @mouseover="hoverChange(listing.id)" @mouseleave="leaveChange(listing.id)"></ListingCard>
          </div>
        </div>

        <button
          type="button"
          @click="getMoreListings"
          class="flex w-full text-white items-center bg-[#F3A24D] hover:bg-[#3A6472] rounded-3xl py-3 justify-center"
        >
          <span class="text-[18px]">More Listings...</span>
        </button>
      </div>
      <LocationSearchMap v-if="is_map"
        @bounds_changed="getMapBounds"
        @center_changed="onMapCenterChanged"
        :markers="markers"
        :selected="selectedListing"
        :hoverId="hoverId"
      />
      <div v-if="is_list" class="fixed bottom-4 justify-center text-center w-full pr-8 sm:hidden"><button class="text-[13px] border-2 border-[#F3A24D] rounded-3xl py-2 px-4 bg-white" @click="is_map = true, is_list=false">Map View</button></div>
      <div v-if="is_map" class="fixed bottom-4 justify-center text-center w-full pr-8 sm:hidden"><button class="text-[13px] border-2 border-[#F3A24D] rounded-3xl py-2 px-4 bg-white" @click="is_map = false, is_list=true">List View</button></div>
    </div>

    <vue-final-modal
      v-model="showFiltersModal"
      classes="flex justify-center items-center"
      content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
    >
      <span v-on:click="showFiltersModal = false" class="cursor-pointer">
        <svg class="w-6 h-6 float-right"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </span>
      <span class="text-lg font-bold text-left mb-5">
        <slot name="title">Filters</slot>
      </span>
      <ListingFiltersFormModal @done="showFiltersModal = !showFiltersModal" />
    </vue-final-modal>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    const filtersStore = FiltersStore();
    const { filters: filters } = storeToRefs(filtersStore);

    const data = {
      listings: Array<Listing>(),
      selectedListing: "",
      filters,
      params: {
        city: "",
        state: "",
        longitude: "",
        latitude: "",
        id: "",
        beds: 1,
        baths: 1,
        page: 0,
      },
      showRoomsAndSpacesForm: false,
      showFiltersModal: false,
      guestsButtonText: "1 Guest",
      showGuestsForm: false,
      connection: null,
      is_map: false,
      is_list: true,
      width: 0,
      showGuestAndRooms: false,
      hoverId: null
    };

    return data;
  },
  async beforeMount() {
    this.params = { ...this.params, ...this.$route.query };
  },
  mounted () {
    let screenWidth = screen.width;
    if(screenWidth > 768) {this.is_map = true, this.showGuestAndRooms = true};
    this.initWebsocket()
  },
  created() {
    const vm = this;
    // this.onMapCenterChanged = debounce(event => {
    //   vm.params.longitude = event.lng();
    //   vm.params.latitude = event.lat();
    //   vm.initWebsocket();
    // }, 500);
  },
  methods: {
    hoverChange(id: any) {
      this.hoverId = id;
    },
    leaveChange(id: any) {
      if(this.hoverId == id) {
        this.hoverId = null
      }
      console.log(this.hoverId);

    },
    onGuestsChange({ guests, description }) {
      this.params = { ...this.params, ...guests };
      this.guestsButtonText = description;
      this.connection?.close();
      this.initWebsocket();
    },
    initWebsocket() {
      console.log("init websocket")
      let vm = this
      this.listings = new Array;

      let hostURL = import.meta.env.VITE_CONIFER_API.replace("https://", "").replace("http://", "")
      let url = new URL(`ws://${hostURL}/search/ws`)

      console.log(url)

      for (const [key, value] of Object.entries(this.params)) {
        if (value) {
          url.searchParams.append(key, value)
        }
      }
      this.connection = new WebSocket(url);

      console.log(this.connection)
      // Connection opened
      this.connection.addEventListener('open', (event) => {
        // Retrieves the first set of results
        this.connection.send("Connected")
      });

      // Listen for messages
      this.connection.addEventListener('message', (event) => {
        try {
          let data = JSON.parse(event.data)
          if (data instanceof Array) {
            for (let property of data) {
              const listing: Listing = <Listing>JSON.parse(property);
              vm.listings.push(listing);
            }
          }
        } catch (error: Error) {};
      });

      this.$router.replace({ query: { ...this.params } });
    },
    changeBedsAndBaths() {
      this.connection.close()
      this.initWebsocket();
    },
    getMoreListings() {
      this.connection.send("more")
    },
    getMapBounds(event) {},
    onChangeDestinationAndDates(newValues) {
      this.params = { ...this.params, ...newValues };
      this.initWebsocket();
    },
  },
  computed: {
    sortedListings(): Listing[] {
      return this.listings
      const newestListings: Listing[] = this.listings.sort(
        (listingA: Listing, listingB: Listing) =>
          new Date(listingB.created).valueOf() -
          new Date(listingA.created).valueOf()
      );

      return this.filters.created === "asc"
        ? newestListings
        : newestListings.reverse();
    },
    markers(): MapMarker[] {
      return this.sortedListings.reduce(
        (markers: MapMarker[], { id, name, address, images, beds, baths, rating, total_reviews, average_price }) => {
          let title = name;
          const position = {
            lat: parseFloat(address.latitude.toString()),
            lng: parseFloat(address.longitude.toString()),
          };
          markers.push({ id, title, position, images, beds, baths, rating, total_reviews, average_price });

          return markers;
        },
        []
      );
    },
    hasEnteredDates() {
      return this.params.check_in && this.params.check_out;
    },
  },
  beforeUnmount() {
    this.onMapCenterChanged.cancel();
  },
};
</script>

<style scoped>

</style>
