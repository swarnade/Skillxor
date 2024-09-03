require('dotenv').config();
const mongoose = require("mongoose");
const { object } = require('zod');
const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_SERVER}/SIH2024?retryWrites=true&w=majority&appName=SSP`;
mongoose.connect(URL);
const db = mongoose.connection;
db.on('error',(error) => {
    console.log('MongoDB connection error:');
});
db.once('open',() => {
    console.log('Connected to MongoDB database.');
});


// Freelancer Schema
const Freelancer = mongoose.Schema({
    _id: {
        type:String,
    },
    Username: {
        type:String,
        maxLength: 30,
    },
    Log: {
        type:String,
    },
    Name: {
        type:String,
        required:true,
    },
    Mobile_Number: {
        type:String,
        required:true,
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    Password: {
        type: String,
        required: true,
    },
    Bio: {
        type: String,
        default:"",
    },
    Country: {
        type: String,
        default:"India",
    },
    createdAt: {
        type: Date,
    },
    gig:{
        type:Object
    }
});








// Client Schema
const Client = mongoose.Schema({
    firstName: {
        type: String,
        maxLength: 30,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        maxLength: 30,
        trim: true,
        required: true
    },
    mobileNumber: {
        type: String,
        maxLength: 30,
        trim: true,
        required: true
    },
    country: {
        type: String,
        maxLength: 30,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        unique: true,
        maxLength: 30,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    bio: {
        type: String,
        maxLength: 200
    },
    profilePicture: {
        type: String
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    }]
});

const ProjectSchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clients',
        required: true
    },
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    status: {
        type: String, 
        enum: ['open', 'in_progress', 'completed', 'cancelled'], 
        default: 'open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// All Models
const Freelancers = mongoose.model('Users', Freelancer);
const Clients = mongoose.model('Clients', Client);
const Projects = mongoose.model('Projects', ProjectSchema);

module.exports = {
    Freelancers:Freelancers,
    Clients:Clients,
    Projects:Projects
};
