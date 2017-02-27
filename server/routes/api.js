var express = require('express');
var router=express();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('Prashanth-Expense-Tracker');
var passport = require('passport');

/*  db.createCollection("NewC",{},function(err,docs){
	console.log(docs);
});  */
/* var NewC = db.collection('NewC');

db.collection('NewC').find(function(err,docs){
	console.log(docs);
});

db.collection('NewC').insert({"name":"Something"},function(err,docs){
	console.log(docs)
}); */


db.collection('category').find({},function(err,docs){
	if(docs.length==0){
		var date=new Date();
		var data=[{"name" : "Travel","notes" : "Travel to office, other city, flight tickets","timestamp" : date},
		{"name" : "Fuel","notes" : "Petrol and diesel","timestamp" : date},
		{"name" : "Food","notes" : "Daily snacks and food","timestamp" : date},
		{"name" : "Beverages","notes" : "Drinks mocktails and cocktails","timestamp" : date},
		{"name" : "Entertainment","notes" : "All activities involving effort","timestamp" : date},
		{"name" : "Fitness","notes" : "Fitness related","timestamp" : date},
		{"name" : "Shopping","notes" : "All kinds of shopping","timestamp" : date},]
		db.collection('category').insert(data,function(err,docs){
			console.log(docs);
		})
	}
	else{
		console.log("All good to go");
	}
})

router.post('/expenses',function(req,res){
	
	db.collection('expense').insert(req.body,function(err,docs){
		console.log(docs);
		res.json(docs);
	})
	db.collection('charts').insert(req.body.category,function(err,docs){
				console.log(docs);
	});
	
});

router.get('/expenses',function(req,res){
	
	var d=new Date();
	//console.log(d.getFullYear().toString()+' '+d.getMonth().toString() +' '+d.getDate().toString())
	db.collection('expense').find({"year":d.getFullYear(),"month":d.getMonth()+1,"day":d.getDate()},function(err,docs){
		console.log(docs);
		res.json(docs);
	})
});



router.delete('/expenses_delete/:token',function(req,res){
	console.log(req.body);
	db.collection('expense').remove({token:req.params.token},function(err,docs){
		console.log(docs);
		res.json(docs);
	})
	db.collection('charts').remove({token:req.params.token},function(err,docs){
		console.log(docs);
	})
});




router.get('/expenses_selectedDate/:year/:month/:day',function(req,res){
	db.collection('expense').find({"year":parseInt(req.params.year),"month":parseInt(req.params.month),"day":parseInt(req.params.day)},function(err,docs){
		console.log(docs);
		res.json(docs);
	})
});


router.get('/expenses_selectedMonth/:year/:month',function(req,res){
	db.collection('expense').find({"year":parseInt(req.params.year),"month":parseInt(req.params.month)},function(err,docs){
		console.log(docs);
		res.json(docs);
	})
});


router.get('/chartdata_selectedMonth/:year/:month',function(req,res){
	
	db.collection('charts').find({"year":parseInt(req.params.year),"month":parseInt(req.params.month)},function(err,docs){
		console.log(docs);
		res.json(docs);
	})
});



router.get('/chartdataresults/:year/:month/:day',function(req,res){
	
	var d=new Date();
	console.log(d.getFullYear().toString()+' '+d.getMonth().toString() +' '+d.getDate().toString())
	db.collection('charts').find({"year":parseInt(req.params.year),"month":parseInt(req.params.month),"day":parseInt(req.params.day)},function(err,docs){
		console.log(docs);
		res.json(docs);
	})
});

router.get('/chartdataresultsweekly/:year/:month/:startday/:endday',function(req,res){
	console.log(req.params.startday);
	db.collection('charts').find({"year":parseInt(req.params.year),"month":parseInt(req.params.month),"day":{"$gte":parseInt(req.params.startday),"$lte":parseInt(req.params.endday)}},function(err,docs){
		console.log(docs);
		res.json(docs);
	})
});


router.get('/expenses_selectedWeek/:year/:month/:startday/:endday',function(req,res){
	console.log(req.params.startday);
	db.collection('expense').find({"year":parseInt(req.params.year),"month":parseInt(req.params.month),"day":{"$gte":parseInt(req.params.startday),"$lte":parseInt(req.params.endday)}},function(err,docs){
		console.log(docs);
		res.json(docs);
	})
});



router.get('/expenses_monthly',function(req,res){
	
	var d=new Date();
	console.log(d.getFullYear().toString()+' '+d.getMonth().toString() +' '+d.getDate().toString())
	db.collection('expense').find({"month":d.getMonth()+1},function(err,docs){
		console.log(docs);
		res.json(docs);
	})
});


router.get('/chartdata',function(req,res){
	
	var d=new Date();
	console.log(d.getFullYear().toString()+' '+d.getMonth().toString() +' '+d.getDate().toString())
	db.collection('charts').find({"year":d.getFullYear(),"month":d.getMonth()+1,"day":d.getDate()},function(err,docs){
		console.log(docs);
		res.json(docs);
	})
});



router.post('/category',function(req,res){
	
	db.collection('category').insert(req.body,function(err,docs){
		console.log(docs);
		res.json(docs);
	})

});


router.get('/category',function(req,res){
	
	db.collection('category').find({},function(err,docs){
		console.log(docs);
		res.json(docs);
	})
});




module.exports = router;