import { createContext, useContext, useEffect, useReducer } from "react";

const backupData = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer",
    status: "Applied",
    description:
      "Build responsive user interfaces using React and collaborate with designers to improve user experience.",
    contact: "Sarah Johnson (Recruiter)",
    dateApplied: "2026-06-15",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Software Engineer I",
    status: "Interview_Scheduled",
    description:
      "Develop scalable web applications and contribute to backend services using modern JavaScript frameworks.",
    contact: "Campus Hiring Team",
    dateApplied: "2026-06-18",
  },
  {
    id: 3,
    company: "Amazon",
    role: "Frontend Engineer",
    status: "Rejected",
    description:
      "Work on customer-facing e-commerce features with React and TypeScript while ensuring high performance.",
    contact: "Emily Davis",
    dateApplied: "2026-06-10",
  },
  {
    id: 4,
    company: "Zoho",
    role: "Web Developer",
    status: "Offer_Received",
    description:
      "Develop and maintain internal web applications with a focus on usability and performance.",
    contact: "HR Team",
    dateApplied: "2026-06-20",
  },
];
const JobContext = createContext();
const initialState = {
  initialJobs: JSON.parse(localStorage.getItem("jobsData")) || backupData,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "addJob": {
      return {
        ...state,
        initialJobs: [
          ...state.initialJobs,
          {
            id:
              state.initialJobs.reduce((acc, curr) => {
                acc = curr > acc ? curr : acc;
                return acc;
              }, 0) + 1,
            ...action.payload,
          },
        ],
      };
    }
    case "editJob": {
      console.log(action.payload.id);
      console.log(state.initialJobs.map((job) => job.id));
      return {
        ...state,
        initialJobs: state.initialJobs.map((job) =>
          job.id === action.payload.id ? action.payload : job,
        ),
      };
    }
    case "deleteJob": {
      return {
        ...state,
        initialJobs: state.initialJobs.filter(
          (job) => job.id !== action.payload,
        ),
      };
    }
    case "default":
      throw new Error("Undefined action type");
  }
};

const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { initialJobs } = state;

  useEffect(() => {
    const stateString = JSON.stringify(initialJobs);
    localStorage.setItem("jobsData", stateString);
  }, [initialJobs]);

  return (
    <JobContext.Provider value={{ initialJobs, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};
const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) throw new Error("Wrong usage of Job Context");
  return context;
};
// eslint-disable-next-line react-refresh/only-export-components
export { JobProvider, useJobs };
