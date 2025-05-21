import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import store from "../src/Redux/store.js";
import { Provider } from "react-redux";
import {HeroUIProvider} from '@heroui/react'
import {ToastProvider} from "@heroui/toast";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <HeroUIProvider>
    <ToastProvider />
      <App />

    </HeroUIProvider>
    </ClerkProvider>
  </Provider>
);
