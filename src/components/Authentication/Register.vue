<script setup>
import { ref } from 'vue'
import {useAuthStore} from '../../stores/Auth.js'

const authStore = useAuthStore()

/* onMounted(async() => {
    await authStore.getUser()
}) */
const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

</script>
<script>
import passwordMeter from "vue-simple-password-meter";

export default {
  components: { passwordMeter },
  data: () => ({
    passwordValue: null,
    score: null
  }),
  methods: {
    onScore({ score, strength }) {
      console.log(score); // from 0 to 4
      console.log(strength); // one of : 'risky', 'guessable', 'weak', 'safe' , 'secure' 
      this.score = score;
    }
  }
};
</script>
<template>
    <div x-show="isLoginPage" class="space-y-4 w-[28em] mx-auto rounded-md shadow-md bg-white my-12 p-6">
        <header class="mb-3 text-2xl font-bold text-center">Create your profile</header>
        <form action="" @submit.prevent="authStore.handleRegister(form)">
            <div class="space-y-4 text-center">
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Name" v-model="form.name"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <template v-if="authStore.errors.name">
                    <span class="text-red-600 m-2">{{ authStore.errors.name[0] }}</span>
                </template>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Email" v-model="form.email"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <template v-if="authStore.errors.email">
                    <span class="text-red-600 m-2">{{ authStore.errors.email[0] }}</span>
                </template>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="password" placeholder="Password" v-model="form.password"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <template v-if="authStore.errors.password">
                    <span class="text-red-600 m-2">{{ authStore.errors.password[0] }}</span>
                </template>
                <span v-if="score === 0 || score === 1 || score === 2 || score === 3" class="w-full bg-red-400 text-red-700">
                    Use better password
                </span>
                
                <password-meter :password="form.password" @score="onScore"/>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="password" placeholder="Password Confirmation" v-model="form.password_confirmation"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                
                <button
                    class="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
                    CREATE ACCOUNT
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
.po-password-strength-bar {
    border-radius: 2px;
    transition: all 0.2s linear;
    height: 5px;
    margin-top: 8px;
  }
  
  .po-password-strength-bar.risky {
    background-color: #f95e68;
  }
  
  .po-password-strength-bar.guessable {
    background-color: #fb964d;
  }
  
  .po-password-strength-bar.weak {
    background-color: #fdd244;
  }
  
  .po-password-strength-bar.safe {
    background-color: #b0dc53;
  }
  
  .po-password-strength-bar.secure {
    background-color: #35cc62;
  }
</style>