<script setup lang="ts">
import HomeSearch from "@/components/forms/HomeSearch.vue";
</script>

<template>
  <div>
    <div class="w-full">
      <img src="/img/mobileAbout.png" alt="about" class="sm:hidden w-full"/>
    </div>
    <p class="mt-6 font-bold text-[20px]">About us</p>
  </div>
  <div class="flex">
    <div class="mt-10 w-full sm:w-9/12">
      <p class="text-[#DE774A] text-[16px] font-bold">The Story</p>
      <p class="text-[16px] mt-8">
        The story of Nofie starts with a 10 year anniversary trip. Brian and KJ rented their first short term vacation property in Carlsbad, California to celebrate, and they've been hooked on vacation rentals ever since. 
      </p>
      <p class="text-[16px] mt-8">
        They converted their second home to a vacation property in 2014, but it wasn't until 6 years later that KJ learned about the direct booking movement. Frustrated with third-party fees and lack of communication with guests, she began offering a more personal option for guests through her own website.
      </p>
      <p class="text-[16px] mt-8">
        The problem; it's expensive and difficult to drive traffic to a small direct booking site. After 18 months of trying to drive visibility to her site, KJ decided there needed to be a better solution. She and Brian leaned on their years of experience in real estate and software engineering to create a solution that levels the playing field and allows guests and hosts to book how they choose, without a middleman controlling their booking options. 
      </p>
      <p class="text-[16px] mt-8">
        Introducing... <span class="font-bold">Nofie.</span>
      </p>
      <p class="text-[#DE774A] text-[16px] font-bold mt-6">What is Nofie?</p>
      <p class="text-[16px] mt-8">
        Nofie is a new and growing vacation rental marketplace that is completely free to guests and hosts. It includes listings from all vacation rental sites, including direct booking options, in a single search.
      </p>
      <p class="text-[16px] mt-8">
        As a guest, you get a transparent view of all your travel options in one simple search. As a host, the power is back in your hands, allowing you to make your own choices about where to send guests to book. Since Nofie includes direct booking listings as well as third-party listings, guests and hosts have the option to connect directly, making travel feel more human again.
      </p>
      <p class="text-[16px] mt-8">
        By empowering you with options, Nofie puts guests and hosts back in the center of the vacation booking experience.
      </p>
    </div>
    <div class="w-3/12 text-center sm:flex justify-end hidden">
      <img src="/img/about.png" alt="about" class="sm:w-full sm:h-fit lg:w-fit lg:h-fit"/>
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
