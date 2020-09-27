(function() {
  'use strict';

  angular.module('common')
  .service('UserRegService', UserRegService);

  function UserRegService () {
    var service = this;
    var user;

    service.register = function (userInfo) {
      user = userInfo;
    };

    service.getIsRegistered = function () {
      if (user) {
        return true;
      }
      return false;
    };

    service.getUserInfo = function () {
      return user;
    };
  }
}());