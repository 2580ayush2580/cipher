const express=require('express')
const morgan=require('morgan')
const path        = require('path');
require('colors')
require('dotenv').config({path:'dev.env'})
const connectDB =require('./db/db')
const cors=require('cors')
connectDB()
const app=express()

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())
const PORT=process.env.PORT||5000

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

const userRoutes=require('./routes/userRoutes')
const dataRoutes=require('./routes/dataRoutes')
app.use('/images', express.static(path.join('server/assets/images')));
app.use('/api/users',userRoutes)
app.use('/api/data',dataRoutes)


app.listen(PORT,()=>{console.log(`Server listening on port ${PORT}`.yellow)})