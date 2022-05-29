const response = require('../../helpers/response')
const axios = require('axios')

exports.listJobs = async ({ limit, page }) => {
    try {
        const url = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json'
        const response = await axios.get(url)
        const resData = response.data
        const pages = page
        const limits = limit
        const offset = (page - 1) * limit
        const data = resData.slice(offset, offset + limit)

        
        const totalPage = Math.ceil(resData.length / limit)
        const result = { totalPage, pages, limits, data }
        return result
    } catch (error) {
        return response.errorService(false,error.message)
    }
}

exports.searchJob = async ({ limit, page, location, description, type }) => {
    try {
        const url = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json'
        const response = await axios.get(url)
        const resData = response.data
        const pages = page
        const limits = limit
        const offset = (page - 1) * limit
        let data
      if (location && description && type) {
        data = resData.filter(item => {
            return item.location.toLowerCase().includes(location.toLowerCase()) &&
            item.description.toLowerCase().includes(description.toLowerCase()) &&
            item.type.toLowerCase().includes(type.toLowerCase())
        })
        } else if (location && description) {
            data = resData.filter(item => {
                return item.location.toLowerCase().includes(location.toLowerCase()) &&
                item.description.toLowerCase().includes(description.toLowerCase())
            })
        } else if (location && type) {
            data = resData.filter(item => {
                return item.location.toLowerCase().includes(location.toLowerCase()) &&
                item.type.toLowerCase().includes(type.toLowerCase())
            })
        } else if (description && type) {
            data = resData.filter(item => {
                return item.description.toLowerCase().includes(description.toLowerCase()) &&
                item.type.toLowerCase().includes(type.toLowerCase())
            })
        } else if (location) {
            data = resData.filter(item => {
                return item.location.toLowerCase().includes(location.toLowerCase())
            })
        } else if (description) {
            data = resData.filter(item => {
                return item.description.toLowerCase().includes(description.toLowerCase())
            })
        } else if (type) {
            data = resData.filter(item => {
                return item.type.toLowerCase().includes(type.toLowerCase())
            })
        } else {
            data = resData
        }
        const totalPage = Math.ceil(data.length / limit)
        const totalData = data.length
        const result = { totalData, totalPage, pages, limits, data }
        return result
    } catch (error) {
        return response.errorService(false,error.message)
    }
}

exports.getJobById = async ({ id }) => {
    try {
        const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
        const response = await axios.get(url)
        const resData = response.data
        const result = resData
        return result
    } catch (error) {
        return response.errorService(false,error.message)
    }
}