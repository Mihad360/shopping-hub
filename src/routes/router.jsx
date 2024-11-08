import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../homeroutes/Home";
import Shop from "../shoproutes/Shop";
import Dashboard from "../dashboard/Dashboard";
import Contactus from "../contactus/Contactus";
import Cart from "../UserRoutes/Cart";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
          path: '/shop',
          element: <Shop></Shop>
        },
        {
          path: '/contactus',
          element: <Contactus></Contactus>
        },
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: '/dashboard/cart',
          element: <Cart></Cart>
        },
      ]
    }
  ]);

  export default router;