<script setup lang="ts">
    import { UserStore } from "@/stores/userStore";
    import { storeToRefs } from "pinia";
    import AccountsService from "../../networking/api-services/accounts.service";
    </script>

    <template>
      <div class="container mx-auto px-5">
        <div class="grid mt-4 space-y-2">
          <div class="py-4 border px-3 rounded-lg flex justify-between" v-for="page in pageList">
              <div @click="goToDetailPage(page.id)" class="cursor-pointer">
                  <span class="font-bold-md">{{page.name}}</span>
                  <span class="ml-4 text-xs text-white bg-green-500 rounded-md px-2 py-0.5" v-if="page.is_default">default</span>
              </div>
              <div v-if="!page.is_default">
                  <span @click="stayDelete(page.id)" class="cursor-pointer">delete</span>
                  <span @click="stayEdit(page.id, page.name)" class="ml-4 cursor-pointer">edit</span>
              </div>
          </div>
        </div>
        <div class="border border-slate-200 mt-4"></div>
        <div class="mt-3">
          <div>
            <button @click="openCreateModal=true" class="bg-blue-500 hover:bg-blue-700 text-white font-600 py-1 px-4 mr-3 rounded-md">Add Favorites Container</button>
          </div>
        </div>
        <vue-final-modal
          :click-to-close="false"
          v-model="openCreateModal"
          classes="flex justify-center items-center px-10"
          content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
        >
          <span v-on:click="openCreateModal=false" class="cursor-pointer"><svg class="w-5 h-5  float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
          <span class="text-2xl font-bold text-center mt-2">
            <slot name="title">Add Favorites Container</slot>
          </span>
          <div class="grid overflow-y-auto py-2">
              <div class="grid mt-4 space-y-2">
                  <p v-if="isError" class="text-red-500">Name is required.</p>
                  <input
                      type="text"
                      id="Name"
                      v-model="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full mb-2"
                      placeholder="Name"
                      required
                      @input="isError = false"
                  />
                  <button @click="createPage" type="button" class="w-72 px-8 py-2 text-blue-100  mt-2 bg-blue-700 rounded-md">Create</button>
              </div>
          </div>
        </vue-final-modal>

        <vue-final-modal
          :click-to-close="false"
          v-model="openEditModal"
          classes="flex justify-center items-center px-10"
          content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
        >
          <span v-on:click="openEditModal=false" class="cursor-pointer"><svg class="w-5 h-5  float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
          <span class="text-2xl font-bold text-center mt-2">
            <slot name="title">Edit Favorites Container</slot>
          </span>
          <div class="grid overflow-y-auto py-2">
              <div class="grid mt-4 space-y-2">
                  <input
                      type="text"
                      id="Name"
                      v-model="editData.name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full mb-2"
                      placeholder="Name"
                      required
                  />
                  <button @click="editPage" type="button" class="w-72 px-8 py-2 text-blue-100  mt-2 bg-blue-700 rounded-md">Edit</button>
              </div>
          </div>
        </vue-final-modal>
        <vue-final-modal
          :click-to-close="false"
          v-model="openDeleteModal"
          classes="flex justify-center items-center px-10"
          content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
        >
          <span v-on:click="openDeleteModal=false" class="cursor-pointer"><svg class="w-5 h-5  float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
          <span class="text-xl font-bold text-center mt-2">
            <h3 name="title">Confirm Delete</h3>
          </span>
          <div class="grid overflow-y-auto py-2">
              <div class="grid mt-4 space-y-2">
                  <button @click="deletePage" type="button" class="w-72 px-8 py-2 text-blue-100  mt-2 bg-blue-700 rounded-md">Delete</button>
              </div>
          </div>
        </vue-final-modal>
      </div>
    </template>

    <script lang="ts">
    export default {
      data() {
        const userStore = UserStore();
        const data = {
            pageList: [],
            name: '',
            openCreateModal: false,
            editData: {},
            openEditModal: false,
            openDeleteModal: false,
            isError: false
        }
        return data
      },
      mounted() {
        this.getList();
      },

      methods: {
        getList() {
            AccountsService.getStayPages().then((res) => {
                this.pageList = res;
            })
        },
        createPage() {
          if(this.name == '' || this.name == null ) {
            this.isError = true;
            return false;
          }
          AccountsService.createStayPage({name: this.name}).then((res) => {
              if(res.status === 200) {
                  this.openCreateModal = false;
                  this.getList();
              }
          })
        },

        goToDetailPage(id: any) {
            this.$router.push("/stay-detail/" + id);
            // alert()
        },

        stayEdit(id: any, name: any) {
            this.editData = {id: id, name: name};
            this.openEditModal = true;
        },

        stayDelete(id: any) {
            this.editData = {id: id};
            this.openDeleteModal = true;
        },

        editPage() {
            AccountsService.editStayPage(this.editData).then((res) => {
                if(res.status === 200) {
                    this.openEditModal = false;
                    this.getList();
                }
            })
        },

        deletePage() {
            AccountsService.deleteStayPage(this.editData.id).then((res) => {
                if(res.status === 200) {
                    this.openDeleteModal = false;
                    this.getList();
                }
            })
        }
      },
    };
    </script>
