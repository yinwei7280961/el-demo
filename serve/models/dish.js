var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true,useUnifiedTopology:true});
var Schema=mongoose.Schema;
var dishSchema = new Schema({
	    name:{type:String,required:true},
	    price:{type:String,required:true},
	    type:{type:String,required:true},
	    create_time:{type:Date,default:Date.now},
	    last_modified:{type:Date,default:Date.now}
	});
	//直接导出构造函数
module.exports=mongoose.model('dish',dishSchema)