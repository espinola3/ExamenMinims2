// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.controller('StudentController', ['$scope','$http', function($scope, $http) {
    $scope.newStudent = {};
    $scope.students = {};
    $scope.selected = false;
	var dir = "localhost";

    // Obtenemos todos los datos de la base de datos
    $http.get('http://localhost:8080/api/student').success(function (data) {
            $scope.students = data;
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // Función para registrar a un estudiante
    $scope.registrarStudent = function (res) {


            $http.post('http://'+ dir +':8080/api/student', $scope.newStudent)
                .success(function (data) {
                    if(data==false) {
                        alert("Fijo y móbil deben ser números");
                    }
                    else {
                        $scope.cleanall(); // Borramos los datos del formulario
                        $scope.students = data;
                    }
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });


    };

    // Función para editar los datos de un estudiante
    $scope.modificarStudent = function (newStudent) {
        $http.put('http://'+ dir +':8080/api/student/' + $scope.newStudent._id, $scope.newStudent)
            .success(function (data) {
                $scope.cleanall(); // Borramos los datos del formulario
                $scope.students = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función que borra un objeto student conocido su id
    $scope.borrarStudent = function (newStudent) {
        $http.delete('http://'+ dir +':8080/api/student/' + $scope.newStudent._id)
            .success(function (data) {
                $scope.cleanall();
                $scope.students = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectStudent = function (student) {
        $scope.newStudent = student;
        $scope.selected = true;
        console.log($scope.newStudent, $scope.selected);
    };


    $scope.cleanall = function () {
        $scope.newStudent = {};
    };

}]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
