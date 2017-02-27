angular.module('routerApp', []).controller('homeCtrl', function($scope,$state,$stateParams) {
	console.log("Inside Home Ctrl");
	$scope.name="testing";
	$scope.open1 =function(){
		console.log("open 1");
		$state.go('home.page');
	}
	$scope.open2 =function(){
		console.log("open 1");
		$state.go('home.page');
	}
	$scope.open3 =function(){
		console.log("open 1");
		$state.go('home.page');
	}
});