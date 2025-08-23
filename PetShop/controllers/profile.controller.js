(function(){
  'use strict';
  angular.module('petShopApp')
    .controller('ProfileController', function(DataService){
      var vm = this;
      vm.profile = angular.copy(DataService.getProfile()) || { firstName:'', lastName:'', email:'', phone:'', address:'', favorites:[], username:'' };
      vm.save = function(){ DataService.updateProfile(vm.profile); alert('Profil sacuvan.'); };
      vm.favoritesText = function(){ return (vm.profile.favorites||[]).join(', '); };
    });
})();