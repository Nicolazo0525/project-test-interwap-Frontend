import { ref } from "vue";
import localAxios from "../localAxios";

export default function useProfile(){
    const status = ref([])
    const loading = ref()

    const updateUser = async(formData, userId)=>{
        console.log(formData, userId)
        let response = await localAxios.put('/api/profile/' + userId, formData)
        status.value = response.data.status
        console.log(status.value)
    }
    const updatePasswordUser = async(formData, userId)=>{
        console.log(formData, userId)
        let response = await localAxios.put('/api/profilePassword/' + userId, formData)
        status.value = response.data.status
        console.log(status.value)
        try {
            loading.value = false
        } catch (error) {
            loading.value = true
        }
    }

    return{
        updateUser,
        updatePasswordUser,
        loading
    }
}