import { cx } from "class-variance-authority"
import { Metadata } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import LayoutPage from "@/pages"
import BreadCrumbs from "@/components/BreadCrumb"
import { Button } from "@/components/Button"
import Loading from "@/components/loading"
import { toastNotification } from "@/components/toast"
import Table from "@/components/Tables"
import { HEADER_CLASSES_ROW } from "@/constants/tables"
import {
  deleteEtablishement,
  getClassesByEtablishementId,
  getEtablishementById
} from "@/lib/firebase/etablishements"

import { useForm } from "react-hook-form"
import ClassesRows from "@/components/Rows/classes"
import CreateClasse from "@/pages/classes/modal/create"

const EtablishementDetailsPage = () => {
  const router = useRouter()
  const etablishementId = router.query.id as string

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openModalClasse, setOpenModalClasse] = useState<boolean>(false)
  const [etablishement, setEtablishement] = useState<any>()
  const [classeList, setClasseList] = useState<any>([])
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: etablishement })

  const metadata: Metadata = {
    title: `${etablishement?.name || ""}`
  }

  const loadClassesByEtablishementId = async (etablishementId: string) => {
    const classeList = await getClassesByEtablishementId(etablishementId)
    setClasseList(classeList)
  }

  const loadEtablishementById = async (etablishementId: string) => {
    const etablishement = await getEtablishementById(etablishementId)
    setEtablishement(etablishement)
  }

  const handleDeleteEtablishement = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette établissement ?")) {
      await deleteEtablishement(etablishementId, { deleted_at: new Date() })
      toastNotification(`L'établissement a été supprimée ${etablishementId}`, {
        type: "success"
      })
    }
  }

  useEffect(() => {
    loadEtablishementById(etablishementId).catch((err) => console.error(err))
    loadClassesByEtablishementId(etablishementId).catch((err) =>
      console.error(err)
    )
  }, [etablishementId])

  // useEffect(() => {
  //   reset(etablishement)
  // }, [etablishement])

  return etablishement ? (
    <LayoutPage props={metadata}>
      <div className="w-full md:mx-12">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
          <div className={cx("flex flex-col w-full")}>
            <div className={cx("flex flex-row items-center gap-4", "mt-5")}>
              <BreadCrumbs url="/" name="home" active={true} />
              <BreadCrumbs
                url="/etablishements"
                name="Mes établissements"
                active={true}
              />
              <BreadCrumbs
                url={`/etablishements/${etablishement.name}`}
                name={`${etablishement.name}`}
                active={false}
              />
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <div className={`px-2 py-1 rounded-xl w-full`}>
                <div className="mt-12">
                  <div className="mb-12">
                    <h3 className="font-bold text-2xl">{etablishement.name}</h3>
                    <span>{etablishement.type}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl w-full">
                <div className="flex items-center justify-end gap-4 sticky">
                  <Button
                    variant="default"
                    status="EDIT"
                    className="bg-indigo-500 hover:bg-indigo-700"
                    onClick={() => setOpenModal(true)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="default"
                    status="DELETE"
                    className="bg-red-500 hover:bg-red-700"
                    onClick={() => handleDeleteEtablishement()}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 mb-12">
          <div className="flex justify-end my-12 w-full">
            <Button
              status="CREATE"
              variant="default"
              className="bg-indigo-400 hover:bg-indigo-600"
              onClick={() => setOpenModalClasse(true)}
            >
              Ajouter une classe
            </Button>
          </div>
          <Table
            refresh={() => {}}
            header={HEADER_CLASSES_ROW}
            rows={ClassesRows}
            dataT={classeList}
          />
        </div>
      </div>

      {/* <UpdateEtablishement
        openModal={openModal}
        setOpenModal={setOpenModal}
        register={register}
        refresh={loadEtablishementById}
        handleSubmit={handleSubmit}
        errors={errors}
      /> */}

      <CreateClasse
        openModal={openModalClasse}
        setOpenModal={setOpenModalClasse}
        etablishement={etablishement}
        refresh={loadClassesByEtablishementId}
      />
    </LayoutPage>
  ) : (
    <Loading />
  )
}

export default EtablishementDetailsPage
