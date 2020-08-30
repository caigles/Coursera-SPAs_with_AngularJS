(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.items = "";
    $scope.message = "";

    $scope.updateMessage = function() {
        let itemNumber = getNumberOfItems($scope.items);

        if (itemNumber > 3) {
            $scope.message = "Too much!";
        } else if (itemNumber > 0) {
            $scope.message = "Enjoy!";
        } else {
            $scope.message = "Please enter data first";
        }
    };

    function getNumberOfItems(itemList) {
        if (itemList.trim().length === 0) {
            return 0;
        }

        // The items string is first split using separator ',' and then
        // each leading and trailng whitespace is removes from each item.
        // Finally, empty items are removed from the list
        let items = itemList.split(",").map(x => x.trim()).filter(x => x.length > 0);
        return items.length;
    }
}

})();