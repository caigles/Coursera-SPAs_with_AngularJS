(function () {
  'use strict';

  angular.module('MenuApp')
    .component('items', {
      templateUrl: 'src/templates/item-list.template.html',
      bindings: {
        items: '<'
      }
    });

})();
