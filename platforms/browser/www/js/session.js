var BrfNameSpace = BrfNameSpace || {};

BrfNameSpace.Session = (function() {

    var instance;

    function init() {

        var sessionIdKey = "brf-session";

        return {

            set: function(sessionData) {
                window.localStorage.setItem(sessionIdKey, JSON.stringify(sessionData));
            },

            get: function() {

                var result = null;

                try {
                    result = JSON.parse(window.localStorage.getItem(sessionIdKey));
                } catch (e) {}

                return result;
            }

        };
    };

    return {
        getInstance: function() {
            if (!instance) {
                instance = init();
            }

            return instance;
        }
    }

}());