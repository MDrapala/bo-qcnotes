import { Metadata } from "next"
import Layout from ".."
import BreadCrumbs from "@/components/BreadCrumb"
import { useEffect, useState } from "react"
import { getQCNotesResponse } from "@/lib/firebase/qcNotesResponse"

const Dashboard = () => {
  const metadata: Metadata = {
    title: "Moyenne par Sortie Scolaire"
  }

  const [qcNotesResponse, setQcNotesResponse] = useState<any>([])
  const [eventAverages, setEventAverages] = useState<any>({})
  const [studentCount, setStudentCount] = useState<any>({})
  const [classCount, setClassCount] = useState<any>({})

  const loadQCNotesResponse = async () => {
    const response = await getQCNotesResponse()
    setQcNotesResponse(response)
    calculateEventAverages(response)
    calculateStudentAndClassCount(response)
  }

  const calculateEventAverages = (data: any) => {
    const events: any = {}

    data.forEach((item: any) => {
      const { eventId, totalScore } = item
      if (!events[eventId]) {
        events[eventId] = { totalScore: 0, count: 0 }
      }
      events[eventId].totalScore += totalScore
      events[eventId].count += 1
    })

    const averages: any = {}
    for (let eventId in events) {
      const eventData = events[eventId]
      averages[eventId] = eventData.totalScore / eventData.count
    }

    setEventAverages(averages)
  }

  const calculateStudentAndClassCount = (data: any) => {
    const eventStudents: any = {}
    const eventClasses: any = {}

    data.forEach((item: any) => {
      const { eventId, studentId } = item
      // Si la classe est disponible, tu peux l'ajouter ici. Pour l'exemple, supposons qu'on ait une classe "CM1"
      const studentClass = "CM1" // Remplace par la vraie classe si disponible dans les données

      // Nombre d'étudiants par événement
      if (!eventStudents[eventId]) {
        eventStudents[eventId] = new Set()
      }
      eventStudents[eventId].add(studentId)

      // Nombre de classes par événement
      if (!eventClasses[eventId]) {
        eventClasses[eventId] = new Set()
      }
      eventClasses[eventId].add(studentClass) // Ajoute la classe de l'étudiant à l'ensemble
    })

    // Compter les étudiants et les classes pour chaque événement
    const studentCounts: any = {}
    const classCounts: any = {}
    for (let eventId in eventStudents) {
      studentCounts[eventId] = eventStudents[eventId].size
      classCounts[eventId] = eventClasses[eventId].size
    }

    setStudentCount(studentCounts)
    setClassCount(classCounts)
  }

  useEffect(() => {
    loadQCNotesResponse().catch((e) => console.log(e))
  }, [])

  return (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/" name="home" active={false} />
          <BreadCrumbs url="/dashboard" name="Dashboard" active={true} />
        </div>

        <div className="flex flex-wrap mt-12">
          {/* Boucle pour afficher les moyennes, le nombre de classes et d'étudiants */}
          {Object.keys(eventAverages).map((eventId) => (
            <div
              key={eventId}
              className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4"
            >
              <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                        Événement: {eventId}
                      </h5>
                      <span className="font-semibold text-xl text-blueGray-700">
                        Moyenne: {eventAverages[eventId].toFixed(2)}/20
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500">
                        <i className="fas fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-blueGray-400 mt-4">
                    <span className="whitespace-nowrap">
                      Moyenne de classe pour cet événement
                    </span>
                  </p>
                  <p className="text-sm text-blueGray-400 mt-4">
                    <span>Nombre d'étudiants: {studentCount[eventId]}</span>
                    <br />
                    <span>Nombre de classes: {classCount[eventId]}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
