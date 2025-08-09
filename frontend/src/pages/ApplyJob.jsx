// ApplyJob.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const serverUrl = "http://localhost:8000";

export default function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  // Fetch current user details
  useEffect(() => {
    axios
      .get(`${serverUrl}/api/auth/currentuser`, { withCredentials: true })
      .then((res) => {
        if (res.data && res.data.user) {
          setFormData((prev) => ({
            ...prev,
            name: res.data.user.name || "",
            email: res.data.user.email || ""
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load user details.");
      });
  }, []);

  // Handle form change
  const handleChange = (e) => {
    if (e.target.name === "resume") {
      const file = e.target.files[0];
      if (file && file.type === "image/jpeg") {
        setFormData((prev) => ({ ...prev, resume: file }));
        setPreview(URL.createObjectURL(file));
      } else {
        setError("Please upload a JPG file.");
        setFormData((prev) => ({ ...prev, resume: null }));
        setPreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("resume", formData.resume);

    try {
      await axios.post(`${serverUrl}/api/job/applyjob/${id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate("/"); // Redirect to homepage
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error applying for job");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Apply for Job
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload Resume (JPG only)
            </label>
            <input
              type="file"
              name="resume"
              accept=".jpg"
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div>
              <p className="text-gray-600 text-sm mb-2">Preview:</p>
              <img
                src={preview}
                alt="Resume Preview"
                className="w-full rounded-lg border"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Apply Now
          </button>
        </form>
      </div>
    </div>
  );
}
