# 📌 Job Board App - Full Stack

A **MERN Stack** application for posting and applying to jobs.  
It features **role-based access**, **JWT authentication**, **Context API** for state management, and **Multer + Cloudinary** for resume uploads.

---

## 🌐 Live Demo

- **Frontend**: [https://job-internship-frontend.onrender.com](https://job-internship-frontend.onrender.com)  
- **Backend**: [https://job-internship-project.onrender.com](https://job-internship-project.onrender.com)

## 🚀 Features

### 👨‍💼 Roles
- **Admin**
  - Create jobs
  - Edit and delete own jobs
- **User**
  - View jobs
  - Apply to jobs (once per job)
  - Upload resume (JPG format)

### 💡 Highlights
- JWT authentication (stored in HTTP-only cookies)
- Role-based access control
- Context API for global state management
- Resume upload with **Multer** and **Cloudinary**
- Tailwind CSS for responsive, modern UI
- Prevents duplicate job applications

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- React Router DOM
- Context API
- Axios
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- Multer
- Cloudinary

---

## 📂 Folder Structure

/client
/src
/components
/pages
/context
App.jsx
index.js

/server
/controllers
/models
/routes
/middleware
server.js


---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login` | Login user |
| GET    | `/api/auth/currentuser` | Get current logged-in user |

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/job/createjob` | Create a job (Admin only) |
| GET    | `/api/job/getjobById/:id` | Get job details |
| DELETE | `/api/job/deletejob/:id` | Delete a job (Owner only) |
| PUT    | `/api/job/editjob/:id` | Edit a job (Owner only) |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/job/applyjob/:id` | Apply for a job with resume |

---

## ⚙️ Installation & Setup

# Backend
cd server
npm install

# Frontend
cd ../client
npm install

Setup environment variables
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

DEMO login
email:m@gmail.com
password:1234

