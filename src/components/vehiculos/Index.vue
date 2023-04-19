<script setup>
import { onMounted, ref } from 'vue'
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import localAxios from '../../localAxios';
import useVehiculos from '../../composables/vehiculos';
import Alert from "./Alert.vue"
import ModalDelete from './ModalDelete.vue';

const {vehiculos,
        metaVehiculo,
        deleteVehiculos,
        getVehiculos,
        exportVehiculos,
        status
    } = useVehiculos()

const page = ref(1);
const showModal = ref(false)
const idSelected = ref();

function deleteOption(id){
    showModal.value = true
    idSelected.value = id
}

onMounted(()=>{
    getVehiculos(page.value)
})

</script>
    
<template>
    
    <div class="w-11/12 mx-auto rounded-md shadow-md bg-white my-12 p-6  flex justify-start space-y-3 flex-col">
        <!-- <div class="text-xl font-bold">History</div>
        <div>Index</div> -->
        <div class="flex justify-between flex-col md:flex-row">
            <header class="mb-3 text-2xl font-bold">Vehículos</header>
            <router-link :to="{name: 'CreateVehiculo'}" class="w-20 text-center items-center rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">Create</router-link>
            <button class="w-20 text-center items-center rounded-2xl border-b-4 border-b-green-600 bg-green-500 py-3 font-bold text-white hover:bg-green-400 active:translate-y-[0.125rem] active:border-b-green-400" @click="exportVehiculos()">
                Export
                  
            </button>
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
                    <div class=" col-span-6">
                        <template v-if="!vehiculos.data">
                            <div class="text-center">No data</div>
                        </template>
                    </div>
                </tbody>
            </table>
        </div>
        <div></div>
        <alert v-bind:success="status"></alert>
        <div class="flex justify-center">
            <v-pagination
                v-model="page"
                :pages="metaVehiculo.last_page"
                :range-size="5"
                active-color="rgba(59, 130, 246, var(--tw-bg-opacity))"
                @update:modelValue="getVehiculos"
            />
        </div>
        
    </div>
</template>

<style>

</style>