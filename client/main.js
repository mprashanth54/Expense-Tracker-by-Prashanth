var routerApp = angular.module('routerApp', ['ui.router','ui.bootstrap','chart.js','mp.datePicker']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
			
			views: {

            // the main template will be placed here (relatively named)
			'': {  
				templateUrl: 'partials/home.html',
				controller:'homeCtrl'
			},
			
            'header@home': {  
				templateUrl: 'partials/home.headers.html',
				controller:'headerCtrl'
			},

            // the child views will be defined here (absolutely named)
            'daily@home': { 
				templateUrl: 'partials/home.daily.html',
				controller:'dailyCtrl'
			},

            // for column two, we'll define a separate controller 
            'weekly@home': { 
                templateUrl: 'partials/home.weekly.html',
				controller:'weeklyCtrl'
            },
			'monthly@home': { 
                templateUrl: 'partials/home.monthly.html',
				controller:'monthlyCtrl'
            }
        }  
        })
		.state('add', {
            url: '/add',
			
			views: {

            // the main template will be placed here (relatively named)
			'': {  
				templateUrl: 'partials/add.html',
				controller:'addCtrl'
			},
            // the child views will be defined here (absolutely named)
            'new@add': { 
				templateUrl: 'partials/add.new.html',
				controller:'newCtrl'
			}

        }  
        })
		.state('category', {
            url: '/category',
			
			views: {

            // the main template will be placed here (relatively named)
			'': {  
				templateUrl: 'partials/category.html'
			},
			

            // the child views will be defined here (absolutely named)
            'new@category': { 
				templateUrl: 'partials/category.new.html',
				controller:'newCategoryCtrl'
			},

        }  
        })
	/* .state('daily', {
            url: '/category',
			
			views: {

            // the main template will be placed here (relatively named)
			'': {  
				templateUrl: 'partials/daily.html'
			},
			

            // the child views will be defined here (absolutely named)
            'display@daily': { 
				templateUrl: 'partials/daily.display.html',
				controller:'dailyDisplayCtrl'
			},

        }  
        }) */
});

routerApp.controller('homeCtrl', function($scope,$state,$stateParams) {

    
});

/*   routerApp.controller('headerCtrl', function($scope,$state,$stateParams) {
  
    
});  */ 

/* routerApp.controller('dailyCtrl', function($scope,$state,$stateParams) {

    
});  */

/* routerApp.controller('weeklyCtrl', function($scope,$state,$stateParams) {
    
    
}); */

routerApp.controller('monthlyCtrl', function($scope,$state,$stateParams) {
    
    
});
routerApp.controller('addCtrl', function($scope,$state,$stateParams) {
    
    
});

/* routerApp.controller('newCtrl', function($scope,$state,$stateParams,$http) {
   $scope.success=false;
$scope.user={};
var day = new Date();
var month=(day.getMonth()+1)<10?"0"+(day.getMonth()+1).toString():(day.getMonth()+1).toString();
var d=day.getDate()<10?"0"+day.getDate().toString():day.getDate().toString();
$scope.today=day.getFullYear().toString()+"-"+month+"-"+d;
console.log($scope.today);

$scope.formData = {};
    
    $scope.formData.selectedFruits = {};
    
    $scope.fruits = [{'name':'Apple', 'id':1,'checked':false}, {'name':'Orange', 'id':2,'checked':false}, {'name':'Banana', 'id':3,'checked':false}, {'name':'Mango', 'id':4,'checked':false},];
    
    $scope.someSelected = function (object) {
      return Object.keys(object).some(function (key) {
        return object[key];
      });
    }


$scope.submitForm= function(isValid){
	if(isValid){
		console.log($scope.formData);
		console.log($scope.formData.selectedFruits);
		$scope.user.category=[];	
		for (var k in $scope.formData.selectedFruits) {
			if ($scope.formData.selectedFruits.hasOwnProperty(k)) {
				var cat={};
			    cat[k] = $scope.user.amount;
			   console.log(cat);
			   $scope.user.category.push(cat);
			}
		}
		var d=$scope.user.date.split('-');
		$scope.user.year=d[0];
		$scope.user.month=d[1];
		$scope.user.day=d[2];
		delete $scope.user.date;
		
		
		$http.post('/user/expenses',$scope.user).success(function(response){
			console.log(response);
			$scope.success=true;
		})
		
		$scope.formData.selectedFruits={};
		console.log($scope.user);
		$scope.user={};
		
	}
}
	
}); */