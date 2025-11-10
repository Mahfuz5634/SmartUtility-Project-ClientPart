import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Component/Home";
import BillsPage from "../Pages/BillsPage";
import BillsDetails from "../Pages/BillsDetails";
import Login from "../Pages/Login";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/allbills",
        Component: BillsPage,
      },
      {
        path: "/billdetails/:id",
        Component: BillsDetails,
      },
      {
        path:'/login',
        Component:Login
      }
    ],
  },
]);
