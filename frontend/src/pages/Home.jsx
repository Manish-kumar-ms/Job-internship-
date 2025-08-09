import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/job/getalljobs", { withCredentials: true });
        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <div
            key={job._id}
            className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">{job.jobtitle}</h2>
            <p className="text-gray-600 mt-1"><strong>Company:</strong> {job.company}</p>
            <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
            <p className="text-green-600 font-medium"><strong>Salary:</strong> ₹{job.salary}</p>
            <Link to={`/details/${job._id}`}>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
