import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./reducer"
import store from "./store"

import type { TypedUseSelectorHook } from "react-redux"
// Use throughout your app instead of plain `useDispatch` and `useSelector`
//UseDispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

//UseSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
