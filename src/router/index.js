import { createRouter, createWebHistory } from "vue-router";

import CreateVehiculo from '../components/vehiculos/Create.vue'
import IndexVehiculos from '../components/vehiculos/Index.vue'
import EditVehiculo from '../components/vehiculos/Edit.vue'
import ModalDelete from '../components/vehiculos/ModalDelete.vue'

const routes = [
    {
        path: "/vehiculos/",
        name: "IndexVehiculos",
        component: IndexVehiculos
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
        path: "/modal-delete/:id",
        name: "ModalDelete",
        component: ModalDelete,
        props: true
    },
]

export default createRouter({
    history: createWebHistory(),
    routes
})