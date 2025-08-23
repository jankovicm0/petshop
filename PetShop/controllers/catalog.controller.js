(function(){
  'use strict';
  angular.module('petShopApp')
    .controller('CatalogController', function(DataService){
      var vm = this;
      vm.criteria = { name: '', text: '', species: '', size: '', origin: '', minAge: null, maxAge: null, minPrice: null, maxPrice: null, minRating: null };
      vm.pets = DataService.allPets();
      vm.filtered = vm.pets;
      vm.speciesOptions = ['Pas','Macka','Ptica','Ribica'];
      vm.sizeOptions = ['Mala','Srednja','Velika'];
      vm.search = function(){ vm.filtered = DataService.search(vm.criteria); };
      vm.clear = function(){ vm.criteria = { name: '', text: '', species: '', size: '', origin: '', minAge: null, maxAge: null, minPrice: null, maxPrice: null, minRating: null }; vm.search(); };
      vm.reserve = function(p){ DataService.addToCart(p.id); alert('Rezervisan '+p.name+' (dodat u korpu).'); };
      vm.search();
    });
})();