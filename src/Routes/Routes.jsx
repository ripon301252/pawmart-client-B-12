import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import PetsSupplies from "../Pages/PetsSupplies/PetsSupplies";
import PrivateRoute from "./PrivateRoute";
import AddListing from "../Pages/AddListing/AddListing";
import MyProfile from "../Pages/MyProfile"
import MyOrders from "../Pages/MyOrders/MyOrders";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import MyListings from "../Pages/MyListing/MyListings";
import Error from "../Pages/Error404/Error";
import ProductDetails from "../Pages/Details/ProductDetails";
import EditListing from "../Pages/MyListing/EditListing";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement:<Error />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/petsSupplies",
        Component: PetsSupplies,
      },
      {
        path: "/addListing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
      {
        path: "/myListing",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: "/myOrder",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/:category/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/${params.category}/${params.id}`),
      },
      {
        path: "/myProfile",
        element: <MyProfile />,
      },
      {
        path:'/editListing',
        element: <EditListing />
      },
      {
        path: "/signin",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Register,
      }
      
    ],
  },
]);
