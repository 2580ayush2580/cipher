const Data=require('../models/dataModel')
const mime = require('mime');
const fs = require('fs');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')

const addData=async(req,res)=>{
    try{
        const user=req.user._id
        let post = {
            ...req.body,
            user : user,
        }
        const obj=new Data(post)
        const createdData=await obj.save()
        res.status(201).json({success:true,message:'Data created',data:createdData})
    }catch(e){
        console.log(e)
        let error=`${e}`.split(":")
        let message
        if(error[0]==='Error'){
            message=error[1]
        }else{
            message='Failed to create'
        }
        res.json({success:false,message:message})
        res.status(400)
    }
}

const getAllData=async(req,res)=>{
    try{
        const user=req.user._id
        const long = req.query.long;
        const latt = req.query.lat;
        const data=await Data.find();
        console.log(data)
        res.status(201).json({success:true,message:'Data fetched',data:data})
    }catch(e){
        console.log(e)
        let error=`${e}`.split(":")
        let message
        if(error[0]==='Error'){
            message=error[1]
        }else{
            message='Failed to load data'
        }
        res.json({success:false,message:message})
        res.status(400)
    }
}

const getData=async(req,res)=>{
    try{
        const _id=req.params.id
        const user=req.user._id
        const data=await Data.find({user,_id})
        if(!data){
            res.json({success:false,message:'Data not found',error:`${e}`})
            return
        }
        res.status(201).json({success:true,message:'Data Found',data:data})
    }catch(e){
        console.log(e)
        let error=`${e}`.split(":")
        let message
        if(error[0]==='Error'){
            message=error[1]
        }else{
            message='Failed to load data'
        }
        res.json({success:false,message:message})
        res.status(400)
    }
}

const deleteData=async(req,res)=>{
    try{
        const _id=req.params.id
        const user=req.user._id
        const data=await Data.findOne({user,_id})
        if(!data){
            res.json({success:false,message:'Data not found',error:`${e}`})
            return
        }else{
            await Data.findOneAndDelete({user,_id})
        }
        res.status(201).json({success:true,message:'Data deleted',data:data})
    }catch(e){
        console.log(e)
        let error=`${e}`.split(":")
        let message
        if(error[0]==='Error'){
            message=error[1]
        }else{
            message='Failed to delete'
        }
        res.json({success:false,message:message})
        res.status(400)
    }
}

const payment = async(req,res)=>{
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'INR',
              product_data: {
                name: 'Game',
              },
              unit_amount: 200000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://listiee.netlify.app/home',
        cancel_url: 'https://listiee.netlify.app/home',
      });
    
      res.json({ id: session.id });
}


module.exports={addData,getAllData,getData,deleteData,payment}