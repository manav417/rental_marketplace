<script setup lang="ts">
import ListingDetail from "./ListingDetail.vue";
import BlankListing from "./BlankListing.vue";
import dayjs from "dayjs";
</script>

<template>
  <div class="flex-grow py-3 relative bg-white z-20">
    <div v-if="!labelId" class="container mx-auto px-5">
      <div class="flex">
        <div>
          <input
            type="text"
            v-model="label_name"
            name="name"
            placeholder="Enter Listing name"
            class="sm:w-[400px] px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]"
          />
          <p
            class="text-red-500 mt-1"
            v-if="label_name_error != '' && label_name == ''"
          >
            {{ label_name_error }}
          </p>
        </div>
        <div class="text-right">
          <button
            type="button"
            class="ml-2 w-[118px] h-[40px] px-8 py-2 text-white font-bold bg-[#F3A24D] rounded-3xl text-[14px] hover:bg-[#3A6472] hover:text-white"
            @click="createLabel"
          >
            Save
          </button>
        </div>
      </div>
      <div class="mt-2">
        <p>
          Give your listing a label. Custom labels are not visible to guests and
          can be edited.
        </p>
      </div>
    </div>

    <div v-else :class="isEditing ? '' : 'w-full bg-white'">
      <div class="container mx-auto px-5">
        <div
          class="sm:flex items-center justify-between pb-4 border-b-[1px] sm:border-0"
        >
          <p class="text-[16px]">
            <span class="font-bold">{{ "Listing" }}</span>
            <span class="ml-10">{{ labelName }}</span>
          </p>
          <div
            v-if="integrations.length > 0 && integrations[0].url"
            class="flex items-center justify-between"
          >
            <p>
              <span class="font-bold">Status</span>
              <span>
                &nbsp;
                {{
                  label_status
                    ? label_status === "Success"
                      ? "Synced"
                      : label_status
                    : "Not synced"
                }}</span
              >
              <span v-if="label_sync_date">
                &nbsp;
                {{
                  dayjs(String(label_sync_date)).format("MM/DD/YYYY hh:mm A")
                }}</span
              >
              <p v-if="reason_failed" class="text-red-500">{{ reason_failed }}</p>
            </p>

            <button
              v-if="isEditing"
              type="button"
              class="ml-6 w-[121px] h-[32px] text-white font-bold bg-[#F3A24D] hover:bg-[#3A6472] rounded-3xl text-[14px]"
              @click="labelSync"
            >
              {{ syncButtonText }}
            </button>

            <button
              type="button"
              :class="
                isEditing
                  ? 'ml-6 w-[121px] h-[32px]  text-white font-bold bg-[#F5F5F5] hover:bg-[#3A6472] rounded-3xl text-[14px] text-[#333333] hover:text-white '
                  : 'ml-6 w-[121px] h-[32px]  text-white font-bold bg-[#F3A24D] hover:bg-[#3A6472] rounded-3xl text-[14px]'
              "
              @click="isEditing = !isEditing"
            >
              {{ isEditing ? "Close" : "Edit" }}
            </button>
          </div>
        </div>
        <div class="sm:pl-8" v-if="isEditing">
          <div class="mt-3 flex" v-for="(inteData, index) in integrations">
            <div
              class="sm:flex w-full py-4 px-24 items-center relative border-t-[1px] border-[#DEDEDE]"
              v-if="inteData.verification_status == 'Verified'"
            >
              <div class="sm:w-[15%]">
                <div class="relative w-[90%]">
                  <span :class="inteData.integration_type ? '' : 'font-bold'">{{
                    inteData.integration_type
                      ? inteData.integration_type
                      : "Select PMS"
                  }}</span>
                </div>
              </div>
              <div class="sm:w-[45%]">
                <span class="truncate">{{ inteData.url }}</span>
              </div>
              <div class="sm:w-[45%]">
                <p>
                  <span>Verified</span>
                  &nbsp;
                  <span v-if="inteData.verified_on">{{
                    dayjs(String(inteData.verified_on)).format(
                      "MM/DD/YYYY hh:mm A"
                    )
                  }}</span>
                </p>
              </div>
              <div
                class="items-center flex text-[14px] font-bold sm:w-[3%] text-center pt-1 sm:block sm:relative absolute -top-3 right-0"
              >
                <button
                  class="ml-2 h-[32px] mt-1"
                  @click="showDelete[index] = !showDelete[index]"
                >
                  <span>
                    <svg
                      width="18"
                      height="4"
                      viewBox="0 0 18 4"
                      class="fill-black hover:fill-[#DE774A]"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2" cy="2" r="2" />
                      <circle cx="8.66699" cy="2" r="2" />
                      <circle cx="15.333" cy="2" r="2" />
                    </svg>
                  </span>
                </button>
                <div
                  class="absolute bg-white shadow-2xl rounded-md right-1 z-10 top-8"
                  v-if="showDelete[index]"
                >
                  <ul class="py-2 cursor-pointer w-[120px] text-left">
                    <li v-if="index != 0" class="px-4 py-1 hover:bg-[#F6EEE1]">
                      Move to Top
                    </li>
                    <li
                      class="px-4 py-1 hover:bg-[#F6EEE1]"
                      @click="deleteIntegration(index)"
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="sm:flex px-20 w-full" v-else>
              <div class="sm:w-[15%] w-full">
                <div class="relative sm:w-[90%]">
                  <button
                    @click="
                      showDropDown[`${index}`] = !showDropDown[`${index}`]
                    "
                    class="w-full rounded-3xl h-[32px] text-left px-4 flex items-center justify-between bg-[#F5F5F5]"
                  >
                    <span
                      :class="inteData.integration_type ? '' : 'font-bold'"
                      >{{
                        inteData.integration_type
                          ? inteData.integration_type
                          : "Select OTA"
                      }}</span
                    >
                    <span>
                      <svg
                        width="14"
                        height="11"
                        viewBox="0 0 18 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L9 9L17 1"
                          :stroke="
                            showDropDown[`${index}`] ? '#DE774A' : 'black'
                          "
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    class="w-full absolute bg-white shadow-xl rounded-xl z-10"
                    v-if="showDropDown[`${index}`]"
                  >
                    <ul class="py-4 cursor-pointer">
                      <li
                        class="px-4 py-1 hover:bg-[#F6EEE1]"
                        @click="changeList('airbnb', index)"
                      >
                        airbnb
                      </li>
                      <li
                        class="px-4 py-1 hover:bg-[#F6EEE1]"
                        @click="changeList('vrbo', index)"
                      >
                        vrbo
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="sm:w-[80%] w-full mt-2 sm:mt-0">
                <input
                  :disabled="
                    inteData.integration_type == null || inteData.url != ''
                  "
                  v-model="inteData.url"
                  @input="changeUrl(index)"
                  class="truncate px-3 w-full h-[32px] focus:border-0 focus:ring-0 outline-none placeholder:text-black placeholder:font-bold bg-[#F5F5F5] rounded-3xl"
                  placeholder="Paste listing URL here"
                />
                <div v-if="inteData.verification_status === 'In Progress'">
                  <p class="px-2 mt-2 text-[#5A5A5A] text-[14px]">
                    Within 24 hours you will receive a message containing a
                    unique code to your Airbnb account. Enter the code to
                    verify.
                  </p>
                  <div class="mt-2">
                    <input
                      v-model="inteData.verification_code"
                      class="px-3 w-[261px] h-[32px] focus:border-0 focus:ring-0 outline-none placeholder:text-[#5A5A5A] placeholder:text-[14px] placeholder:font-bold bg-[#F5F5F5] rounded-3xl"
                      placeholder="Enter code"
                    />
                    <button
                      class="border-2 border-[#F3A24D] rounded-3xl w-[121px] h-[32px] ml-4 text-[14px] text-[#5A5A5A] hover:bg-[#F5F5F5]"
                      @click="changeCode(index)"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>

              <div
                v-if="inteData.url"
                class="items-center flex text-[14px] font-bold sm:w-[3%] text-center pt-1 sm:block sm:relative absolute -top-3 -right-3"
              >
                <button
                  class="ml-2 h-[32px] mt-1"
                  @click="showDelete[index] = !showDelete[index]"
                >
                  <span>
                    <svg
                      width="18"
                      height="4"
                      viewBox="0 0 18 4"
                      class="fill-black hover:fill-[#DE774A]"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2" cy="2" r="2" />
                      <circle cx="8.66699" cy="2" r="2" />
                      <circle cx="15.333" cy="2" r="2" />
                    </svg>
                  </span>
                </button>
                <div
                  class="absolute bg-white shadow-2xl rounded-md right-1 z-10 top-8"
                  v-if="showDelete[index]"
                >
                  <ul class="py-2 cursor-pointer w-[120px] text-left">
                    <li
                      class="px-4 py-1 hover:bg-[#F6EEE1]"
                      @click="deleteIntegration(index)"
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-4 mt-2 px-16">
            <button
              class="flex items-center"
              @mouseover="isActive = true"
              @mouseleave="isActive = false"
              @click="createIntegrate"
            >
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  :class="isActive ? 'fill-[#DE774A]' : 'fill-[#F3A24D]'"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_948_2474)">
                    <path
                      d="M10 0C4.48594 0 0 4.48594 0 10C0 15.5141 4.48594 20 10 20C15.5141 20 20 15.5141 20 10C20 4.48594 15.5141 0 10 0ZM13.3332 10.8332H10.8332V13.3332C10.8332 13.5542 10.7454 13.7662 10.5891 13.9225C10.4328 14.0788 10.2208 14.1666 9.9998 14.1666C9.77877 14.1666 9.5668 14.0788 9.4105 13.9225C9.25421 13.7662 9.16641 13.5542 9.16641 13.3332V10.8332H6.66641C6.44538 10.8332 6.2334 10.7454 6.0771 10.5891C5.92081 10.4328 5.83301 10.2208 5.83301 9.9998C5.83301 9.77877 5.92081 9.5668 6.0771 9.4105C6.2334 9.25421 6.44538 9.16641 6.66641 9.16641H9.16641V6.66641C9.16641 6.44538 9.25421 6.2334 9.4105 6.0771C9.5668 5.92081 9.77877 5.83301 9.9998 5.83301C10.2208 5.83301 10.4328 5.92081 10.5891 6.0771C10.7454 6.2334 10.8332 6.44538 10.8332 6.66641V9.16641H13.3332C13.5542 9.16641 13.7662 9.25421 13.9225 9.4105C14.0788 9.5668 14.1666 9.77877 14.1666 9.9998C14.1666 10.2208 14.0788 10.4328 13.9225 10.5891C13.7662 10.7454 13.5542 10.8332 13.3332 10.8332Z"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_948_2474">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              &nbsp;
              <span
                :class="isActive ? 'text-[16px] text-[#DE774A]' : 'text-[16px]'"
                >Add OTA Integration</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full border-t-[1px] border-[#DEDEDE] mt-8"
      v-if="isEditing"
    ></div>
    <div
      class="bg-[#C2DBD1] h-[2px] w-[1px]"
      :style="{ width: progress + '%' }"
      v-if="isEditing"
    ></div>
    <vue-ins-progress-bar></vue-ins-progress-bar>
  </div>
  <div
    :class="isEditing ? 'sm:mt-4 container mx-auto' : 'container mx-auto mt-4'"
  >
    <div v-if="listing != null || listingDetailKey > 0">
      <ListingDetail :key="listingDetailKey" :listing_id="listing.id" />
    </div>
    <div v-else class="container mx-auto px-5">
      <BlankListing />
    </div>
  </div>
</template>

<script lang="ts">
import ListingService from "@/networking/api-services/listing.service";
export default {
  data() {
    const data = {
      listingDetailKey: 0,
      isEditing: true,
      label_name: "",
      label_name_error: "",
      labelName: "",
      labelId: "",
      isActive: false,
      showDropDown: {},
      showDelete: {},
      selectedIntegration: null,
      showIntegrationsModal: false,
      integrations: [],
      label_status: null,
      label_sync_date: null,
      is_listed: false,
      reason_failed: "",
      listing: null,
      progress: 0,
      syncButtonText: "Sync Now",
    };

    return data;
  },

  mounted() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    // this.labelId = id;
    if (id) {
      this.getLable(id);
    }
  },
  methods: {
    makeProgress() {
      if (this.progress < 100) {
        this.progress += 5;
      }
    },
    getLable(id: string) {
      this.labelId = id;
      ListingService.getLabel(id).then((res) => {
        this.integrations = res.data.integrations;
        this.is_listed = res.data.is_listed;
        this.label_sync_date = res.data.last_sync;
        this.labelName = res.data.name;
        this.label_status = res.data.sync_status;
        this.reason_failed = res.data.reason_failed;
        this.listing = res.data.listing;
      });
    },
    async createLabel() {
      if (this.label_name == "" || this.label_name == null) {
        this.label_name_error = "Label Name is required.";
        return false;
      } else {
        ListingService.createLabel(this.label_name).then((res) => {
          console.log(res);
          if (res.data) {
            this.getLable(res.data.id);
            this.$router.push(`/host-listing?id=${res.data.id}`);
          }
        });
      }
    },
    labelSync() {
      const intervalID = setInterval(() => {
        this.makeProgress();
      }, 1500);
      this.syncButtonText = "Syncing... ";
      ListingService.syncLabel(this.labelId)
        .then((res) => {
          clearInterval(intervalID);
          this.syncButtonText = "Sync Now";
          this.progress = 0;
          return res;
        })
        .then(() => {
          setTimeout(() => {
            return ListingService.getLabel(this.labelId).then((res) => {
              if (res.data) {
                this.label_status = res.data.sync_status;
                this.label_sync_date = res.data.last_sync;

                this.listing = res.data.listing;

                if (this.listing) {
                  this.listingDetailKey += 1;
                } else {
                  this.listingDetailKey = 0;
                }
              }
            });
          }, 6000);
        })
        .catch(() => {
          setTimeout(() => {
            return ListingService.getLabel(this.labelId).then((res) => {
              if (res.data) {
                this.label_status = res.data.sync_status;
                this.label_sync_date = res.data.last_sync;
              }
            });
          }, 6000);
        });
    },
    deleteIntegration(idx: any) {
      const int_data = this.integrations[idx];
      if (!int_data.url) {
        this.showDelete[idx] = false;
        this.integrations.splice(idx, 1);
      } else {
        ListingService.deleteIntegration(this.labelId, int_data["id"])
          .then((res) => {
            this.showDelete[idx] = false;
            this.integrations.splice(idx, 1);
          })
          .then(() => {
            setTimeout(() => {
              return ListingService.getLabel(this.labelId).then((res) => {
                if (res.data) {
                  this.label_status = res.data.sync_status;
                  this.label_sync_date = res.data.last_sync;

                  this.listing = res.data.listing;

                  if (!this.listing) {
                    this.listingDetailKey = 0;
                  } else {
                    this.listingDetailKey += 1;
                  }
                }
              });
            }, 3000);
          });
      }
    },

    createIntegrate() {
      this.integrations.push({
        integration_type: null,
        url: "",
        selected_for_sync: false,
        verification_status: null,
        verification_code: null,
      });
      this.integrations.map((inte, i) => {
        this.showDropDown[`${i}`] = false;
        this.showDelete[`${i}`] = false;
      });
      console.log(this.showDropDown);
    },

    changeUrl(idx: number) {
      ListingService.addIntegration(this.integrations[idx], this.labelId)
        .then((res) => {
          if (res.data) {
            ListingService.startVerification(res.data.id, this.labelId).then(
              (response) => {
                console.log(response);
                if (response.data) {
                  this.integrations[idx] = response.data;
                }
                return response;
              }
            );
          }
          return res;
        })
        .catch(() => {
          setTimeout(() => {
            this.integrations[idx].url = "";
          }, 1000);
        });
      // console.log(this.integrations);
    },

    changeCode(idx: number) {
      ListingService.sendCode(this.integrations[idx], this.labelId).then(
        (res) => {
          console.log(res);
          if (res.data) {
            this.integrations[idx] = res.data;
          }
          return res;
        }
      );
      // console.log(this.integrations);
    },

    changeList(txt: string, index: number) {
      this.integrations[index].integration_type = txt.toLowerCase();
      this.showDropDown[index] = false;
    },
    changeIntegration(integration: any) {
      this.selectedIntegration = integration;
      this.showIntegrationsModal = true;
    },
  },
};
</script>
