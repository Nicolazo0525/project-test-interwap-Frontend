<script setup>
import { onMounted, ref } from 'vue'
import useVehiculos from '../../composables/vehiculos';


const props = defineProps({
    id: {
        type: String,
    },
})



const {getVehiculo, placa, telefono, color, estado, updateVehiculo, errorsVehiculo} = useVehiculos()
const formData = new FormData();

onMounted(() => {
    getVehiculo(props.id)
})

const editVehiculo = async () =>{
    formData.append('placa',placa.value);
    formData.append('telefono',telefono.value);
    formData.append('color',color.value);
    formData.append('estado',estado.value);
    for (const [key, value] of formData) {
        formData[key] = value
    }  
    await updateVehiculo({...formData}, props.id)
}

</script>
<template>
    <div class="space-y-4 w-11/12 mx-auto rounded-md shadow-md bg-white mt-12 p-6">
        <div class="flex justify-between flex-row">

            <header class="mb-3 text-2xl font-bold">Editar vehículo</header>
        </div>
        <form action="" @submit.prevent="editVehiculo()">
            <div class="grid grid-cols-2 gap-2">
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Placa" v-model="placa"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <template v-if="errorsVehiculo.placa">
                    <div>
                        <span
                        class="absolute inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600"
                        >
                            <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                            {{ errorsVehiculo.placa[0]  }}
                        </span>
                    </div>
                    
                </template>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Telefono" v-model="telefono"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <template v-if="errorsVehiculo.placa">
                    <div>
                        <span
                        class="absolute inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600"
                        >
                            <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                            {{ errorsVehiculo.placa[0]  }}
                        </span>
                    </div>
                    
                </template>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Color" v-model="color"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <template v-if="errorsVehiculo.placa">
                    <div>
                        <span
                        class="absolute inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600"
                        >
                            <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                            {{ errorsVehiculo.placa[0]  }}
                        </span>
                    </div>
                    
                </template>
                <div
                    class="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <select name="estado" id="Estado" v-model="estado" class="flex w-full bg-gray-50  focus-within:ring-blue-400">
                        <option value="">Select option</option>
                        <option value="0">No se encuentra en parqueadero</option>
                        <option value="1">En parqueadero</option>
                    </select>
                </div>
                <template v-if="errorsVehiculo.estado">
                    <div>
                        <span
                        class="absolute inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600"
                        >
                            <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                            {{ errorsVehiculo.estado[0]  }}
                        </span>
                    </div>
                    
                </template>
            </div>
            <div class="mt-2 flex justify-center">
                <button class="w-20 text-center items-center rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">Create</button>
            </div>
        </form>
    </div>
</template>
    

<style>

</style>