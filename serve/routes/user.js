var express=require('express');
var router=express.Router();

var md5=require('blueimp-md5');

var User=require('../models/user');//mongoose model

//var fsCom=require('./comments');//文件操作对象
router.post('/login',async function(req,res,next){
	var body=Object.assign(req.body,{last_modified:Date.now()});
	console.log(body.pwd)
	console.log(body,await User.findOne({username:body.username}))
	if(!await User.findOne({username:body.username})){
		return  res.status(200).json({status:1,data:'用户名没有注册，请前往注册页注册'});
	}
	if(!await User.findOne({pwd:md5(md5(body.pwd))})){
		return  res.status(200).json({status:1,data:'密码 is no true'});
	}
	//  	注册成功,通过session记录用户的登录状态
	req.session.user=body;
	res.status(200).json({
	 	status:0,
	 	data:"登录成功"
	});
});

router.post('/regsiter',async function(req,res){
	var body=req.body;
	//同时查
//	User.findOne({$or:[{usename:body.usename}]},function(err,data){
//		if(err){
//			return  res.status(500).send('Sever error');	
//		}
//	})
    try{
    	if(await User.findOne({username:body.username})){
    		return  res.status(200).json({status:1,data:`用户名 ${body.username} 已存在`});
    	}
    	body.pwd=md5(md5(body.pwd));
    	await new User(body).save();
//  	注册成功,通过session记录用户的登录状态
    	req.session.user=body;
    	res.status(200).json({
		 	status:0,
		 	data:"注册成功"
		});
        
    }catch(err){
    	return  res.status(500).json({
		 	status:500,
		 	data:"服务端错误,请稍后重试"
		});
    }
});

//退出
router.get('/loginout',function(req,res){
	req.session.user=null;
	res.json({status:0,data:`退出成功`});
});
module.exports=router;