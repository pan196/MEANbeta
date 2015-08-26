'use strict';

var app = angular
    .module('app', ['ngResource', 'ngRoute'])
    .value('toastr', toastr)
    .config(function ($routeProvider, $locationProvider) {

        var routeUserChecks = {
            adminRole: {
                authenticate: function(authentication) {
                    return authentication.isInRole('admin');
                }
            },
            isAuth: {
                authenticate: function(authentication) {
                    return authentication.isAuth();
                }
            }
        };

        $routeProvider
            .when('/', {
                templateUrl: 'partials/main/home',
                controller: 'MainCtrl'
            })
            .when('/courses', {
                templateUrl: 'partials/courses/courses-list',
                controller: 'CoursesCtrl'
            })
            .when('/courses/:id', {
                templateUrl: 'partials/courses/course-details',
                controller: 'CoursesCtrl'
            })
            .when('/profile', {
                templateUrl: 'partials/account/profile',
                controller: 'ProfileCtrl',
                resolve: routeUserChecks.isAuth
            })
            .when('/signup', {
                templateUrl: 'partials/account/sign-up',
                controller: 'SignUpCtrl'
            })
            .when('/admin/users', {
                templateUrl: 'partials/admin/users-list',
                controller: 'UserListCtrl',
                resolve: routeUserChecks.adminRole
            })

    });

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, curr, prev, rejection) {
        console.log(rejection);
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});