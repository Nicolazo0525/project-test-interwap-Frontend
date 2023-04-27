import axios from "axios";
import { defineStore } from "pinia";
import localAxios from "../localAxios";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('Auth',{
    state: () => ({
        authUser: null,
        authErrors:[],
        authStatus: null
    }),
    getters: {
        user: (state) => state.authUser,
        errors: (state) => state.authErrors,
        status: (state) => state.authStatus
    },
    actions: {
        async getToken(){
            await localAxios.get('/sanctum/csrf-cookie');
        },
        async getUser(){
            this.getToken()

            let response = await localAxios.get('/api/user');
            this.authUser = response.data
        },
        async handleLogin(data){
            this.authErrors = []
            this.getToken()
            try {
                let response = await localAxios.post('/login',{
                    email: data.email,
                    password: data.password
                });
                this.router.push("/home");
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors
                }
            }
        },
        async handleRegister(data){
            this.authErrors = []
            this.getToken()
            try {
                let response = await localAxios.post('/register',{
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password_confirmation
                });
                this.router.push("/home");
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors
                }
            }
        },
        async handleForgotPassword(data){
            this.authErrors = []
            this.getToken()
            try {
                let response = await localAxios.post('/forgot-password',{
                    email: data.email,
                });
                this.authStatus = response.data.status
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors
                }
            }
        },
        async handleResetPassword(resetData){
            this.authErrors = []
            this.getToken()
            try {
                let response = await localAxios.post('/reset-password', resetData);
                /* let response = await localAxios.post('/reset-password',{
                    password: data.password,
                    password_confirmation: data.password_confirmation
                }); */
                this.router.push("/home");
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors
                }
            }
        },
        async handleLogout(){
            this.authErrors = []
            await localAxios.post('/logout')
            this.authUser = null
        }
    }
})
