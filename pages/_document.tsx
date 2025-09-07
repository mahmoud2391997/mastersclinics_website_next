import SocialMedia from '@/helpers/main-component/whatsApp'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ar" dir="rtl" className="w-screen">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Masters Clinics</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/dEYvd/lBmMUm3zZyt94KtrsYYdL6UrUEOoncu4UJnK9VhR.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <SocialMedia />
      </body>
    </Html>
  )
}
