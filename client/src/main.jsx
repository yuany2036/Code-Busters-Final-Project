import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { useContext } from "react";
import { DataContextProvider } from "./data/context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </React.StrictMode>
);
