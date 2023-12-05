<script setup lang="ts">

</script>
<template>
    <div class="text-center w-12 fixed right-6 bottom-6 cursor-pointer" @click="openReportModal = true">
        <span class="w-full text-center flex justify-center">
            <svg class="w-7 fill-current text-[#F3A24D]" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32"><path d="M4 1.333h24c2.2 0 4 1.8 4 4v21.333c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V5.333c0-2.2 1.8-4 4-4zM28 28c.733 0 1.333-.6 1.333-1.333V8H2.666v18.667c0 .733.6 1.333 1.333 1.333h24zm-5.229-6.343a1 1 0 0 1 .457.452l1.332 2.667a.998.998 0 0 1-.894 1.446.996.996 0 0 1-.895-.553l-1.181-2.361-.924-.448v.031a4.67 4.67 0 0 1-3.667 4.553v-12.22a1 1 0 0 0-2 0v12.22a4.672 4.672 0 0 1-3.667-4.553v-.031l-.925.448-1.181 2.361a.996.996 0 0 1-1.342.448 1.001 1.001 0 0 1-.447-1.341l1.333-2.667c.099-.197.26-.357.459-.453l2.103-1.019v-1.3l-1.909-.475a.998.998 0 0 1-.651-.523l-1.333-2.668a.998.998 0 0 1 .447-1.341.998.998 0 0 1 1.341.448l1.128 2.255.977.244v-2.053a1 1 0 0 1 1-1c0-.599.157-1.156.413-1.656-.38-.796-1.173-1.344-2.08-1.344a1 1 0 0 1 0-2c1.425 0 2.733.709 3.531 1.825.535-.305 1.144-.493 1.803-.493s1.268.188 1.803.493a4.352 4.352 0 0 1 3.531-1.827 1 1 0 0 1 0 2c-.907 0-1.7.547-2.08 1.344.256.5.413 1.057.413 1.656a1 1 0 0 1 1 1v2.053l.979-.245 1.128-2.255a.999.999 0 1 1 1.788.893l-1.333 2.667a1.004 1.004 0 0 1-.653.524l-1.908.477v1.3l2.104 1.02z"></path></svg>
        </span>
        <span class="text-sm block leading-none text-[#F3A24D]">Report a Bug</span>
    </div>
    <vue-final-modal
      :click-to-close="false"
      v-model="openReportModal"
      classes="flex justify-center items-center px-10"
      content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
    >
      <span v-on:click="openReportModal=false" class="cursor-pointer"><svg class="w-5 h-5  float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
      <span class="text-2xl text-[#F3A24D] font-bold text-center mt-2">
        <slot name="title">Report a Bug</slot>
      </span>
      <div class="mt-8">
        <textarea rows="10" class="rounded-md w-96" placeholder="Please add a bug..."></textarea>
      </div>
      <div class="flex-grow overflow-y-auto py-3">
        <div class="mt-2 space-y-2 text-center">
            <button type="button" class="w-72 px-8 py-2 text-white bg-[#DE774A] rounded-md">Send Bug Report</button>
        </div>
      </div>
    </vue-final-modal>
</template>

<script lang="ts">
    export default {
      data() {
        const data = {
            openReportModal: false
        }
        return data;
      }
    }

</script>
