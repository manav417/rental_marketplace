<script setup lang="ts">
import { UserStore } from "../stores/userStore.js";
</script>

<template>
  <button class="width-full" @click="logout">Logout</button>
</template>

<script lang="ts">
export default {
  methods: {
    logout() {
      const userStore = UserStore();
      userStore.logout();
      this.$router.push("/");
    },
  },
};
</script>
