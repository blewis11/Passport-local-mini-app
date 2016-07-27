angular.module('profileCtrl', []).controller('profileController', function($scope, $http){
	$scope.header = 'Your Profile';
	$scope.subheader = 'Congrats, you are logged in!';
	
	$http.get('/userInfo').then(function(response){
		$scope.firstName = response.data.firstName;
	});
});