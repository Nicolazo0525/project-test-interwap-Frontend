<script setup>
import { onMounted, ref } from 'vue'
import {useAuthStore} from '../../stores/Auth.js'
import useProfile from '../../composables/profile'

const authStore = useAuthStore()
const formData = new FormData();

const {updateUser, updatePasswordUser, loading} = useProfile();

const userId = ref('')
const name = ref('')
const email = ref('')
const oldPassword = ref('')
const newPassword = ref('')
const confimNewPassword = ref('')

onMounted(async() => {
    const user = await authStore.getUser()
    userId.value = authStore.user.id
    name.value = authStore.user.name
    email.value = authStore.user.email
})

const editUser = async ()=>{
    formData.append('userId', userId.value);
    formData.append('name', name.value);
    formData.append('email', email.value);
    for (const [key, value] of formData) {
        formData[key] = value
    }  
    await updateUser({...formData}, userId.value)
}
const editPasswordUser = async ()=>{
    formData.append('oldPassword', oldPassword.value);
    formData.append('newPassword', newPassword.value);
    formData.append('confimNewPassword', confimNewPassword.value);
    for (const [key, value] of formData) {
        formData[key] = value
    }  
    await updatePasswordUser({...formData}, userId.value)
}
</script>

<template>
    <div class="space-y-4 w-11/12 mx-auto rounded-md shadow-md bg-white mt-12 p-6">
        <div class="flex justify-between flex-row">
            <header class="mb-3 text-2xl font-bold">Profile</header>
        </div>
        <form action="" @submit.prevent="editUser()">
            <div class="grid grid-cols-2 gap-2">
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Name" v-model="name"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="email" v-model="email"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
            </div>
            <div class="mt-2 flex justify-center">
                <button class="w-20 text-center items-center rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">Save</button>
            </div>
        </form>
        <form action="" @submit.prevent="editPasswordUser()">
            <div class="grid grid-cols-2 gap-2">
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="password" placeholder="old Password" v-model="oldPassword"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="password" placeholder="New Password" v-model="newPassword"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400 col-start-2">
                    <input type="password" placeholder="Confirm New Password" v-model="confimNewPassword"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
            </div>
            <div class="mt-2 flex justify-center">
                <button class="px-2 text-center items-center rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">Save Password</button>
            </div>
            <!-- <alert v-bind:errorsVehiculo="errorsVehiculo" v-bind:success="status"></alert> -->
        </form>
    </div>

</template>


<style>

</style>