(function () {
  'use strict';

  angular.module('MenuApp')
    .component('categories', {
      templateUrl: 'src/templates/category-list.template.html',
      bindings: {
        items: '<'
      }
    });

})();
