<script setup lang="ts"></script>

<template>
  <div
    class="w-full bg-[#3A6472] sm:px-24 px-5 pt-8 pb-4 flex items-end justify-start"
  >
    <div>
      <ul>
        <li class="mb-4">
          <a href="/"><img src="/img/footer_logo.svg" /></a>
        </li>
        <li class="text-[#F8F1E1] text-[24px] cursor-pointer">
          <a
            href="https://www.iubenda.com/privacy-policy/51218907"
            class="iubenda-white no-brand iubenda-noiframe iubenda-embed iubenda-noiframe"
            title="Privacy Policy"
            target="_blank"
            >Privacy Policy</a
          >
        </li>
        <li class="text-[#F8F1E1] text-[24px] cursor-pointer">
          <a
            href="https://www.iubenda.com/privacy-policy/51218907/cookie-policy"
            class="iubenda-white no-brand iubenda-noiframe iubenda-embed iubenda-noiframe"
            title="Cookie Policy"
            target="_blank"
            >Cookie Policy</a
          >
        </li>
        <li class="text-[#F8F1E1] text-[24px]"><a href="/about">About Us</a></li>
      </ul>
    </div>
    <div class="h-full flex justify-start my-auto ml-auto">
      <p>
        <a href="https://www.facebook.com/gonofie" target="_blank"><img src="/img/fb.svg" alt="fb"/></a>
      </p>
      <p class="ml-4">
        <a href="https://www.instagram.com/gonofie/" target="_blank"><img src="/img/link.svg" alt="link"/></a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
  data() {
    const data = {
      openReportModal: false,
    };
    return data;
  },
  methods: {},
};
</script>
