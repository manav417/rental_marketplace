<script setup lang="ts">
import BookingDateRangePicker from "@/components/BookingDateRangePicker.vue";
import SearchResultsLocation from "@/components/search/SearchResultsLocation.vue";
import SearchService from "@/networking/api-services/search.service";
import type { Location } from "@/interfaces/Location";
import searchService from "@/networking/api-services/search.service";
</script>

<template>
  <div
    class="relative flex items-center bg-[#F5F5F5] border-0 text-gray-900 sm:text-sm rounded-3xl sm:w-96 px-12 h-[40px] w-full"
    @click="showModal = !showModal"
  >
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
    <div>{{ description }}</div>
  </div>

  <vue-final-modal
    v-model="showModal"
    classes="destination-modal flex justify-center items-center"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border rounded bg-white"
  >
    <span v-on:click="showModal = false" class="cursor-pointer"
      ><svg
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
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </span>
    <span class="text-lg font-bold text-left mb-5">
      <slot name="title">Destination</slot>
    </span>

    <div class="w-full">
      <div class="relative mb-5">
        <div class="mb-5">
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
                v-on:focus="showQueryResults = !showQueryResults"
                v-model="destination"
              />
            </div>
          </div>

          <SearchResultsLocation
            @select="selectDestination($event)"
            :locations="results"
            v-if="showQueryResults"
          />
        </div>

        <BookingDateRangePicker
          :check_in="check_in"
          :check_out="check_out"
          @date-range-changed="onDateRangeChanged($event)"
        />
      </div>

      <!-- <div class="pt-3">
        <button
          @click="changeDestinationAndDates()"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Done
        </button>
      </div> -->
    </div>
  </vue-final-modal>
</template>

<script lang="ts">
export default {
  emits: ["change-destination-and-dates"],
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
  data() {
    const data = {
      showModal: false,
      destination: "",
      showQueryResults: false,
      results: [],
      check_in: "",
      check_out: "",
      location: {
        state: "",
        city: "",
        longitude: "",
        latitude: "",
        id: "",
      },
    };
    return data;
  },
  mounted() {
    const {
      check_in = "",
      check_out = "",
      city = "",
      state = "",
      longitude = "",
      latitude = "",
    } = this.params;

    if (city && state) {
      this.destination = `${city}, ${state}`;
      this.location.city = city;
      this.location.state = state;
      this.location.longitude = longitude;
      this.location.latitude = latitude;
    }

    if (check_in && check_out) {
      this.check_in = check_in;
      this.check_out = check_out;
    }
  },
  computed: {
    description() {
      const {
        check_in = "",
        check_out = "",
        city = "",
        state = "",
      } = this.params;

      let description = "";

      if (city && state) {
        description += `${city}, ${state}`;
      }

      if (check_in && check_out) {
        const start = this.descriptionDateFormatter(check_in);
        const end = this.descriptionDateFormatter(check_out);
        description += ` ${start} - ${end}`;
      }

      return description;
    },
  },
  methods: {
    changeDestinationAndDates() {
      let updateData = {};

      const formCheckIn = this.isoDateFormatter(this.check_in);
      const formCheckOut = this.isoDateFormatter(this.check_out);

      console.log(formCheckIn);
      console.log(formCheckOut);

      if (formCheckIn != "NaN-NaN-NaN" && formCheckOut != "NaN-NaN-NaN") {
        updateData = {
          check_in: formCheckIn,
          check_out: formCheckOut,
        };
      }

      updateData = {
        ...updateData,
        ...this.location,
      };

      this.$emit("change-destination-and-dates", updateData);
      this.showModal = false;
    },
    descriptionDateFormatter(dateString: string): string {
      const { day, month } = this.extractDate(dateString, false);

      return `${month}/${day}`;
    },
    isoDateFormatter(dateString: string): string {
      const { day, month, year } = this.extractDate(dateString);

      return `${year}-${month}-${day}`;
    },
    async selectDestination(location: Location) {
      this.location = location;
      this.location.id = location.id;
      const { city = "", state = "" } = location;
      this.destination = `${city}, ${state}`;
      this.showQueryResults = false;
      if (location.id) {
        searchService.incrementCityState(location.id);
      }
      this.changeDestinationAndDates();
    },
    clearDestination() {
      this.destination = "";
      this.location.state = "";
      this.location.city = "";
      this.location.longitude = "";
      this.location.latitude = "";
      this.showQueryResults = false;
      this.$refs.destination?.focus();
    },
    extractDate(dateString: string, padNumbers = true) {
      const pad = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
      let date = new Date(dateString);
      const timezoneOffset = date.getTimezoneOffset();
      const time = date.getTime();
      date = new Date(time + timezoneOffset * 60000);

      const day = padNumbers ? pad(date.getDate()) : date.getDate();
      const month = padNumbers ? pad(date.getMonth() + 1) : date.getMonth() + 1;
      const year = date.getFullYear();

      return {
        day,
        month,
        year,
      };
    },
    onDateRangeChanged({ check_in, check_out }) {
      this.check_in = check_in;
      this.check_out = check_out;
      this.changeDestinationAndDates();
    },
    getSearchResults(value: string) {
      SearchService.searchCities(value).then(
        (res) => (this.results = res.data)
      );
    },
  },
  watch: {
    destination(value) {
      value.length ? this.getSearchResults(value) : (this.results = []);
    },
  },
};
</script>

<style>
.datepicker.datepicker-dropdown.dropdown {
  z-index: 1001;
}
.destination-modal > .vfm__content {
  width: 100%;
  max-width: 450px;
}
</style>
