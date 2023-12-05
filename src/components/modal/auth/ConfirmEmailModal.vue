<script setup lang="ts">
    import { UserStore } from "../../../stores/userStore.js";
    import AccountsService from "../../../networking/api-services/accounts.service";
    </script>
    <template>
        <vue-final-modal
        v-model="openConfirmEmailModal"
        :click-to-close="false"
        classes="flex justify-center items-center"
        content-class="relative flex flex-col max-h-full mx-4 p-10 border dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900 sm:w-[560px] w-full"
      >
        <span v-on:click="close" class="cursor-pointer absolute top-4 right-4"><svg class="w-6 h-6 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
        <div class="mt-6">
            <p class="text-[#DE774A] text-[24px] font-bold">Check your email</p>
            <p class="text-[16px] text-[#333333] mt-2">We’ll emailed a link to reset your password. If you don’t receive it within 3 minutes, it may be in your junk folder, or it could be that the email address you provided is not associated with a Nofie account. In that case, please confirm that you used the correct email.</p>
        </div>
      </vue-final-modal>
    </template>

    <script lang="ts">
    export default {
      data() {
        const data = {
          email_error: '',
          email: '' as string,
        };
        return data;
      },
      mounted() {
      },
      methods: {
      },
      props: ['openConfirmEmailModal', 'close']
    };
    </script>
