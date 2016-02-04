brfPhoneGapApp.factory('Category', ['$http', 'Database', function($http, Database){
	var self = this;

	self.synchronizeCategories = function(){
		return $http.get('http://ws.brf-horizonte.com/get/categories/?token=560a100abad225d5afdf4fc6e5334917');
	};

	self.synchronizeCategoryImages = function(){
		return $http.get('http://ws.brf-horizonte.com/get/categories/images/?token=560a100abad225d5afdf4fc6e5334917');
	};

	self.setCategory = function(categoryId, type, name){
		  return Database.query('INSERT INTO Category(categoryId, type, name) VALUES(?, ?, ?)', [categoryId, type, name])
		  			.then(function (result){
		  				return true;
		  			});
	};

	self.setCategoryChannel = function (categoryId, channelId) {
		return Database.query('INSERT INTO CategoryChannels(categoryId, channelId) VALUES(?, ?)', [categoryId, channelId])
			.then(function (result){
				return true;
			});
	};

	self.setCategoryImage = function(imageId, idMod, idCat, image, icon){
		return Database.query('INSERT INTO CategoryImage(imageId, idMod, idCat, image, icon) VALUES(?, ?, ?, ?, ?)', [imageId, idMod, idCat, image, icon])
			.then(function (result){
				return true;
			});
	};

	self.getCategories = function () {
		return Database.query('SELECT * FROM Category')
			.then(function (result) {
				return Database.fetchAll(result);
			});	
	};

	return self;

}]);