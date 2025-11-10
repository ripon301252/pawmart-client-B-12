import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import PetsSupplies from "../Pages/PetsSupplies/PetsSupplies";
import PrivateRoute from "./PrivateRoute";
import AddListing from "../Pages/AddListing";
import MyListings from "../Pages/MyListings";
import MyOrders from "../Pages/MyOrders";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import MyProfile from "../Pages/MyProfile";
import Error from "../Pages/Error404/Error";
import ListingDetails from "../Pages/Details/ListingDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
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
      // ✅ Dynamic SeeDetails route for all categories
      {
        path: "/:category/:id",
        element: <PrivateRoute>
            <ListingDetails />
        </PrivateRoute>,
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/${params.category}/${params.id}`
          ),
      },
      {
        path: "/myProfile",
        element: <MyProfile />,
      },
      {
        path: "/signin",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Register,
      },
      // Optional: errorElement
      {
        path: "*",
        // Component: Error,
      },
    ],
  },
]);
