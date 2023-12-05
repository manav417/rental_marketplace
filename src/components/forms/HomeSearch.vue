<script setup lang="ts">
import { ref } from "vue";
import SearchService from "@/networking/api-services/search.service";
import SearchResultsLocation from "@/components/search/SearchResultsLocation.vue";
import GuestsForm from "@/components/forms/GuestsForm.vue";
import DateRangePicker from "flowbite-datepicker/DateRangePicker";
import PersonIcon from "@/assets/images/icons/person.svg";
import type { Location } from "@/interfaces/Location";
</script>

<template>
  <form action="." @submit.prevent="search">
    <div class="gap-x-1.5 relative">
      <div class="search-input">
        <label
          for="default-search"
          class="mb-2 text-md font-medium text-gray-900 sr-only dark:text-gray-300"
          >Search</label
        >
        <div class="relative z-0">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 10.4249C16.8075 10.4249 16.1306 10.6295 15.5548 11.0128C14.979 11.3961 14.5303 11.941 14.2653 12.5785C14.0003 13.2159 13.931 13.9174 14.0661 14.5941C14.2011 15.2708 14.5346 15.8924 15.0243 16.3803C15.5139 16.8682 16.1378 17.2005 16.8169 17.3351C17.4961 17.4697 18.2001 17.4006 18.8398 17.1366C19.4796 16.8725 20.0264 16.4254 20.4111 15.8517C20.7958 15.278 21.0012 14.6035 21.0012 13.9135C21.0001 12.9886 20.6309 12.1018 19.9745 11.4478C19.3182 10.7938 18.4282 10.4259 17.5 10.4249ZM17.5 15.6578C17.1537 15.6578 16.8153 15.5555 16.5274 15.3638C16.2395 15.1722 16.0151 14.8998 15.8826 14.581C15.7501 14.2623 15.7155 13.9116 15.783 13.5732C15.8506 13.2348 16.0173 12.924 16.2621 12.6801C16.5069 12.4361 16.8189 12.27 17.1585 12.2027C17.498 12.1354 17.85 12.1699 18.1699 12.302C18.4898 12.434 18.7632 12.6576 18.9556 12.9444C19.1479 13.2313 19.2506 13.5685 19.2506 13.9135C19.25 14.376 19.0654 14.8193 18.7372 15.1463C18.4091 15.4733 17.9641 15.6573 17.5 15.6578Z"
                fill="black"
              />
              <path
                d="M24.2393 7.20111C22.5729 5.53896 20.3485 4.55157 17.9953 4.42952C15.6421 4.30747 13.327 5.0594 11.4968 6.54019C9.66662 8.02098 8.45109 10.1257 8.08481 12.448C7.71854 14.7704 8.22748 17.1458 9.51341 19.1158L16.1395 29.2645C16.2869 29.4903 16.4886 29.6759 16.7261 29.8043C16.9636 29.9327 17.2294 30 17.4996 30C17.7697 30 18.0356 29.9327 18.2731 29.8043C18.5106 29.6759 18.7122 29.4903 18.8596 29.2645L25.4859 19.1158C26.6791 17.2883 27.2065 15.1072 26.9795 12.938C26.7525 10.7688 25.7851 8.74332 24.2393 7.20111ZM24.0166 18.1607L17.4996 28.142L10.9826 18.1607C8.98774 15.1055 9.41559 11.0167 11.9999 8.43828C12.7221 7.7177 13.5795 7.1461 14.5232 6.75613C15.4668 6.36615 16.4782 6.16543 17.4996 6.16543C18.521 6.16543 19.5324 6.36615 20.476 6.75613C21.4197 7.1461 22.2771 7.7177 22.9993 8.43828C25.5836 11.0167 26.0114 15.1055 24.0166 18.1607Z"
                fill="black"
              />
            </svg>
          </div>
          <span
            v-if="destination.length > 0"
            @click="clearDestination()"
            class="absolute inset-y-0 right-0 inline-flex items-center rounded-md overflow-hidden"
            ><button
              type="button"
              class="px-2 py-1 mr-1 focus:outline-none text-litepie-secondary-400 dark:text-opacity-70 rounded-md"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg></button
          ></span>
          <input
            ref="destination"
            type="text"
            class="placeholder-[#000000] foco block bg-[#F5F5F5] focus:ring-1 focus:ring-orange-600 border-0 text-gray-900 sm:text-sm rounded-3xl block w-full pl-12 py-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Destination"
            v-on:input="debounceInput"
            v-on:focus="showQueryResults = !showQueryResults"
            v-model="destination"
          />
        </div>
      </div>

      <SearchResultsLocation
        @select="selectCityState($event)"
        :locations="results"
        v-if="showQueryResults"
      />

      <div
        date-rangepicker
        ref="datepicker"
        id="date-rangepicker"
        class="items-center gap-x-1.5 mt-4 w-full sm:flex"
      >
        <div class="relative z-0 sm:w-6/12">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.6 9.17499C8.54274 9.17499 6.875 10.8427 6.875 12.9V24.4C6.875 26.4573 8.54274 28.125 10.6 28.125H24.4C26.4573 28.125 28.125 26.4573 28.125 24.4V12.9C28.125 10.8427 26.4573 9.17499 24.4 9.17499H10.6ZM5.125 12.9C5.125 9.87623 7.57624 7.42499 10.6 7.42499H24.4C27.4238 7.42499 29.875 9.87623 29.875 12.9V24.4C29.875 27.4237 27.4238 29.875 24.4 29.875H10.6C7.57624 29.875 5.125 27.4237 5.125 24.4V12.9Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.9 5.125C13.3832 5.125 13.775 5.51675 13.775 6V10.6C13.775 11.0832 13.3832 11.475 12.9 11.475C12.4168 11.475 12.025 11.0832 12.025 10.6V6C12.025 5.51675 12.4168 5.125 12.9 5.125ZM22.1 5.125C22.5832 5.125 22.975 5.51675 22.975 6V10.6C22.975 11.0832 22.5832 11.475 22.1 11.475C21.6168 11.475 21.225 11.0832 21.225 10.6V6C21.225 5.51675 21.6168 5.125 22.1 5.125ZM5.125 15.2C5.125 14.7168 5.51675 14.325 6 14.325H29C29.4832 14.325 29.875 14.7168 29.875 15.2C29.875 15.6832 29.4832 16.075 29 16.075H6C5.51675 16.075 5.125 15.6832 5.125 15.2Z"
                fill="black"
              />
            </svg>
          </div>
          <input
            ref="start"
            name="start"
            type="text"
            class="focus:ring-1 focus:ring-orange-600 bg-[#F5F5F5] placeholder-[#000000] w-full border-0 text-gray-900 sm:text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Check-in"
          />
        </div>
        <div class="relative z-0 sm:w-6/12 mt-4 sm:mt-0">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.6 9.17499C8.54274 9.17499 6.875 10.8427 6.875 12.9V24.4C6.875 26.4573 8.54274 28.125 10.6 28.125H24.4C26.4573 28.125 28.125 26.4573 28.125 24.4V12.9C28.125 10.8427 26.4573 9.17499 24.4 9.17499H10.6ZM5.125 12.9C5.125 9.87623 7.57624 7.42499 10.6 7.42499H24.4C27.4238 7.42499 29.875 9.87623 29.875 12.9V24.4C29.875 27.4237 27.4238 29.875 24.4 29.875H10.6C7.57624 29.875 5.125 27.4237 5.125 24.4V12.9Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.9 5.125C13.3832 5.125 13.775 5.51675 13.775 6V10.6C13.775 11.0832 13.3832 11.475 12.9 11.475C12.4168 11.475 12.025 11.0832 12.025 10.6V6C12.025 5.51675 12.4168 5.125 12.9 5.125ZM22.1 5.125C22.5832 5.125 22.975 5.51675 22.975 6V10.6C22.975 11.0832 22.5832 11.475 22.1 11.475C21.6168 11.475 21.225 11.0832 21.225 10.6V6C21.225 5.51675 21.6168 5.125 22.1 5.125ZM5.125 15.2C5.125 14.7168 5.51675 14.325 6 14.325H29C29.4832 14.325 29.875 14.7168 29.875 15.2C29.875 15.6832 29.4832 16.075 29 16.075H6C5.51675 16.075 5.125 15.6832 5.125 15.2Z"
                fill="black"
              />
            </svg>
          </div>
          <input
            ref="end"
            name="end"
            type="text"
            class="focus:ring-1 focus:ring-orange-600 bg-[#F5F5F5] placeholder-[#000000] w-full border-0 text-gray-900 sm:text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Check-out"
          />
        </div>
      </div>

      <div class="items-center gap-x-1.5 mt-4 w-full sm:flex">
        <div class="relative z-0 sm:w-6/12">
          <div
            class="flex absolute inset-y-0 left-1 items-center pl-3 pointer-events-none"
          >
            <img width="20" height="20" :src="PersonIcon" alt="Guests" />
          </div>
          <input
            type="text"
            :value="guestsButtonText"
            @click="showGuestsForm = !showGuestsForm"
            class="focus:ring-1 focus:ring-orange-600 bg-[#F5F5F5] placeholder-[#000000] w-full border-0 text-gray-900 sm:text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Guests"
            readonly
          />
        </div>

        <div class="relative z-0 sm:w-6/12 mt-4 sm:mt-0">
          <button
            type="button"
            @click="search"
            class="flex w-full text-white items-center bg-[#F3A24D] hover:bg-[#3A6472] rounded-3xl py-3 justify-center"
          >
            <span class="text-[18px]">Go Nofie!</span>
            <span class="ml-2 mt-0.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 26 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.1905 2.38095C16.5585 2.38095 18.8295 3.32164 20.5039 4.99607C22.1784 6.6705 23.119 8.94152 23.119 11.3095C23.119 13.6775 22.1784 15.9485 20.5039 17.623C18.8295 19.2974 16.5585 20.2381 14.1905 20.2381C11.8333 20.2381 9.57213 19.306 7.89993 17.6458C7.89081 17.6361 7.8815 17.6265 7.87199 17.617C7.86338 17.6084 7.85468 17.6 7.84587 17.5917C6.19093 15.9203 5.26191 13.6628 5.26191 11.3095C5.26191 8.94152 6.20259 6.6705 7.87702 4.99607C9.55145 3.32164 11.8225 2.38095 14.1905 2.38095ZM5.39242 18.4159C3.77489 16.4134 2.88095 13.9076 2.88095 11.3095C2.88095 8.31005 4.07249 5.43343 6.19344 3.31248C8.31438 1.19154 11.191 0 14.1905 0C17.1899 0 20.0666 1.19154 22.1875 3.31248C24.3085 5.43343 25.5 8.31005 25.5 11.3095C25.5 14.309 24.3085 17.1856 22.1875 19.3066C20.0666 21.4275 17.1899 22.619 14.1905 22.619C11.5886 22.619 9.07911 21.7224 7.07515 20.1003L2.53302 24.6506C2.06853 25.1159 1.31476 25.1166 0.849434 24.6521C0.384109 24.1876 0.383436 23.4338 0.847931 22.9685L5.39242 18.4159Z"
                  fill="#F5F5F5"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <GuestsForm
        :showForm="showGuestsForm"
        @guests-changed="onGuestsChange($event)"
      />
    </div>
  </form>
