const express = require('express')
const Router = express.Router()
const jobsController = require('./jobs.controller')
const auth = require('../../middleware/verifyJWT')

Router
.get('/', auth.verifyJWT,jobsController.getJobs)
.get('/search',auth.verifyJWT,jobsController.searchJob)
.get('/:id',auth.verifyJWT,jobsController.getJobById)

module.exports = Router