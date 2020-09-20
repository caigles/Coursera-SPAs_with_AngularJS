(function () {
  'use strict';

  // angular.module('MenuApp')
  angular.module('data')
    .service('MenuDataService', MenuDataService);


  MenuDataService.$inject = ['$http', 'ApiBasePath']
  function MenuDataService($http, ApiBasePath) {

    var service = this;

    service.getAllCategories = () => {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      });
    };

    service.getItemsForCategory = (categoryShortName) => {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
      });
    };

  }

})();
