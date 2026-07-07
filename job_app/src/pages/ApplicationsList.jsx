import { useNavigate } from "react-router-dom";
import { useJobs } from "../context/JobContext";
function ApplicationsList() {
  const { initialJobs } = useJobs();
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("add");
  };

  const statusStyles = {
    Applied: "bg-amber-100 text-amber-700",
    Interview_Scheduled: "bg-sky-100 text-sky-700",
    Offer_Received: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-rose-100 text-rose-700",
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex-items-center justify-between mb-8">
        <h1 className="text-4xl font-bold app-font text-zinc-600">
          Job Tracker
        </h1>
        <div>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            +Add Job
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-zinc-500">
            List of Applied Jobs
          </h2>
        </div>
        <ul className="space-y-4">
          {console.log(initialJobs)}
          {initialJobs.map((job) => (
            <li
              key={job.id}
              className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-xl font-semibold">{job.company}</h3>
                <p className="text-slate-600">{job.role}</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    statusStyles[job.status]
                  }`}
                >
                  {job.status.replaceAll("_", " ")}
                </span>
              </div>

              <button
                onClick={() => navigate("jobs/" + job.id)}
                className="border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 transition"
              >
                Details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ApplicationsList;
