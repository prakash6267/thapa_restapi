const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const studentRoute = require('./api/routes/student')
const userRoute = require('./api/routes/user')
const fileUpload = require('express-fileupload')
const MONGO_URL = process.env.MONGO_URL


mongoose.connect(MONGO_URL)

.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Connection failed', error))

app.use(fileUpload({
    useTempFiles:true
}))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/student',studentRoute)
app.use('/user',userRoute)

app.use((req,resp,next)=>{
    resp.status(404).json({
        error:'bad request'
    })
})
module.exports = app