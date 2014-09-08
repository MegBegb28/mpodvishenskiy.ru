/*
*	mdocument 						- Manipulações gerais do documento
*	mdocument.baseURL 				- Url base
*	mdocument.fixMasks 				- Ativa o plugin de mascaras
*	mdocument.fixPlaceholder 		- Ativa o plugin de placeholder
*	mdocument.fixMasksPlace 			- Ativa os dois plugins informados acima
*	mdocument.redirect 				- Redireciona o documento (usado bastante com o flash)
*	mdocument.resizeEvent 			- Verificador do evento de resize
*	mdocument.resizeWindow			- Adiciona evento de resize, que chama o mdocument.resize a cada 100 milesegundos 
*	mdocument.resize(func)			- Método que recebe uma função com o que deve ser feito, quanto a janela sofrer resize
*	mdocument.fixFlashs				- Adiciona o flash nas divs com classe 'flash', mais detalhes e exemplo no método
*/

var mdocument = {

	baseURL: $('base').attr('href') || location.protocol+'//'+location.host+'/',

    baseFront: location.protocol+'//' + location.host + location.pathname,

	fixMasks: function(){

		var onComplete = function(){
			var fields = 'input, select, textarea';
			var nextIndex = $(this).index(fields) + 1;
			if ($(fields).length > nextIndex) $(fields).eq(nextIndex).focus();
		}

		$('[mask]').bind('focus', function(e){
			$(this).unmask().mask($(this).attr('mask'), {completed: onComplete, placeholder: "_"});
		}).bind('focusout', function(){
			$('[placeholder]').placehold();
		});
	},
	
	fixPlaceholder: function(){
		$('[placeholder]').placehold();
	},
	
	fixMasksPlace: function(){
		mdocument.fixMasks();
		mdocument.fixPlaceholder();
	},
	
	redirect: function(where){
		window.location = mdocument.baseURL + where;
	}

}




/* 
*	mimage 							- Manipulações das imagens em geral
*	mimage.preload(caminho)			- Pré-carrega uma imagem  
*/

var mimage = {
	
	preload: function(caminho, completeFn){

		if($.browser.msie){
			if(typeof completeFn == 'function') completeFn();
			return false;	
		}


		$("<img />")
		.attr('src', './'+caminho)
		.bind('load', function(){
			if(typeof completeFn == 'function') completeFn();
			$(this).remove();
		});

	}

	
}



/* 
*	mstring 							- Manipulações de strings em geral
*	mstring.ucFirst(string)			- Transforma em maiusculo o primeiro caractere de uma string 
*	mstring.removeAcento(string)		- Remove todos os acentos de uma string 
*/

var mstring = {
	ucFirst: function(string){
		return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();	
	},


	ucWords: function(string){
		var ret = '';
		var string = string.split(' ');

		$(string).each(function(i, v){
			ret += mstring.ucFirst(v);
			if(string.length > i+1) ret += ' ';
		})

		return ret;
	},

	removeAcento: function(string){
		string = string.replace(new RegExp('[ÁÀÂÃ]','gi'), 'A');
		string = string.replace(new RegExp('[ÉÈÊ]','gi'), 'E');
		string = string.replace(new RegExp('[ÍÌÎ]','gi'), 'I');
		string = string.replace(new RegExp('[ÓÒÔÕ]','gi'), 'O');
		string = string.replace(new RegExp('[ÚÙÛ]','gi'), 'U');
		string = string.replace(new RegExp('[Ç]','gi'), 'C');
		string = string.toLowerCase();
		return string;
	}	
}



/* 
*	mform 									- Manipulações dos forms
*	mform.reset($.form)						- Reseta o formulário
*	mform.validate($.scope, 'errorselector')	- Valida um formulário/elemento que contenha elementos com classe 'required'
*/

