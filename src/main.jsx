import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-gray-100 min-h-screen font">
      <Provider store={store}>
        <PersistGate  persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </div>
  </StrictMode>
);
