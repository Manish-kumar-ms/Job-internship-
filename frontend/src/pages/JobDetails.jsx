import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const { serverUrl, userData } = useContext(UserDataContext); // assuming you store logged-in user here

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/job/getjobById/${id}`, {
          withCredentials: true,
        });
        setJob(res.data.job); // Access the "job" key in the response
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJob();
  }, [id, serverUrl]);

  // Handle delete job
  const handleDelete = async () => {
    try {
      await axios.delete(`${serverUrl}/api/job/deletejob/${id}`, {
        withCredentials: true,
      });
      alert("Job deleted successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Handle edit job
  const handleEdit = () => {
    navigate(`/editjob/${id}`);
  };

  // Handle apply job
  const handleApply = () => {
    navigate(`/applyjob/${id}`);
  };

  if (!job) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading job details...
      </p>
    );
  }

  const isOwner = userData?._id === job.createdby?._id; // check if current user created this job

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{job.jobtitle}</h2>
        <p className="text-gray-600 font-medium">{job.company}</p>
        <p className="text-gray-500">{job.location}</p>
        <p className="mt-4 text-gray-700">{job.description}</p>
        <p className="mt-3 font-semibold text-gray-800">
          Salary: ₹{job.salary}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Posted by: <span className="font-medium">{job.createdby?.name}</span>
        </p>

        <div className="mt-6 flex space-x-4">
          {/* Show Edit/Delete only if user is the job creator */}
          {isOwner && (
            <>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </>
          )}

          {/* Always show Apply button */}
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Apply Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
