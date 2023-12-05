<script setup lang="ts">
import HomeSearch from "@/components/forms/HomeSearch.vue";
</script>

<template>
  <div class="container mx-auto px-5">
    <div class="flex mt-4  flex-col-reverse sm:flex-row">
      <div class="sm:w-6/12">
        <h1 class="text-[#F3A24D] sm:text-[40px] desktop:text-[52px] laptop:text-[40px]  text-5xl font-bold mt-4">
          All your travel options in one search
        </h1>
        <p class="md:w-8/12 mt-6 text-[16px]">
          Looking for a vacation rental? Close all those browser tabs (except for this one.) Nofie is brand new- and quickly growing - to show travel listings from all platforms in a single search. You can even browse direct booking options for a more personal experience.
        </p>
        <div class="mt-8 sm:w-full desktop:w-[602px] sm:hidden desktop:block">
          <div class="mt-2 w-full">
            <HomeSearch />
          </div>
        </div>
      </div>
      <div class="md:w-6/12 w-full sm:order-2 order-1 text-right flex justify-end">
        <img
          src="/img/home/main-banner.png"
          class="mt-0 w-full desktop:w-[476px] large:w-[524px] laptop:w-[333px]  laptop:h-[360px] desktop:h-[492px] tablet:h-[271px] sm:w-[293px]  sm:h-[360px] tablet:h-[360px]"
          alt="bg-1"
        />
      </div>
    </div>
    <div class="mt-8 sm:w-full desktop:w-[602px] hidden sm:block desktop:hidden">
      <div class="mt-2 w-full">
        <HomeSearch />
      </div>
    </div>
    <div class="mt-12 bg-[#F8F1E1] p-2 sm:bg-[url('/img/bg-3.png')]">
      <div class="flex-col-reverse sm:flex-row flex">
        <div class="sm:w-7/12 large:px-10 px-4">
          <h2 class="text-[#DE774A] tablet:mt-20 sm:mt-16 text-[36px]  font-bold">
            The vacation rental marketplace that's all about connections
          </h2>
          <p class="sm:w-10/12 mt-4 text-[16px]">
            Nofie is the vacation rental marketplace that offers listings from multiple booking platforms, all in one place. After you find the perfect property, we step out of the way and let you connect with the host on their preferred booking platform.
          </p>
          <p class="sm:w-10/12 mt-4 text-[20px] font-bold text-[#3A6472] sm:hidden desktop:block">
            By empowering you with options, Nofie puts guests and hosts back in the center of the vacation booking experience.
          </p>
        </div>
        <div class="sm:w-5/12 order-1 text-right flex justify-center">
          <img
            class="sm:mt-16 desktop:w-[354px] desktop:h-[345px] large:w-[457px] large:h-[444px] laptop:w-[317px] laptop:h-[308px] sm:w-[292px] sm:h-[272px]"
            src="/img/home/vacation-rental-marketplace.png"
            alt="Nofie is a vacation rental marketplace"
          />
        </div>
      </div>
      <p class="w-full mt-4 text-[20px] font-bold text-[#3A6472] px-4 hidden sm:block desktop:hidden">
        By empowering you with options, Nofie puts guests and hosts back in the center of the vacation booking experience.
      </p>
    </div>

    <div class="mt-24 text-center">
      <p class="text-[#F3A24D] text-[32px] font-bold">
        We don't play favorites. Expand your vacation rental search across all platforms with Nofie.
      </p>
    </div>

    <div class="mt-28">
      <p class="text-[48px] text-[#DE774A] font-bold text-center">
        How Nofie Works
      </p>
      <div class="w-full mt-16 flex items-center sm:flex-row">
        <div class="sm:w-6/12 sm:px-24 order-1">
          <img src="/img/home/search.png" alt="Nofie search" />
        </div>
        <div class="mt-8 sm:mt-1 sm:w-6/12 sm:justify-center sm:order-1">
          <div class="mt-4">
            <p
            class="bg-[#3A6472] text-white w-[80px] h-[80px] w-[80px] h-[80px] text-center flex justify-center items-center text-[36px] rounded-[50%]"
            >
              1
            </p>
          </div>
          <div class="mt-4">
            <p class="text-[#F3A24D] text-[36px] font-bold">Search</p>
            <p class="mt-2 sm:text-[20px] text-[18px] sm:w-[350px]">
              We include property listings from all direct booking sites as well as the major booking platforms, so you can search Nofie as a one-stop marketplace.
            </p>
          </div>
        </div>
      </div>
      <div class="w-full sm:mt-24 mt-12 sm:flex items-center flex flex-col-reverse sm:flex-row">
        <div class="sm:w-6/12 items-center">
          <div class="mt-4">
            <p
              class="bg-[#3A6472] text-white w-[80px] h-[80px] w-[80px] h-[80px] text-center flex justify-center items-center text-[36px] rounded-[50%]"
            >
              2
            </p>
          </div>
          <div class="mt-4">
            <p class="text-[#F3A24D] text-[36px] font-bold">Find</p>
            <p class="mt-2 sm:text-[20px] text-[18px] sm:w-[350px]">
              Browse transparently across multiple booking sites to make sure you're getting the best fit in accomodation & pricing.
            </p>
          </div>
        </div>
        <div class="sm:w-6/12 flex justify-center mt-8 sm:mt-1 order-1 sm:order-2">
          <img src="/img/home/find.png" alt="Nofie find" />
        </div>
      </div>
      <div class="w-full mt-24 flex items-center flex-col-reverse sm:flex-row">
        <div class="sm:w-6/12 sm:px-24 order-2 sm:order-1">
          <img src="/img/home/connect.png" alt="Nofie connect" />
        </div>
        <div class="sm:w-6/12 justify-center sm:order-2 sm:order-1">
          <div class="mt-4">
            <p
            class="bg-[#3A6472] text-white w-[80px] h-[80px] w-[80px] h-[80px] text-center flex justify-center items-center text-[36px] rounded-[50%]"
            >
              3
            </p>
          </div>
          <div class="mt-4">
            <p class="text-[#F3A24D] text-[36px] font-bold">Connect</p>
            <p class="mt-2 sm:text-[20px] text-[18px] sm:w-[350px]">
              We send you straight to your host’s preferred booking site - whether that’s a third-party listing or their own direct booking site for a more personal experience.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-24 text-center">
      <p class="text-[#DE774A] text-[32px] font-bold">
        Nofie is brand new - and growing! If you can’t find your perfect vacation rental today, try again tomorrow. New hosts are joining the Nofie family every day.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
