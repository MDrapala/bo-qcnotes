import { Metadata } from "next"
import Layout from ".."
import BreadCrumbs from "@/components/BreadCrumb"
import { useForm } from "react-hook-form"
import { toastNotification } from "@/components/toast"
import { useRouter } from "next/router"
import { Button } from "@/components/Button"
import { addQCNotes, getQCNotesList } from "@/lib/firebase/qcNotes"
import { useEffect, useState } from "react"
import { getClasseList } from "@/lib/firebase/classes"
import FormSelect from "@/components/Inputs/select"

const metadata: Metadata = {
  title: "Créer une sortie"
}

const CreateEvents = () => {
  const router = useRouter()
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
  } = useForm<any>({
    defaultValues: {
      title: "",
      groups: [
        {
          name: "",
          classes: [],
          qcnotes: []
        }
      ],
      created_at: new Date()
    }
  })
  const watchFields = watch()
  const points = watchFields.groups
    .map((question: any) => question.points)
    .reduce((accumulator: number, current: number) => accumulator + current)

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

    reset(getValues())
  }

  const removeGroup = (questionIndex: number) => {
    const updatedQuestions = [...getValues().groups]
    updatedQuestions.splice(questionIndex, 1)
    setValue("groups", updatedQuestions)
    reset(getValues())
  }

  const onSubmit = async (data: any) => {
    const QCNotes: any = await addQCNotes(data)
    if (QCNotes) {
      toastNotification(`Création réussie de ${watchFields.title}`, {
        type: "success"
      })
      router.push(`/qcnotes/`)
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

  useEffect(() => {
    loadClasses().catch((err) => console.error(err))
    loadQCNotes().catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    points > watchFields?.note &&
      toastNotification(
        `La somme des points ne peut pas dépasser ${watchFields?.note}`,
        { type: "error" }
      )
  }, [points])

  return (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/" name="home" active={false} />
          <BreadCrumbs url="/events" name="Événements" active={true} />
          <BreadCrumbs
            url="/events/create"
            name="Créer une sortie"
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
              disabled={points >= watchFields?.note}
            >
              Nouveau groupe
            </Button>
            <Button
              status="CREATE"
              variant="default"
              onClick={handleSubmit(onSubmit)}
              className="bg-indigo-700 hover:bg-indigo-900"
            >
              Créer
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
          {getValues()?.groups?.map((groupData: any, groupIndex: number) => (
            <div
              key={groupIndex}
              className="mb-8"
              id={
                groupIndex === getValues().groups.length - 1
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
                      isMulti={true}
                      isClearable={false}
                      isCreatableSelect={true}
                      getValues={getValues}
                      stateRegister={`groups[${groupIndex}].classes`}
                      className="w-full mt-4"
                      options={classesList.map((classe: any) => ({
                        label: `[${classe.name}] ${classe.students.length} élèves - ${classe.etablishement.name}`,
                        value: classe.id
                      }))}
                    />

                    <FormSelect
                      label="QCNotes"
                      isMulti
                      stateRegister={`groups[${groupIndex}].qcnotes`}
                      setValue={setValue}
                      getValues={getValues}
                      className="w-full mt-4"
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
                      onClick={() => removeGroup(groupIndex)}
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

export default CreateEvents
