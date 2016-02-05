//Hookup angular to be used on main HTML page (index.html)
var app = angular.module('routeApp', ['ngRoute']);

//Global variables for testing purposes


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){    //$locationProvider needed to remove #'s in HTML to access controller links
    $routeProvider
        .when('/partpicker', {
            templateUrl: 'views/partpicker.html',
            controller: 'PartPicker'
        })
        .when('/forecaster',{
            templateUrl: 'views/forecaster.html',
            controller: 'Forecaster'
        });
    $locationProvider.html5Mode(true);        //needed to remove #'s from HTML links to access controllers
}]);


app.controller('PartPicker', ['$scope', '$http', function($scope, $http) {
    $scope.allParts = [];

    getParts();

    function getParts() {
        $http.get('/api/pullAllParts').success(function(response){
            console.log(response);
            $scope.allParts = response;
        });
    };

}]);

app.controller('Forecaster', ['$scope', '$http', function($scope, $http){
    $scope.partsOrder = [];

    getPartsOrder();

    function getPartsOrder() {
        $http.get('/api/pullOrder').success(function(response){
            console.log(response);
            $scope.partsOrder = response;
        });
    };

}]);