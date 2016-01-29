brfPhoneGapApp.directive('questionContent', function($compile){

	var plainTemplate = '<div class="card-conten">' +
						 	'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent velit elit, interdum in facilisis eget, venenatis a mi. In facilisis dictum diam sit amet accumsan.</p>' +
						'</div>';

	var imageTemplate = '<div class="card-image waves-effect waves-block waves-light" style="margin-top:25px;margin-bottom: 8px;">' +
							'<img class="activator" src="img/content/thumb_office.jpg"></img>' +
						'</div>' +
												
						'<div class="col s12 right-align" style="height:25px;">' +
							'<a href="help.php"><i class="material-icons" style="z-index:10;position:relative;top:-70px;left:10px;color:#2ba0c9;font-size:22px;background-color:white;padding-left:5px;padding-bottom:5px;">help_outline</i></a>' +
						'</div>' +

						'<div class="card-reveal">' +
							'<a href="#modal1" class="modal-trigger"><i class="material-icons left">photo_library</i></a>' +							
							'<span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>' +
							'<br/>' +
							'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur adipiscing elit.</p>' +
						'</div>';
	
	var completeBisTemplate = '<h5 style="font-size:18px;">Paty Finitas x4 unidades</h5>';
	
	var titleTemplate = '<h5 style="font-size:18px;">TIPO EXHIBICIÓN</h5>';

	var getTemplate = function(render){

		var template = '';

		switch(render){
			case 'plain':
				template = plainTemplate;
				break;
			case 'image':
				template = imageTemplate;
				break;
			case 'complete_bis':
				template = completeBisTemplate;
				break;
			case 'title':
				template = titleTemplate;
				break;
		}

		return template;
	}

	var linker = function(scope, element, attrs){
		var html = getTemplate(scope.content.render);
		var e = $compile(html)(scope);

		element.replaceWith(e);
	}

	return{
		restrict: 'E',
		link: linker,
		scope: {
			content: '='
		},
		replace: true
	}
});