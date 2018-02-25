var express=require('express');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser')
var path=require('path');   //core module therefore no need to install it separately
// var expressValidator=require('express-validator');
var session=require('express-session');
var csrf=require('csurf');

var csrfProtection=csrf();

var assert=require('assert');
require('mongoose-type-email');
var http=require('http');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
//var assert=require('assert');
mongoose.connect('mongodb://localhost/expense-manager',function(err){
//console.log(err);
});
var db=mongoose.connection;
var authmail;
var app=express();

var router = express.Router();
//app.use(csrfProtection);
app.use("/",router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({secret:'enter' , resave:false, saveUninitialized:false}))

//when using this render is working but..
app.use(express.static(path.join(__dirname,'public')));
//app.set('view engine', 'html');

//by using app.use there occurs no prob as it has some file to show
app.get('/',function(req, res) {    //changing use to get
  res.sendFile(__dirname + '/public/index.html');
});


//use any..when using this res.send is working---wrong
//app.use(express.static('public'))
app.get('/',function(req,res){
    res.render('index');
    authmail=" ";
  //  res.render('index', {csrfToken:req.csrfToken()});
})



//FOR SIGHN UP
//define schema for mongo
var Schema=mongoose.Schema;

var detail=new Schema({

      	username: {
            type : "string",
            required: true,
			description: "must be a string and is required"         },
      	 usrmail: {
            type :mongoose.SchemaTypes.Email,
            required: true,
            validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            description: "must be a string and match the regular expression pattern"
         },
         usrno: {
            type: "string",
            required: true,
            description: "must be a string and is required"
         },
        
         usrpsw: {
           type: "string",
           required: true
         }
      

})
var DETAILS=mongoose.model('DETAILS',detail);



app.post('/user_signup',function(req,res){
	//console.log(req.body);
	var myData = new DETAILS(req.body);
	//console.log(myData);
	myData.save(function(err, result) {
 	//console.log("i am im");
		if (err)  res.status(400).send("unable to save to database");

		if(result) {
			res.json(result)
		}
	})

})


//FOR LOGIN AUTHENTICATION
app.post('/log',function(req,res){
	//console.log(req.body);
	mail=req.body.mail;
	psw=req.body.psw;
	var cursor=db.collection('details').find({ $and: [ { usrmail:mail }, { usrpsw:psw } ] });

	cursor.count(function(err,count){
		if(count)
			{

				res.send(mail);
				authmail=mail;
				console.log(authmail);
			}
		else
			{
				
			res.send('no');
		}
	})
})


// FOR ADDING EXPENSE TO THE DATABSE
var expense=new Schema({

   
      	 usrmail: {
            type :mongoose.SchemaTypes.Email,
            required: true,
            validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            description: "must be a string and match the regular expression pattern"
         },
          	userexpense: {
            type : "string",
            required: true,
			description: "must be a string and is required" },
         
        
         amount: {
           type: "number",
           required: true
         },
         	date: {
            type : "date",
            required: true,
			description: "must be a string and is required" },

			
         

      

})
var EXPENSES=mongoose.model('EXPENSES',expense);


app.post('/user_expense',function(req,res){
	//console.log(req.body);
userexpense=req.body.userexpense;
amount=req.body.amount;
date=req.body.date;

var flag=db.collection('expenses').insert({"usrmail":authmail,"userexpense":userexpense,"amount":amount,"date":date})

	if(flag)
		res.json('done');
	else
		res.json('nope');



/*
	var myData = new EXPENSES(req.body);
	//console.log(myData);
	
	myData.save(function(err, result) {
 	//console.log("i am im");
		if (err)  res.status(400).send("unable to save to database");

		if(result) {
			res.json(result);
		}
	})
	*/

})

// FOR ADDING INCOME TO THE DATABSE
var income=new Schema({

   
      	 usrmail: {
            type :mongoose.SchemaTypes.Email,
            required: true,
            validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            description: "must be a string and match the regular expression pattern"
         },
          	userincome: {
            type : "string",
            required: true,
			description: "must be a string and is required" },
         
        
         amount: {
           type: "number",
           required: true
         },
         	date: {
            type : "date",
            required: true,
			description: "must be a string and is required" }
         

      

})
var EXPENSES=mongoose.model('EXPENSES',expense);


