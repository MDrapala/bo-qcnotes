import Head from "next/head"
import { Fragment, ReactNode } from "react"
import Header from "@/components/Header"

type LayoutProps = {
  props: any
  children: ReactNode
}

const LayoutPage = ({ props, children }: LayoutProps) => {
  return (
    <Fragment>
      <Head>
        <title>{props?.title}</title>
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
