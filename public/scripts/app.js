'use strict';

var app = angular
    .module('app', ['ngResource', 'ngRoute'])
    .controller('MainCtrl', function($scope) {
        $scope.hello = 'Hi from angular!';
    })
    .config(function ($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider.when('/', {
            templateUrl: 'partials/home',
            controller: 'MainCtrl'
        })
    });