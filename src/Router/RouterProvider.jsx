import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Component/Home";



export const router =createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
                path:'/',
                Component:Home
            }
        ]
    },
])

