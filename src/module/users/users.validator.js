const yup = require('yup')
const response = require('../../helpers/response')

async function validate(schema, data){
    try {
        const value = await schema.validate(data)
        return response.successService(true, value)
    } catch (err) {
        return response.errorService(false, err.message,400)
    }
}