app.post('/user_income',function(req,res){
	//console.log(req.body);
userincome=req.body.userincome;
amount=req.body.iamount;
date=req.body.idate;

var flag=db.collection('incomes').insert({"usrmail":authmail,"userincome":userincome,"amount":amount,"date":date})

	if(flag)
		res.json('done');
	else
		res.json('nope');

})


app.get('/view_expense',function(req,res,next)
{



	
/*	
	var total;

	//{ $and: [ { usrmail:mail }, { usrpsw:psw } ] }
	var result=db.collection('expenses').aggregate([

[
     {
       $group:
         {
           _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
           totalAmount: { $sum:  [ "$amount" ]  },
           count: { $sum: 1 }
         }
     }
   ]

]


    { $group: {
       _id: {"usrmail":authmail} ,
        
       // total: { $sum:{$and: [ {usrmail:authmail  },{amount:amount}] }}
       // $cond: { if: { $gte: [ "$qty", 250 ] }, then: 30, else: 20 }
       //total: { $sum: {$cond: { if: [ {usrmail:authmail  }] }}}
       total: { $sum: "amount"}
    } }


,function(err,result){
		console.log(result.totalAmount);
	});


	//console.log(result);


var getBalance = function(authmail) {
   db.collection('expenses').aggregate([
        
        { $unwind: "$expense" },
        { $group: {
            
            balance: { $sum: "$expense.amount"  }
        }}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
}

getBalance(authmail);
*/
var resultArray=[];var esum=0;
var cursor=db.collection('expenses').find({usrmail:authmail});

 cursor.forEach(function(doc,err){
        assert.equal(null,err);
        resultArray.push(doc);

    },function(){
        db.close();
       // res.render('index',{items:resultArray});
       console.log(resultArray);
       

      res.send(resultArray);
       

    })
})


app.get('/view_income',function(req,res,next)
{

var iresultArray=[];
var cursor=db.collection('incomes').find({usrmail:authmail});

 cursor.forEach(function(doc,err){
        assert.equal(null,err);
        iresultArray.push(doc);

    },function(){
        db.close();
       // res.render('index',{items:resultArray});
       console.log(iresultArray);
       

      res.send(iresultArray);
       

    })
})

app.post('/daily_expense',function(req,res,next)
{
date=req.body.todaydate;
console.log(date);
var todayresultArray=[];
var cursor=db.collection('expenses').find({ $and: [ { usrmail:authmail }, { date:date } ] });

 cursor.forEach(function(doc,err){
        assert.equal(null,err);
        todayresultArray.push(doc);

    },function(){
        db.close();
       // res.render('index',{items:resultArray});
       console.log(todayresultArray);
        console.log('hey');

      res.send(todayresultArray);
       

    })
})

var monthlyresult=[];
app.post('/monthly_expense',function(req,res,next){
month=req.body.month;
console.log(month);

var start = new Date(2018, month, 2);
var end = new Date(2018, month, 29);
console.log(start);
console.log(end);
var cursor=db.collection('expenses').find({date: {$gte: start, $lt: end}});
cursor.forEach(function(doc,err){
        assert.equal(null,err);
        monthlyresult.push(doc);

    },function(){
        db.close();
       // res.render('index',{items:resultArray});
       console.log(monthlyresult);
        console.log('hey');

      //res.send(monthlyresult);
       

    })

})

/*var monthlyresult=[];
app.post('/monthly_expense',function(req,res,next){
month=req.body.month;
console.log(month);

var start = new Date(2018, month, 2);
var end = new Date(2018, month, 29);
console.log(start);
console.log(end);
var cursor=db.collection('expenses').find({$where : function() { return this.date.getMonth() == 2} });
cursor.forEach(function(doc,err){
        assert.equal(null,err);
        monthlyresult.push(doc);

    },function(){
        db.close();
       // res.render('index',{items:resultArray});
       console.log(monthlyresult);
        console.log('hey');

      //res.send(monthlyresult);
       

    })

})*/











app.listen(3000,function(){
	console.log('server started on 3000...');
})