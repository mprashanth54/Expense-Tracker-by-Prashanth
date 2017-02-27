
angular.module('routerApp').controller('newCategoryCtrl',
  ['$http','$scope','$filter', '$location','$timeout','$filter',
  function ($http,$scope,$filter,$state,$stateParams) {
	  
$scope.success=false;
$scope.error=false;
$scope.cat={};
$scope.category=[];
var refresh = function(){
	$http.get('/user/category').success(function(response){
		$scope.category=response;
	})
}
refresh();

$scope.submitForm= function(isValid){
	if(isValid){
		var objects = $filter('filter')($scope.category, { name: $scope.cat.name });
		$scope.cat.timestamp=new Date();
		if(objects.length==0){
			$http.post('/user/category',$scope.cat).success(function(response){
				$scope.success=true;
				$scope.cat={};
				refresh();
			});
		}
		else{
			$scope.error=true;
			$scope.cat={};
		}
		
		}
	}

}]);