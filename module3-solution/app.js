(function () {
	'use strict';

	angular.module( 'NarrowItDownApp', [] )
		.controller( 'NarrowItDownController', NarrowItDownController )
		.service( 'MenuSearchService', MenuSearchService )
		.directive( 'foundItems', FoundItemsDirective )
		.constant( 'ApiBasePath', "https://davids-restaurant.herokuapp.com" );


	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				items: '<',
				onRemove: '&'
			},
		};
	
		return ddo;
	}

	NarrowItDownController.$inject = [ 'MenuSearchService' ];
	function NarrowItDownController( MenuSearchService ) {
		var narrowIt = this;

		narrowIt.found = [];
		narrowIt.searchTerm = '';
		narrowIt.emptyList = false;

		narrowIt.filterMenu = function() {
			MenuSearchService.getMatchedMenuItems( narrowIt.searchTerm )
			.then( function (result) {
				narrowIt.emptyList = !result.length;
				narrowIt.found = result;
			})
		};

		narrowIt.removeItem = function (itemIndex) {
			console.log("'this' is:	", this);
			narrowIt.found.splice( itemIndex, 1 );
		};
	
	}

	MenuSearchService.$inject = [ '$http', 'ApiBasePath' ];
	function MenuSearchService( $http, ApiBasePath ) {
		var service = this;

		service.getMatchedMenuItems = function ( searchTerm ) {
			return $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			})
			.then( function ( result ) {

				// Don't request the menu if no search is entered
				if ( searchTerm.trim() === '' ) {
					console.log( 'service.getMatchedMenuItems() - empty search term' );
					return [];
				}

				var foundItems = [];

				var allItems = result.data.menu_items;
				for ( let n = 0; n < allItems.length; n++ ) {
					let itemDesc = allItems[ n ].description;
					if ( itemDesc && itemDesc.toLowerCase().indexOf( searchTerm.toLowerCase() ) !== -1 ) {
						foundItems.push( allItems[ n ] );
					}
				}

				console.log( 'service.getMatchedMenuItems() - searchTerm = [' + searchTerm + ']' );
				console.log( 'service.getMatchedMenuItems() - found items (' + foundItems.length + '): ' );
				console.log( foundItems );

				return foundItems;
			});
		};

	}

})();