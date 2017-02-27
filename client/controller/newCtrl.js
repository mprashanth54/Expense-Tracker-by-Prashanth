
angular.module('routerApp').controller('newCtrl',
  ['$http','$scope', '$location','$timeout','$filter',
  function ($http,$scope,$state,$stateParams) {
	  
$scope.category=[];
var refresh=function(){
	$http.get('/user/category').success(function(response){
		$scope.category=response;
	})
}
refresh();
$scope.success=false;
$scope.user={};
var day = new Date();
var month=(day.getMonth()+1)<10?"0"+(day.getMonth()+1).toString():(day.getMonth()+1).toString();
var d=day.getDate()<10?"0"+day.getDate().toString():day.getDate().toString();
$scope.today=day.getFullYear().toString()+"-"+month+"-"+d;

$scope.formData = {};
    
    $scope.formData.selectedCategory = {};
    
    $scope.someSelected = function (object) {
      return Object.keys(object).some(function (key) {
        return object[key];
      });
    }

var GenToken = function(){
		var stringLength = 15;
		var stringArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h',
						'i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
						'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	
		var rndString = "";
		for(var i = 1; i < stringLength ; i++){
			var rndNum = Math.ceil(Math.random()*stringArray.length)-1;
			rndString = rndString + stringArray[rndNum];
		}
		return rndString;
}
$scope.submitForm= function(isValid){
	if(isValid){
		var d=$scope.user.date.split('-');
		var dateNow=new Date();
		$scope.user.token=GenToken();
		$scope.user.timestamp=dateNow;
		$scope.user.year=parseInt(d[0]);
		$scope.user.month=parseInt(d[1]);
		$scope.user.day=parseInt(d[2]);
		delete $scope.user.date;
		$scope.user.category=[];	
		for (var k in $scope.formData.selectedCategory) {
			if ($scope.formData.selectedCategory.hasOwnProperty(k)) {
				var cat={};
			    cat['name'] = k;
				cat['amount']=$scope.user.amount;
				cat['year']=parseInt(d[0]);
				cat['month']=parseInt(d[1]);
				cat['day']=parseInt(d[2]);
				cat['timestamp']=dateNow;
				cat['token']=$scope.user.token;
			   console.log(cat);
			   $scope.user.category.push(cat);
			}
		}
		
		
		
		$http.post('/user/expenses',$scope.user).success(function(response){
			$scope.success=true;
		});
		
		$scope.formData.selectedCategory={};
		$scope.user={};
		
	}
}

}]);