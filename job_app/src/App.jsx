import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplicationsList from "./pages/ApplicationsList";
import JobForm from "./pages/JobForm";
import JobDetails from "./pages/JobDetails";
import { JobProvider } from "./context/JobContext";

function App() {
  return (
    <div className="min-h-screen bg-zinc-300">
      <JobProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<ApplicationsList />} />
            <Route path="add" element={<JobForm />} />
            <Route path="jobs/:id" element={<JobDetails />} />
            <Route path="/edit/:id" element={<JobForm />} />
          </Routes>
        </BrowserRouter>
      </JobProvider>
    </div>
  );
}

export default App;
