//Hookup angular to be used on main HTML page (index.html)
var app = angular.module('routeApp', ['ngRoute', 'ngSanitize', 'ngCsv']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){    //$locationProvider needed to remove #'s in HTML to access controller links
    $routeProvider
        .when('/', {
            templateUrl: 'views/signin.html',
            controller: 'MainController'
        })
        .when('/success', {
            templateUrl: 'views/partpicker.html',
            controller: 'PartPickerController'
        })
        .when('/failure', {
            templateUrl: 'views/signin.html',
            controller: 'MainController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })
        //.when('/signOut', {
        //    templateUrl: '/views/signin.html',
        //    controller: 'signOutController'
        //})
        .when('/partpicker', {
            templateUrl: 'views/partpicker.html',
            controller: 'PartPickerController'
        })
        .when('/forecaster',{
            templateUrl: 'views/forecaster.html',
            controller: 'ForecasterController'
        });
    $locationProvider.html5Mode(true);        //needed to remove #'s from HTML links to access controllers
}]);

app.controller('MainController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService){
    $scope.userData = UserService.userData;
    $scope.userData.notValidUser = true;

    $http.get('getUser').then(function(response){
        //console.log('getUser: ', response);
        $scope.user = response;
    });

    $scope.sendDataAndStuff = function(){
        //send username and password from sign-in page to user service
        UserService.makeLoginRequest($scope.data);
    };

    $scope.signOut = function (){
        //console.log('tripped signOut function');
        $http.get('/signOut').then(function(response){
            console.log('Sign Out Response: ', response);
            $scope.userData.logInUser = false;
            $scope.userData.notValidUser = true;
        });
    };

}]);

app.controller('RegisterController', ['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.user = {
        username: "",
        password: ""
    };

    $http.get('getUser').then(function(response){
        //console.log('getUser: ', response);
        $scope.user = response;
    });

    $scope.sendDataAndStuff = function(){
        //console.log('$scope.data: ', $scope.data);
        UserService.makeLoginRequest($scope.data);
        //console.log('loginSuccessful: ', loginSuccessful);
    };

    $scope.register = function(){
        var params = $scope.user.username + "/" + $scope.user.password;
        $http.post('/registerMe/' + params).then(function(response){
            if (response.data.username) {
                $location.path('/');
            }
        });
    };
}]);

app.controller('FailController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService){
    $scope.userData = UserService.userData;

    $http.get('getUser').then(function(response){
        //console.log('getUser: ', response);
        $scope.user = response;
    });

    $scope.sendDataAndStuff = function(){
        //console.log('$scope.data: ', $scope.data);
        UserService.makeLoginRequest($scope.data);
        //console.log('loginSuccessful: ', loginSuccessful);
    };
}]);

