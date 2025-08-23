(function(){
  'use strict';
  angular.module('petShopApp')
    .factory('StorageService', function(){
      function get(key, fallback){
        try {
          var raw = localStorage.getItem(key);
          return raw ? JSON.parse(raw) : (fallback !== undefined ? fallback : null);
        } catch(e){ return fallback !== undefined ? fallback : null; }
      }
      function set(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
      return { get: get, set: set };
    });
})();