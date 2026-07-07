/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useJobs } from "../context/JobContext";
import { useNavigate, useParams } from "react-router-dom";
const today = new Date().toISOString().slice(0, 10);
function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Interview_Scheduled");
  const [dateApplied, setDate] = useState(today);
  const [contact, setContactPerson] = useState("");
  const [description, setJobDescription] = useState("");
  const { dispatch, initialJobs } = useJobs();
  const editingJob = initialJobs.find((job) => job.id === +id);
  function handleSubmit(e) {
    e.preventDefault();
    console.log("editing");
    const newJob = {
      company,
      role,
      status,
      dateApplied,
      contact,
      description,
    };
    if (editingJob) {
      console.log("Editing...");
      dispatch({ type: "editJob", payload: { ...newJob, id: +id } });
      navigate("/");
    } else {
      dispatch({ type: "addJob", payload: newJob });
      navigate("/");
    }
  }
  useEffect(() => {
    if (editingJob) {
      setCompany(editingJob.company);
      setContactPerson(editingJob.contact);
      setDate(editingJob.dateApplied);
      setStatus(editingJob.status);
      setJobDescription(editingJob.description);
      setRole(editingJob.role);
    }
  }, [editingJob]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-8">
      <form
        className="w-full max-w-2xl space-y-6 rounded-2xl bg-white p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-2 text-3xl font-bold text-zinc-900">Job Form</h1>
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-zinc-700"
            htmlFor="company"
          >
            Company
          </label>
          <input
            className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            id="company"
            type="text"
            name="company"
            placeholder="e.g. Google"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-zinc-700"
            htmlFor="role"
          >
            Role
          </label>
          <input
            className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            id="role"
            type="text"
            name="role"
            placeholder="e.g. Frontend Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-zinc-700"
            htmlFor="status"
          >
            Status
          </label>
          <select
            className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Interview_Scheduled">Interview_Scheduled</option>
            <option value="Offer_Received">Offer_Received</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-zinc-700"
            htmlFor="contact"
          >
            Contact Person
          </label>
          <input
            className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            id="contact"
            type="text"
            name="contact"
            placeholder="Recruiter or Hiring Team"
            value={contact}
            onChange={(e) => setContactPerson(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-zinc-700"
            htmlFor="dateApplied"
          >
            Date Applied
          </label>
          <input
            className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            id="dateApplied"
            type="date"
            name="dateApplied"
            value={dateApplied}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-zinc-700"
            htmlFor="description"
          >
            Job Description / Notes
          </label>
          <textarea
            className="w-full resize-none rounded-lg border border-zinc-300 px-4 py-3 transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            id="description"
            name="description"
            rows="5"
            placeholder="Add notes about the role..."
            value={description}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <button
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
          type="submit"
        >
          {editingJob ? "Save Edit" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default JobForm;
