import { Provider } from "react-redux";
import {store} from "../store/index"; // Adjust path
import '../styles/globals.css' // <-- updated path
import "../src/components/MobileMenu/style.css";
import "../src/components/scrollbar/style.css";

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}