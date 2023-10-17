interface PrivilegedUser {
  displayName: string
  email: string
  photoURL: string
}

export interface Session {
  user: PrivilegedUser
  error: string
}
