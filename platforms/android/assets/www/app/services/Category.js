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

	self.getCategories = function (typeId, channelId) {

		var query = 'SELECT * FROM Category cat' + 
					' INNER JOIN CategoryChannels catchan ON catchan.categoryId = cat.categoryId' +
					' WHERE cat.type = ?' +
					' AND catchan.channelId = ?';

		return Database.query(query, [typeId, channelId])
			.then(function (result) {
				return Database.fetchAll(result);
			});	
	};

	self.getCategoryById = function (categoryId){
		return Database.query('SELECT * FROM Category WHERE CategoryId = ?', [categoryId])
			.then(function (result){
				return Database.fetch(result);
			});
	};

	return self;

}]);