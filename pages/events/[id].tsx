import { Metadata } from "next"
import Layout from ".."
import BreadCrumbs from "@/components/BreadCrumb"
import { useForm } from "react-hook-form"
import { toastNotification } from "@/components/toast"
import { useRouter } from "next/router"
import { Button } from "@/components/Button"
import { useEffect, useState } from "react"
import FormSelect from "@/components/Inputs/select"
import { getEventById, UpdateEvent } from "@/lib/firebase/events"
import { getClasseList } from "@/lib/firebase/classes"
import { getQCNotesList } from "@/lib/firebase/qcNotes"

const UpdateEvents = () => {
  const router = useRouter()
  const eventId = router.query.id as string
  const [event, setEvent] = useState<any>()
  const [classesList, setClassesList] = useState([])
  const [qcNotesList, setQCNotesList] = useState([])
  const {
    getValues,
    setValue,
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const metadata: Metadata = {
    title: `${event?.title}`
  }

  const watchFields = watch()

  const addGroup = () => {
    setValue("groups", [
      ...getValues().groups,
      {
        name: "",
        classes: [],
        qcnotes: []
      }
    ])

    setTimeout(() => {
      const element = document.getElementById("target-section")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)

    reset(watchFields)
  }

  const removeEvent = (questionIndex: number) => {
    const updateEvents = [...watchFields.groups]
    updateEvents.splice(questionIndex, 1)
    setValue("groups", updateEvents)
    reset(watchFields)
  }

  const onSubmit = async (data: any) => {
    delete data.id

    const events: any = await UpdateEvent(eventId as string, {
      ...data,
      updated_at: new Date()
    })
    if (events) {
      toastNotification(`Création réussie de ${watchFields.title}`, {
        type: "success"
      })
      router.push(`/events/`)
    }
  }

  const loadClasses = async () => {
    const classe = await getClasseList(1000)
    setClassesList(classe)
  }
  const loadQCNotes = async () => {
    const qcNotes = await getQCNotesList(1000)
    setQCNotesList(qcNotes)
  }
  const loadEventsById = async (eventId: string) => {
    const event = await getEventById(eventId)
    setEvent(event)
  }

  useEffect(() => {
    loadEventsById(eventId).catch((err) => console.error(err))
    loadClasses().catch((err) => console.error(err))
    loadQCNotes().catch((err) => console.error(err))
  }, [eventId])

  useEffect(() => {
    reset(event)
  }, [event])

  return (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/" name="home" active={false} />
          <BreadCrumbs url="/events" name="Événements" active={true} />
          <BreadCrumbs
            url={`/events/${eventId}`}
            name="Mettre à jour une sortie"
            active={false}
          />
        </div>
        <div className="flex justify-between w-full mt-10 py-2 mb-10 px-4 sticky top-0 rounded-md bg-gray-100">
          <div className="flex items-center flex-row gap-4 mb-5">
            <div>
              <label
                htmlFor="title"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Titre de la sortie{" "}
                <i className="text-xs">(ce titre sera affiché au étudiants)</i>
                <span className="text-red-500">
                  {errors.title && <span>This field is required</span>}
                </span>
              </label>
              <input
                type="text"
                id="title"
                placeholder="Chateau de versailles"
                {...register("title", { required: true })}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="mb-5 gap-4 flex items-end">
            <Button
              status="CREATE"
              variant="default"
              onClick={addGroup}
              className={`bg-indigo-700 hover:bg-indigo-900`}
            >
              Nouveau groupe
            </Button>
            <Button
              status="EDIT"
              variant="default"
              onClick={handleSubmit(onSubmit)}
              className="bg-indigo-700 hover:bg-indigo-900"
            >
              Mettre à jour
            </Button>
            <Button
              status="SERVER_INDEX"
              variant="default"
              onClick={() => router.push("/events")}
              className="bg-indigo-400 hover:bg-indigo-600"
            >
              Mes sorties scolaires
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          {watchFields?.groups?.map((_: any, groupIndex: number) => (
            <div
              key={groupIndex}
              className="mb-8"
              id={
                groupIndex === watchFields.groups.length - 1
                  ? "target-section"
                  : ""
              }
            >
              <hr className="my-5" />
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col w-full">
                  <label className="flex mb-2 items-center justify-between">
                    <span className="flex items-center">
                      Groupe {groupIndex + 1}:
                    </span>
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    placeholder="Entrez le nom du groupe"
                    {...register(`groups[${groupIndex}].name`, {
                      required: true
                    })}
                  />
                  <div className="flex justify-between items-center gap-4">
                    <FormSelect
                      label="Classes"
                      setValue={setValue}
                      getValues={getValues}
                      stateRegister={`groups[${groupIndex}].classes`}
                      className="w-full mt-4"
                      value={classesList.map(
                        (classe: any) =>
                          classe.id ===
                            watchFields.groups[groupIndex].classes && {
                            label: `[${classe.name}] ${classe.students.length} élèves - ${classe.etablishement.name}`,
                            value: classe.id
                          }
                      )}
                      options={classesList.map((classe: any) => ({
                        label: `[${classe.name}] ${classe.students.length} élèves - ${classe.etablishement.name}`,
                        value: classe.id
                      }))}
                      watch={watch}
                    />
                    <FormSelect
                      label="QCNotes"
                      stateRegister={`groups[${groupIndex}].qcnotes`}
                      setValue={setValue}
                      watch={watch}
                      className="w-full mt-4"
                      value={qcNotesList.map(
                        (QCNotes: any) =>
                          QCNotes.id ===
                            watchFields.groups[groupIndex].qcnotes && {
                            label: `[${QCNotes.title}] questions: ${QCNotes.questions.length} - note: /${QCNotes.note}`,
                            value: QCNotes.id
                          }
                      )}
                      options={qcNotesList.map((QCNotes: any) => ({
                        label: `[${QCNotes.title}] questions: ${QCNotes.questions.length} - note: /${QCNotes.note}`,
                        value: QCNotes.id
                      }))}
                    />
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  {groupIndex !== 0 && (
                    <Button
                      status="DELETE"
                      className="bg-red-500 text-white"
                      onClick={() => removeEvent(groupIndex)}
                    >
                      Supprimer le groupe
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default UpdateEvents
