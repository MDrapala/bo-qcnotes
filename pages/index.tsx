import Head from "next/head"
import { Fragment, ReactNode } from "react"
import Header from "@/components/Header"
import { Metadata } from "next"
import { APPLICATION_NAME } from "@/constants/default"

type LayoutProps = {
  children: ReactNode
  metadata: Metadata
}

const LayoutPage = ({ children, metadata }: LayoutProps) => {
  const defineMetadata = metadata || {
    applicationName: APPLICATION_NAME
  }

  return (
    <Fragment>
      <Head>
        <title>{defineMetadata.applicationName}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <main>
        <div className="flex">
          <Header />
          {children}
        </div>
      </main>
    </Fragment>
  )
}

export default LayoutPage
