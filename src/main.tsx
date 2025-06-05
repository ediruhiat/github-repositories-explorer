import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ScrollToTopButton } from "./components/ScrollToTopButton.tsx";
import GlobalContextProvider from "./contexts/GlobalContext.tsx";
import "./index.css";
import { queryClient } from "./lib/singleton.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <App />
        <ScrollToTopButton />
      </GlobalContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
