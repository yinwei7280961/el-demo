var express=require('express')

var router=express.Router();

var Upload=require('../models/upload');//mongoose model

var formidable=require('formidable');

var {basename}=require('path');

var fs = require('fs');

router.post('/upload',function(req,res,next){
	var body={};
	var  form=formidable({
		 encoding:'utf-8',
		 uploadDir:'./public/upload/user',
		 keepExtensions :true,//设置该属性为true可以使得上传的文件保持原来的文件的扩展
	});
	form.parse(req,async (err,fields,files)=>{
		if(err){
			return next(err);
		}
		body.path=basename(files.file.path);
		Object.assign(body,fields);
		var upload=await Upload.findOne({name:body.name});
		console.log(upload,body,files);
		if(upload){
			try{
				fs.unlinkSync('./public/upload/user' + upload.path);
			}catch(err){
				
			}
			await Upload.findOneAndUpdate({name:body.name},body,function(err){
				if(err){
				  return  res.status(500).send('Sever error');	
				}
			});
		}else{
			await new Upload(body).save();
		}
		res.status(200).json({
		 	status:0,
		 	data:"上传成功"
		});
	})
});

//查询用户头像路径
router.get('/user',async function(req,res){
	var upload=await Upload.findOne({name:req.query.name});
	console.log(upload)
	if(upload){
		return res.json({status:0,data:{path:upload.path}});
	}
	res.json({status:1,data:{path:''}});
});
module.exports=router;