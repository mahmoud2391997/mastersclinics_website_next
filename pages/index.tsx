// src/components/YourComponent.tsx
'use client'
// Your component code with hooks
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {  persistor } from '../src/store/index'
import {store} from '../src/store/index'
import dynamic from 'next/dynamic'
import 'bootstrap/dist/css/bootstrap.min.css'

const ParallaxProvider = dynamic(
  () => import('react-scroll-parallax').then(mod => mod.ParallaxProvider),
  { ssr: false }
)

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window === 'undefined') return null // Prevent SSR issues

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ParallaxProvider>
          <Component {...pageProps} />
        </ParallaxProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp