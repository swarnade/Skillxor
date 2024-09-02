const express = require("express");
const { Projects } = require("../Models");

const projectRouter = express.Router();
module.exports = projectRouter;


// Get all projects(not protected)
projectRouter.get("/", async (req, res) => {
    const projects = await Projects.find({}).populate("client").exec();
    if (projects) {
        return res.status(200).json({
            status: "Success",
            projects: projects
        })
    }
    res.status(404).json({
        status: "Failed",
        projects: null
    })
});