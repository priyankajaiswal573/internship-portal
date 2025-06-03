import { configureStore } from "@reduxjs/toolkit"
import internshipSlice from "./slices/internshipSlice"
import applicationSlice from "./slices/applicationSlice"

export const store = configureStore({
  reducer: {
    internships: internshipSlice,
    applications: applicationSlice,
  },
})
