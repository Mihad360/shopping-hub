import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./authentication/Authprovider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-gray-100 min-h-screen font">
      <Provider store={store}>
        <ToastContainer/>
        {/* <PersistGate  persistor={persistor}> */}
          <QueryClientProvider client={queryClient}>
          <AuthProvider>
          <RouterProvider router={router} />
          </AuthProvider>
          </QueryClientProvider>
        {/* </PersistGate> */}
      </Provider>
    </div>
  </StrictMode>
);
