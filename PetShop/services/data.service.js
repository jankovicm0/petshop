(function(){
  'use strict';
  angular.module('petShopApp')
    .factory('DataService', function(StorageService, $rootScope){
      var svc = {}, data = StorageService.get('data');

      var DOG = ["assets/pets/krypto.webp", "assets/pets/kuca.jfif", "assets/pets/beautiful-pet-portrait-dog.jpg"];
      var CAT = ["assets/pets/maca.jfif", "assets/pets/maca2.webp", "assets/pets/maca3.jpg"];
      var BIRD= ["assets/pets/ptica.webp","assets/pets/ptica2.jpg"];
      var FISH= ["assets/pets/ribica.jpg","assets/pets/ribica2.jpg","assets/pets/ribica3.jpg"];

      function pick(arr, idx){ return arr[(idx % arr.length)]; }

      var defaults = {
        pets: [
          { id:1,  name:"Krypto",   species:"Pas",   size:"Mala",    origin:"Srbija",    age:2, price:250, rating:4.7, image:pick(DOG,0),  description:"Drustvena i prilagodljiva.", care:"2x dnevno hrana, setnja." },
          { id:2,  name:"Roki",  species:"Pas",   size:"Srednja", origin:"SAD",       age:3, price:320, rating:4.6, image:pick(DOG,1),  description:"Voli aktivnosti.", care:"Trcanje, dresura." },
          { id:3,  name:"Reks",  species:"Pas",   size:"Velika",  origin:"Nemačka",   age:4, price:400, rating:4.8, image:pick(DOG,2),  description:"Za aktivne vlasnike.", care:"Duze setnje, trening." },

          { id:4,  name:"Mic",   species:"Macka", size:"Srednja", origin:"Hrvatska",  age:1, price:180, rating:4.5, image:pick(CAT,0),  description:"Mirna, voli maženje.", care:"Suva hrana umereno." },
          { id:5,  name:"Mac",   species:"Macka", size:"Velika",  origin:"Turska",    age:5, price:220, rating:4.2, image:pick(CAT,1),  description:"Dostojanstvena.", care:"Negovanje krzna." },
          { id:6,  name:"Redzi",    species:"Macka", size:"Mala",    origin:"BiH",       age:2, price:150, rating:4.3, image:pick(CAT,2),  description:"Igriva i radoznala.", care:"Igračke, grebalica." },

          { id:7,  name:"Feniks",    species:"Ptica", size:"Mala",    origin:"Brazil",    age:3, price:120, rating:4.2, image:pick(BIRD,0), description:"Vedar, voli društvo.", care:"Cista voda, prozracan kavez." },
          { id:8,  name:"Kika",   species:"Ptica", size:"Srednja", origin:"Peru",      age:5, price:200, rating:4.0, image:pick(BIRD,1), description:"Voli melodije.", care:"Interakcija i igra." },
          { id:12, name:"Kiki",   species:"Ptica", size:"Mala",    origin:"Srbija",    age:2, price:90,  rating:4.1, image:pick(BIRD,2), description:"Vesela, pricljiva.", care:"Cistoca i drustvo." },

          { id:9,  name:"Nemo",   species:"Ribica",size:"Mala",    origin:"Indonezija",age:1, price:60,  rating:4.1, image:pick(FISH,0), description:"Lako se odrzava.", care:"Filtracija, ceste promene vode." },
          { id:10, name:"Keba",species:"Ribica",size:"Mala",    origin:"Japan",     age:1, price:80,  rating:4.4, image:pick(FISH,1), description:"Smirena, dekorativna.", care:"Stabilna temp., biljke." },
          { id:11, name:"Sushi",  species:"Ribica",size:"Mala",    origin:"Kina",      age:1, price:55,  rating:4.0, image:pick(FISH,2), description:"Za pocetnike.", care:"Redovno hranjenje." }
        ],
        cart: [],
        reviews: [],
        auth: { user: null },
        profile: null
      };

      svc.init = function(){
        if(!data){ data = defaults; StorageService.set('data', data); }
        else if(!Array.isArray(data.pets) || data.pets.length !== 12){
          data.pets = defaults.pets; StorageService.set('data', data);
        }
      };

      function save(){ StorageService.set('data', data); }

      svc.getAuth = function(){ return data.auth; };
      svc.login = function(email,password){
        data.auth.user = { id:1, email };
        if(!data.profile){
          data.profile = { firstName:"Ime", lastName:"Prezime", email, phone:"", address:"", favorites:[], username: email.split('@')[0] };
        }
        save(); $rootScope.$broadcast('authChanged');
      };
      svc.logout = function(){ data.auth.user = null; save(); $rootScope.$broadcast('authChanged'); };
      svc.register = function(profile){ data.profile = angular.copy(profile); data.auth.user = {id:1,email:profile.email}; save(); $rootScope.$broadcast('authChanged'); };
      svc.getProfile  = function(){ return data.profile; };
      svc.updateProfile = function(profile){ data.profile = angular.copy(profile); save(); };

      svc.allPets = function(){ return data.pets; };
      svc.getPet  = function(id){ return data.pets.find(p => p.id == id); };
      svc.search  = function(criteria){
        return data.pets.filter(function(p){
          function between(v, lo, hi){ if(lo!=null && v<lo) return false; if(hi!=null && v>hi) return false; return true; }
          var ok = true;
          if(criteria.name)   ok = ok && p.name.toLowerCase().includes(criteria.name.toLowerCase());
          if(criteria.text)   ok = ok && p.description.toLowerCase().includes(criteria.text.toLowerCase());
          if(criteria.species)ok = ok && p.species === criteria.species;
          if(criteria.size)   ok = ok && p.size === criteria.size;
          if(criteria.origin) ok = ok && p.origin.toLowerCase().includes(criteria.origin.toLowerCase());
          ok = ok && between(p.age,   criteria.minAge,  criteria.maxAge);
          ok = ok && between(p.price, criteria.minPrice,criteria.maxPrice);
          if(criteria.minRating) ok = ok && p.rating >= criteria.minRating;
          return ok;
        });
      };

      svc.addReview = function(petId, rating, text){
        data.reviews.push({ petId, rating, text, at: new Date().toISOString() });
        var pr = data.reviews.filter(r => r.petId == petId);
        var avg = pr.reduce((s,r)=>s+r.rating,0)/pr.length;
        var pet = svc.getPet(petId);
        if(pet) pet.rating = Math.round(avg*10)/10;
        save();
      };
      svc.getReviews = function(petId){ return data.reviews.filter(r => r.petId == petId); };

      svc.getCart = function(){ return data.cart; };
      svc.addToCart = function(petId){
        var pet = svc.getPet(petId);
        var item = { id: Date.now(), petId, name: pet.name, price: pet.price, status: 'u toku' };
        data.cart.push(item); save(); return item;
      };
      svc.removeFromCart = function(itemId){ data.cart = data.cart.filter(c => c.id !== itemId); save(); };
      svc.updateOrder = function(item){
        var i = data.cart.findIndex(c => c.id === item.id);
        if(i >= 0) data.cart[i] = angular.copy(item);
        save();
      };
      svc.total = function(){ return data.cart.reduce((s,c)=>s + c.price, 0); };

      return svc;
    });
})();
