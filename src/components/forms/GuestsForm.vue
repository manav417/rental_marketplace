<script setup lang="ts">
import PersonIcon from "@/assets/images/icons/person.svg";
import ChildrenIcon from "@/assets/images/icons/children.svg";
import PetIcon from "@/assets/images/icons/pet.svg";
</script>

<template>
  <div v-if="showForm" class="absolute z-10 bg-white sm:w-[380px] p-4 shadow-2xl rounded-xl">
    <div class="flex items-center">
      <div class="mb-2">
        <label
          for="default-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Adults (18+)</label
        >
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-1 items-center pl-3 pointer-events-none"
          >
            <img width="20" height="20" :src="PersonIcon" alt="adults" />
          </div>
          <input
            class="h-[40px]"
            type="number"
            v-model="guests.adults"
            min="1"
            :class="inputClasses"
          />
        </div>
      </div>
      <div class="mb-2 ml-1">
        <label
          for="default-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Children (0-17)</label
        >
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-1 items-center pl-3 pointer-events-none"
          >
            <img width="22" height="22" :src="ChildrenIcon" alt="children" />
          </div>
          <input
            class="h-[40px]"
            type="number"
            v-model="guests.children"
            min="0"
            :class="inputClasses"
          />
        </div>
      </div>
      <div class="relative mb-2 ml-1">
        <label
          for="default-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Pets</label
        >
        <div
          class="flex absolute inset-y-0 left-1 items-center pl-3 pt-7 pointer-events-none"
        >
          <img width="16" height="16" :src="PetIcon" alt="pets" />
        </div>
        <input
          class="h-[40px]"
          type="number"
          v-model="guests.pets"
          min="0"
          :class="inputClasses"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  emits: ["guests-changed"],
  props: {
    showForm: {
      type: Boolean,
      required: true,
    },
    params: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    const data = {
      includePets: true,
      guests: {
        adults: 1,
        children: 0,
        pets: 0,
      },
      inputClasses:
        "placeholder-[#000000] focus:ring-1 focus:ring-orange-600 block bg-[#F5F5F5] border-0 text-gray-900 sm:text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 py-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    };
    return data;
  },
  mounted() {
    if (Object.keys(this.params).length) {
      this.updateQuests();
    } else {
      this.guestsChanged(this.guests);
    }
  },
  computed: {
    guestsDescription(): string {
      const { adults, children, pets } = this.guests;
      const questsTotal = adults + children;
      const guestsText = `${questsTotal} Guest${questsTotal > 1 ? "s" : ""}`;
      const petsText =
        pets === 0 || !this.includePets ? "" : pets === 1 ? ", Pet" : ", Pets";

      return !pets ? guestsText : `${guestsText}${petsText}`;
    },
  },
  methods: {
    guestsChanged(guests) {
      this.$emit("guests-changed", {
        guests,
        description: this.guestsDescription,
      });
    },
    updateQuests() {
      const questsParams = Object.keys(this.guests);
      const params = Object.keys(this.params);
      const updatedParams = {};

      for (let i = 0; i < params.length; i++) {
        const param = params[i];
        if (questsParams.includes(param)) {
          updatedParams[param] = parseInt(this.params[param]);
        }
      }

      if (Object.prototype.hasOwnProperty.call(updatedParams, "pets")) {
        this.includePets = updatedParams.pets > 0;
      }

      this.guests = { ...this.guests, ...updatedParams };
    },
  },
  watch: {
    includePets(include: boolean): void {
      if (include && this.guests.pets === 0) {
        this.guests.pets = 1;
      } else if (!include && this.guests.pets > 0) {
        this.guests.pets = 0;
      }
    },
    guests: {
      handler: function (guests) {
        this.guestsChanged(guests);
      },
      deep: true,
    },
  },
};
</script>
