import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./i18n.ts";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={"loading"}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>,
);
