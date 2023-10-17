import { Metadata } from "next"
import Layout from "."

const Dashboard = () => {
  const metadata: Metadata = {
    title: "Stats"
  }

  return (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <h1>dashvoe</h1>
      </div>
    </Layout>
  )
}

export default Dashboard
