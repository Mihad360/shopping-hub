import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../homeroutes/Home";
import Shop from "../shoproutes/Shop";
import Dashboard from "../dashboard/Dashboard";
import Contactus from "../contactus/Contactus";
import Cart from "../UserRoutes/Cart";
import Signin from "../authentication/Signin";
import Signup from "../authentication/Signup";
import Allusers from "../adminRoutes/Allusers";
import Additem from "../adminRoutes/Additem";
import Manageitems from "../adminRoutes/Manageitems";
import Adminroute from "../adminRoutes/Adminroute";
import EditShopitem from "../adminRoutes/EditShopitem";
import AddNewArrival from "../adminRoutes/Addnewarrival";
import ManageNewarrival from "../adminRoutes/ManageNewarrival";
import Payment from "../UserRoutes/Payment";
import Success from "../redirectPages/Success";
import Failed from "../redirectPages/Failed";
import Cancel from "../redirectPages/Cancel";
import Paymenthistory from "../UserRoutes/Paymenthistory";
import Userhome from "../UserRoutes/Userhome";
import Adminhome from "../adminRoutes/Adminhome";
import PrivateRoute from "../routes/PrivateRoute";

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
          <PrivateRoute>
            <Contactus></Contactus>
          </PrivateRoute>
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
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
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
        element: (
          <Adminroute>
            <Manageitems></Manageitems>
          </Adminroute>
        ),
      },
      {
        path: "/dashboard/manageitems/edititems/:id",
        element: (
          <Adminroute>
            <EditShopitem></EditShopitem>
          </Adminroute>
        ),
      },
      {
        path: "/dashboard/addnewarrival",
        element: (
          <Adminroute>
            <AddNewArrival></AddNewArrival>
          </Adminroute>
        ),
      },
      {
        path: "/dashboard/managenewarrival",
        element: (
          <Adminroute>
            <ManageNewarrival></ManageNewarrival>
          </Adminroute>
        ),
      },
      {
        path: "/dashboard/checkout",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/checkouthistory",
        element: (
          <PrivateRoute>
            <Paymenthistory></Paymenthistory>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/userhome",
        element: (
          <PrivateRoute>
            <Userhome></Userhome>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/adminhome",
        element: (
          <Adminroute>
            <Adminhome></Adminhome>
          </Adminroute>
        ),
      },
      {
        path: "/dashboard/success",
        element: <Success></Success>,
      },
      {
        path: "/dashboard/failed",
        element: <Failed></Failed>,
      },
      {
        path: "/dashboard/cancel",
        element: <Cancel></Cancel>,
      },
    ],
  },
]);

export default router;
