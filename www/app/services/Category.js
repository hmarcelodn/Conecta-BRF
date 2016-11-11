(function() {
'use strict';

    angular
        .module('brfPhoneGapApp')
        .factory('Category', Category);

    Category.$inject = ['$http', 'Database'];
    function Category($http, Database) { 

        var synchronizeCategories = function(){
                // return $http.get('https://ws.qa.conecta-brf.com/get/categories/?token=560a100abad225d5afdf4fc6e5334917');
                return $http.get('https://ws.conecta-brf.com/get/categories/?token=560a100abad225d5afdf4fc6e5334917');
        };
        
        var synchronizeCategoryImages = function(){
                // return $http.get('https://ws.qa.conecta-brf.com/get/categories/images/?token=560a100abad225d5afdf4fc6e5334917');
                return $http.get('https://ws.conecta-brf.com/get/categories/images/?token=560a100abad225d5afdf4fc6e5334917');
        };
        
        var setCategory = function(categoryId, type, name){
                return Database.query('INSERT INTO Category(categoryId, type, name) VALUES(?, ?, ?)', [categoryId, type, name])
                            .then(function (result){
                                return true;
                            });
            };

        var setCategoryChannel = function (categoryId, channelId) {
                return Database.query('INSERT INTO CategoryChannels(categoryId, channelId) VALUES(?, ?)', [categoryId, channelId])
                    .then(function (result){
                        return true;
                    });
            };

        var setCategoryImage = function(imageId, idMod, idCat, image, icon){
                return Database.query('INSERT INTO CategoryImage(imageId, idMod, idCat, image, icon) VALUES(?, ?, ?, ?, ?)', [imageId, idMod, idCat, image, icon])
                    .then(function (result){
                        return true;
                    });
            };

        var getCategories = function (typeId, channelId, moduleId, PdvId) {


                var query = ' SELECT * FROM Category cat2' +
                            ' WHERE cat2.id IN (' +
                            ' SELECT DISTINCT cat.id FROM Category cat' +
                            ' INNER JOIN CategoryChannels catchan ON catchan.categoryId = cat.categoryId' + 
                            ' INNER JOIN Question q ON q.categoryId = cat.categoryId' + 
                            ' WHERE cat.type = ?' +
                            ' AND catchan.channelId = ?' +
                            ' AND q.questionModuleId = ?' +
                            ' AND q.questionId IN (SELECT Distinct QP.questionId ' + 
                        '        FROM QuestionPDV QP ' + 
                        '        WHERE QP.PDVId = (Select C.pdvType From Customer C Where C.customerId =' + PdvId + ')' +
                        '         OR QP.PDVId = 0) ' +
                            ' )';
                ///LUU logs
                //console.log ("getCategories");
                //console.log (query);

                return Database.query(query, [typeId, channelId, moduleId])
                    .then(function (result) {
                        return Database.fetchAll(result);
                    });	
            };

        var getCategoryById = function (categoryId){
                return Database.query('SELECT * FROM Category WHERE CategoryId = ?', [categoryId])
                    .then(function (result){
                        return Database.fetch(result);
                    });
            };          
              
        var service = {
            synchronizeCategories:synchronizeCategories,
            synchronizeCategoryImages: synchronizeCategoryImages,
            setCategory: setCategory,
            setCategoryChannel: setCategoryChannel,
            setCategoryImage: setCategoryImage,
            getCategories: getCategories,
            getCategoryById: getCategoryById
        };                   
        
        return service;
    }
})();