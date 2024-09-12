const express = require("express");
const { Projects } = require("../Models");
const verifyToken = require("./verifyToken");

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

// Get specific project
projectRouter.get("/:id", verifyToken, async (req, res) => {
    const projectId = req.params.id;
    const project = await Projects.findById(projectId).populate("client").exec();

    if (project) {
        return res.status(200).json({
            status: "Success",
            project: project
        })
    }

    res.status(404).json({
        status: "Failed",
        project: null
    })
});

// apply for project
projectRouter.post("/apply/:id", verifyToken, async (req, res) => {
    const freelancerId = req.id;
    const projectId = req.params.id;
    const { coverLetter } = req.body;
    const project = await Projects.findById(projectId);
    if (project) {
        project.applications.push({
            freelancer: freelancerId,
            coverLetter: coverLetter
        })
        await project.save();

        return res.status(200).json({
            status: "Success",
            project: project
        })
    }
});