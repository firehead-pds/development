import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18n.ts';
import PageLoader from './components/UI/PageLoader.tsx';
import { Provider } from 'react-redux';
import { store } from './store.ts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS>
        <Suspense fallback={<PageLoader />}>
          <Provider store={store}>
            <App />
          </Provider>
        </Suspense>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
