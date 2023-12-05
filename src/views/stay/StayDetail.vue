<script setup lang="ts">
    import AccountsService from "../../networking/api-services/accounts.service";
    import ListingCard from "@/components/Listing/ListingCard.vue";
    </script>

    <template>
      <div class="container mx-auto px-5">
        <div class="grid mt-2 space-y-2">
          <h2 class="font-bold">{{pageName}}</h2>
          <div v-if="Lists.length < 1" class="mt-4">
            No listings have been added to this container
          </div>
          <div v-for="listing in Lists" :key="listing.id">
            <ListingCard :listing="listing"></ListingCard>
          </div>
        </div>
      </div>
    </template>

    <script lang="ts">
    export default {
      data() {
        const data = {
          Lists: [],
          id: '',
          pageName: ''
        };
        return data
      },
      mounted() {
        this.id= this.$route.params.id as string;
        this.getList();
      },

      methods: {
        getList() {
          AccountsService.getListsByFavorite(this.id).then((res) => {
            this.pageName = res.name;
            this.Lists = res.listings;
          })
        },
      },
    };
    </script>
