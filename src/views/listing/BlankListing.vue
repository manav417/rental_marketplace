<script setup lang="ts"></script>

<template>
  <div class="w-full sm:mt-4">
    <div class="relative">
      <img src="/img/blank.png" class="w-full h-[270px] sm:h-auto" />
      <p class="text-[16px] absolute right-[calc(50%-100px)] top-[50%]">
        Your images will appear here
      </p>
    </div>
    <div
      class="mt-3 sm:flex items-center justify-between border-b-[1px] border-[#DEDEDE] pb-3"
    >
      <div>
        <p class="font-bold text-[20px]">Listing Title</p>
        <p class="text-[16px]">BDR: 0 BTH: 0 (Sleeps 0)</p>
      </div>
      <div>
        <div class="flex items-center text-right justify-end">
          <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.21836 5.42154L5.36389 4.81906L7.21706 1.06212C7.26767 0.959255 7.35094 0.875985 7.45381 0.82537C7.71178 0.698016 8.02527 0.804145 8.15425 1.06212L10.0074 4.81906L14.153 5.42155C14.2672 5.43787 14.3717 5.49175 14.4517 5.57339C14.5485 5.6728 14.6018 5.80655 14.5999 5.94523C14.5981 6.08392 14.5413 6.21621 14.442 6.31302L11.4426 9.23727L12.1512 13.3665C12.1678 13.4625 12.1572 13.5613 12.1205 13.6516C12.0839 13.742 12.0226 13.8202 11.9437 13.8775C11.8649 13.9348 11.7715 13.9688 11.6743 13.9757C11.5771 13.9827 11.4798 13.9622 11.3936 13.9167L7.68566 11.9672L3.97769 13.9167C3.87646 13.9706 3.75891 13.9886 3.64625 13.969C3.36215 13.92 3.17112 13.6506 3.2201 13.3665L3.92871 9.23727L0.929361 6.31302C0.847724 6.23302 0.793844 6.12852 0.777517 6.01423C0.733432 5.7285 0.932626 5.464 1.21836 5.42154Z"
              fill="black"
            />
          </svg>
          <span class="font-bold"> 0 </span>
          <span class="text-gray-500"> &nbsp;(0) </span>
        </div>
        <p class="text-[16px]">0 Booking Options</p>
      </div>
    </div>
    <div class="mt-6 sm:flex-row grid sm:flex">
      <div class="sm:w-9/12 pr-4">
        <div class="pb-24 border-b-[1px] border-[#DEDEDE]">
          <p class="text-16px">Description</p>
        </div>
        <div class="pb-20 border-b-[1px] border-[#DEDEDE] mt-4">
          <p class="text-[20px] font-bold">Amenities</p>
        </div>
        <div class="pb-20 border-b-[1px] border-[#DEDEDE] mt-4">
          <p class="text-[20px] font-bold">Sleeping Options</p>
        </div>
        <div class="pb-20 border-b-[1px] border-[#DEDEDE] mt-4">
          <p class="text-[20px] font-bold">Reviews</p>
        </div>
        <div class="pb-[64px] h-[300px] mt-4">
          <p class="text-[20px] font-bold">Get to know the area</p>
        </div>
      </div>
      <div class="w-[3/12] sm:pl-4 order-first sm:order-last">
        <p class="text-[20px] font-bold">Availability</p>
        <div
          date-rangepicker
          ref="datepicker"
          id="date-rangepicker"
          class="items-center gap-x-1.5 mt-4 w-full flex"
        >
          <div class="relative z-0 w-6/12">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.6 9.17499C8.54274 9.17499 6.875 10.8427 6.875 12.9V24.4C6.875 26.4573 8.54274 28.125 10.6 28.125H24.4C26.4573 28.125 28.125 26.4573 28.125 24.4V12.9C28.125 10.8427 26.4573 9.17499 24.4 9.17499H10.6ZM5.125 12.9C5.125 9.87623 7.57624 7.42499 10.6 7.42499H24.4C27.4238 7.42499 29.875 9.87623 29.875 12.9V24.4C29.875 27.4237 27.4238 29.875 24.4 29.875H10.6C7.57624 29.875 5.125 27.4237 5.125 24.4V12.9Z"
                  fill="black"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.9 5.125C13.3832 5.125 13.775 5.51675 13.775 6V10.6C13.775 11.0832 13.3832 11.475 12.9 11.475C12.4168 11.475 12.025 11.0832 12.025 10.6V6C12.025 5.51675 12.4168 5.125 12.9 5.125ZM22.1 5.125C22.5832 5.125 22.975 5.51675 22.975 6V10.6C22.975 11.0832 22.5832 11.475 22.1 11.475C21.6168 11.475 21.225 11.0832 21.225 10.6V6C21.225 5.51675 21.6168 5.125 22.1 5.125ZM5.125 15.2C5.125 14.7168 5.51675 14.325 6 14.325H29C29.4832 14.325 29.875 14.7168 29.875 15.2C29.875 15.6832 29.4832 16.075 29 16.075H6C5.51675 16.075 5.125 15.6832 5.125 15.2Z"
                  fill="black"
                />
              </svg>
            </div>
            <input
              disabled
              ref="start"
              name="start"
              type="text"
              class="h-[40px] focus:ring-1 focus:ring-orange-600 bg-[#F5F5F5] placeholder-[#000000] w-full border-0 text-gray-900 sm:text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Check-in"
            />
          </div>
          <div class="relative z-0 w-6/12">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.6 9.17499C8.54274 9.17499 6.875 10.8427 6.875 12.9V24.4C6.875 26.4573 8.54274 28.125 10.6 28.125H24.4C26.4573 28.125 28.125 26.4573 28.125 24.4V12.9C28.125 10.8427 26.4573 9.17499 24.4 9.17499H10.6ZM5.125 12.9C5.125 9.87623 7.57624 7.42499 10.6 7.42499H24.4C27.4238 7.42499 29.875 9.87623 29.875 12.9V24.4C29.875 27.4237 27.4238 29.875 24.4 29.875H10.6C7.57624 29.875 5.125 27.4237 5.125 24.4V12.9Z"
                  fill="black"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.9 5.125C13.3832 5.125 13.775 5.51675 13.775 6V10.6C13.775 11.0832 13.3832 11.475 12.9 11.475C12.4168 11.475 12.025 11.0832 12.025 10.6V6C12.025 5.51675 12.4168 5.125 12.9 5.125ZM22.1 5.125C22.5832 5.125 22.975 5.51675 22.975 6V10.6C22.975 11.0832 22.5832 11.475 22.1 11.475C21.6168 11.475 21.225 11.0832 21.225 10.6V6C21.225 5.51675 21.6168 5.125 22.1 5.125ZM5.125 15.2C5.125 14.7168 5.51675 14.325 6 14.325H29C29.4832 14.325 29.875 14.7168 29.875 15.2C29.875 15.6832 29.4832 16.075 29 16.075H6C5.51675 16.075 5.125 15.6832 5.125 15.2Z"
                  fill="black"
                />
              </svg>
            </div>
            <input
              disabled
              ref="end"
              name="end"
              type="text"
              class="h-[40px] focus:ring-1 focus:ring-orange-600 bg-[#F5F5F5] placeholder-[#000000] w-full border-0 text-gray-900 sm:text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Check-out"
            />
          </div>
        </div>
        <p class="text-[20px] font-bold mt-6">Booking Options</p>
        <div class="p-4 rounded-xl bg-[#F5F5F5] mt-4 opacity-70">
          <p class="flex justify-between">
            <span class="font-bold">Integration</span>
            <span>
              <span class="font-bold">Total</span>
              <span> &nbsp;$0</span>
            </span>
          </p>
          <div class="mt-4 flex justify-between items-center">
            <div>
              <div class="text-[16px]">$0/night 0 nights</div>
              <div><span class="font-bold">Fee</span> $0</div>
            </div>
            <div>
              <button
                class="disabled text-white bg-[#F3A24D] rounded-3xl w-[145px] h-[32px]"
              >
                Book
              </button>
            </div>
          </div>
        </div>
        <p class="text-[20px] font-bold mt-12">About the host</p>
        <p class="text-[16px]">Coming Soon!</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    const data = {};
    return data;
  },
};
</script>
