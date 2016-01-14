brfPhoneGapApp.factory('materialService', function(){
	return {
		materializeJs: function(){
			$(".button-collapse").sideNav();
		    $('.collapsible').collapsible();
			$('.modal-trigger').leanModal();    
			$('select').material_select();
			$('.button-collapse').sideNav('show');
		}
	}
});