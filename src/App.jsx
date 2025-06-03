import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/store"
import Navbar from "./components/Navbar"
import LandingPage from "./pages/LandingPage"
import InternshipListing from "./pages/InternshipListing"
import InternshipDetail from "./pages/InternshipDetail"
import ApplicationForm from "./pages/ApplicationForm"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/internships" element={<InternshipListing />} />
            <Route path="/internship/:id" element={<InternshipDetail />} />
            <Route path="/apply/:id" element={<ApplicationForm />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
