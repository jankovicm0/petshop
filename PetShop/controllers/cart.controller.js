(function(){
  'use strict';
  angular.module('petShopApp')
    .controller('CartController', function(DataService){
      var vm = this;
      vm.items = DataService.getCart();
      vm.total = DataService.total();
      vm.statusOptions = ['u toku','otkazano','preuzeto'];
      vm.remove = function(item){
        if(item.status !== 'preuzeto'){
          if(!confirm('Ukloniti ovu rezervaciju iz korpe?')) return;
          DataService.removeFromCart(item.id);
          vm.items = DataService.getCart();
          vm.total = DataService.total();
        } else {
          if(confirm('Obrisati porudžbinu u statusu "preuzeto"?')){
            DataService.removeFromCart(item.id);
            vm.items = DataService.getCart();
            vm.total = DataService.total();
          }
        }
      };
      vm.update = function(item){
        if(item.status === 'u toku' || item.status === 'otkazano'){
          DataService.updateOrder(item);
          vm.total = DataService.total();
        } else if(item.status === 'preuzeto'){
          DataService.updateOrder(item);
          vm.total = DataService.total();
        }
      };
    });
})();