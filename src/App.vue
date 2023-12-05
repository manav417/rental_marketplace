<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import ReportButton from "@/components/ReportButton.vue";
import ErrorToast from "@/components/ErrorToast.vue";
</script>

<template>
  <div
    class="flex flex-col items-center align-center w-full h-screen"
  >
    <div class="w-full fixed z-50"><NavBar></NavBar></div>

    <ErrorToast></ErrorToast>

    <div class="flex basis-full w-full mt-20">
      <div class="text-left bg-white w-full">
        <RouterView />
        <footer class="mt-5">
          <FooterNav />
        </footer>
      </div>
    </div>
    <div class="w-full mt-24">
      <Footer></Footer>
    </div>
    <!-- <div class="w-full">
      <ReportButton></ReportButton>
    </div> -->
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      pageName: ''
    };
  },
  mounted() {
    const pathname = window.location.pathname;
    this.pageName = pathname
  },
  methods: {},
};
</script>
