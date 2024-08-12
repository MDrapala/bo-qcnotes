import { Metadata } from "next"
import Layout from ".."
import BreadCrumbs from "@/components/BreadCrumb"
import { Button } from "@/components/Button"
import { useEffect, useState } from "react"
import { getEventList } from "@/lib/firebase/events"

const metadata: Metadata = {
  title: "Événements"
}

const Events = () => {
  const [eventsList, setEventsList] = useState<any[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)

  const loadEvents = async () => {
    const eventList = await getEventList(1000)
    setEventsList(eventList)
  }

  useEffect(() => {
    loadEvents().catch((err) => console.error(err))
  }, [])

  return (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/" name="home" active={false} />
          <BreadCrumbs url="/events" name="Événements" active={true} />
        </div>
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-3xl font-bold">Mes sorties scolaires</h1>
          <Button
            status="CREATE"
            variant={"default"}
            className="bg-indigo-400 hover:bg-indigo-600"
            onClick={() => setOpenModal(true)}
          >
            Créer une sortie
          </Button>
        </div>
        <div className="mt-10">
          {/* <Table
            refresh={() => loadEvents()}
            header={HEADER_EVENTS_ROW}
            rows={EventRows}
            dataT={EventsList}
          /> */}
        </div>
      </div>

      {/* <ModalCreateEvent
        openModal={openModal}
        setOpenModal={setOpenModal}
        loadEvents={() => loadEvents()}
      /> */}
    </Layout>
  )
}

export default Events
