<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import localAxios from '../../localAxios';
import useVehiculos from '../../composables/vehiculos';
import Alert from "./Alert.vue"
import ModalDelete from './ModalDelete.vue';
import { useAuthStore } from "../../stores/Auth";

const authStore = useAuthStore()

const {
        vehiculos,
        metaVehiculo,
        deleteVehiculos,
        getVehiculos,
        exportVehiculos,
        searchVehiculos,
        status,
        loading
    } = useVehiculos()
const perPage = ref(1);
const showModal = ref(false)
const idSelected = ref();

//Search
const searchText = ref('')
const searchResult = ref([])
const vehiculo = ref([])
const typingTimeout = ref(null)
const userId = ref('');

if (searchText.value.length > 0) {
    
    vehiculo.value = getVehiculos(perPage.value, searchText)
}
if (searchText.value.length <= 0) {
    perPage.value = perPage;
    buscarVehiculos();
}



function deleteOption(id){
    showModal.value = true
    idSelected.value = id
}

//Cambio de página
const changePage = (page) => {
    //Asigno lo que contiene el parámetro page a la variable reactiva perPage
    perPage.value = page;
    //Renderizo datos de esa página por medio de la función buscarVehiculos
    buscarVehiculos();
};

//Variable computada para mostrar el todas las páginas existentes
const pages = computed(() => {
    //Creo array
    const pages = [];
    //Recorro el array metaVehiculo.value.last_page
    for (let i = 1; i <= metaVehiculo.value.last_page; i++) {
        pages.push(i);
    }
    //renderizo páginas
    return pages;
});

const delayedSearch = () =>{
    if (typingTimeout.value !== null) {
        clearTimeout(typingTimeout.value)
    }
    typingTimeout.value = setTimeout(buscarVehiculos, 500)
}

function buscarVehiculos(){
    vehiculo.value = getVehiculos(perPage.value, searchText.value)
}
/* onMounted(()=>{
    getVehiculos(page.value, searchText.value)
}) */

</script>
    
<template>
    
    <div class="w-11/12 mx-auto rounded-md shadow-md bg-white my-12 p-6  flex justify-start space-y-3 flex-col">
        <!-- <div class="text-xl font-bold">History</div>
        <div>Index</div> -->
        <header class="mb-3 text-2xl font-bold">Vehículos</header>
        <div class="grid grid-cols-1 md:grid-cols-2">
            
            <div class="flex flex-row gap-3">
                <div class="w-64 flex flex-row items-center rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <input type="text" placeholder="Search..." v-model="searchText" @keydown="delayedSearch"
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                    
                </div>
                <!-- <div class="mt-2 flex justify-center">
                    <button @click="buscarVehiculos" class="w-20 text-center items-center rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">Buscar</button>
                </div> -->
            </div>
            <div class="flex justify-end space-x-3 flex-col md:flex-row">
                <router-link :to="{name: 'CreateVehiculo'}" class="w-20 text-center items-center rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">Create</router-link>
                <a class="w-20 cursor-pointer text-center items-center rounded-2xl border-b-4 border-b-green-600 bg-green-500 py-3 font-bold text-white hover:bg-green-400 active:translate-y-[0.125rem] active:border-b-green-400" @click="exportVehiculos()">
                    Export
                      
                </a>
            </div>
            
        </div>

        <div class="overflow-x-auto rounded-lg border shadow-md">
            <table class="min-w-full rounded-md leading-normal">
                <thead>
                    <tr>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 text-left bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Placa
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 text-center bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Telefono
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 text-center bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Color
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 text-center bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Estado
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 text-center bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="vehiculos.data">
                        <template v-for="vehiculo in vehiculos.data" :key="vehiculo.id">
                            <tr>
                                <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                    <div class="items-center">
                                        <div class=" text-gray-900 whitespace-no-wrap">
                                            {{ vehiculo.placa }}
                                        </div>
                                    </div>
                                </td>
                                <td class="w-2/5 px-3 py-3 text-center text-gray-600 text-base bg-white border-b border-gray-200">
                                    <div class="items-center">
                                        <div class=" text-gray-900 whitespace-no-wrap">
                                            {{ vehiculo.telefono }}
                                        </div>
                                    </div>
                                </td>
                                <td class="w-2/5 px-3 py-3 text-center text-gray-600 text-base bg-white border-b border-gray-200">
                                    <div class="flex justify-center items-center ju">
                                        <div class=" text-gray-900 whitespace-no-wrap text-center">
                                            {{ vehiculo.color }}
                                        </div>
                                    </div>
                                </td>
                                <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                    <div class="flex justify-center items-center">
                                        <div class=" text-gray-900 whitespace-no-wrap text-center">
                                            <template v-if="vehiculo.estado === 1">
                                                <span
                                                    class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                                                >
                                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                                    En parqueadero
                                                </span>
                                            </template>
                                            <template v-if="vehiculo.estado === 0">
                                                <span
                                                    class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600"
                                                >
                                                    <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                                    No se encuentra en parqueadero 
                                                </span>
                                            </template>
                                        </div>
                                    </div>
                                </td>
                                <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                    <div class="flex justify-center items-center">
                                        <div class=" items-center">
                                            <router-link :to="{name: 'EditVehiculo', params:{id:vehiculo.id}}" class="">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>                                        
                                          </router-link>
                                        </div>
                                        <button class="text-center rounded-2xl" @click="deleteOption(vehiculo.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        
                        <template v-if="showModal == true">
                            <modal-delete :id="idSelected" v-show="showModal" @close-modal="showModal = false"></modal-delete>
                        </template>
        
                        
                    </template>
                    <tr class="text-center">
                        <template v-if="vehiculos.data.length < 0">
                            <td colspan="5">No data</td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
        <alert v-bind:success="status"></alert>
        <template v-if="loading = false">
            <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div class="animate-pulse flex space-x-4">
                    <div class="rounded-full bg-slate-700 h-10 w-10"></div>
                    <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-700 rounded"></div>
                    <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-700 rounded"></div>
                    </div>
                    </div>
                </div>
                </div>
        </template>
        <!-- <div class="flex justify-center">
            <v-pagination
                v-model="page"
                :pages="metaVehiculo.last_page"
                :range-size="5"
                active-color="rgba(59, 130, 246, var(--tw-bg-opacity))"
                @update:modelValue="getVehiculos"
            />
        </div> -->
        <div class="flex justify-center py-4">
            <ul class="inline-flex -space-x-px">
                <li class="" v-if="metaVehiculo.current_page > 1">
                    <a class="cursor-pointer bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click.prevent="changePage(metaVehiculo.current_page - 1)">
                    Anterior
                    </a>
                </li>
                <li v-for="page in pages" :key="page" class="">
                    <template v-if="page === metaVehiculo.current_page">
                        <a class="cursor-pointer bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-700 dark:border-gray-700 dark:text-white" @click.prevent="changePage(page)">{{ page }}</a>
                    </template>
                    <template v-if="page != metaVehiculo.current_page">
                        <a class="cursor-pointer bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click.prevent="changePage(page)">{{ page }}</a>
                    </template>
                </li>
              
                <li class="" v-if="metaVehiculo.current_page < metaVehiculo.last_page">
                    <a class="cursor-pointer bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click.prevent="changePage(metaVehiculo.current_page + 1)">
                        Siguiente
                    </a>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<style>
    .active{
        background-color: rgba(185, 28, 28, var(--tw-bg-opacity));
    }
</style>