import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import rootReducer from "@/redux/reducer"

//Configure Persist
const persistConfig = {
  key: `flim-back-office-${process.env.NEXT_PUBLIC_FBASE_PROJECT_ID}-root`,
  storage,
  // blacklist: ["user"], //blacklisting a store attribute name, will not persist that store attribute.
  throttle: 500,
  version: 1,
  blacklist: ["table"]
}

//Add persist for all reducers
const persistedReducer = persistReducer(persistConfig, rootReducer)

//Configure Store
const store = configureStore({
  //Init Reducer in store
  reducer: persistedReducer,
  //Configure by Default Middleware
  middleware: [thunk]
  // .concat(logger),
})

export default store
export const persistor = persistStore(store)
