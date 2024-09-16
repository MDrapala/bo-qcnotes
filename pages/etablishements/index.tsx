import Layout from ".."
import BreadCrumbs from "@/components/BreadCrumb"
import Table from "@/components/Tables"
import { HEADER_ETABLISHEMENTS_ROW } from "@/constants/tables"
import EtablishementRows from "@/components/Rows/etablishements"
import { Button } from "@/components/Button"
import ModalCreateEtablishement from "./modal/create"
import { useEffect, useState } from "react"
import { getEtablishementList } from "@/lib/firebase/etablishements"
import { Metadata } from "next"
import { EtablishementWithId } from "@/types/firebase/Etablishement"
import { fetchRequest } from "@/lib/fetch"
import Loading from "@/components/loading"

const metadata: Metadata = {
  applicationName: "Établissements"
}

const Etablishements = () => {
  const [etablishementsList, setEtablishementsList] = useState<
    EtablishementWithId[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const loadEtablishements = async () => {
    const fetchResponse = await fetchRequest({
      firebaseFunctions: () => getEtablishementList(10), // Fonction Firebase simulée
      setLoading
    })

    if (fetchResponse) {
      setEtablishementsList(fetchResponse) // Mettre à jour la liste si des données sont reçues
    }
  }

  useEffect(() => {
    loadEtablishements()
  }, [])

  return (
    <Layout metadata={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/" name="home" active={false} />
          <BreadCrumbs
            url="/etablishements"
            name="Établissements"
            active={true}
          />
        </div>
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-3xl font-bold">Mes établissements</h1>
          <Button
            status="CREATE"
            variant={"default"}
            className="bg-indigo-400 hover:bg-indigo-600"
            onClick={() => setOpenModal(true)}
          >
            Ajouter un établissement
          </Button>
        </div>
        <div className="mt-10">
          {loading ? (
            <Loading />
          ) : (
            <Table
              refresh={loadEtablishements}
              header={HEADER_ETABLISHEMENTS_ROW}
              rows={EtablishementRows}
              dataT={etablishementsList}
            />
          )}
        </div>
      </div>

      <ModalCreateEtablishement
        openModal={openModal}
        setOpenModal={setOpenModal}
        loadEtablishements={() => loadEtablishements()}
      />
    </Layout>
  )
}

export default Etablishements
