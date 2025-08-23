(function () {
  'use strict';

  angular.module('petShopApp')
    .controller('PetController', function ($routeParams, DataService, $scope, $timeout) {
      var vm = this;

      var id = Number($routeParams.id);
      vm.pet = DataService.getPet(id);
      vm.reviews = DataService.getReviews(id) || [];

      vm.newReview = { rating: null, text: '' };
      vm.err = '';
      vm.ok = '';

      vm.addReview = function () {
        var rating = Number(vm.newReview.rating);
        var text = (vm.newReview.text || '').trim();

        if (!(rating >= 1 && rating <= 5)) {
          vm.err = 'Ocena mora biti broj od 1 do 5.';
          vm.ok = '';
          return;
        }
        if (text.length < 2) {
          vm.err = 'Tekst može biti kratak, ali mora imati bar 2 znaka.';
          vm.ok = '';
          return;
        }

        DataService.addReview(vm.pet.id, rating, text);

        vm.reviews = DataService.getReviews(vm.pet.id);
        vm.newReview = { rating: null, text: '' };
        vm.err = '';
        vm.ok = 'Recenzija je uspesno dodata. Hvala!';

        if ($scope.reviewForm) {
          $scope.reviewForm.$setPristine();
          $scope.reviewForm.$setUntouched();
        }

        $timeout(function(){ vm.ok = ''; }, 2500);
      };
    });

})();
