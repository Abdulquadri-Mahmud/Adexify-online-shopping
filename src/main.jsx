import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { persistor, store } from './store/index.js'
import { PersistGate } from 'redux-persist/integration/react'
import { CartProvider } from './Context_APIs/CartCountContext.jsx'
import { WishlistProvider } from './Context_APIs/WishlistCountContext.jsx'
import { ApiProvider } from './Context_APIs/ApiContext.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider>
        <CartProvider>
          <WishlistProvider>
            <ApiProvider>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </ApiProvider>
          </WishlistProvider>
        </CartProvider>
      </ChakraProvider>
    </PersistGate>
  </Provider>
)
