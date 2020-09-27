(function () {
  'use strict';

  angular.module('public')
    .controller('UserSignUpController', UserSignUpController);

  UserSignUpController.$inject = ['MenuService', 'UserRegService'];
  function UserSignUpController(MenuService, UserRegService) {
    var ctrl = this;

    ctrl.register = function () {
      // console.log( 'sign up controller, getting item ', ctrl.favDish );
      MenuService.getMenuItem(ctrl.favDish)
        .then(function (response) {
          if (response) {
            // console.log( 'sign up controller, getting item ', response );
            UserRegService.register({
              firstName: ctrl.firstname,
              lastName: ctrl.lastname,
              email: ctrl.email,
              phone: ctrl.phoneNumber,
              favDish: ctrl.favDish
            });
            ctrl.isRegistered = true;
            ctrl.isMenuItemNotFound = false;
          }
          else {
            console.log('OnRegister: Item not found.');
            ctrl.isRegistered = false;
            ctrl.isMenuItemNotFound = true;
          }
        })
    }
  }
}());