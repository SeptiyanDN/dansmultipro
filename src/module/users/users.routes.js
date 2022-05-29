const express = require('express');
const Router = express.Router();
const users = require('./auth/authController')

Router
.post('/users', users.Register)
.post('/authentications', users.Login)
.put('/authentications', users.refreshTokenUser)
.delete('/authentications', users.logoutUser)

module.exports = Router