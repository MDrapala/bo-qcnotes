import { Metadata } from "next"
import Layout from ".."
import BreadCrumbs from "@/components/BreadCrumb"
import { useEffect, useState } from "react"
import { getQCNotesResponse } from "@/lib/firebase/qcNotesResponse"
import { getEventList } from "@/lib/firebase/events"
import { getEtablishementList } from "@/lib/firebase/etablishements"
import { getClasseList } from "@/lib/firebase/classes"
import { getStudentList } from "@/lib/firebase/students"
import { getQCNotesList } from "@/lib/firebase/qcNotes"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js"
import Loading from "@/components/loading"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Data = any // Define proper types if available

const Dashboard = () => {
  const metadata: Metadata = {
    title: "Moyenne par Sortie Scolaire"
  }

  const [data, setData] = useState<Data>(null)

  const loadQCNotesResponse = async () => {
    const events = await getEventList(1000)
    const etablishements = await getEtablishementList(1000)
    const classes = await getClasseList(1000)
    const students = await getStudentList(1000)
    const QCnotesResponse = await getQCNotesResponse()
    const QCnotesList = await getQCNotesList(1000)

    // Process data
    const processedData = {
      events,
      etablishements,
      classes,
      students,
      QCnotesResponse,
      QCnotesList
    }

    setData(processedData)
  }

  useEffect(() => {
    loadQCNotesResponse().catch((e) => console.log(e))
  }, [])

  if (!data) return <Loading />

  // Process data for charts
  const chartData = {
    labels: data.events.map((event: any) => event.title),
    datasets: [
      {
        label: "Moyenne des Classes",
        data: data.events.map((event: any) => {
          const responses = data.QCnotesResponse.filter(
            (res: any) => res.eventId === event.id
          )
          const totalScore = responses.reduce(
            (acc: number, res: any) => acc + res.totalScore,
            0
          )
          return totalScore / responses.length
        }),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  }

  // Calculate stats
  const getClassAverage = (classId: string) => {
    const responses = data.QCnotesResponse.filter(
      (res: any) => res.classId === classId
    )
    const totalScore = responses.reduce(
      (acc: number, res: any) => acc + res.totalScore,
      0
    )
    return (totalScore / responses.length).toFixed(2)
  }

  const totalResponses = data.QCnotesResponse.length
  const totalStudents = data.students.length
  const responseRate = ((totalResponses / totalStudents) * 100).toFixed(2)

  return (
    <Layout props={metadata}>
      <div className="w-full md:mx-12 p-6  min-h-screen">
        <div className="flex items-center gap-4 mb-8">
          <BreadCrumbs url="/" name="home" active={false} />
          <BreadCrumbs url="/dashboard" name="Dashboard" active={true} />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-gray-900">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              Moyenne des Classes par Sortie
            </h3>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top"
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        let label = context.dataset.label || ""
                        if (label) {
                          label += ": "
                        }
                        if (context.parsed.y !== null) {
                          label += `${context.parsed.y.toFixed(2)} points`
                        }
                        return label
                      }
                    }
                  }
                }
              }}
            />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              Total Réponses et Taux de Réponse
            </h3>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Total Réponses:</strong> {totalResponses}
                </p>
                <p>
                  <strong>Total Étudiants:</strong> {totalStudents}
                </p>
                <p>
                  <strong>Taux de Réponse:</strong> {responseRate}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Établissements</h3>
            <ul>
              {data.etablishements.map((etablissement: any) => (
                <li key={etablissement.id} className="border-b py-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{etablissement.name}</span>
                    <span className="text-sm text-gray-500">
                      {
                        data.students.filter(
                          (student: any) =>
                            student.etablishement.id === etablissement.id
                        ).length
                      }{" "}
                      étudiants
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Classes</h3>
            <ul>
              {data.classes.map((classe: any) => (
                <li key={classe.id} className="border-b py-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{classe.name}</span>
                    <span className="text-sm text-gray-500">
                      Moyenne: {getClassAverage(classe.id)} points
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Événements</h3>
            <ul>
              {data.events.map((event: any) => (
                <li key={event.id} className="border-b py-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{event.title}</span>
                    <span className="text-sm text-gray-500">
                      {
                        data.QCnotesResponse.filter(
                          (res: any) => res.eventId === event.id
                        ).length
                      }{" "}
                      réponses
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
