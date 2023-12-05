<script setup lang="ts">
import type { PropType } from "vue";
import type { ListingReview } from "@/interfaces/ListingReview";
import PersonIcon from "@/assets/images/icons/person.svg";
import dayjs from "dayjs";
</script>

<template>
  <div class="flex pt-5">
    <div class="w-full">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="bg-white mb-5"
      >
        <div class="flex items-center space-x-0.5 mb-3">
          <div class="flex items-center space-x-2 mr-auto">
            <div class="flex flex-shrink-0 rounded-full border border-gray-200">
              <img
                class="w-8 h-8 object-cover rounded-full"
                :src="review.author_picture_url || PersonIcon"
                :alt="review.author_name"
              />
            </div>
            <span class="text-[16px] font-bold leading-5 text-gray-900">{{
              review.author_name
            }}</span>
            <p class="text-[16px]  leading-5  pl-3">
              {{ dayjs(review.created).format("MMM YYYY") }}
            </p>
          </div>
          <div class="flex items-center">
            <svg
              v-for="i in 5"
              :class="i <= review.rating ? 'text-black-300' : 'text-gray-300'"
              class="w-4 h-4"
              :fill="i <= review.rating ? 'currentColor' : 'none'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              viewBox="0 0 24 24"
              stroke="currentColor"
              :key="i"
            >
              <path
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              ></path>
            </svg>
            <span class="ml-2 text-[16px]">{{review.rating.toFixed(2)}}</span>
          </div>
        </div>
        <div class="space-y-1">
          <p class="text-[16px]  leading-5 text-black">
            {{ review.review }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    reviews: {
      type: Array as PropType<ListingReview[]>,
      required: true,
    },
  },
};
</script>
