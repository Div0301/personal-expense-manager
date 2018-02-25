var app=angular.module('Home-page',["ngRoute","zingchart-angularjs"]);
app.config(function($routeProvider,$locationProvider)
{

	$routeProvider
		.when("/",{
			templateUrl:"how-it-works.html",
			//$scope.csrfToken=csrfToken
			})
		.when("/expense",{
			templateUrl:"expense.html",
			})
		.when("/income",{
			templateUrl:"income.html",
			})

		.when("/profile",{
			templateUrl:"profile.html"
		})

		$locationProvider.html5Mode(true);
});

app.controller('myCtrl', function ($scope, $http , $location){
console.log('here');

$scope.login=function(){
	console.log('herell');
	console.log($scope.log);
	   $http.post('/log',$scope.log).then(function(response){
   		if(response.data=='no')
   		{
   			login();
   		}
   		else

   		{
   			//console.log(response.data);
			var expmail=response.data;
			console.log(expmail);
   			$location.path('/profile');

   		}
//$scope.message=response.data;

   },
   function (error){
   	console.log("no the data requested");
   });
}

$scope.signup=function()
{
	console.log($scope.sig);
	$http.post('/user_signup',$scope.sig).then(function(response)
	{
		//$scope.message=response.data;
		if(response.data=='yes')
			console.log('wiji');
		
	},
	function(error)
	{
		$scope.message='invalid';
		console.log("no the data inserted");
	})
}


$scope.expense=function()
{
	console.log($scope.exp);
	$http.post('/user_expense',$scope.exp).then(function(response)
	{
		//$scope.message=response.data;
		if(response.data=='yes')
			console.log('wiji');
		
	},
	function(error)
	{
		$scope.message='invalid';
		console.log("no the data inserted");
	})
}


$scope.income=function()
{
	console.log($scope.inc);
	$http.post('/user_income',$scope.inc).then(function(response)
	{
		//$scope.message=response.data;
		if(response.data=='yes')
			console.log('wiji');
		
	},
	function(error)
	{
		$scope.message='invalid';
		console.log("no the data inserted");
	})
}
var resultArray=[];var esum=0,csum=0,etsum=0,hsum=0,osum=0,gsum=0,easum=0,bsum=0,usum=0,tsum=0;

$scope.eview=function()
{
	
	$http.get('/view_expense',$scope.exp).then(function(response)
	{
		//$scope.message=response.data;
		//if(response.data=='yes')
		// console.log(response.data);
		 resultArray=response.data;
		// console.log(resultArray);
			for(var i=0;i<resultArray.length;i++)
       {
         	 esum+=resultArray[i].amount;

	          if(resultArray[i].userexpense=="clothes")
	          	csum+=resultArray[i].amount;
	      	  if(resultArray[i].userexpense=="eating")
	          	easum+=resultArray[i].amount;
		      if(resultArray[i].userexpense=="entertainment")
		          etsum+=resultArray[i].amount;
		      if(resultArray[i].userexpense=="grocery")
		          gsum+=resultArray[i].amount;
		      if(resultArray[i].userexpense=="health")
		          hsum+=resultArray[i].amount;
		      if(resultArray[i].userexpense=="bills")
		          bsum+=resultArray[i].amount;
		      if(resultArray[i].userexpense=="utilities")
		          usum+=resultArray[i].amount;
		      if(resultArray[i].userexpense=="transport")
		          tsum+=resultArray[i].amount;
		      if(resultArray[i].userexpense=="other")
		          osum+=resultArray[i].amount;






       }

      
       console.log(esum);
       console.log(csum);
		$scope.totalExpense=esum;
		$scope.totalclothes=csum;
		$scope.totaleating=easum;
		$scope.totalentertainment=etsum;
		$scope.totalgrocery=gsum;
		$scope.totalhealth=hsum;
		$scope.totalbills=bsum;
		$scope.totalutilities=usum;
		$scope.totaltransport=tsum;
		$scope.totalother=osum;


		
	},
	function(error)
	{
		$scope.message='invalid';
		console.log("no the data inserted");
	})
}


var iresultArray=[];var isum=0,depsum=0,salsum=0,savsum=0,othsum=0;

$scope.iview=function()
{
	
	$http.get('/view_income',$scope.inc).then(function(response)
	{
		//$scope.message=response.data;
		//if(response.data=='yes')
		console.log(response.data);
		iresultArray=response.data;
		console.log(iresultArray);
			for(var i=0;i<iresultArray.length;i++)
		       {
		          isum+=iresultArray[i].amount;
		          	if(iresultArray[i].userincome=="deposits")
		          depsum+=iresultArray[i].amount;
		      		if(iresultArray[i].userincome=="salary")
		          salsum+=iresultArray[i].amount;
		      		if(iresultArray[i].userincome=="saving")
		          savsum+=iresultArray[i].amount;
		     		 if(iresultArray[i].userincome=="other")
		          othsum+=iresultArray[i].amount;
		     
		      
		       }
      
       console.log(isum);
     
		$scope.totalincome=isum;
		$scope.totaldeposits=depsum;
		$scope.totalsalary=salsum;
		$scope.totalsaving=savsum;
		$scope.totalothers=othsum;
		

		
	},
	function(error)
	{
		$scope.message='invalid';
		console.log("no the data inserted");
	})
}




$scope.dailyxpense=function()
{
	var todayresult=[];var tesum=0,tcsum=0,tetsum=0,thsum=0,tosum=0,tgsum=0,teasum=0,tbsum=0,tusum=0,ttsum=0;
	console.log($scope.expt);
	$http.post('/daily_expense',$scope.expt).then(function(response)
	{
		//$scope.message=response.data;
		console.log(response.data);
		 todayresult=response.data;
		 for(var i=0;i<todayresult.length;i++)
       {
		          tesum+=todayresult[i].amount;
		          if(todayresult[i].userexpense=="clothes")
		          tcsum+=todayresult[i].amount;
		      		if(todayresult[i].userexpense=="eating")
		          teasum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="entertainment")
			          tetsum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="grocery")
			          tgsum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="health")
			          thsum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="bills")
			          tbsum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="utilities")
			          tusum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="transport")
			          ttsum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="other")
			          tosum+=todayresult[i].amount;
	   }

     	$scope.todayexpense=tesum;
		$scope.todayclothes=tcsum;
		$scope.todayeating=teasum;
		$scope.todayentertain=tetsum;
		$scope.todaygrocery=tgsum;
		$scope.todayhealth=thsum;
		$scope.todaybills=tbsum;
		$scope.todayutil=tusum;
		$scope.todaytrans=ttsum;
		$scope.todayother=tosum;
		

		 $scope.myJson = {
      type : 'line',
      series : [
        { values : [tetsum,tcsum,teasum,tetsum,tgsum,thsum,tbsum,ttsum,tosum] }
       
      ]
  }
},
	function(error)
	{
		//$scope.message='invalid';
		console.log("no the data received");
	})
}