var mform = {
	reset: function(form){
		form.find('select').val('');
		form.find('select[name=cidade]').html('<option value="">Cidade*</option>');
        form.find('input, textarea').val('');
		form.find('.error').removeClass('error');
		form.find('.errormessage').text('');
	},

	validate: function(scope, errorSelector){
		/*
			<input type="text" class="required" errormessage="Preencha seu..." />
		*/
		
		var valid;
		var scopeElm = $(scope);

		var selectorError = errorSelector == undefined ? ".errormessage" : errorSelector;
		var error = scopeElm.find(selectorError);

		scopeElm.find('.error').removeClass('error');
		error.text('');

		scopeElm.find('[class^="required"]:visible, [class~="required"]:visible').each(function () {

				var self = $(this);
				var value = self.val();
				var className = self.attr('class');
				var placeholderValue = self.attr('placeholder');
				valid = true;

				rulesParsing = className;
				rulesRegExp = /\[(.*)\]/;
				getRules = rulesRegExp.exec(rulesParsing);


				if(getRules != null)
				{
					str = getRules[1];
					pattern = /\W+/;
					result = str.split(pattern);

					switch(result[0])
					{
						case "email":
								// expressão para validar o email
								var pattern = new RegExp(/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/);
								if(!pattern.test(value))
									valid = false;
							break;
						case "confirm":
								var valueToCompare = $('#' + result[1]).val();
								//console.log("Valor: '"+value+ "' Compare com: '" + valueToCompare + "' campo "+result[1]);
								if(value != valueToCompare)
									valid = false;
							break;
						case "date":
								// expressão para verificar se o campo contém somente números
								var pattern = new RegExp(/^[0-9\ ]+$/);

								if(!pattern.test(self.val()))
									valid = false;
								else
								{
									switch(result[1])
									{
										case "day":
												if(parseInt(self.val(), 10) < 1 || parseInt(self.val(), 10) > 31)
													valid = false;
											break;
										case "month":
												if(parseInt(self.val(), 10) < 1 || parseInt(self.val(), 10) > 12)
													valid = false;
											break;
										case "year":
												if(parseInt(self.val(), 10) < 1900 || parseInt(self.val(), 10) > 2011)
													valid = false;
											break;
									}
								}
							break;
							
						case "vimeo":
							var pattern = /http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
							valid = pattern.test(value);
							break;

						case "min":
							valid = value.length >= result[1];
							break;


					}
				}
				else
				{
					if(value == "" || value == placeholderValue)
						valid = false;
				}

				// se o campo atual não passou em uma das validações
				if(valid === false)
				{
					self.addClass('error');
					self.focus();
					error.text(self.attr('errormessage'));

					return false;
				}
				else
				{
					self.removeClass('error');

					return true;
				}

			});

			return valid;		
	}
}




/*
*
*	Extenção do jQuery para fazer algumas coisas uteis.
*
*/

$.fn.extend({
	fadeInIE: function(duration, callback)
	{
		var elm = $(this);

		if($.browser.msie){
			elm.show();

			if(typeof(callback) == 'function'){
				setTimeout(callback, 100);
			}


		} else {
			elm.fadeIn(duration, callback);
		}

		return elm;
	},

	fadeOutIE: function(duration, callback)
	{
		var elm = $(this);

		if($.browser.msie){
			elm.hide();

			if(typeof(callback) == 'function'){
				setTimeout(callback, 100);
			}

		} else {
			elm.fadeOut(duration, callback);
		}

		return elm;
	},


	href: function(){
		var self = this;
		return self.attr('href').substring(self.attr('href').indexOf('#'));
	},


	setVars: function(){
		try {
			var self = this;
			var json = jQuery.parseJSON(self.html()) || self;

			jQuery.each(json, function(key, value){
				self.data(key, value);
			})

		} catch(e) {
			return false;
		}

		return self;

	},


	dnone: function(){
		this.css('display', 'none');
		return this;
	},

	dblock: function(){
		this.css('display', 'block');
		return this;
	},



	fadeOver: function(){
		var elm = this;
		var ie = ($.browser.msie) ? Math.round($.browser.version) : false;

		var mouseIn = function (e){

			var self = $(this);
			var span = self.find('span');


			if(Modernizr.csstransitions && Modernizr.opacity){
				span.removeClass('transparent');

			} else {
				if(ie < 9 && self.css('backgroundColor') == 'transparent'){
					span.css('opacity','show');
				} else {
					span.stop().animate({opacity: 1}, 'normal');
				}
			}


		}

		var mouseOut = function (e){

			var self = $(this);
			var span = self.find('span');


			if(self.hasClass('ativo')) return false;


			if(Modernizr.csstransitions && Modernizr.opacity){
				span.addClass('transparent');

			} else {
				if(ie < 9 && self.css('backgroundColor') == 'transparent'){
					span.css('opacity','0');
				} else {
					span.stop().animate({opacity: 0}, 'normal');
				}
			}

		}



		$.each(elm, function (index, obj) {

			var self = $(obj);
			var span = $('<span />', {'class': 'transparent'})


			span
				.css({
					'background-image': self.css('backgroundImage'),
					'background-color': self.css('backgroundColor')
			})

			self
				.append(span)
				.bind('mouseover', mouseIn)
				.bind('mouseout', mouseOut)


		});


		return elm;
	}


});





