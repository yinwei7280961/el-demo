var express=require('express');
var bodyParser=require('body-parser');

var userRouter=require('./routes/user');

var dishRouter=require('./routes/dish');

var uploadRouter=require('./routes/upload');

var path=require('path');//路径操作模块
//处理全局错误
var errLog=require('./error-log');
//session
var session=require('express-session');

var app=express();

app.use('/public/',express.static('./public/'));
app.use(session({
	secret:'keybroad cat',
	resave:false,
	saveUninitialized:true
}));
//formidable 用于处理 具有文件的form表单提交
// var formidable=require('formidable');
/*
 * app.post('/',function(req,res,next){
 * 	parse a file upload
 * const form=new formidable.IncomingForm();
 * //err就是可能发生的错误对象
 * //fields 就是普通的表单字段
 * // files 就是文件内容数据信息
 * form.uploadDir='./upload';
 * //保持原来的扩展名
 * form.keepExtensions=true;
 * form.parse(req,(err,fields,files)=>{
 * 	
 * });
 * 
 * });
 * */

//如果想修改views目录则可以
//app.set()'views',render路径目录);
app.use('/public/',express.static('./public/'));
//使用body-parser获取解析post数据
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(userRouter);
app.use(dishRouter);
app.use(uploadRouter);
app.use(errLog);
app.listen(3000,function(){
	console.log('server is runing');
});
