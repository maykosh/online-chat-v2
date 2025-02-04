import React from "react";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppProvider from "./App";

const rootDiv = document.getElementById("root");
if (!rootDiv) throw new Error("render error");

const root = ReactDOM.createRoot(rootDiv);

root.render(<AppProvider />);

reportWebVitals();