var parseParams = function(attrstr){
	var result = false;

	rulesParsing = attrstr;
	rulesRegExp = /\[(.*)\]/;
	getRules = rulesRegExp.exec(rulesParsing);

	if(getRules != null){
		str = getRules[1];
		pattern = /\W+/;
		result = str.split(pattern);
	}

	return result;
}





/**
 * @name jQuery placehold (https://github.com/jgarber623/jquery-placehold)
 * @author Jason Garber
 * @copyright (cc) Jason Garber (http://sixtwothree.org and http://www.viget.com)
 * 
 * Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
 */

;(function($) {
	$.fn.placehold = function( placeholderClassName ) {
		var placeholderClassName = placeholderClassName || "placeholder",
			supported = $.fn.placehold.is_supported();

		function toggle() {
			for ( i = 0; i < arguments.length; i++ ) {
				arguments[i].toggle();
			}
		}

		return supported ? this : this.each( function() {
			var $elem = $( this ),
				placeholder_attr = $elem.attr( "placeholder" );

			if ( placeholder_attr ) {
				if ( $elem.val() === "" || $elem.val() == placeholder_attr ) {
					$elem.addClass( placeholderClassName ).val( placeholder_attr );
				}

				if ( $elem.is( ":password" ) ) {
					var $pwd_shiv = $( "<input />", {
						"class": $elem.attr( "class" ) + " " + placeholderClassName,
						"value": placeholder_attr
					});

					$pwd_shiv.bind( "focus.placehold", function() {
						toggle( $elem, $pwd_shiv );
						$elem.focus();
					});

					$elem.bind( "blur.placehold", function() {
						if ( $elem.val() === "" ) {
							toggle( $elem, $pwd_shiv );
						}
					});

					$elem.hide().after( $pwd_shiv );
				}

				$elem.bind({
					"focus.placehold": function() {
						if ( $elem.val() == placeholder_attr ) {
							$elem.removeClass( placeholderClassName ).val( "" );
						}
					},
					"blur.placehold": function() {
						if ( $elem.val() === "" ) {
							$elem.addClass( placeholderClassName ).val( placeholder_attr );
						}
					}
				});

				$elem.closest( "form" ).bind( "submit.placehold", function() {
					if ( $elem.val() == placeholder_attr ) {
						$elem.val( "" );
					}

					return true;
				});
			}
		});
	};

	$.fn.placehold.is_supported = function() {
		return "placeholder" in document.createElement( "input" );
	};	
})(jQuery);






/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2009 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license) 
	Version: 1.2.2 (03/09/2009 22:39:06)
