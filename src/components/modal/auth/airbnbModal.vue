<script setup lang="ts">
    import AirBnbService from "@/networking/api-services/airBnb.service";
    import { UserStore } from "@/stores/userStore";
    import { storeToRefs } from "pinia";
    </script>

    <template>
      <vue-final-modal
        :click-to-close="false"
        v-model="openAirBnBModal"
        classes="flex justify-center items-center px-10"
        content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
      >
        <span v-on:click="openAirBnBModal=false" class="cursor-pointer"><svg class="w-5 h-5  float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
        <span class="text-2xl font-bold text-center mt-2">
          <slot name="title">Add the AirBnB link.</slot>
        </span>
        <div class="flex-grow overflow-y-auto py-2">
          <div >
            <div v-if="links.length > 0">
              <div class="mb-1 flex items-center" v-for="(link, i) in links" :key="i">
                <input
                  v-model="links[i]"
                  type="text"
                  placeholder="https://example.com"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <span @click="removeLink(i)" class="text-xl ml-2 cursor-pointer">-</span>
              </div>
            </div>
            <div class="mt-1 text-center">
              <span @click="addLInk" class="text-xl cursor-pointer">+</span>
            </div>
          </div>
          <div class="mt-4 space-y-2 text-center">
              <button @click="syncAirBnB" type="button" class="w-72 px-8 py-1 text-blue-100 bg-blue-700 rounded-md">Submit</button>
          </div>
        </div>
      </vue-final-modal>
    </template>

    <script lang="ts">
    export default {
      data() {
        const data = {
          openAirBnBModal: false,
          links: new Array(),
        };
        return data;
      },
      methods: {
        addLInk() {
          console.log(this.links)
          this.links.push("");
        },
        removeLink(index: any) {
          this.links.splice(index, 1);
          console.log(this.links);

        },
        async syncAirBnB() {
          let res = await AirBnbService.syncAirBnB(this.links);
          if(res.data.is_syncing) {
            this.openAirBnBModal = false;
          }
        },
      },
    };
</script>
