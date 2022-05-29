const JWT = require('jsonwebtoken')
const moment = require('moment-timezone')

const expiresIn = () => {
    const endDay = moment().tz('Asia/Jakarta').endOf('days')
    const diff = moment.duration(endDay.diff(new Date()))
    const diffHours = Math.floor(diff.asHours())
    const expire = `${diffHours + 1}h`

    return expire
}
exports.userRefreshToken = (userId) => {
    const refreshToken = JWT.sign({ _id: userId }, process.env.SECRET_KEY_REFRESH, { algorithm: 'HS256', expiresIn: expiresIn() })
    return refreshToken
}