*/
;(function(a){var c=(a.browser.msie?"paste":"input")+".mask";var b=(window.orientation!=undefined);a.mask={definitions:{"9":"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"}};a.fn.extend({caret:function(e,f){if(this.length==0){return}if(typeof e=="number"){f=(typeof f=="number")?f:e;return this.each(function(){if(this.setSelectionRange){this.focus();this.setSelectionRange(e,f)}else{if(this.createTextRange){var g=this.createTextRange();g.collapse(true);g.moveEnd("character",f);g.moveStart("character",e);g.select()}}})}else{if(this[0].setSelectionRange){e=this[0].selectionStart;f=this[0].selectionEnd}else{if(document.selection&&document.selection.createRange){var d=document.selection.createRange();e=0-d.duplicate().moveStart("character",-100000);f=e+d.text.length}}return{begin:e,end:f}}},unmask:function(){return this.trigger("unmask")},mask:function(j,d){if(!j&&this.length>0){var f=a(this[0]);var g=f.data("tests");return a.map(f.data("buffer"),function(l,m){return g[m]?l:null}).join("")}d=a.extend({placeholder:"_",completed:null},d);var k=a.mask.definitions;var g=[];var e=j.length;var i=null;var h=j.length;a.each(j.split(""),function(m,l){if(l=="?"){h--;e=m}else{if(k[l]){g.push(new RegExp(k[l]));if(i==null){i=g.length-1}}else{g.push(null)}}});return this.each(function(){var r=a(this);var m=a.map(j.split(""),function(x,y){if(x!="?"){return k[x]?d.placeholder:x}});var n=false;var q=r.val();r.data("buffer",m).data("tests",g);function v(x){while(++x<=h&&!g[x]){}return x}function t(x){while(!g[x]&&--x>=0){}for(var y=x;y<h;y++){if(g[y]){m[y]=d.placeholder;var z=v(y);if(z<h&&g[y].test(m[z])){m[y]=m[z]}else{break}}}s();r.caret(Math.max(i,x))}function u(y){for(var A=y,z=d.placeholder;A<h;A++){if(g[A]){var B=v(A);var x=m[A];m[A]=z;if(B<h&&g[B].test(x)){z=x}else{break}}}}function l(y){var x=a(this).caret();var z=y.keyCode;n=(z<16||(z>16&&z<32)||(z>32&&z<41));if((x.begin-x.end)!=0&&(!n||z==8||z==46)){w(x.begin,x.end)}if(z==8||z==46||(b&&z==127)){t(x.begin+(z==46?0:-1));return false}else{if(z==27){r.val(q);r.caret(0,p());return false}}}function o(B){if(n){n=false;return(B.keyCode==8)?false:null}B=B||window.event;var C=B.charCode||B.keyCode||B.which;var z=a(this).caret();if(B.ctrlKey||B.altKey||B.metaKey){return true}else{if((C>=32&&C<=125)||C>186){var x=v(z.begin-1);if(x<h){var A=String.fromCharCode(C);if(g[x].test(A)){u(x);m[x]=A;s();var y=v(x);a(this).caret(y);if(d.completed&&y==h){d.completed.call(r)}}}}}return false}function w(x,y){for(var z=x;z<y&&z<h;z++){if(g[z]){m[z]=d.placeholder}}}function s(){return r.val(m.join("")).val()}function p(y){var z=r.val();var C=-1;for(var B=0,x=0;B<h;B++){if(g[B]){m[B]=d.placeholder;while(x++<z.length){var A=z.charAt(x-1);if(g[B].test(A)){m[B]=A;C=B;break}}if(x>z.length){break}}else{if(m[B]==z[x]&&B!=e){x++;C=B}}}if(!y&&C+1<e){r.val("");w(0,h)}else{if(y||C+1>=e){s();if(!y){r.val(r.val().substring(0,C+1))}}}return(e?B:i)}if(!r.attr("readonly")){r.one("unmask",function(){r.unbind(".mask").removeData("buffer").removeData("tests")}).bind("focus.mask",function(){q=r.val();var x=p();s();setTimeout(function(){if(x==j.length){r.caret(0,x)}else{r.caret(x)}},0)}).bind("blur.mask",function(){p();if(r.val()!=q){r.change()}}).bind("keydown.mask",l).bind("keypress.mask",o).bind(c,function(){setTimeout(function(){r.caret(p(true))},0)})}p()})}})})(jQuery);
