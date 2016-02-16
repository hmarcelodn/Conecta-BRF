brfPhoneGapApp.factory('Config', function(){
    var self = this;

    self.DB_CONFIG = {
        name: 'BRF',
        tables: 
        [
            {
                name: "Category",
                columns: 
                [
                    { name: 'id', type: 'integer primary key'},
                    { name: 'categoryId', type: 'integer' },
                    { name: 'type', type: 'integer' },
                    { name: 'name', type: 'text' },
                ]
            },
            {
                name: "CategoryChannels",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'categoryId', type: 'integer' },
                    { name: 'channelId', type: 'integer' }
                ]
            },
            {
                name: "CategoryImage",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'imageId', type: 'integer' },
                    { name: 'idMod', type: 'integer' },
                    { name: 'idCat', type: 'integer' },
                    { name: 'image', type: 'text' },
                    { name: 'icon', type: 'text' }                    
                ]
            },
            {
                name: "Channel",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'name', type: 'text' }
                ]
            },
            {
                name: "Customer",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'customerId', type: 'integer' },
                    { name: 'companyName', type: 'text' },
                    { name: 'cuit', type: 'text' },
                    { name: 'address', type: 'text' },
                    { name: 'pdvType', type: 'integer' }
                ]
            },
            {
                name: "CustomerType",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'name', type: 'text' }
                ]
            },
            {
                name: "Module",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'moduleId', type: 'integer' },
                    { name: 'behavior', type: 'text' },
                    { name: 'modName', type: 'text' },
                    { name: 'categoryType', type: 'integer' },
                    { name: 'color', type: 'text' },
                    { name: 'icon', type: 'text' },
                    { name: 'slug', type: 'text' }
                ]
            },
            {
                name: "ModuleChannels",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'moduleId', type: 'integer' },
                    { name: 'channelId', type: 'integer' }
                ]
            },
            {
                name: "ModuleUserRoles",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'moduleId', type: 'integer' },
                    { name: 'roleId', type: 'integer' }
                ]
            },
            {
                name: "Question",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'questionId', type: 'integer' },
                    { name: 'categoryId', type: 'integer' },
                    { name: 'render', type: 'text' },
                    { name: 'answer', type: 'text' },
                    { name: 'title', type: 'text' },
                    { name: 'data', type: 'text' },
                    { name: 'helper', type: 'text' },
                    { name: 'big', type: 'text' },
                    { name: 'thumb', type: 'text' },
                    { name: 'questionModuleId', type: 'integer' },
                    { name: 'config', type: 'text' },
                    { name: 'styling', type: 'text' }
                ]
            },
            {
                name: "QuestionPdv",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'questionId', type: 'integer' },
                    { name: 'pdvId', type: 'integer' }
                ]
            },
            {
                name: "Seller",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'name', type: 'name' }
                ]
            },
            {
                name: "Survey",
                columns: 
                [
                    { name: 'id', type: 'integer primary key'},
                    { name: 'survey', type: 'text' },
                    { name: 'syncStatus', type: 'integer' }
                ]
            },
            {
                name: "SurveyNoBrfResults",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'surveyId', type: 'integer' },
                    { name: 'noBrf', type: 'boolean' }
                ]
            },
            {
                name: "SurveyObservationResults",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'surveyId', type: 'integer' },
                    { name: 'observations', type: 'text' }
                ]
            },
            {
                name: "SurveyQuestionsResults",
                columns: 
                [
                    {name: 'id', type: 'integer primary key'},
                    { name: 'surveyId', type: 'integer' },
                    { name: 'questionId', type: 'integer' },
                    { name: 'JSONData', type: 'text' }
                ]
            }                                                                                                                                                                                    
        ]
    };

    return self;
});