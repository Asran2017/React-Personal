import { BrowserRouter, Routes, Route } from "react-router";
import { JobProvider } from "./context/jobcontext";
import ApplicationsList from "./pages/ApplicationsList";

function App() {
  return (
    <div>
      <JobProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<ApplicationsList />} />
          </Routes>
        </BrowserRouter>
      </JobProvider>
    </div>
  );
}

export default App;
