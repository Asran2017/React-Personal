import { useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../context/JobContext";

function JobDetails() {
  const statusStyles = {
    Applied: "bg-amber-100 text-amber-700",
    Interview_Scheduled: "bg-sky-100 text-sky-700",
    Offer_Received: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-rose-100 text-rose-700",
  };
  const { id } = useParams();

  const navigate = useNavigate();

  const { initialJobs, dispatch } = useJobs();

  const selectedJob = initialJobs.find((job) => job.id === +id);

  function handleEdit() {
    navigate(`/edit/${id}`);
  }
  function handleDelete(id) {
    dispatch({ type: "deleteJob", payload: id });
    navigate("/");
  }
  return (
    <div className="app-font flex min-h-screen justify-center bg-zinc-100 p-8">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-zinc-900">
          {selectedJob.company}
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-zinc-500">Role</p>
            <p className="font-medium">{selectedJob.role}</p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">Status</p>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                statusStyles[selectedJob.status]
              }`}
            >
              {selectedJob.status.replaceAll("_", " ")}
            </span>
          </div>

          <div>
            <p className="text-sm text-zinc-500">Applied On</p>
            <p>{selectedJob.dateApplied}</p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">Contact</p>
            <p>{selectedJob.contact}</p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">Notes</p>
            <p className="leading-7">{selectedJob.description}</p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={handleEdit}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-white transition hover:bg-indigo-700"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(selectedJob.id)}
            className="rounded-lg bg-rose-600 px-5 py-2.5 text-white transition hover:bg-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
