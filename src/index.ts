import createError, { HttpError } from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import session from 'express-session'
import flash from 'connect-flash'
import indexRouter from './router/index'

import 'reflect-metadata'
import { AppDataSource } from './config/data-source'

import * as dotenv from 'dotenv'
dotenv.config()

const secret = process.env.SESSION_SECRET || 'secret'

// create and setup express app
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404))
})

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: secret
  })
)
app.use(flash())

app.use((req, res, next) => {
  res.locals.messages = req.flash()
  next()
})
// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
app.listen(3000, () => {
  console.log('listening on port 3000')
})

// establish database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err: Error | unknown) => {
    console.error('Error during Data Source initialization:', err)
  })
export default app
