import React, { useContext } from 'react'
import Login from './pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import JobDetails from './pages/JobDetails'
import CreateJob from './pages/CreateJob'
import EditJob from './pages/EditJob'
import ApplyJob from './pages/ApplyJob'
import { UserDataContext } from './context/UserContext'

const App = () => {

   const  {userData, setUserData,loading} = useContext(UserDataContext);

   if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
   <Routes>
    <Route path="/" element={userData ? <Navigate to="/home" /> : <Navigate to="/login" />} />
    <Route path="/login" element={userData ? <Navigate to="/home" /> : <Login />} />

    <Route path="/home" element={ userData ? <Home /> : <Navigate to="/login" />} />
    <Route path="/signup" element={userData ? <Navigate to="/home" /> : <Signup />} />
    <Route path="/createjob" element={userData ? <CreateJob /> : <Navigate to="/login" />} />
    <Route path="/editjob/:id" element={userData ? <EditJob /> : <Navigate to="/login" />} />
    <Route path="/details/:id" element={userData ? <JobDetails /> : <Navigate to="/login" />} />
    <Route path="/applyjob/:id" element={userData ? <ApplyJob /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App