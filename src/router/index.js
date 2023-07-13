import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/Home.vue'
import Register from '../components/Authentication/Register.vue'
import Login from '../components/Authentication/Login.vue'
import ForgotPassword from '../components/Authentication/ForgotPassword.vue'
import ResetPassword from '../components/Authentication/ResetPassword.vue'
import CreateVehiculo from '../components/vehiculos/Create.vue'
import IndexVehiculos from '../components/vehiculos/Index.vue'
import EditVehiculo from '../components/vehiculos/Edit.vue'
import ProfileUser from '../components/Profile/ProfileUser.vue'

const routes = [
    {
        path: "/home/",
        name: "Home",
        component: Home
    },
    {
        path: "/register/",
        name: "register",
        component: Register
    },
    {
        path: "/login/",
        name: "login",
        component: Login
    },
    {
        path: "/forgot-password/",
        name: "ForgotPassword",
        component: ForgotPassword,
        props: true
    },
    {
        path: "/password-reset/:token",
        name: "ResetPassword",
        component: ResetPassword,
        props: true
    },
    {
        path: "/vehiculos/",
        name: "IndexVehiculos",
        component: IndexVehiculos,
    },
    {
        path: "/vehiculos-edit/:id",
        name: "EditVehiculo",
        component: EditVehiculo,
        props: true
    },
    {
        path: "/vehiculos-create/",
        name: "CreateVehiculo",
        component: CreateVehiculo
    },
    {
        path: "/ProfileUser/",
        name: "ProfileUser",
        component: ProfileUser
    },
]

export default createRouter({
    history: createWebHistory(),
    routes
})