export const convertDateToString = (
  date: number | string | undefined | any
): string => {
  let newDate: Date

  if (!date) return ""

  if (typeof date === "string") {
    if (/^\d{2}\/\d{2}\/\d{4}/.test(date)) {
      return date
    }
    newDate = new Date(date)
  } else if (typeof date === "number") {
    // Check if the number is too large to be seconds and assumed to be milliseconds
    if (date > 9999999999) {
      newDate = new Date(date)
    } else {
      newDate = new Date(date * 1000)
    }
  } else if (date.seconds !== undefined && date.nanoseconds !== undefined) {
    newDate = new Date(date.seconds * 1000 + date.nanoseconds / 1000000)
  } else {
    return ""
  }

  const day = newDate.getDate().toString().padStart(2, "0")
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0")
  const year = newDate.getFullYear().toString()
  const hours = newDate.getHours().toString().padStart(2, "0")
  const minutes = newDate.getMinutes().toString().padStart(2, "0")
  const resultDate = `${day}/${month}/${year} ${hours}:${minutes}`
  return resultDate
}
