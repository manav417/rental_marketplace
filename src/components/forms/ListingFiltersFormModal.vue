<script setup lang="ts">
import { FiltersStore } from "@/stores/filtersStore";
import { storeToRefs } from "pinia";
</script>

<template>
  <div class="relative w-full">
    <div class="relative">
      <div class="filters grid grid-cols-3 gap-2 mb-5">
        <div>
          <label
            for="reviews"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >Reviews</label
          >
          <select
            v-model="filters.reviews"
            class="filter bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="asc">Highest to Lowest</option>
            <option value="desc">Lowest to Highest</option>
          </select>
        </div>

        <div>
          <label
            for="created"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >Created</label
          >
          <select
            v-model="filters.created"
            class="filter bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="asc">Newest to Oldest</option>
            <option value="desc">Oldest to Newest</option>
          </select>
        </div>

        <div>
          <label
            for="price"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >Price</label
          >
          <select
            v-model="filters.price"
            class="filter bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select>
        </div>
      </div>
    </div>

    <div class="pt-3">
      <button
        @click="$emit('done')"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Done
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  emits: ["done"],
  data() {
    const filtersStore = FiltersStore();
    const { filters: filters } = storeToRefs(filtersStore);

    const data = {
      filters,
    };
    return data;
  },
};
</script>

<style scoped>
.filters .filter {
  width: 100%;
  min-width: 160px;
}
</style>
