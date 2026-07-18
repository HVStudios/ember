import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "@/app/App";
import "@/styles/global.css";
import { registerSW } from "virtual:pwa-register";
import { applyTheme, readSettings } from "@/lib/settings";

registerSW({ immediate: true });
applyTheme(readSettings().theme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
