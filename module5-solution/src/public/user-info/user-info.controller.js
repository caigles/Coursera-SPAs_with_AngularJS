(function () {
  'use strict';

  angular.module('public')
    .controller('UserInfoController', UserInfoController);

  UserInfoController.$inject = ['MenuService', 'UserRegService']
  function UserInfoController(MenuService, UserRegService) {
    var ctrl = this;

    ctrl.isRegistered = UserRegService.getIsRegistered();
    ctrl.user = UserRegService.getUserInfo();

    if (ctrl.isRegistered) {
      MenuService.getMenuItem(ctrl.user.favDish)
        .then(function (response) {
          // console.log('response: ',response)
          ctrl.menuItems = [];
          ctrl.menuItems.push(response);
        });
    }
  }
}());