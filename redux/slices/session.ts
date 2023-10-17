import { createSlice } from "@reduxjs/toolkit"
import { Session } from "@/types/Redux"
import { RootState } from "@/redux/reducer"

export const initialState: Session = {
  user: {
    displayName: "",
    email: "",
    photoURL: ""
  },
  error: ""
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    createSession: (state, action) => {
      const load = action.payload
      state.user.displayName = load.user.displayName
      state.user.email = load.user.email
      state.user.photoURL = load.user.photoURL
      state.error = load.error
    },
    revokeSession: (state) => {
      state.user.displayName = ""
      state.user.email = ""
      state.user.photoURL = ""
      state.error = ""
    }
  }
})

const { actions, reducer } = sessionSlice
export const { createSession, revokeSession } = actions
export default reducer

export const selectLoggedInUserDisplayName = ({ session }: RootState) =>
  session.user.displayName
