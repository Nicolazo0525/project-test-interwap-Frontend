import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { useRoute } from 'vue-router';
import localAxios from "../localAxios";
import { useAuthStore } from "../stores/Auth";

export default function useVehiculos(){

    const authStore = useAuthStore()

    const placa = ref([])
    const telefono = ref([])
    const color = ref([])
    const estado = ref([])
    const vehiculos = ref([])
    const vehiculo = ref([])
    const metaVehiculo = ref([])
    const status = ref([])
    const userId = ref('')
    const vehiculosUserId = ref([])

    //Search
    const searchResult = ref([])

    const errorsVehiculo = ref('')

    const getVehiculo = async (id) =>{
        let response = await localAxios.get('/api/vehiculos/'+id)
        placa.value = response.data.data.placa
        telefono.value = response.data.data.telefono
        color.value = response.data.data.color
        estado.value = response.data.data.estado
        userId.value = response.data.data.user_id
    }

    const searchVehiculos = async (data) =>{
        let response = await localAxios.get(`/api/search?q=${data}`)
        searchResult.value = response.data
        metaVehiculo.value = response.data.meta
    }
    
    const storeVehiculo = async (formData) =>{
        
        try {
            let response = await localAxios.post('/api/vehiculos/', formData)
            status.value = response.data.status
        } catch (error) {
            if (error.response.status === 422) {
                errorsVehiculo.value = error.response.data.errors
            }
        }
        
    }

    const updateVehiculo = async (formData, id) =>{
        try {
            let response = await localAxios.put('api/vehiculos/' + id, formData)
            status.value = response.data.status
        } catch (error) {
            if (error.response.status === 422) {
                errorsVehiculo.value = error.response.data.errors
            }
        }
        
    }

    const getVehiculos = async (page, data) =>{
        //Obtengo el usuario del store
        await authStore.getUser()
        //Asigno el id del usuario a userId
        userId.value = authStore.user.id
        if (page) {
            let response = await localAxios.get(`/api/search/${userId.value}?page=${page}`)
            vehiculos.value = response.data
            metaVehiculo.value = response.data.meta
        }if (page && data.length > 0) {
            let response = await localAxios.get(`/api/search/${userId.value}?page=${page}&q=${data}`)
            vehiculos.value = response.data
            metaVehiculo.value = response.data.meta
        }
        
    }

    
    const exportVehiculos = async () =>{

        await authStore.getUser()
        userId.value = authStore.user.id
        let response = await localAxios.get(`/api/export/${userId.value}`, { responseType: 'blob' })
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'vehiculos.xlsx')
        document.body.appendChild(link)
        link.click() 
    }


    const deleteVehiculos = async(id) =>{
        try {
            let response = await localAxios.delete('/api/vehiculos/' + id)
            status.value = response.data.status
        } catch (error) {
            if (error.response.status === 422) {
                errorsVehiculo.value = error.response.data.errors
            }
        }
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
        exportVehiculos,
        status,
        searchVehiculos,
        userId,
        searchResult
    }
}
