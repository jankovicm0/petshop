(function () {
  'use strict';

  angular.module('petShopApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $locationProvider.hashPrefix('');

      $routeProvider
        .when('/',        { templateUrl: 'views/catalog.html', controller: 'CatalogController', controllerAs: 'vm' })
        .when('/pet/:id', { templateUrl: 'views/pet.html',     controller: 'PetController',    controllerAs: 'vm' })
        .when('/cart',    { templateUrl: 'views/cart.html',    controller: 'CartController',   controllerAs: 'vm' })
        .when('/profile', { templateUrl: 'views/profile.html', controller: 'ProfileController',controllerAs: 'vm' })
        .when('/auth',    { templateUrl: 'views/auth.html',    controller: 'AuthController',   controllerAs: 'vm' })

        .otherwise({ redirectTo: '/' });
    }])
    .controller('ShellController', function($scope, DataService){
      $scope.auth = DataService.getAuth();
      $scope.$on('authChanged', function(){ $scope.auth = DataService.getAuth(); });
    })
    .run(function(DataService){
      DataService.init();
    });

})();
