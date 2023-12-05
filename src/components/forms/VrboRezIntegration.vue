<script setup lang="ts">
  import VrboService from "@/networking/api-services/vrbo.service";
  import AccountsService from "@/networking/api-services/accounts.service";
  import { UserStore } from "@/stores/userStore";
  import { storeToRefs } from "pinia";
  import dayjs from 'dayjs';
  </script>

  <template>
    <div class="mt-3">
      <div v-for="vrboLink in vrboData.urls">
        <div class="p-3 px-4 bg-[#F5F5F5] sm:rounded-3xl rounded-xl mt-3 hover:bg-gray-100 cursor-pointer relative flex items-center sm:h-[40px]">
          <div class="sm:flex w-full items-center">
            <p v-if="vrboLink.sync_status === 'Failed'" class="bg-red-200 px-2">{{vrboLink.reason_failed}}</p>
            <p class="sm:w-[40%]">{{vrboLink.url}}</p>
            <p class="sm:w-[20%]">{{dayjs(String(vrboLink.last_sync)).format('MM/DD/YYYY hh:mm')}}</p>
            <p class="sm:w-[10%]"><span class="font-bold">{{vrboLink.sync_status}}</span></p>
            <p class="sm:w-[10%]"><span class="font-bold">{{vrboLink.verification_status}}</span></p>
            <p class="sm:w-[20%] flex sm:justify-center justify-end">
              <span v-if="vrboLink.sync_status == 'Success'" @click="syncVrboUrl(vrboLink)" class="text-sm text-[#DE774A] font-bold">Sync Now</span>
              <span @click="deleteLink(vrboLink.id)" class="text-sm sm:ml-8 text-[#83858A] font-bold">Remove</span>
            </p>
          </div>
        </div>

        <div v-if="vrboLink.sync_status == 'Success'">
          <div v-if="vrboLink.verification_status == 'Unverified'" class="w-11/12 float-right align: middle">
            <div class="w-2/12 inline-block">
              <strong>Update Connection URL:</strong>
            </div>
            <div class="w-8/12 inline-block">
              In order to update your Connection Url, we need to verify that you own this listing.
            </div>
            <div class="w-2/12 inline-block">
              <button @click="startVerification(vrboLink)"
                class="w-3/12 mt-3 sm:w-[200px] w-full rounded-3xl  h-[40px] bg-[#F3A24D] px-4 flex items-center justify-center text-white"
              >Start Verification</button>
            </div>
          </div>

          <div v-if="vrboLink.verification_status == 'In Progress'" class="w-11/12 float-right align: middle">
            <div class="w-2/12 inline-block">
              <strong>Update Connection URL:</strong>
            </div>
            <div class="w-6/12 inline-block">
              Within 24 hours you will receive a message containing a unique code to your VRBO account. Copy that code and paste it here.
            </div>
            <div class="w-4/12 inline-block">
              <input @input="pasteLink" v-model="vrboLink.verificationCode" placeholder="verification code" class="inline m-auto placeholder:bold focus:ring-1 focus:ring-orange-600 p-3 px-4 bg-[#F5F5F5] rounded-3xl mt-3 hover:bg-gray-100 cursor-pointer relative items-center h-[40px]"/>
              <button class="mt-3 sm:w-[200px] w-6/12 inline rounded-3xl  h-[40px] bg-[#F3A24D] px-4 items-center justify-center text-white "
                @click="verifyCode(vrboLink)"
              >Verify Code</button>
            </div>
          </div>

          <div v-if="vrboLink.verification_status == 'Verified'" class="w-11/12 float-right align: middle">
            <div class="w-2/12 inline-block">
              <strong>Update Connection URL:</strong>
            </div>

            <div class="w-8/12 inline-block">
              <input @input="pasteLink" v-model="vrboLink.connection_url" :placeholder="vrboLink.url" class="placeholder:bold focus:ring-1 focus:ring-orange-600 p-3 px-4 bg-[#F5F5F5] rounded-3xl mt-3 hover:bg-gray-100 cursor-pointer relative flex items-center h-[40px] w-full"/>
            </div>
            <div class="w-2/12 inline-block">
              <button @click="updateConnectionUrl(vrboLink)" class="m-auto sm:w-[200px] w-full rounded-3xl  h-[40px] bg-[#F3A24D] px-4  flex items-center justify-center text-white">Update</button>
            </div>
          </div>

          <div class="clear-both"></div>
        </div>
        <div class="mt-8 mb-8 w-11/12 m-auto border"></div>

      </div>

      <div class="p-3 px-4 bg-[#F5F5F5] sm:rounded-3xl rounded-xl mt-3 hover:bg-gray-100 cursor-pointer relative flex items-center sm:h-[40px]" v-for="(link, i) in newLinkList" :key="i">
        <div class="sm:flex w-full items-center">
          <p class="sm:w-[50%]">{{link}}</p>
          <p class="sm:w-[20%]">--</p>
          <p class="sm:w-[10%]"><span>--</span></p>
          <p class="sm:w-[20%] flex sm:justify-center justify-end">
            <span @click="syncVrbo(i)" class="text-sm text-[#DE774A] font-bold">Sync Now</span>
            <span @click="deleteNewLink(i)" class="text-sm ml-8 text-[#83858A] font-bold">Remove</span>
          </p>
        </div>
      </div>
      <div class="w-full">
        <input @input="pasteLink" v-model="newLink" placeholder="Paste VRBO property URL here" class="placeholder:bold focus:ring-1 focus:ring-orange-600 p-3 px-4 bg-[#F5F5F5] rounded-3xl mt-3 hover:bg-gray-100 cursor-pointer relative flex items-center h-[40px] w-full"/>
      </div>
    </div>
    <!-- delete modal -->
    <vue-final-modal
      :click-to-close="false"
      v-model="openDeleteModal"
      classes="flex justify-center items-center px-10"
      content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
    >
      <span v-on:click="openDeleteModal=false" class="cursor-pointer"><svg class="w-4 h-4  float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
      <span class="text-md font-bold text-center mt-3">
        <slot name="title">Do you want to remove this listing?</slot>
      </span>
      <div class="flex-grow overflow-y-auto py-2">
        <div class="mt-4 space-y-2 text-center">
            <button @click="removeSyncLink" type="button" class="px-8 py-1 text-blue-100 bg-blue-700">Delete</button>
        </div>
      </div>
    </vue-final-modal>

    <vue-final-modal
      :click-to-close="false"
      v-model="isSyncing"
      classes="flex justify-center items-center px-10"
      content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
    >
      <span class="text-md font-bold text-center mt-3">
        <slot name="title">Syncing Listing....</slot>
      </span>
    </vue-final-modal>

    <vue-final-modal
      :click-to-close="true"
      v-model="isSaved"
      classes="flex justify-center items-center px-10"
      content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
    >
    <span v-on:click="isSaved=false" class="cursor-pointer"><svg class="w-4 h-4  float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
      <span class="text-md font-bold text-center mt-3">
        <slot name="title">Saved</slot>

        <button @click="isSaved=false" class="m-auto mt-4 sm:w-[200px] w-full rounded-3xl  h-[40px] bg-[#F3A24D] px-4  flex items-center justify-center text-white">Ok</button>
      </span>
    </vue-final-modal>
  </template>

  <script lang="ts">
  export default {
    data() {
      const userStore = UserStore();
      const {vrboData: vrboData} = storeToRefs(userStore);

      const data = {
        isSyncing: false,
        isSaved: false,
        links: new Array(),
        vrboData: vrboData,
        openDeleteModal: false,
        removeKey: '',
        newLink: '',
        newLinkList: new Array()
      };
      return data;
    },
    methods: {
      pasteLink() {
        if(this.newLink != '') {
          this.newLinkList.push(this.newLink);
          this.newLink = '';
          this.changeVrboUrls(this.newLinkList);
        }
      },

      deleteNewLink(i:any) {
        this.newLinkList.splice(i, 1);
        this.changeVrboUrls(this.newLinkList);

      },

      async syncVrboUrl(vrboUrl) {
        this.isSyncing = true;
        let res = await VrboService.syncVrbo([vrboUrl.url]);
        if (res.data) {
          this.vrboData.urls = res.data.urls;
        }
        this.isSyncing = false;
      },


      async syncVrbo(i: any) {
        this.isSyncing = true;
        let res = await VrboService.syncVrbo([this.newLinkList[i]]);
        if(res.data) {
          this.vrboData.urls = res.data.urls;
          this.newLinkList.splice(i, 1);
        }
        this.isSyncing = false;
      },

      async startVerification(vrboUrl: any) {
        let res = await VrboService.startVerification(vrboUrl.id)
        if (res.data) {
          this.vrboData.urls = res.data.urls;
        }
      },

      async verifyCode(vrboUrl: any) {
        if (vrboUrl.verificationCode) {
          let res = await VrboService.verifyCode(vrboUrl.id, vrboUrl.verificationCode);
          if (res.data) {
            this.vrboData.urls = res.data.urls;
          }
        }
      },

      async updateConnectionUrl(vrboUrl: any) {
        let res = await VrboService.updateConnectionUrl(vrboUrl.id, vrboUrl.connection_url);
        if (res.data) {
          this.vrboData.urls = res.data.urls;
          this.isSaved = true;
        }
      },

      async deleteLink(id: string) {
        this.removeKey = id;
        this.openDeleteModal = true;
      },

      async removeSyncLink() {
        let res = await VrboService.removeLink(this.removeKey);
        if(res.status === 200) {
          this.openDeleteModal = false;
          AccountsService.getUser();
        }
      }
    },
    props: ['changeVrboUrls']
  };
  </script>
