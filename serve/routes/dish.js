var express=require('express')

var router=express.Router();

var Dish=require('../models/dish');//mongoose model

router.get('/list',async function(req,res,next){
	Dish.find(function(err,data){
		if(err){
		  return  res.status(500).send('Sever is busy');	
		}
		res.json({status:1,data:data,total:data.length});
	})
	
});
router.post('/add',async function(req,res,next){
	var body=Object.assign(req.body,{last_modified:Date.now()});
	console.log(body,await Dish.findOne({name:body.name}));
	if(await Dish.findOne({name:body.name})){
		return  res.status(200).json({status:0,data:'菜名已存在'});
	}
	await new Dish(body).save();
	res.status(200).json({
	 	status:1,
	 	data:"添加成功"
	});
	
});

router.post('/edit',async function(req,res){
	var body=req.body;
	console.log(body)
    try{
    	var id=req.body._id;
		Dish.findById(id,function(err,dish){
			console.log(err)
			if(err){
			  return  res.status(500).send('Sever error');	
			}
			Object.assign(dish,req.body,{last_modified:Date.now()})
			dish.save(function(err){
				if(err){
				  return  res.status(500).send('Sever error');	
				}
			});
			res.status(200).json({
			 	status:1,
			 	data:"添加成功"
			});
		})
    }catch(err){
    	next(err);
    }
});

module.exports=router;