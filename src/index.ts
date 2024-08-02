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
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import middleware from 'i18next-http-middleware'

dotenv.config()

const secret = process.env.SESSION_SECRET || 'secret'

// Tạo và thiết lập ứng dụng express
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'vi',
    preload: ['en', 'vi'],
    supportedLngs: ['en', 'vi'],
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json')
    },
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
      lookupQuerystring: 'lang', // ?lng=en hoặc ?lng=vi để chuyển ngôn ngữ trên URL
      lookupCookie: 'lang', // chuyển ngôn ngữ bằng cách set cookie
      ignoreCase: true,
      cookieSecure: false
    }
  })

app.use(middleware.handle(i18next))

// Thiết lập view engine
app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'pug')
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Cấu hình session
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: secret
  })
)

// Cấu hình connect-flash
app.use(flash())

// Middleware để đặt các biến flash vào res.locals
app.use((req, res, next) => {
  res.locals.messages = req.flash()
  next()
})

// Thiết lập router
app.use('/', indexRouter)

// Bắt lỗi 404 và chuyển tiếp đến bộ xử lý lỗi
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404))
})

// Bộ xử lý lỗi
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

// Bắt đầu máy chủ
app.listen(3000, () => {
  console.log('listening on port 3000')
})

// Kết nối cơ sở dữ liệu
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err: Error | unknown) => {
    console.error('Error during Data Source initialization:', err)
  })
export default app
