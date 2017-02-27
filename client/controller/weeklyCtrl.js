
angular.module('routerApp').controller('weeklyCtrl',
  ['$scope','$http', '$location','$rootScope','$filter',
  function ($scope,$http, $location,$rootScope,$filter) {
	var day=new Date();
	
	var month=(day.getMonth()+1)<10?"0"+(day.getMonth()+1).toString():(day.getMonth()+1).toString();
	var d=day.getDate()<10?"0"+day.getDate().toString():day.getDate().toString();
	$scope.today=day.getFullYear().toString()+"-"+month+"-"+d;
	$scope.DateEx=$scope.today;
	$scope.data=[];
	var curr = new Date(); // get current date
	var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
	var last = first + 6; // last day is the first day + 6

	var firstday = (new Date(curr.setDate(first))).getDate();
	var lastday = (new Date(curr.setDate(last))).getDate();
	if(firstday>lastday)firstday=1;
	
	
	var getFirstAndLast = function(date){
		var curr = new Date(date); // get current date
		var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
		var last = first + 6; // last day is the first day + 6

		var firstday = (new Date(curr.setDate(first))).getDate();
		var lastday = (new Date(curr.setDate(last))).getDate();
		if(firstday>lastday)firstday=1;
		return {'firstday':firstday,'lastday':lastday};
	}
	
	
	
	var temp = {};
	var obj = null;
	var result = [];
	$scope.labels=[];
	$scope.data2=[];
	$scope.series = ['Series A'];
	
	var chartDataResults= function(dateEx){
		temp = {};
		obj = null;
		result = [];
		$scope.labels=[];
		$scope.data2=[];
		var d=dateEx.split('-');
		var fl=getFirstAndLast(dateEx);

		$http.get('/user/chartdataresultsweekly/'+day.getFullYear().toString()+'/'+(day.getMonth()+1).toString()+'/'+parseInt(fl.firstday)+'/'+parseInt(fl.lastday)).success(function(response){
			
			for(var i=0; i < response.length; i++) {
			   obj=response[i];

			   if(!temp[obj.name]) {
				   temp[obj.name] = obj;
			   } else {
				   temp[obj.name].amount += obj.amount;
			   }
			}
			
			for (var prop in temp){
				result.push(temp[prop]);
				$scope.labels.push(prop);
				$scope.data2.push(temp[prop].amount);
			}
			//console.log(result);
				
		})
		
	}
	
	
	$scope.results = function(){
		
		var curr2 = new Date($scope.DateEx); // get current date
		var first2 = curr2.getDate() - curr2.getDay(); // First day is the day of the month - the day of the week
		var last2 = first2 + 6; // last day is the first day + 6

		var firstday2 = (new Date(curr2.setDate(first2))).getDate();
		var lastday2 = (new Date(curr2.setDate(last2))).getDate();
		console.log(firstday2+" "+lastday2);
		if(firstday2>lastday2)firstday2=1;
		var d=$scope.DateEx.split('-');

		$http.get('/user/expenses_selectedWeek/'+d[0]+'/'+d[1]+'/'+parseInt(firstday2)+'/'+parseInt(lastday2)).success(function(response){
			$scope.data=response;
			for(var i=0;i<response.length;i++){
				var cat="";
				for (var j=0;j<response[i].category.length;j++) {
						cat+=response[i].category[j].name+" ";
				}
				$scope.data[i].category=cat;
				
			}
			chartDataResults($scope.DateEx);
		});
	}

	

	
	
	
	var refresh= function(){
		$http.get('/user/expenses_selectedWeek/'+day.getFullYear().toString()+'/'+(day.getMonth()+1).toString()+'/'+parseInt(firstday)+'/'+parseInt(lastday)).success(function(response){
			$scope.data=response;
			for(var i=0;i<response.length;i++){
				var cat="";
				for (var j=0;j<response[i].category.length;j++) {
						cat+=response[i].category[j].name+" ";
				}
				$scope.data[i].category=cat;
				
			}
		});
		chartDataResults($scope.today);
	}
	
	refresh();
	
	
	
	
	
	$rootScope.$on('DeleteEvent', function(event, data){
            refresh();
        });
	
	$scope.delete_row = function(expense){

		data="refresh";
		
		$http.delete('/user/expenses_delete/'+expense.token).success(function(response){
			//refresh();
			$rootScope.$emit('DeleteEvent', data);
		}) 
	}

}]);


