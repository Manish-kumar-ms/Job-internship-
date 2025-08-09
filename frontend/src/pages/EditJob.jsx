// src/pages/EditJob.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    jobtitle: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { serverUrl } = useContext(UserDataContext);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/job/getjobById/${id}`, {
          withCredentials: true, // since you use cookies
        });
        setFormData({
          jobtitle: res.data.job.jobtitle,
          description: res.data.job.description,
          company: res.data.job.company,
          location: res.data.job.location,
          salary: res.data.job.salary,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to load job details");
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${serverUrl}/api/job/editjob/${id}`, formData, {
        withCredentials: true,
      });
      navigate(location.state?.from || "/"); // go back to previous page or home
    } catch (err) {
      setError(err.response?.data?.message || "Error updating job");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Job</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="jobtitle"
          value={formData.jobtitle}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
