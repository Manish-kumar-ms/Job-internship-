import express  from 'express'
import { applyjob, createJob, deleteJob, editjob, getAllJobs, getJobById } from '../controller/job.controller.js';
import { ensureAuthenticated } from '../middleware/Auth.js';
import upload from '../middleware/multer.js';

const router = express.Router();



router.post('/createjob', ensureAuthenticated, createJob);
router.put('/editjob/:id', ensureAuthenticated, editjob)
router.get('/getalljobs', ensureAuthenticated, getAllJobs);
router.delete("/deletejob/:id", ensureAuthenticated, deleteJob);
router.post('/applyjob/:id', ensureAuthenticated, upload.single("resume") ,applyjob);
router.get("/getjobById/:id", ensureAuthenticated, getJobById);
export default router;