import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  applications: [],
  currentApplication: null,
  loading: false,
  error: null,
  submitSuccess: false,
}

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setCurrentApplication: (state, action) => {
      state.currentApplication = action.payload
    },
    submitApplication: (state, action) => {
      const newApplication = {
        id: Date.now(),
        internshipId: action.payload.internshipId,
        ...action.payload.formData,
        submittedAt: new Date().toISOString(),
        status: "submitted",
      }
      state.applications.push(newApplication)
      state.submitSuccess = true
    },
    clearSubmitSuccess: (state) => {
      state.submitSuccess = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setCurrentApplication, submitApplication, clearSubmitSuccess, setLoading, setError } =
  applicationSlice.actions

export default applicationSlice.reducer
