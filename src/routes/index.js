const userRoutes = require('../module/users/users.routes')
const jobsRoutes = require('../module/jobs/jobs.route')

module.exports = (app)=>{
    app.use('/api', userRoutes)
    app.use('/jobs', jobsRoutes)
   
}