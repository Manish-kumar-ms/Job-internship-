import React from 'react'
import Login from './pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import JobDetails from './pages/JobDetails'
import CreateJob from './pages/CreateJob'
import EditJob from './pages/EditJob'
import ApplyJob from './pages/ApplyJob'

const App = () => {
  return (
   <Routes>
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="/login" element={<Login />} />

    <Route path="/home" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/createjob" element={<CreateJob />} />
    <Route path="/editjob/:id" element={<EditJob />} />
    <Route path="/details/:id" element={<JobDetails />} />
    <Route path="/applyjob/:id" element={<ApplyJob />} />
    </Routes>
  )
}

export default App