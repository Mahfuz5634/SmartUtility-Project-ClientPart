import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Component/Home";
import BillsPage from "../Pages/BillsPage";
import BillsDetails from "../Pages/BillsDetails";
import Login from "../Pages/Login";
import RegisterPage from "../Pages/RegisterPage";
import PrivateRoute from "../Pages/PrivateRoutes";
import ForgetPass from "../Pages/ForgetPass";
import MyPayBills from "../Pages/MyPayBills";
import FAQComponent from "../Pages/FaqComponent";
import NotFound from "../Pages/NotFound";

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
        element: (
          <PrivateRoute>
            <BillsDetails></BillsDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path:'/forget-pass',
        Component:ForgetPass,
      },{
        path:'//mypaybills',
        element:<PrivateRoute><MyPayBills></MyPayBills></PrivateRoute>
      },{
        path:'/faq',
        Component:FAQComponent
      },

      
    ],
  },
  {
    path:'*',
    Component:NotFound
  }
]);
