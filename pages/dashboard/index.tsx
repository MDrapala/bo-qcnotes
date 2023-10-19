import { Metadata } from "next"
import Layout from ".."
import BreadCrumbs from "@/components/BreadCrumb"

const Dashboard = () => {
  const metadata: Metadata = {
    title: "Stats"
  }

  return (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/" name="home" active={false} />
          <BreadCrumbs url="/dashboard" name="Dashboard" active={true} />
        </div>
        {/* TODO: Create components card */}
        <div className="flex flex-wrap mt-12">
          <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                      Classes: CM1
                    </h5>
                    <span className="font-semibold text-xl text-blueGray-700">
                      Moyenne: 0/20
                    </span>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                      <i className="fas fa-chart-bar"></i>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-blueGray-400 mt-4">
                  <span className="text-emerald-500 mr-2">
                    <i className="fas fa-arrow-up"></i> 2,99%{" "}
                  </span>
                  <span className="whitespace-nowrap">
                    {" "}
                    réussite par rapport au dernier qc-notes
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
