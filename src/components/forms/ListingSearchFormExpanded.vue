<script setup lang="ts">
import { ref } from "vue";
import SearchService from "@/networking/api-services/search.service";
import SearchResultsLocation from "@/components/search/SearchResultsLocation.vue";
import DateRangePicker from "flowbite-datepicker/DateRangePicker";
</script>

<template>
  <form action="." @submit.prevent="search">
    <div class="flex gap-x-1.5">
      <div class="search-input">
        <label
          for="default-search"
          class="mb-2 text-md font-medium text-gray-900 sr-only dark:text-gray-300"
          >Search</label
        >
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Destination"
            v-on:input="debounceInput"
            v-on:focus="showQueryResults = !showQueryResults"
            v-model="query"
          />
        </div>
      </div>

      <div
        date-rangepicker
        id="date-rangepicker"
        ref="datepicker"
        class="flex items-center gap-x-1.5"
      >
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            ref="start"
            name="start"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Check-in"
          />
        </div>
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            ref="end"
            name="end"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Check-out"
          />
        </div>
      </div>

      <div class="relative">
        <div
          type="button"
          class="guests-btn text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded cursor-pointer text-sm px-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          v-text="guestsButtonText"
          @click="showGuestsForm = !showGuestsForm"
        ></div>
      </div>

      <div class="relative ml-auto">
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-md px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </div>

    <SearchResultsLocation
      @select="selectCityState($event)"
      :locations="results"
      v-if="showQueryResults"
    />

    <div class="relative mt-5" v-if="showGuestsForm">
      <div class="grid grid-cols-2 gap-x-2">
        <div class="mb-6">
          <label
            for="default-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Adults (18+)</label
          >
          <input
            type="number"
            v-model="params.guests.adults"
            min="1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-6">
          <label
            for="default-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Children (0-17)</label
          >
          <input
            type="number"
            v-model="params.guests.children"
            min="0"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div class="mb-6">
        <div class="flex">
          <div class="flex items-center mr-6">Pets</div>
          <div class="flex items-center mr-4">
            <input
              id="inline-radio"
              type="radio"
              :value="true"
              v-model="params.guests.pets"
              name="inline-radio-group"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="inline-radio"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Yes</label
            >
          </div>
          <div class="flex items-center mr-4">
            <input
              id="inline-2-radio"
              type="radio"
              v-model="params.guests.pets"
              :value="false"
              name="inline-radio-group"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="inline-2-radio"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >No</label
            >
          </div>
        </div>
        <div v-show="params.guests.pets">
          <p class="mt-3">Only properties that allow pets will be shown</p>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import debounce from "lodash.debounce";

export default {
  data() {
    const data = {
      query: "",
      showQueryResults: false,
      results: [],
      guests: 1,
      showGuestsForm: false,
      params: {
        location: {
          city: "",
          state: "",
        },
        guests: {
          adults: 1,
          children: 0,
          pets: false,
        },
      },
    };
    return data;
  },
  mounted() {
    new DateRangePicker(document.getElementById("date-rangepicker"), {
      autohide: false,
    });
  },
  computed: {
    guestsButtonText() {
      const quests = this.params.guests;
      const questsTotal = quests.adults + quests.children;
      const guestsText = `${questsTotal} Guest${questsTotal > 1 ? "s" : ""}`;

      return !this.params.guests.pets ? guestsText : `${guestsText}, Pet`;
    },
  },
  methods: {
    getSearchResults(value: string) {
      SearchService.searchCities(value).then(
        (res) => (this.results = res.data)
      );
    },
    debounceInput: debounce(function (e) {
      this.query = e.target.value;
    }, 300),
    selectCityState({ city, state }) {
      this.query = `${state}, ${city}`;
      this.params.location.state = state;
      this.params.location.city = city;
      this.showQueryResults = false;
    },
    search() {
      const query = { ...this.params.location, ...this.params.guests };
      const checkIn = this.$refs.start.value;
      const checkOut = this.$refs.start.value;
      if (checkIn) query.checkIn = checkIn;
      if (checkOut) query.checkOut = checkOut;

      this.$router.push({
        path: "location-search",
        query,
      });
    },
  },
  watch: {
    query(value) {
      value.length > 1 ? this.getSearchResults(value) : (this.results = []);
    },
  },
};
</script>

<style scoped>
#date-rangepicker {
  max-width: 280px;
}
.guests-btn {
  min-width: 100px;
}
</style>
