
angular.module('routerApp').controller('dailyCtrl',
  ['$http','$scope','$state', '$location','$rootScope','$filter',
  function ($http,$scope,$state,$location,$rootScope,$filter) {
	var day=new Date();
	
	var month=(day.getMonth()+1)<10?"0"+(day.getMonth()+1).toString():(day.getMonth()+1).toString();
	var d=day.getDate()<10?"0"+day.getDate().toString():day.getDate().toString();
	$scope.today=day.getFullYear().toString()+"-"+month+"-"+d;
	$scope.DateEx=$scope.today;
	$scope.data=[];
	$scope.graphData=[];
	
	
	
	
	
	
	
	
	var check = function(data){
		for(var i=0;i<graphData.length;i++){
			
		}
	}
	
	var temp = {};
	var obj = null;
	var result = [];
	$scope.labels=[];
	$scope.data2=[];
	
	var chartData = function(){
		temp = {};
		obj = null;
		result = [];
		$scope.labels=[];
		$scope.data2=[];
		$http.get('/user/chartdata').success(function(response){
			
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
	
	
	var refresh = function(){
		$http.get('/user/expenses').success(function(response){
			$scope.data=response;
			for(var i=0;i<response.length;i++){
				var cat="";
				for (var j=0;j<response[i].category.length;j++) {
						cat+=response[i].category[j].name+" ";
				}
				$scope.data[i].category=cat;
				
			}
			chartData();
		});
		
	}
	refresh();
	

	
	
	
	var chartDataResults= function(dateEx){
		temp = {};
		obj = null;
		result = [];
		$scope.labels=[];
		$scope.data2=[];
		var d=dateEx.split('-');
		$http.get('/user/chartdataresults/' +d[0]+'/'+d[1]+'/'+d[2]).success(function(response){
			
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
	
	
	$rootScope.$on('DeleteEvent', function(event, data){
            refresh();
        });
	
	$scope.delete_row = function(expense){
		data="refersh";
		
		$http.delete('/user/expenses_delete/'+expense.token).success(function(response){
			//refresh();
			$rootScope.$emit('DeleteEvent', data);
		}) 
	}
	
	
	$scope.results = function(){

		var d=$scope.DateEx.split('-');
		chartDataResults($scope.DateEx);
		$http.get('/user/expenses_selectedDate/'+d[0]+'/'+d[1]+'/'+d[2]).success(function(response){
			$scope.data=response;
			for(var i=0;i<response.length;i++){
				var cat="";
				for (var j=0;j<response[i].category.length;j++) {
						cat+=response[i].category[j].name+" ";
				}
				$scope.data[i].category=cat;
				
			}
		});
	}

}]);


