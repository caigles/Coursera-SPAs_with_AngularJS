(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'src/templates/home.template.html'
      })

      // Categories page
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/templates/categories.template.html',
        controller: 'CategoryListController as catList',
        resolve: {
          items: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      // Category items
      .state('detail', {
        url: '/detail/{category}',
        templateUrl: 'src/templates/items.template.html',
        controller: "ItemListController as itemList",
        resolve: {
          items: ['MenuDataService', '$stateParams',
            function (MenuDataService, $stateParams) {
              return MenuDataService.getItemsForCategory($stateParams.category);
            }]
        }
      });

  }

})();
