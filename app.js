const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv')
dotenv.config()
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

routes(app)
const urlEncodedParser = bodyParser.urlencoded({ extended: false})
app.use(bodyParser.json(), urlEncodedParser);
const DB_URL = process.env.DB_URI


//setup server
const PORT = process.env.PORT || 3500
mongoose.connect(DB_URL,
{ useNewUrlParser: true, useUnifiedTopology: true, },
console.log('Database MongoDB Berhasil Terhubung'))
.then((res)=>{
  app.listen(process.env.PORT,()=>{
    console.log(`Server is Listen in PORT : ${PORT}`)
  } )
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
