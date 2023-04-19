<script setup>
import { onMounted, ref, watch } from 'vue'
import useVehiculos from '../../composables/vehiculos'
import Alert from './Alert.vue';

const props = defineProps({
    id:{
        type: Number
    }
})

const {deleteVehiculos, status} = useVehiculos()

const vehiculoId = ref(props.id)
const closeModal = ref(false)

console.log(vehiculoId.value)
/* 
watch(() => props.id, (newValId) => {
    vehiculoId.value = newValId
}) */
function closeAlert(){
    closeModal.value = true
}
</script>
<template>
    <div class="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
        style="background: rgba(0,0,0,.7);"> 
        <div
            class="border border-blue-500 shadow-lg modal-container rounded-lg bg-white w-11/12 md:max-w-md mx-auto z-50 overflow-y-auto">
            <div class="modal-content py-4 text-left px-6">
                <!--Title-->
                <div class="flex justify-between items-center pb-3">
                    <p class="text-2xl font-bold">Delete vehicule</p>
                    <div>
                        <button @click="$emit('close-modal')" class=" items-center rounded-r-2xl text-center flex justify-center w-6 h-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                        </button> 
                    </div>
                </div>
                <!--Body-->
                <div class="my-5">
                    <p>Do you want to delete this vehicle?</p>
                </div>
                <!--Footer-->
                <div class="flex justify-end pt-2 space-x-2">
                    <button @click="$emit('close-modal')"
                        class="w-20 text-center items-center rounded-2xl border-b-4 border-b-red-600 bg-red-500 py-3 font-bold text-white hover:bg-red-400 active:translate-y-[0.125rem] active:border-b-red-400"><!--  bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300 -->
                        Cancel
                    </button>
                    <button class="w-20 text-center items-center rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400" 
                        @click="deleteVehiculos(vehiculoId)" >
                            Confirm
                    </button>
                </div>
            </div>
        </div>
        <alert v-bind:success="status"></alert>
    </div>
</template>

<style>
.animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

.animated.faster {
    -webkit-animation-duration: 500ms;
    animation-duration: 500ms;
}

.fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}

.fadeOut {
    -webkit-animation-name: fadeOut;
    animation-name: fadeOut;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
</style>