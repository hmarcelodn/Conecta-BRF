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
                    { name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'categoryId', type: 'integer' },
                    { name: 'type', type: 'integer' },
                    { name: 'name', type: 'text' },
                ]
            },
            {
                name: "CategoryChannels",
                columns: 
                [
                    {name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'categoryId', type: 'integer' },
                    { name: 'channelId', type: 'integer' }
                ]
            },
            {
                name: "CategoryImage",
                columns: 
                [
                    {name: 'id', type: 'integer primary key autoincrement'},
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
                    { name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'name', type: 'text' }
                ]
            },
            {
                name: "Customer",
                columns: 
                [
                    {name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'customerId', type: 'integer' },
                    { name: 'companyName', type: 'text' },
                    { name: 'cuit', type: 'text' },
                    { name: 'address', type: 'text' },
                    { name: 'pdvType', type: 'integer' },
                    { name: 'highlighted', type: 'integer' },
                    { name: 'channelId', type: 'integer' }
                ]
            },
            {
                name: "CustomerType",
                columns: 
                [
                    {name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'name', type: 'text' }
                ]
            },
            {
                name: "Module",
                columns: 
                [
                    {name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'moduleId', type: 'integer' },
                    { name: 'behavior', type: 'text' },
                    { name: 'modName', type: 'text' },
                    { name: 'categoryType', type: 'integer' },
                    { name: 'color', type: 'text' },
                    { name: 'icon', type: 'text' },
                    { name: 'slug', type: 'text' },
                    { name: 'idMainMod', type: 'integer' }
                ]
            },
            {
                name: "ModuleChannels",
                columns: 
                [
                    {name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'moduleId', type: 'integer' },
                    { name: 'channelId', type: 'integer' }
                ]
            },
            {
                name: "ModuleUserRoles",
                columns: 
                [
                    { name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'moduleId', type: 'integer' },
                    { name: 'roleId', type: 'integer' }
                ]
            },
            {
                name: "Question",
                columns: 
                [
                    {name: 'id', type: 'integer primary key autoincrement'},
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
                    { name: 'styling', type: 'text' },
                    { name: 'is_mandatory', type: 'integer' },
                    { name: 'has_percent', type: 'integer' },
                    { name: 'is_dashboard', type: 'integer' },
                    { name: 'weight', type: 'integer' },
                    { name: 'is_coaching', type: 'integer' }
                ]
            },
            {
                name: "QuestionPdv",
                columns: 
                [
                    {name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'questionId', type: 'integer' },
                    { name: 'pdvId', type: 'integer' }
                ]
            },
            {
                name: "Seller",
                columns: 
                [
                    {name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'name', type: 'name' },
                    { name: 'channelId', type: 'integer' },
                ]
            },
            {
                name: "Survey",
                columns: 
                [
                    { name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'survey', type: 'text' },
                    { name: 'syncStatus', type: 'integer' },
                    { name: 'channelId', type: 'integer' },
                    { name: 'pdvId', type: 'integer' },
                    { name: 'sellerId', type: 'integer' },
                    { name: 'userId', type: 'integer' },
                    { name: 'date', type: 'datetime' },
                    { name: 'coaching_compliance', type: 'integer' }
                ]
            },
            {
                name: "SurveyNoBrfResults",
                columns: 
                [
                    { name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'surveyId', type: 'integer references Survey(id) on delete cascade' },
                    { name: 'noBrf', type: 'boolean' }
                ]
            },
            {
                name: "SurveyObservationResults",
                columns: 
                [
                    {name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'surveyId', type: 'integer references Survey(id) on delete cascade' },
                    { name: 'observations', type: 'text' }
                ]
            },
            {
                name: "SurveyQuestionsResults",
                columns: 
                [
                    {name: 'id', type: 'integer primary key autoincrement'},
                    { name: 'surveyId', type: 'integer references Survey(id) on delete cascade' },
                    { name: 'questionId', type: 'integer' },
                    { name: 'JSONData', type: 'text' }
                ]
            },
            {
                name: "MainModule",
                columns:
                [
                    { name: 'id', type: 'integer primary key autoincrement' },
                    { name: 'mod_name', type: 'text' },
                    { name: 'icon', type: 'text' },
                    { name: 'map_label', type: 'text' },
                    { name: 'has_dashboard', type: 'integer' }                                                        
                ]
            },
            {
                name: 'Dating',
                columns:
                [
                    { name: 'id', type: 'integer primary key autoincrement' },
                    { name: 'type', type: 'text' },
                    { name: 'label', type: 'text' }
                ]
            },
            {
                name: 'Target',
                columns:
                [
                    { name: 'id', type: 'integer primary key autoincrement' },                    
                    { name: 'target_coaching', type: 'integer' },
                    { name: 'id_user', type: 'integer' }
                ]
            },
            {
                name: 'AuditFinalValues',
                columns:
                [
                    { name: 'id_audit', type: 'integer' },
                    { name: 'id_mod', type: 'integer' },
                    { name: 'final_value', type: 'numeric' },     
                    { name: 'mod_name', type: 'text' },
                    { name: 'icon', type: 'text' },
                    { name: 'id_mainmod', type: 'integer' }                                                       
                ]
            }                                                                                                                                                                                    
        ]
    };

    return self;
});