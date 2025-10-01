import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { persistor, store } from './store/index.js'
import { PersistGate } from 'redux-persist/integration/react'
import { CartProvider } from './pages/cartsPage/CartCountContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ChakraProvider>
    </PersistGate>
  </Provider>
)
