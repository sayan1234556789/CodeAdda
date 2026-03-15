import Project from "../models/Project.js";

export const createProject = async (req, res) => {
    try {
        const {title, description, budget, skillsRequired, deadline } = req.body

        const project = await Project.create({
            title,
            description,
            budget,
            skillsRequired,
            deadline,
            clientId: req.user
        })

        res.json(project)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


export const getprojects = async (req, res) => {
    try {
        const projects = await Project.find()
        .populate("clientId", "name email")

        res.json(projects)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        .populate("clientId", "name email")

        if(!project){
            res.status(404).json({
                message: "project not found"
            })
        }
        res.json(project)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        if(!project){
            return res.status(404).json({
                message: "project not found"
            })
        }
        
        if(project.clientId.toString() !== req.user){
            res.status(403).json({
                message: "not authorized!"
            })
        }

        Object.assign(project, req.body)

        const updatedProject = await project.save();

        res.json(updatedProject)
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)

        if(!project){
            return res.status(404).json({
                message: "project not found"
            })
        }

        if(project.clientId.toString() !== req.user) {
            res.status(403).json({message: "user is not authorized"})
        }

        await project.deleteOne()

        res.json({
            message: "project deleted"
        })

    } catch (error) {
        
    }
}