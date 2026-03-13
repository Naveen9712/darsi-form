import { Routes, Route } from "react-router-dom"
import DarsiPoliticalSurvey from "./components/darsipoliticalsurvey"
import SurveyAdminPanel from "./components/surveyadminpanel"

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<DarsiPoliticalSurvey />} />
        <Route path="/admin" element={<SurveyAdminPanel />} />
      </Routes>
    </div>
  )
}

export default App
