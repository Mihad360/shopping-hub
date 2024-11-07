import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../homeroutes/Home";
import Shop from "../shoproutes/Shop";
import Dashboard from "../dashboard/Dashboard";
import Contactus from "../contactus/Contactus";

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
          path: '/dashboard',
          element: <Dashboard></Dashboard>
        },
        {
          path: '/contactus',
          element: <Contactus></Contactus>
        },
      ]
    },
  ]);

  export default router;