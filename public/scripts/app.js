'use strict';

var app = angular
    .module('app', ['ngResource', 'ngRoute'])
    .value('toastr', toastr)
    .config(function ($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider.when('/', {
            templateUrl: 'partials/main/home',
            controller: 'MainCtrl'
        })
    });