const response = require('../../helpers/response')
const axios = require('axios')
const validator = require("./jobs.validator")
const services = require("./jobs.service")

exports.getJobs = async (req,res) => {
    try {
        const resultValidator = await validator.jobsValidator(req.query)
        if (!resultValidator.status) return response.error(resultValidator.message,req,res,400)
        const { page, limit } = resultValidator.data
        const result = await services.listJobs({
            limit,
            page
        })
        return res.json(result)
        
    } catch (error) {
        return response.error('Gagal Mengambil Data jobs',req,res,500)
    }
}

exports.searchJob = async (req,res) => {
   try {
        const resultValidator = await validator.searchJobValidator(req.query)
        if (!resultValidator.status) return response.error(resultValidator.message,req,res,400)
        const { page, limit } = resultValidator.data
        const result = await services.searchJob({
            limit,
            page,
            location : req.query.location,
            description : req.query.description,
            type : req.query.type
        })
        return res.json(result)
        
   } catch (error) {
       return response.error('Gagal Mengambil Data JOBS',req,res,500)
       
   }
}

exports.getJobById = async (req,res) => {
    try {
        const resultValidator = await validator.jobByIdValidator(req.params)
        if (!resultValidator.status) return response.error(resultValidator.message,req,res,400)
        const result = await services.getJobById({
            id : req.params.id
        })
        return res.json(result)
    } catch (error) {
        return response.error('Gagal Mengambil Data jobs',req,res,500)
    }
}
 

