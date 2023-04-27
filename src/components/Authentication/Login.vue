<script setup>
import { onMounted,ref } from 'vue'
import {useAuthStore} from '../../stores/Auth.js'

const authStore = useAuthStore()
/* console.log(authStore.errors.password[0]) */
const form = ref({
    email: '',
    password: '',
})

</script>

<template>
    <div class="space-y-4 w-[28em] mx-auto rounded-md shadow-md bg-white mt-12 p-6">
        <header class="mb-3 text-2xl font-bold text-center">Log in</header>
        <form action="" @submit.prevent="authStore.handleLogin(form)">
            <div class="space-y-4 text-center">
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Email or username"  v-model="form.email"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>   
                <template v-if="authStore.errors.email">
                    <span class="text-red-600 m-2">{{ authStore.errors.email[0] }}</span>
                </template>
                <div 
                    class="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="password" placeholder="Password" v-model="form.password"
                        class="my-3 w-full border-none bg-transparent outline-none" />
                    <router-link :to="{name: 'ForgotPassword'}" class="font-medium text-gray-400 hover:text-gray-500">FORGOT</router-link>
                    <!-- <a href="#" class="font-medium text-gray-400 hover:text-gray-500">FORGOT?</a> -->
                </div>
                <button
                    class="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
                    LOG IN
                </button>
            </div>
            
        </form>
        <footer>
            <div class="grid grid-cols-2 gap-4">
                <a href="#"
                    class="text-center rounded-2xl border-b-2 border-b-gray-300 bg-white py-2.5 px-4 font-bold text-blue-700 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200">FACEBOOK</a>
                <a href="#"
                    class="text-center rounded-2xl border-b-2 border-b-gray-300 bg-white py-2.5 px-4 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200">GOOGLE</a>
            </div>

            <div class="mt-8 text-sm text-gray-400">
                By signing in to ********, you agree to our
                <a href="#" class="font-medium text-gray-500">Terms</a> and
                <a href="#" class="font-medium text-gray-500">Privacy Policy</a>.
            </div>
        </footer>
    </div>

</template>

<style>

</style>