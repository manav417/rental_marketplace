<template>
  <vue-final-modal
    :click-to-close="false"
    v-model="showIntegrationsModal"
    classes="flex justify-center items-center px-10"
    content-class="relative flex flex-col max-h-full mx-4 border dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900 sm:w-[560px] w-full"
  >
    <span v-on:click="close" class="cursor-pointer absolute top-4 right-4"
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
        ></path></svg
    ></span>
    <div class="flex mt-4 ml-6">
      <span class="text-[#DE774A] text-[26px] font-bold">{{
        integration.name
      }}</span>
    </div>
    <span class="text-[18px] mt-6 ml-6 font-bold">
      {{ integration.email_address }}
    </span>

    <span class="text-[18px] mt-2 ml-6">
      {{ integration.description }}
    </span>
    <div class="flex-grow overflow-y-auto py-3">
      <div class="mt-4 space-y-2">
        <div class="flex gap-x-2 justify-end">
          <button
            type="button"
            class="px-8 mr-6 py-2 text-white bg-[#F3A24D] rounded-3xl"
            v-on:click="close"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Integration } from "@/interfaces/Integration";

export default defineComponent({
  props: {
    showIntegrationsModal: {
      required: true,
      type: Boolean,
    },
    integration: {
      required: true,
      type: Object as () => Integration,
    },
    close: {
      required: true,
      type: Function as () => void,
    },
  },
});
</script>
