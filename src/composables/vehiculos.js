import axios from "axios";
import { ref } from "vue";
import { useRoute } from 'vue-router';
import localAxios from "../localAxios";

export default function useVehiculos(){
    
    const apiKey = '153a9c7aee2713af4d40b96156cac8e3';

    const placa = ref([])
    const telefono = ref([])
    const color = ref([])
    const estado = ref([])
    const vehiculos = ref([])
    const vehiculo = ref([])
    const metaVehiculo = ref([])

    const errorsVehiculo = ref('')

    const getVehiculo = async (id) =>{
        let response = await localAxios.get('/api/vehiculos/'+id)
        placa.value = response.data.data.placa
        telefono.value = response.data.data.telefono
        color.value = response.data.data.color
        estado.value = response.data.data.estado
    }


    
    
    const storeVehiculo = async (formData) =>{
        
        try {
            let csrfCookie = await localAxios.get('/sanctum/csrf-cookie');
            let response = await localAxios.post('/api/vehiculos/', formData, csrfCookie)
        } catch (error) {
            if (error.response.status === 422) {
                errorsVehiculo.value = error.response.data.errors
            }
        }
        
    }

    const updateVehiculo = async (formData, id) =>{
        try {
            let csrfCookie = await localAxios.get('/sanctum/csrf-cookie');
            let response = await localAxios.put('api/vehiculos/' + id, formData, csrfCookie)
        } catch (error) {
            if (error.response.status === 422) {
                errorsVehiculo.value = error.response.data.errors
            }
        }
        
    }

    const getVehiculos = async (page) =>{
        let response = await localAxios.get('/api/vehiculos?page='+page)
        vehiculos.value = response.data
        metaVehiculo.value = response.data.meta
    }

    
    const exportVehiculos = async () =>{
        let response = await localAxios.get('/api/exportar', { responseType: 'blob' })
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'vehiculos.xlsx')
        document.body.appendChild(link)
        link.click()
    }


    const deleteVehiculos = async(id) =>{
        let response = await localAxios.delete('/api/vehiculos/' + id)
    }
    
    return{
        placa,
        color,
        telefono,
        estado,
        vehiculos,
        metaVehiculo,
        storeVehiculo,
        updateVehiculo,
        deleteVehiculos,
        getVehiculos,
        getVehiculo,
        errorsVehiculo,
        exportVehiculos
    }
}
