<script setup>
import { onMounted,ref } from 'vue'
import {useAuthStore} from '../../stores/Auth.js'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const props = defineProps({
    token:{
        type: String,
    },
    email: {
        type: String,
    },
})

const authStore = useAuthStore()

const form = ref({
    password: '',
    password_confirmation: '',
    token: route.params.token,
    email: route.query.email,
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
    <div class="space-y-4 w-[28em] mx-auto rounded-md shadow-md bg-white mt-12 p-6">
        <header class="mb-3 text-2xl font-bold text-center">Reset Password</header>
        <form action="" @submit.prevent="authStore.handleResetPassword(form)">
            <div class="space-y-4 text-center">
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="password" placeholder="Password" v-model="form.password"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <template v-if="authStore.errors.password">
                    <span class="text-red-600 m-2">{{ authStore.errors.password[0] }}</span>
                </template>
                <password-meter :password="form.password" />
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="password" placeholder="Password Confirmation" v-model="form.password_confirmation"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <span v-if="score === 0">Use better password</span>
                <button
                    class="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
                    LOG IN
                </button>
            </div>
            
        </form>
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