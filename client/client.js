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
    //$scope.partsOrder = [];

    //call function to get all parts in parts table
    getParts();




    //post selected parts to order table
    $scope.postPartsOrder = function(){

       //delete all parts from order table
       $http.delete('/api/deleteOrder').success(function(response){
           console.log('deleteOrder response: ', response);
       });

       //add new parts and required quantities to order table
       if($scope.allParts.value1){
            console.log('id1: ', $scope.allParts[$scope.allParts.id1 - 1].id);
            console.log('Value1: ', $scope.allParts.value1);
       }
       if($scope.allParts.value2){
           console.log('id2: ', $scope.allParts[$scope.allParts.id2 - 1].id);
           console.log('Value2: ', $scope.allParts.value2);
       }
       if($scope.allParts.value3){
           console.log('id3: ', $scope.allParts[$scope.allParts.id3 - 1].id);
           console.log('Value3: ', $scope.allParts.value3);
       }
       if($scope.allParts.value4){
           console.log('id4: ', $scope.allParts[$scope.allParts.id4 - 1].id);
           console.log('Value4: ', $scope.allParts.value4);
       }
       if($scope.allParts.value5){
           console.log('id5: ', $scope.allParts[$scope.allParts.id5 - 1].id);
           console.log('Value5: ', $scope.allParts.value5);
       }
       if($scope.allParts.value6){
           console.log('id6: ', $scope.allParts[$scope.allParts.id6 - 1].id);
           console.log('Value6: ', $scope.allParts.value6);
       }
    }

    //get all parts from parts table
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