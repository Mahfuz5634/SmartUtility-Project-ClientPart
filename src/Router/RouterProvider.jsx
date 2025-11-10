import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Component/Home";
import BillsPage from "../Pages/BillsPage";



export const router =createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
                path:'/',
                Component:Home
            },
            {
                path:'/allbills',
                Component:BillsPage
            }
        ]
    },
])

