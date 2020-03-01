var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true,useUnifiedTopology:true});
var Schema=mongoose.Schema;
var uploadSchema = new Schema({
	    name:{type:String,required:true},
	    path:{type:String,required:true},
	    create_time:{type:Date,default:Date.now},
	});
	//直接导出构造函数
module.exports=mongoose.model('upload',uploadSchema)