$scope.monthlyxpense=function()
{
	var todayresult=[];var tesum=0,tcsum=0,tetsum=0,thsum=0,tosum=0,tgsum=0,teasum=0,tbsum=0,tusum=0,ttsum=0;
	console.log($scope.expm);
	$http.post('/monthly_expense',$scope.expm).then(function(response)
	{
		//$scope.message=response.data;
		console.log(response.data);
		 todayresult=response.data;
		 for(var i=0;i<todayresult.length;i++)
       {
		          tesum+=todayresult[i].amount;
		          if(todayresult[i].userexpense=="clothes")
		          tcsum+=todayresult[i].amount;
		      		if(todayresult[i].userexpense=="eating")
		          teasum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="entertainment")
			          tetsum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="grocery")
			          tgsum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="health")
			          thsum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="bills")
			          tbsum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="utilities")
			          tusum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="transport")
			          ttsum+=todayresult[i].amount;
			      if(todayresult[i].userexpense=="other")
			          tosum+=todayresult[i].amount;
	   }

     	$scope.todayexpense=tesum;
		$scope.todayclothes=tcsum;
		$scope.todayeating=teasum;
		$scope.todayentertain=tetsum;
		$scope.todaygrocery=tgsum;
		$scope.todayhealth=thsum;
		$scope.todaybills=tbsum;
		$scope.todayutil=tusum;
		$scope.todaytrans=ttsum;
		$scope.todayother=tosum;
		
	},
	function(error)
	{
		//$scope.message='invalid';
		console.log("no the data received");
	})
}





$scope.myJson = {
      type : 'line',
      series : [
        { values : [22,33,44,55,66] }
       
      ]
  }









});