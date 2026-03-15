import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import { applyToProject, getApplicationsForProject, getMyApplications, updateApplicationStatus } from '../controllers/applicationController.js'

const router = express.Router()

router.post("/", protect, applyToProject)
router.get("/project/:id", protect, getApplicationsForProject)
router.get("/me", protect, getMyApplications)
router.put("/:id", protect, updateApplicationStatus)

export default router