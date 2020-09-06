(function () {
	'use strict';

	angular.module( 'ShoppingListCheckOff', [] )
	.controller( 'ToBuyController', ToBuyController )
	.controller( 'AlreadyBoughtController', AlreadyBoughtController )
	.service( 'ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = [ 'ShoppingListCheckOffService' ];
	function ToBuyController( ShoppingListCheckOffService ) {
		var toBuy = this;

		toBuy.items = ShoppingListCheckOffService.getItemsToBuy();
		toBuy.buyItem = function( itemIndex ) {
			let item = toBuy.items[ itemIndex ];
			ShoppingListCheckOffService.addBoughtItem( { name: item.name, quantity: item.quantity } );
			ShoppingListCheckOffService.removeItemToBuy( itemIndex );
		}
	}

	AlreadyBoughtController.$inject = [ 'ShoppingListCheckOffService' ];
	function AlreadyBoughtController( ShoppingListCheckOffService ) {
		var bought = this;

		bought.items = ShoppingListCheckOffService.getItemsBought();
	}

	function ShoppingListCheckOffService() {
		var service = this;

		var itemsToBuy = [
			{ name: "cookies", quantity: "100" },
			{ name: "sugary drinks", quantity: "30" },
			{ name: "potato chips", quantity: "3 bags" },
			{ name: "scones", quantity: "5 kg" },
			{ name: "oreo", quantity: "5 bags" },
			{ name: "apple pie", quantity: "4 slices" },
		];
		var itemsBought = [];

		service.getItemsToBuy = function() {
			return itemsToBuy;
		};

		service.getItemsBought = function() {
			return itemsBought;
		};

		service.addBoughtItem = function( item ) {
			itemsBought.push( item );
		};

		service.removeItemToBuy = function( index ) {
			itemsToBuy.splice( index, 1 );
		};
	}
})();