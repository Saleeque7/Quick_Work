import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { routes } from './routes/index.js'
import dependencies from './config/dependencies.js'
import cookieParser from 'cookie-parser'
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// app.use((req, res, next) => {
//     res.header('Referrer-Policy', 'no-referrer-when-downgrade');
//     next();
//   });
  
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use('/quickwork',routes(dependencies))

export { app }

