<script setup lang="ts">
import type { PropType } from "vue";
import type { Location } from "@/interfaces/Location";
</script>

<template>
  <ul
    class="search-results shadow-2xl -mt-1 z-100 py-4 rounded-b-3xl rounded-t-xl absolute z-50 w-full bg-[white]"
    v-if="locations.length > 0"
  >
    <li v-for="location in locations" :key="location.id">
      <span
        class="block w-full p-3 bg-white hover:bg-[#F6EEE1] text-gray-900 text-sm px-4 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
        @click="selectCityState(location)"
        >{{ location.city }}, {{ location.state_short }}</span
      >
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  props: {
    locations: {
      type: Array as PropType<Location[]>,
      required: true,
    },
  },
  methods: {
    selectCityState(location: Location) {
      this.$emit("select", {
        id: location.id,
        city: location.city,
        state: location.state_short,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    },
  },
};
</script>
