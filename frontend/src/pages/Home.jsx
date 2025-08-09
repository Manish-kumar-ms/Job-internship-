import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const { serverUrl, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/job/getalljobs`, { withCredentials: true });
        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [serverUrl]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null); // Clear context user data
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {/* Top bar with Logout */}
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
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
