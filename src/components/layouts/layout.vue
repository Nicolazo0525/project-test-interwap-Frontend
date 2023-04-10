<script setup>
import { ref } from 'vue';

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

const toggleDarkMode = ref(document.documentElement.className === 'dark')


const changeDarkMode = () => {
    toggleDarkMode.value = document.documentElement.classList.toggle('dark')
    
    //Operador ternario
    toggleDarkMode.value ? localStorage.theme = 'dark' : localStorage.theme = 'light'
}
</script>
<template>
    <div class="shadow bg-white z-50">
        <div class="h-16 mx-auto px-12 flex items-center justify-between">
            <a class="text-2xl hover:text-cyan-500 transition-colors cursor-pointer">Logo</a>
            <ul class="flex items-center gap-5 text-base font-bold">
                <li><router-link :to="{name: 'IndexVehiculos'}" class="hover:text-cyan-500 transition-colors">Vehiculos</router-link></li>
            </ul>
            <div class="flex justify-center">
                <label for="toogleButton" class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input id="toogleButton" type="checkbox" class="items-center hidden"  @click="changeDarkMode"/>
                        <!-- path -->
                        <div
                            class="flex items-center  cursor-pointer cm-toggle-wrapper transition ease-in-out bg-gray-200 w-9 h-5 dark:bg-slate-800 rounded-full shadow-inner"
                            >
                            <!-- crcle -->
                            <template v-if="toggleDarkMode == true">
                                <div
                                class="transition ease-in-out absolute w-3.5 h-3.5 bg-white rounded-full shadow right-0"
                                ></div>
                            </template>
                            <template v-if="toggleDarkMode == false">
                                <div
                                class="transition ease-in-out absolute w-3.5 h-3.5 bg-white rounded-full  shadow left-0"
                                ></div>
                            </template>
                        </div>
                    </div>
                </label>
           </div>
        </div>
       
    </div>
</template>
