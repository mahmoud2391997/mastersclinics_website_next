import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Add your CSS files here */}
        <link rel="stylesheet" href="/styles/themify-icons.css" />
        <link rel="stylesheet" href="/styles/animate.css" />
        <link rel="stylesheet" href="/styles/flaticon_medically.css" />
        {/* Bootstrap */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}