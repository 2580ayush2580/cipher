const mongoose =require('mongoose')
const DataSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        video:{
            type: String,
            required: true,
        }, 
    })

const Data = mongoose.model('Data', DataSchema)
module.exports=Data