(function(){
  'use strict';
  angular.module('petShopApp')
    .controller('AuthController', function(DataService, $location){
      var vm = this;
      vm.mode = DataService.getAuth().user ? 'logout' : 'login';
      vm.loginData = { email: '', password: '' };
      vm.registerData = { firstName:'', lastName:'', email:'', phone:'', address:'', favorites:[], username:'', password:'' };

      vm.login = function(){ DataService.login(vm.loginData.email, vm.loginData.password); $location.path('/'); };
      vm.logout = function(){ DataService.logout(); $location.path('/'); };
      vm.register = function(){ DataService.register(vm.registerData); $location.path('/'); };
    });
})();