<script setup>
import { onMounted } from 'vue'
import {useAuthStore} from '../stores/Auth.js'

const authStore = useAuthStore()

onMounted(async() => {
    await authStore.getUser()
})
</script>

<template>
    <template v-if="authStore.user">
        <div class="flex flex-col">
            logged in
            <div>
                {{ authStore.user.name }}
            </div>
            <div>
                {{ authStore.user.email }}
            </div>
        </div>
    </template>
    <template v-if="!authStore.user">
        <div class="flex flex-col">
            not logged in            
        </div>
    </template>
</template>

<style>

</style>