
import SocialMedia from '@/helpers/main-component/whatsApp'
import { Html, Head, Main, NextScript } from 'next/document'
// import { useState } from 'react';

export default function Document() {
   
  return (
    <Html lang="ar" className='w-screen' dir="rtl">
      <Head />
      <body>
        <Main />
        <NextScript />
        <SocialMedia />
      </body>
    </Html>
  )
}