app.controller('PartPickerController', ['$scope', '$http', 'UserService', function($scope, $http, UserService) {
    $scope.userData = UserService.userData;
    $scope.allParts = [];
    var part1 = {};
    var part2 = {};
    var part3 = {};
    var part4 = {};
    var part5 = {};
    var part6 = {};

    //call function to get all parts in 'parts' table
    getParts();

    //post selected parts to 'order' table
    $scope.postPartsOrder = function(){

       //delete all parts from 'order' table
       $http.delete('/api/deleteOrder').success(function(response){
           //console.log('deleteOrder response: ', response);
       });

       //add new parts and required quantities to order table on DOM
       if($scope.allParts.value1){
            //console.log('id1: ', $scope.allParts[$scope.allParts.id1 - 1].id);
            //console.log('Value1: ', $scope.allParts.value1);
            part1 = {id: $scope.allParts[$scope.allParts.id1 - 1].id,
                value: $scope.allParts.value1
            };
            //console.log('part1 object: ', part1);
            $http.post('/api/saveToOrder', part1).then(function(response){
                //console.log('saveToOrder response: ', response);
            });
       }
       if($scope.allParts.value2){
           //console.log('id2: ', $scope.allParts[$scope.allParts.id2 - 1].id);
           //console.log('Value2: ', $scope.allParts.value2);
           part2 = {id: $scope.allParts[$scope.allParts.id2 - 1].id,
               value: $scope.allParts.value2
           };
           //console.log('part2 object: ', part2);
           $http.post('/api/saveToOrder', part2).then(function(response){
               //console.log('saveToOrder response: ', response);
           });
       }
       if($scope.allParts.value3){
           //console.log('id3: ', $scope.allParts[$scope.allParts.id3 - 1].id);
           //console.log('Value3: ', $scope.allParts.value3);
           part3 = {id: $scope.allParts[$scope.allParts.id3 - 1].id,
               value: $scope.allParts.value3
           };
           //console.log('part3 object: ', part3);
           $http.post('/api/saveToOrder', part3).then(function(response){
               //console.log('saveToOrder response: ', response);
           });
       }
       if($scope.allParts.value4){
           //console.log('id4: ', $scope.allParts[$scope.allParts.id4 - 1].id);
           //console.log('Value4: ', $scope.allParts.value4);
           part4 = {id: $scope.allParts[$scope.allParts.id4 - 1].id,
               value: $scope.allParts.value4
           };
           //console.log('part4 object: ', part4);
           $http.post('/api/saveToOrder', part4).then(function(response){
               //console.log('saveToOrder response: ', response);
           });
       }
       if($scope.allParts.value5){
           //console.log('id5: ', $scope.allParts[$scope.allParts.id5 - 1].id);
           //console.log('Value5: ', $scope.allParts.value5);
           part5 = {id: $scope.allParts[$scope.allParts.id5 - 1].id,
               value: $scope.allParts.value5
           };
           //console.log('part5 object: ', part5);
           $http.post('/api/saveToOrder', part5).then(function(response){
               //console.log('saveToOrder response: ', response);
           });
       }
       if($scope.allParts.value6){
           //console.log('id6: ', $scope.allParts[$scope.allParts.id6 - 1].id);
           //console.log('Value6: ', $scope.allParts.value6);
           part6 = {id: $scope.allParts[$scope.allParts.id6 - 1].id,
               value: $scope.allParts.value6
           };
           //console.log('part6 object: ', part6);
           $http.post('/api/saveToOrder', part6).then(function(response){
               //console.log('saveToOrder response: ', response);
           });
       }
    }

    //get all parts from 'parts' table
    function getParts() {
        $http.get('/api/pullAllParts').success(function(response){
            //console.log(response);
            $scope.allParts = response;
        });
    };

}]);

app.controller('ForecasterController', ['$scope', '$http', 'UserService', function($scope, $http, UserService){
    $scope.userData = UserService.userData;
    $scope.partsOrder = [];
    $scope.createCSV = [{
        part_number: "Part Number",
        manufacturer: "Manufacturer",
        part_description: "Part Description",
        quantity_required: "Quantity Required",
        quantity_available: "Quantity Available",
        quantity_needed: "Quantity to Order"
    }];

    //call function to build an array of parts from 'order' table
    getPartsOrder();

    //pull the order from the 'order' table and set equal to the parsOrder array then call buildOrder function
    function getPartsOrder() {
        $http.get('/api/pullOrder').success(function(response){
            //console.log(response);
            $scope.partsOrder = response;
            buildOrder();
        });
    };

    //calculates the quantity needed for each part and adds that value as a new key pair to the part object in the partsOrder array
    function buildOrder() {
        for (var i = 0; i < $scope.partsOrder.length; i++){
            //console.log('Qty to Order: ', $scope.partsOrder[i].quantity_required - $scope.partsOrder[i].quantity_available);
            $scope.partsOrder[i].quantity_needed = $scope.partsOrder[i].quantity_required - $scope.partsOrder[i].quantity_available;
        }
        createCSV();
        //console.log('Complete Order: ', $scope.partsOrder);
    };

    //takes the initial createCSV array with headers and pushes all the objects from partsOrder array onto it to complete the createCSV file for export
    function createCSV() {
        for (var i = 0; i < $scope.partsOrder.length; i++){
            $scope.createCSV.push($scope.partsOrder[i]);
        }
    };
}]);

app.factory('UserService', ['$http', '$location', function($http, $location){

    var userData = {};

    var makeLoginRequest = function(data){
        $http.post('/', data).then(function(response){
            //console.log('makeLoginRequest response: ', response);
            userData.server = response.data;
            userData.username = response.data.username;
            userData.isLoggedIn = true;
            userData.logInTime = new Date();

            //   don't understand what this is for
            if(response.data.username){
            //if(response.config.data.username){
                userData.logInUser = true;
                userData.notValidUser = true;
                $location.path('success');
            } else {
                //console.log('Username not captured.');
                //$location.path('failure');
                userData.logInUser = false;
                userData.notValidUser = false;
                $location.path('');
            }
        });
    };

    return {
      userData: userData,
        makeLoginRequest: makeLoginRequest
    };
}]);