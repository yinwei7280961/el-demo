var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/comments',{useNewUrlParser:true,useUnifiedTopology:true});
var Schema=mongoose.Schema;
var errorSchema = new Schema({
	    name:{type:String},
	    message:{type:String},
	    stack:{type:Date,default:Date.now},
	    time:{type:Date,default:Date.now}
	});
	//直接导出构造函数
	var ErrLog=mongoose.model('err_log',errorSchema);
module.exports=function(errLog,req,res,next){
	new ErrLog(errLog).save(function(err,data){
		console.log(err,errLog)
		if(err){
		  return  res.status(500).send('Sever error');	
		}
		res.json({
			err_code:500,
			message:errLog.message
		});
	});
};
