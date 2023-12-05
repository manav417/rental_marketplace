<script setup lang="ts">
    import { UserStore } from "../stores/userStore.js";
    import AccountsService from "@/networking/api-services/accounts.service";
</script>

<template>
    <span v-on:click="close" class="cursor-pointer absolute top-4 right-4"><svg class="w-6 h-6 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></span>
    <div class="flex justify-between items-center mt-6">
        <span class="text-[#DE774A] text-[32px] font-bold">Sign in</span>
        <button v-on:click="registerModalOpen" class="text-[#3A6472] bg-[#C1DDD1] w-[170px] h-[40px] text-[14px] rounded-3xl">Create Account</button>
    </div>
    <div class="flex-grow overflow-y-auto py-4 mt-3">
        <form action="." @submit.prevent="login">
            <div class="space-y-4">
                <div>
                <input type="email"  required v-model="login_email" name="email" placeholder="Email" @input="login_validateEmail"
                    class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
                    <p class="text-red-500 mt-1" v-if="login_email_error!=''">{{login_email_error}}</p>
                </div>
                <div>
                <input type="password" required v-model="login_password" name="password" placeholder="Password"
                    class="w-full px-3 py-2 text-black border border-[#BCBABA] rounded-3xl focus:outline-none focus:ring-0 focus:border-[#DE774A] focus:ring-[#DE774A]">
                    <p class="text-red-500 mt-1" v-if="login_password_error!='' && login_password==''">{{login_password_error}}</p>
                </div>
            </div>
        </form>
        <div class="mt-4 space-y-2">
            <a href="#" class="text-xs text-blue-600 hover:underline text-[#DE774A]">Forgot password?</a>
        </div>
        <div class="mt-4 space-y-2">
            <div class="flex gap-x-2">
                <button v-on:click="login" type="button" class="w-full px-8 py-2 text-white font-bold bg-[#F3A24D] rounded-3xl">Sign in</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        const data = {
            login_email_error: "",
            login_password_error: "",
            login_email: "" as string,
            login_password: "" as string,
        };
    return data;
    },
    methods: {
        login(){
            if (this.login_email == "") {
                this.login_email_error = "Email required.";
                return false;
            } else {
                var verified = this.login_validateEmail();
                if (!verified) {
                    this.login_email_error = "Please enter a valid email address";
                    return false;
                }
            }
            if (this.login_password == "" || this.login_password == null) {
                this.login_password_error = "Password required.";
                return false;
            }

            const login_form = new FormData();
            login_form.append("username", this.login_email);
            login_form.append("password", this.login_password);
            const userStore = UserStore();

            AccountsService.logInTrapdoor(login_form)
            .then(() => {
                return AccountsService.getUser();
            })
            .then(() => {
                this.$router.push("/profile");
            });
        },
        login_validateEmail() {
            if (
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    this.login_email
                )
            ) {
                this.login_email_error = ''
                return true;
            } else {
                false
            }
        },
    },
    props: ['showLoginModal', 'close']
};
</script>
