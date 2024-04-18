import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./i18n.ts";
import PageLoader from "./components/UI/PageLoader.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS>
        <Suspense fallback={<PageLoader />}>
          <App />
        </Suspense>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
