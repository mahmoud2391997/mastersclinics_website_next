import React, { useEffect } from 'react';
import AllRoute from '../router'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const App = () => { 
  const { i18n } = useTranslation()

  useEffect(() => {
    // Set initial direction based on language
    const currentLanguage = i18n.language || "en"
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = currentLanguage

    // Add RTL class to body if needed
    if (currentLanguage === "ar") {
      document.body.classList.add("rtl")
    } else {
      document.body.classList.remove("rtl")
    }
  }, [i18n.language])
  return (
    <div className="App" id='scrool'>
          <AllRoute/>
          <ToastContainer/>
    </div>
  );
}

export default App;