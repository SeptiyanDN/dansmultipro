const yup = require('yup')
const response = require('../../helpers/response')




async function validate(schema,data){
    try {
        const value = await schema.validate(data)
        return response.successService(true,value)
    } catch (err) {
        return response.errorService(false, err.message, 400)
    }
}

exports.jobsValidator = async(data)=>{
    const schema = yup.object({
        limit: yup.number().optional().default(5),
        page: yup.number().optional().default(1)
    })
    return validate(schema, data)
}

exports.searchJobValidator = async(data) => {
    const schema = yup.object({
        limit: yup.number().optional().default(5),
        page: yup.number().optional().default(1),
        location : yup.string().optional(),
        description : yup.string().optional(),
        type : yup.string().optional()
    })
    return validate(schema, data)
}

exports.jobByIdValidator = async (data) => {
    const schema = yup.object({
        id : yup.string().required()
    })
    return validate(schema, data)
}
