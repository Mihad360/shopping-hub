import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../homeroutes/Home";
import Shop from "../shoproutes/Shop";
import Dashboard from "../dashboard/Dashboard";
import Contactus from "../contactus/Contactus";
import Cart from "../UserRoutes/Cart";
import Signin from "../authentication/Signin";
import Signup from "../authentication/Signup";
import Privateroute from "./Privateroute";
import Allusers from "../adminRoutes/Allusers";
import Additem from "../adminRoutes/Additem";
import Manageitems from "../adminRoutes/Manageitems";
import Adminroute from "../adminRoutes/Adminroute";
import EditShopitem from "../adminRoutes/EditShopitem";
import AddNewArrival from "../adminRoutes/Addnewarrival";
import ManageNewarrival from "../adminRoutes/ManageNewarrival";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/contactus",
        element: (
          <Privateroute>
            <Contactus></Contactus>
          </Privateroute>
        ),
      },
      {
        path: "/signin",
        element: <Signin></Signin>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/dashboard/allusers",
        element: (
          <Adminroute>
            <Allusers></Allusers>
          </Adminroute>
        ),
      },
      {
        path: "/dashboard/additem",
        element: (
          <Adminroute>
            <Additem></Additem>
          </Adminroute>
        ),
      },
      {
        path: "/dashboard/manageshopitems",
        element: <Manageitems></Manageitems>,
      },
      {
        path: "/dashboard/manageitems/edititems/:id",
        element: <EditShopitem></EditShopitem>,
      },
      {
        path: "/dashboard/addnewarrival",
        element: <AddNewArrival></AddNewArrival>,
      },
      {
        path: "/dashboard/managenewarrival",
        element: <ManageNewarrival></ManageNewarrival>,
      },
    ],
  },
]);

export default router;
