import { Head, Html, Main, NextScript } from "next/document"

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-sans">
        <div id="root" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
