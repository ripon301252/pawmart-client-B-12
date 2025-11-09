import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import PetsSupplies from "../Pages/PetsSupplies";
import PrivateRoute from "./PrivateRoute";
import AddListing from "../Pages/AddListing";
import MyListings from "../Pages/MyListings";
import MyOrders from "../Pages/MyOrders";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import MyProfile from "../Pages/MyProfile";
import Error from "../Pages/Error404/Error";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        // errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                Component: Home,
            },
            {
                path: '/petsSupplies',
                Component: PetsSupplies,
            },
            {
                path: '/addListing',
                element: <PrivateRoute>
                    <AddListing></AddListing>
                </PrivateRoute>
            },
            {
                path: '/myListing',
                element: <PrivateRoute>
                    <MyListings></MyListings>
                </PrivateRoute>
            },
            {
                path: '/myOrder',
                element: <PrivateRoute>
                    <MyOrders></MyOrders>
                </PrivateRoute>
            },
            {
                path: '/myProfile',
                element: <MyProfile></MyProfile>
            },
            {
                path:'/signin',
                Component: Login
            },
            {
                path:'/signup',
                Component: Register,
            }
        ]
    }
])