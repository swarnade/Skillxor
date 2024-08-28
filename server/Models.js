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
const Freelancer1 = mongoose.Schema({
    _id: {type:String},
    Name: {type:String},
    MobileNumber: {type:String},
    Email: {type:String},
    Password: {type:String},
});
// Rest of the things will be added later


// Freelancer Model
const Freelancer = mongoose.model('Freelancers', Freelancer1);

module.exports = {
    Freelancer:Freelancer,
};