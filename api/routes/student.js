const express = require('express');
const router = express.Router();
const Student = require('../model/student')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth')
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'drwnbntvg', 
    api_key: '691238734458285', 
    api_secret: 'lnwViRinP2udjb8Lw9SVnFN9zMo'
  });

router.get('/',(req,resp,next)=>{
   Student.find()
   .then(result=>{
    resp.status(200).json({
        studentData:result
    })
   })

   .catch(err=>{
    resp.status(500).json({
        error:err
    })
   })
})

router.get('/:id',(req,resp,next)=>{
    console.log(req.params.id)
    Student.findById(req.params.id)
    .then(result=>{
        resp.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        console.log(err)
        resp.status(400).json({
            error:err
        })
    })
})

router.post('/',checkAuth,(req,resp,next)=>{
//--------image path ------------
    console.log(req.body)
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
       // console.log(result);

        const student = new Student({
            _id:new mongoose.Types.ObjectId,
            name: req.body.name,
            phone: req.body.phone,
            gender: req.body.gender,
            imagePath: result.secure_url
           })
     
         student.save()
         .then(result=>{
             console.log(result)
             resp.status(200).json({
              newStudent:result
             })
         })
         
         .catch(err=>{
             console.log(err)
             resp.status(500).json({
                 error: err
             })
         })
    })
})

// delete request

router.delete('/:id',checkAuth,(req,resp,next)=>{
    Student.deleteOne({_id:req.params.id})
    .then(result=>{
        resp.status(200).json({
            message:'student deleted',
            result:result
        })
    })
    .catch(err=>{
        resp.status(500).json({
            error:err
        })
    })
})
-
// put request
router.put('/:id',checkAuth,(req,resp,next)=>{
    console.log(req.params.id)
    Student.findOneAndUpdate({_id:req.params.id},{$set:{  name: req.body.name,phone: req.body.phone,gender: req.body.gender}})
    .then(result=>{
        resp.status(200).json({
            message:'updated student',
            update_student:result
        })
    })
    .catch(err=>{
        console.log(err)
        resp.status(500).json({
            error:err
        })
    })
})

module.exports  = router;    