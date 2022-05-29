const Log = require('./log.models.js')
const response = require('../../helpers/response')
const { userModel } = require('../users/users.models')

exports.createLog = async (auth, value, originPath, path, method) => {
  try {
    const newLog = new Log()

    let authorModel
    if (
      originPath &&
      (originPath.includes('develop-adm') || originPath.includes('admin'))
    ) {
      authorModel = 'Admin'
    } else {
      authorModel = 'User'
    }

    let name
    if (auth) {
      newLog.author = auth.author
      
        const user = await userModel.findById(auth.author).lean()
        name = user.nama_pengguna
    }

    newLog.nama = name
    newLog.originPath = originPath
    newLog.authorModel = authorModel
    newLog.action = { path, method }

    if (value) {
      newLog.message = typeof value.message === 'string' ? value.message : ''
      newLog.statusCode = value.status
    }

    await newLog.save()

    return response.successService(true, newLog)
  } catch (err) {
    return response.errorService(false, err.message)
  }
}