</template>

<script lang="ts">
import debounce from "lodash.debounce";
import searchService from "@/networking/api-services/search.service";

export default {
  data() {
    var data = {
      destination: "",
      showQueryResults: false,
      results: [],
      guestsButtonText: "1 Guest",
      showGuestsForm: false,
      connection: null,
      params: {
        location: {
          city: "",
          state: "",
          longitude: "",
          latitude: "",
          id: "",
        },
      },
    };
    return data;
  },
  mounted() {
    new DateRangePicker(document.getElementById("date-rangepicker"), {
      autohide: true,
      minDate: new Date()
    });

    window.addEventListener("keypress", this.onKeyPress);
  },
  methods: {
    getSearchResults(value: string) {
      SearchService.searchCities(value).then(
        (res) => (this.results = res.data)
      );
    },
    debounceInput: debounce(function (e) {
      this.destination = e.target.value;
    }, 300),
    selectCityState(location: Location) {
      this.destination = `${location.city}, ${location.state}`;
      this.params.location = location;
      this.showQueryResults = false;
    },
    search() {
      const query = { ...this.params.location, ...this.params.guests };
      const check_in = this.$refs.start.value;
      const check_out = this.$refs.end.value;
      if (check_in) query.check_in = this.dateFormatter(new Date(check_in));
      if (check_out) query.check_out = this.dateFormatter(new Date(check_out));

      searchService.incrementCityState(this.params.location.id);
      this.$router.push({ path: "location-search", query });
    },

    dateFormatter(date: Date): string {
      const pad = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
      const day = pad(date.getDate());
      const month = pad(date.getMonth() + 1);
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
    },
    onGuestsChange({ guests, description }) {
      this.params.guests = guests;
      this.guestsButtonText = description;
    },
    onKeyPress(e: KeyboardEvent) {
      if (e.keyCode === 13 || e.key === "Enter") {
        this.search();
      }
    },
    clearDestination() {
      this.destination = "";
      this.params.location.city = "";
      this.params.location.state = "";
      this.params.location.latitude = "";
      this.params.location.longitude = "";
      this.showQueryResults = false;
      this.$refs.destination?.focus();
    },
  },
  watch: {
    destination(value) {
      value.length ? this.getSearchResults(value) : (this.results = []);
    },
  },
  unmounted() {
    window.removeEventListener("keypress", this.onKeyPress);
  },
};
</script>
<style lang="css" scoped>
  .datepicker-cell {
    background-color: red !important;
  }
</style>
