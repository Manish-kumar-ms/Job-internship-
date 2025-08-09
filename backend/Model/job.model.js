
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    jobtitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    application: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'applyModel'
    }],
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Job = mongoose.model('Job', jobSchema);

export default Job;