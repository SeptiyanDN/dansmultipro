'use strict'
const AuthModel = require('../module/users/auth/auth.models')
const logService = require('../module/logs/log.service')
function getResData(res, code, value) {
  const token = res.req.header('x-auth-token')
  const path = `${res.req.protocol}s://${res.req.headers.host}${res.req.originalUrl}`
  const originPath = res.req.headers.origin
  const method = res.req.method
  const logData = {
    status: code,
    message: value
  }

  return {
    token, originPath, path, method, logData
  }
}
async function createLog(token, data, originPath, path, method) {
  let newLog
  if (token) {
    const auth = await AuthModel.findOne({ accessToken: token })
    newLog = await logService.createLog(auth, data, originPath, path, method)
    if (newLog.status === false) console.log(newLog.message)
  } else {
    newLog = await logService.createLog(undefined, data, originPath, path, method)
    if (newLog.status === false) console.log(newLog.message)
  }
}
exports.successData = async (value, res, code) => {
    const { token, originPath, path, method, logData } = getResData(res, code, value)
    await createLog(token, logData, originPath, path, method)
    const data = {
      status: code,
      data: value
    };
    res.status(code).json(data);
  }
  
  exports.successResult = async (value, res, code) => {
  
    const { token, originPath, path, method, logData } = getResData(res, code, value)
    await createLog(token, logData, originPath, path, method)
  
    const data = {
      status: code,
      result: value
    }
    res.status(code).json(data);
  };
  
  exports.error = async (message, req, res, code) => {
  
    const { token, originPath, path, method, logData } = getResData(res, code, message)
  
    await createLog(token, logData, originPath, path, method)
  
    return res.status(code).json(logData)
  }
  
  //for services
  exports.successService = (status, data) => {
    return {
      status,
      data
    }
  }
  
  exports.errorService = (status, message, statusCode) => {
    return {
      status,
      message,
      statusCode
    }
  }