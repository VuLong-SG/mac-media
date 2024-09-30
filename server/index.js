import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit:'30mb',extended: true}))
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(cors())
app.use(morgan("common"))
app.use('/assets',express.static(path.join(__dirname,'public/ass')))

const storage = multer.diskStorage({
destination: function(req,res, cb){
    cb(null,'public/assets')
},
filename:function(req,file,cb){
    cb(null,file.originalname)
}
})


const upload  =  multer({storage})

const port = process.env.PORT || 8081
const url = process.env.MONGO_URL

mongoose.connect(url)
.then(()=>{
    app.listen(port,() => console.log('open port 8080'))
})
.catch((error) => console.log(error))