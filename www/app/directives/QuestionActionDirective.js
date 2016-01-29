brfPhoneGapApp.directive('questionAction', function($compile){

	var binaryTemplate = '<div class="card-action center-align">' +
							  '<a href="#">SI CUMPLE</a>' +
							  '<a href="#">NO CUMPLE</a>' +
						 '</div>';

	var openTemplate = '<div class="card-action" style="margin-left:-20px;overflow:auto;">' +							
							  '<div>' +
								'<input type="text" style="width:100%;padding:0;margin:0;" placeholder="Cantidad">' +
							  '</div>' +							  
						'</div>';

	var priceTemplate = '<div class="card-action" style="margin-left:-20px;overflow:auto;">' +
							'<span style="float:left;display:block;background-color:#ed6944;padding:3px 5px;color:white;">SWIFT</span>' +						  
							'<div style="float:right;">' +
								'<input type="text" style="width:60px;padding:0;margin:0;" placeholder="Precio">' +
							'</div>' +						  
						'</div>';
						
	var multipleTemplate = '<form class="card-action">' +
								'<p>' +
									'<span style="padding-right:10px;">' +
							   			'<input type="checkbox" class="filled-in" id="example-1" />' +
										'<label for="example-1">Ejemplo 1</label>' +
									'</span>' +
								'</p>' +
							'</form>';

	var getTemplate = function(answer){
		var template = '';

		switch(answer){
			case 'binary':
				template = binaryTemplate;
				break;
			case 'open':
				template = openTemplate;
				break;
			case 'multiple':
				template = multipleTemplate;
				break;
			case 'price':
				template = priceTemplate;
				break;
		}

		return template;
	};

	var linker = function(scope, element, attrs){
		var html = getTemplate(scope.content.answer);
		var e = $compile(html)(scope);

		element.replaceWith(e);
	};

	return{
		restrict: 'E',		
		link: linker,
		scope: {
			content: '='
		},
		replace: true
	}
});