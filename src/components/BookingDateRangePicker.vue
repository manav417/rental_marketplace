<template>
  <div
    class="date-range-picker-wrapper relative bg-[#F5F5F5] border-0 text-gray-900 sm:text-sm rounded-3xl pl-12"
    :class="{ active: isDateRangeSet }"
  >
    <div
      class="flex absolute inset-y-0 left-1 items-center pl-3 pointer-events-none"
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

    <LitepieDatepicker
      v-model="dateValue"
      as-single
      use-range
      separator=" - "
      :formatter="dateFormatter"
      placeholder="Check-in ~ Check-out"
    />
  </div>
</template>

<script lang="ts">
import LitepieDatepicker from "litepie-datepicker-tw3";
import dayjs from "dayjs";

const dateFormat = "MM/DD/YYYY";

export default {
  emits: ["date-range-changed"],
  components: {
    LitepieDatepicker,
  },
  props: {
    check_in: {
      type: String,
      required: false,
      default: "",
    },
    check_out: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    const data = {
      dateValue: {
        startDate: "",
        endDate: "",
      },
      dateFormatter: {
        date: dateFormat,
        month: "MM",
      },
    };
    return data;
  },
  methods: {
    formatDate(date: string): string {
      return dayjs(date).format(dateFormat);
    },
  },
  computed: {
    isDateRangeSet() {
      return this.dateValue.startDate && this.dateValue.endDate;
    },
  },
  watch: {
    check_in(check_in) {
      this.dateValue.startDate = this.formatDate(check_in);
    },
    check_out(check_out) {
      this.dateValue.endDate = this.formatDate(check_out);
    },
    dateValue: {
      handler: function (value) {
        const { startDate, endDate } = value;
        if (startDate && endDate) {
          this.$emit("date-range-changed", {
            check_in: startDate,
            check_out: endDate,
          });
        }
      },
      deep: true,
    },
  },
};
</script>

<style>
#litepie input {
  border: none;
  background: transparent;
  padding: 1rem 0;
  outline: none;
  box-shadow: none;
  color: inherit;
}
.date-range-picker-wrapper:not(.active) #litepie input + span {
  display: none;
}
</style>
