
import Job from "../Model/job.model.js";
import User from "../Model/user.model.js";
import { uploadOnCloudinary } from "../config/Cloudinary.js";
import applyModel from "../Model/apply.model.js";


export const createJob = async (req, res) => {
     try {

        const user=await User.findById(req.user._id);

        if(user.role !== 'Admin') {
            return res.status(403).json({ message: "only Admin can create jobs" });
        }

        // Create job logic here
        const { jobtitle, description, company, location,salary }=req.body;

        if(!jobtitle || !description || !company || !location || !salary) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const job = await Job.create({
            jobtitle,
            description,
            company,
            location,
            salary,
            createdby: req.user._id
        });

        return res.status(201).json({ message: "Job created successfully", job });

     } catch (error) {
        return res.status(500).json({ message: "error creating job" , error: error.message });
     }
      
}


export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        return res.status(200).json({ message: "Jobs fetched successfully", jobs });
    } catch (error) {
        return res.status(500).json({ message: "error fetching jobs", error });
    }
}

export const editjob=async(req,res)=>{


    try {
        const job=await Job.findById(req.params.id);

        if(!job) {
            return res.status(404).json({ message: "Job not found" });

        }

        // only allow the creator to edit the job
        if(job.createdby.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to edit this job" });
        }

        // Only update the fields that are present in req.body
        job.set(req.body);

        await job.save();

        return res.status(200).json({ message: "Job updated successfully", job });

    } catch (error) {
        return res.status(500).json({ message: "error updating job", error });
    }
}



export const deleteJob = async (req, res) => {
    try {

        const job= await Job.findById(req.params.id)
        if(!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // only allow the creator to delete the job
        if(job.createdby.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this job" });
        }

        await Job.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Job deleted successfully",job });

    } catch (error) {
        return res.status(500).json({ message: "error deleting job", error: error.message });
    }
}


export const applyjob=async(req,res)=>{
    try {
        const jobId=req.params.id;

        const job=await Job.findById(jobId);

        const user=await User.findById(req.user._id);

    

        const {name,email}=req.body;

        if( !name || !email || !req.file) {
            return res.status(400).json({ message: "All fields are required" });
        }

      const alreadyapplied = await applyModel.findOne({  jobId: job._id, userId: user._id });

        if (alreadyapplied) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        // Upload resume to Cloudinary
      const resumeUrl = await uploadOnCloudinary(req.file.path);

     if (!resumeUrl) {
      return res
        .status(500)
        .json({ message: "Failed to upload resume to Cloudinary" });
     }

        const application = await applyModel.create({
            name: user.name,
            email: user.email,
            resume: resumeUrl,
            jobId: job._id,
            userId: user._id
        });

        job.application.push(application._id);

        await job.save();

        return res.status(201).json({ message: "Application submitted successfully", application });

    } catch (error) {
        return res.status(500).json({ message: "error applying for job", error: error.message });
    }
}

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("createdby", "name email");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json({ message: "Job fetched successfully", job });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching job", error: error.message });
  }
};


