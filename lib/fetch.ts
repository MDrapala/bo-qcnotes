type FetchProps<T> = {
  firebaseFunctions: () => Promise<T>
  setLoading: (loading: boolean) => void
}

export const fetchRequest = async <T>({
  firebaseFunctions,
  setLoading
}: FetchProps<T>): Promise<T | void> => {
  try {
    setLoading(true) // Activer l'état de chargement

    const response = await firebaseFunctions() // Attendre la réponse
    console.log({ response })

    return response
  } catch (error) {
    console.error({ error })
  } finally {
    setLoading(false) // Désactiver l'état de chargement
  }
}
