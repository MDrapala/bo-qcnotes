import { Metadata } from "next"
import Layout from ".."
import BreadCrumbs from "@/components/BreadCrumb"
import { Button } from "@/components/Button"
import QCNotesRows from "@/components/Rows/qcNotes"
import Table from "@/components/Tables"
import { HEADER_QCNOTES_ROW } from "@/constants/tables"
import { useEffect, useState } from "react"
import { getQCNotesList } from "@/lib/firebase/qcNotes"
import { useRouter } from "next/router"

const metadata: Metadata = {
  title: "QCNotes"
}

const QCNotes = () => {
  const router = useRouter()
  const [qcNotesList, setQCNotesList] = useState<any>([])

  const loadQCNotes = async () => {
    const qcNotesList = await getQCNotesList(1000)
    setQCNotesList(qcNotesList)
  }

  useEffect(() => {
    loadQCNotes().catch((err) => console.error(err))
  }, [])

  return (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/" name="home" active={false} />
          <BreadCrumbs url="/qcnotes" name="QCNotes" active={true} />
        </div>
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-3xl font-bold">Mes QCNotes</h1>
          <Button
            status="CREATE"
            variant={"default"}
            className="bg-indigo-400 hover:bg-indigo-600"
            onClick={() => router.push("/qcnotes/create")}
          >
            Créer un QCNote
          </Button>
        </div>
        <div className="mt-10">
          <Table
            refresh={loadQCNotes}
            header={HEADER_QCNOTES_ROW}
            rows={QCNotesRows}
            dataT={qcNotesList}
          />
        </div>
      </div>
    </Layout>
  )
}

export default QCNotes
