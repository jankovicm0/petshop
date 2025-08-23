(function () {
  'use strict';

  angular.module('petShopApp')
    .controller('ChatController', function ($scope, DataService) {
      $scope.chat = {
        open: false,
        name: "ChatBot",
        input: "",
        messages: []
      };

      $scope.toggle = function () {
        $scope.chat.open = !$scope.chat.open;
      };

      $scope.send = function () {
        var text = ($scope.chat.input || "").trim();
        if (!text) return;
        $scope.chat.messages.push({ me: true, text: text });
        $scope.chat.input = "";

        var reply = handleUserMessage(text.toLowerCase());
        $scope.chat.messages.push({ me: false, text: reply });
      };

      function handleUserMessage(msg) {
        var pets = DataService.allPets();

        if (msg.includes("koje") && msg.includes("zivotinje")) {
          var species = [...new Set(pets.map(p => p.species))];
          return "U ponudi imamo: " + species.join(", ") + ".";
        }

        if (msg.includes("pse")) {
          var dogs = pets.filter(p => p.species === "Pas").map(p => p.name);
          return dogs.length ? "Psi: " + dogs.join(", ") : "Trenutno nemamo pasa.";
        }

        if (msg.includes("macke")) {
          var cats = pets.filter(p => p.species === "Macka").map(p => p.name);
          return cats.length ? "Macke: " + cats.join(", ") : "Trenutno nemamo macaka.";
        }

        if (msg.includes("ptice")) {
          var birds = pets.filter(p => p.species === "Ptica").map(p => p.name);
          return birds.length ? "Ptice: " + birds.join(", ") : "Trenutno nemamo ptica.";
        }

        if (msg.includes("ribe") || msg.includes("ribice")) {
          var fish = pets.filter(p => p.species === "Ribica").map(p => p.name);
          return fish.length ? "Ribice: " + fish.join(", ") : "Trenutno nemamo ribica.";
        }

        if (msg.includes("koliko") && msg.includes("ukupno") && msg.includes("zivotinja")) {
          return "Ukupno imamo " + pets.length + " ljubimaca u ponudi.";
        }

        if (msg.includes("koliko kosta")) {
          var words = msg.split(" ");
          var name = words[words.length - 1];
          var pet = pets.find(p => p.name.toLowerCase() === name);
          if (pet) {
            return pet.name + " košta " + pet.price + "€.";
          } else {
            return "Nisam pronasao ljubimca sa imenom " + name + ".";
          }
        }

        if (msg.includes("prosečna ocena")) {
          var target = null;
          if (msg.includes("mač")) target = "Mačka";
          else if (msg.includes("pas")) target = "Pas";
          else if (msg.includes("ptic")) target = "Ptica";
          else if (msg.includes("rib")) target = "Ribica";

          if (target) {
            var arr = pets.filter(p => p.species === target);
            if (arr.length) {
              var avg = arr.reduce((s,p)=>s+p.rating,0) / arr.length;
              return "Prosecna ocena za " + target.toLowerCase() + "e je " + avg.toFixed(1) + "★.";
            } else {
              return "Nemamo " + target.toLowerCase() + " trenutno.";
            }
          }
        }

        return "Nemam odgovor za to pitanje. Probaj npr: 'koje sve zivotinje imate', 'koliko ukupno zivotinja imaš', 'koliko kosta Krypto'.";
      }
    });

})();
