<script setup>
import { onMounted,ref } from 'vue'
import {useAuthStore} from '../../stores/Auth.js'

const authStore = useAuthStore()
/* console.log(authStore.errors.password[0]) */
const form = ref({
    email: '',
})

</script>

<template>
    <div class="space-y-4 w-[28em] mx-auto rounded-md shadow-md bg-white mt-12 p-6">
        <header class="mb-3 text-2xl font-bold text-center">Forgot Password</header>
        <form action="" @submit.prevent="authStore.handleForgotPassword(form)">
            <div class="space-y-4 text-center">
                <div class="mb-4 text-sm text-gray-600 text-justify">
                    Forgot your password? No problem. Just let us know your email address and we will email you a password reset
                    link that will allow you to choose a new one.
                </div>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Email or username"  v-model="form.email"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>  
                <template v-if="authStore.status">
                    <span class="text-green-700 m-2">{{ authStore.status }}</span>
                </template> 
                <template v-if="authStore.errors.email">
                    <span class="text-red-600 m-2">{{ authStore.errors.email[0] }}</span>
                </template>
                <button
                    class="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
                    LOG IN
                </button>
            </div>
            
        </form>
    </div>

</template>

<style>

</style>