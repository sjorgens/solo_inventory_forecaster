//Hookup angular to be used on main HTML page (index.html)
var app = angular.module('routeApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){    //$locationProvider needed to remove #'s in HTML to access controller links
    $routeProvider
        .when('/', {
            templateUrl: 'views/signin.html',
            controller: 'MainController'
        })
        .when('/success', {
            templateUrl: 'views/partpicker.html',
            controller: 'PartPicker'
        })
        .when('/failure', {
            templateUrl: 'views/fail.html',
            controller: 'FailController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'FailController'
        })
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

app.controller('MainController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService){
    //original code
    //$scope.data = {};
    //
    //$scope.submitData = function(){
    //    $http.post('/', $scope.data).then(function(response){
    //        console.log(response);
    //        $location.path(response.data);
    //    });
    //};
    $scope.userData = UserService.userData;

    $http.get('getUser').then(function(response){
        console.log(response);
        $scope.user = response;
    });

    $scope.sendDataAndStuff = function(){
        var loginSuccessful = UserService.makeLoginRequest($scope.data);
        $location.path('success');
    };

}]);

app.controller('FailController', ['$scope', '$http', function($scope, $http){

}]);

app.controller('PartPicker', ['$scope', '$http', 'UserService', function($scope, $http, UserService) {
    $scope.userData = UserService.userData;
    $scope.allParts = [];
    var part1 = {};
    var part2 = {};
    var part3 = {};
    var part4 = {};
    var part5 = {};
    var part6 = {};
    //$scope.partsOrder = [];

    //[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
    //call function to return true once user logs in to turn on header elements in html
    //doesn't work; try implementing with new code from 2/8 lecture
    $scope.loggedIn = false;

    $scope.loggedIn = function(){
      return true;
    };
    //[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]

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
            part1 = {id: $scope.allParts[$scope.allParts.id1 - 1].id,
                value: $scope.allParts.value1
            };
            console.log('part1 object: ', part1);
            $http.post('/api/saveToOrder', part1).then(function(response){
                console.log('saveToOrder response: ', response);
            });
       }
       if($scope.allParts.value2){
           console.log('id2: ', $scope.allParts[$scope.allParts.id2 - 1].id);
           console.log('Value2: ', $scope.allParts.value2);
           part2 = {id: $scope.allParts[$scope.allParts.id2 - 1].id,
               value: $scope.allParts.value2
           };
           console.log('part2 object: ', part2);
           $http.post('/api/saveToOrder', part2).then(function(response){
               console.log('saveToOrder response: ', response);
           });
       }
       if($scope.allParts.value3){
           console.log('id3: ', $scope.allParts[$scope.allParts.id3 - 1].id);
           console.log('Value3: ', $scope.allParts.value3);
           part3 = {id: $scope.allParts[$scope.allParts.id3 - 1].id,
               value: $scope.allParts.value3
           };
           console.log('part3 object: ', part3);
           $http.post('/api/saveToOrder', part3).then(function(response){
               console.log('saveToOrder response: ', response);
           });
       }
       if($scope.allParts.value4){
           console.log('id4: ', $scope.allParts[$scope.allParts.id4 - 1].id);
           console.log('Value4: ', $scope.allParts.value4);
           part4 = {id: $scope.allParts[$scope.allParts.id4 - 1].id,
               value: $scope.allParts.value4
           };
           console.log('part4 object: ', part4);
           $http.post('/api/saveToOrder', part4).then(function(response){
               console.log('saveToOrder response: ', response);
           });
       }
       if($scope.allParts.value5){
           console.log('id5: ', $scope.allParts[$scope.allParts.id5 - 1].id);
           console.log('Value5: ', $scope.allParts.value5);
           part5 = {id: $scope.allParts[$scope.allParts.id5 - 1].id,
               value: $scope.allParts.value5
           };
           console.log('part5 object: ', part5);
           $http.post('/api/saveToOrder', part5).then(function(response){
               console.log('saveToOrder response: ', response);
           });
       }
       if($scope.allParts.value6){
           console.log('id6: ', $scope.allParts[$scope.allParts.id6 - 1].id);
           console.log('Value6: ', $scope.allParts.value6);
           part6 = {id: $scope.allParts[$scope.allParts.id6 - 1].id,
               value: $scope.allParts.value6
           };
           console.log('part6 object: ', part6);
           $http.post('/api/saveToOrder', part6).then(function(response){
               console.log('saveToOrder response: ', response);
           });
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

app.controller('Forecaster', ['$scope', '$http', 'UserService', function($scope, $http, UserService){
    $scope.userData = UserService.userData;
    $scope.partsOrder = [];

    getPartsOrder();

    function getPartsOrder() {
        $http.get('/api/pullOrder').success(function(response){
            console.log(response);
            $scope.partsOrder = response;
            buildOrder();
        });
    };

    function buildOrder() {
        for (var i = 0; i < $scope.partsOrder.length; i++){
            console.log('Qty to Order: ', $scope.partsOrder[i].quantity_required - $scope.partsOrder[i].quantity_available);
            $scope.partsOrder[i].quantity_needed = $scope.partsOrder[i].quantity_required - $scope.partsOrder[i].quantity_available;
        }
        console.log('Complete Order: ', $scope.partsOrder);
    };
}]);

app.factory('UserService', ['$http', function($http){

    var userData = {};

    var makeLoginRequest = function(data){
        $http.post('/', data).then(function(response){
            console.log(response);
            userData.server = response.data;
            userData.username = response.data.username;
            userData.isLoggedIn = true;
            userData.logInTime = new Date();
            if(response.data.username){
                return true;
            } else {
                return false;
            }
        });
    };

    return {
      userData: userData,
        makeLoginRequest: makeLoginRequest
    };
}]);