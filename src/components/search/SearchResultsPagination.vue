<script setup lang="ts">
import type { PropType } from "vue";
import ListingCard from "@/components/Listing/ListingCard.vue";
import type { Listing } from "@/interfaces/Listing";
</script>

<template>
  <div class="my-5">
    <div v-for="listing in listingPages[page]" :key="listing.id">
      <div :class="{ active: listing.id === selected }">
        <ListingCard :listing="listing"></ListingCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    listings: {
      type: Array as PropType<Listing[]>,
      required: true,
    },
    pageSize: {
      type: Number,
      required: false,
      default: 5,
    },
    selected: {
      type: String,
      required: false,
    },
  },
  data() {
    const data = {
      page: 0,
      pagesCount: 1,
    };
    return data;
  },
  mounted() {
    this.pagesCount = Math.ceil(this.listings.length / this.pageSize);
  },
  computed: {
    listingPages() {
      const pages = [];
      for (let i = 0, pIdx = 0; i < this.listings.length; i += this.pageSize) {
        let page = this.listings.slice(i, i + this.pageSize);
        const selectedListing = page.find(({ id }) => id === this.selected);
        if (selectedListing) {
          page = page.filter(({ id }) => id !== this.selected);
          page.unshift(selectedListing);
          this.page = pIdx;
        }
        pages.push(page);
        pIdx += 1;
      }
      return pages;
    },
    showPagination() {
      return this.pagesCount > 1;
    },
  },
  methods: {
    showPage(index: number) {
      if (index >= 0 && index <= this.pagesCount) {
        this.page = index;
      }
    },
  },
};
</script>

<style scoped>
.active > div {
  background-color: #fde047;
}
</style>
