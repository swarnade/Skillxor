require('dotenv').config();
const mongoose = require("mongoose");
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
    _id: {type:String},
    Name: {type:String},
    Mobile_Number: {type:String},
    Email: {type:String},
    Password: {type:String},
});
// Rest of the things will be added later
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
        uniqe: true,
        maxLength: 30,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },

});

// Freelancer Model
const Freelancers = mongoose.model('Users', Freelancer);
const Clients = mongoose.model('Clients', Client);

module.exports = {
    Freelancers:Freelancers,
    Clients:Clients
};