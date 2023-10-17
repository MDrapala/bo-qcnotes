import { combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import sessionReducer from "@/redux/slices/session"

const appReducer = combineReducers({
  session: sessionReducer
})

const rootReducer: any = (state: RootState, action: any) => {
  if (action.type === "/") {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem(
      `persist:bo-qcnotes-${process.env.NEXT_PUBLIC_FBASE_PROJECT_ID}-root`
    )
    state = {} as RootState
  }
  return appReducer(state, action)
}

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
