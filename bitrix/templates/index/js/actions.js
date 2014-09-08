//VAI MEU FILHO, ROBA TUDO QUE PODE :)
;(function($, undefined){

	App = {
		init: function(){

			App.addEvents();


			//Temporário, adiciona o menu em cada seção
			var menu = $('nav').detach();
			$('.main').each(function(){
				$(this).prepend(menu.clone());
			})

			menu.remove();


			//Temporário, pré recarrega as imagens dos projetos
			App.projects = App.projects || $('#main-work').data('projects');
			// App.projects = ;
			// SIM, EU NÃO TIVE TEMPO PRA FAZER UM LOADER DECENTE!!!

			// $(window).bind('load', function(){
			// 	$.each(App.projects, function(index, item){
			// 		// $.each(item.images, function(index, item){
			// 		// 	mimage.preload(item);
			// 		// })

			// 		mimage.preload('img/project-'+item.uri+'/bg.jpg')
			// 		mimage.preload(item.images[0])
			// 	})

			// })


		},


		setTitle: function(txt){


			document.title = ' Максим Подвишенский ' + txt


		},

		addEvents: function(){

			//Controle de URL
			$.address.change(Pages.change);


			//Máscaras dos campos
			mdocument.fixMasksPlace();


			//Submits em formato de link
			$('a.submit').bind('click', function(e){
				e.preventDefault();
				$(this).closest('form').trigger('submit');
			})


			//validação dos formulários
			$('form').bind('submit', function(e){
				//Se o form validar, faz o envio
				if(!mform.validate($(this))) return false;

				if($(this).hasClass('ajax')) return App.sendForm(e);

			})


			//Submit com enter
			$('input, select').keyup(function(e) {
				if(e.which == 10 || e.which == 13) $(this).closest('form').trigger('submit');
			})

			$('input, select, textarea').keyup(function(e){
				$(this).removeClass('error')
			})



			//Reajusta o menu se o cara redimensionar
			//$(window).resize(Menu.fix)

		},



		sendForm: function(e){
			e.preventDefault();

			var form = $(e.target);
			var message = function(txt){
				return form.find('.errormessage').text(txt);
			}

			if(form.data('ajax')){
				return message('Still sending. Wait...')
			}



			var ajax = $.ajax({
				url: form.attr('action'),
				type: 'post',
				data: form.serialize(),
				dataType: 'json',

				success: function(data, textStatus){
					if(data.error){
						message(data.message)
					} else {
						message('');
						var fn = form.data('success');
						if(typeof fn === 'function') fn(data, form);
					}

					form.removeData('ajax');
				},


				error: function(){
					message('Ops! Error. Try again!');
					form.removeData('ajax');
				}

			})
			message('Sending...');
			form.data('ajax', ajax);


		}




	}



	Menu = {

		fix: function(){
			// if(Menu.current){
			// 	$('nav').css('top', '60px');
			// } else {
			// 	Menu.reset();
			// }
		},

		reset: function(){
			// $('nav').css('top', function(){
			// 	return $(window).height() - 122 + 'px'
			// }).find('a').removeClass('active')
		},

		change: function(to){

			var nav = $('nav');
				//Menu.current = false;


			Menu.itens = Menu.itens || $('a', nav);
			// Menu.itens = Menu.itens || (function(){
			// 	var itens = {};
			// 	$('a', nav).each(function(index, elm){
			// 		itens[$(elm).attr('href').replace('#/', '')] = $(elm)
			// 	})

			// 	return itens;
			// })()


			Menu.itens.removeClass('active');
			Menu.itens.filter('[href*='+ to +']').addClass('active');

		}

	}


	Pages = {

		change: function(event){

			App.page = event.pathNames[0] || 'home';

			//Track Analytics
			// _gaq.push(['_trackPageview'], App.page);

			if(Pages[App.page]) {

				$('.main').removeClass('active').css('height', 'auto');
				$('#main-' + App.page).addClass('active');


				setTimeout(function(){

					$('.main').css('height', '0px').filter('.active').css('height', 'auto');

				}, 600)


				if(!Pages[App.page].initialized){
					Pages[App.page].init(event);
					Pages[App.page].initialized = true;
				} else {
					if(typeof Pages[App.page].update == 'function'){
						Pages[App.page].update(event);
					}

				}

			} else {
				alert('404');
			}


		},


		home: {
			init: function(event){

				if($.browser.mozilla){
					$('#main-home').css({
						'top': '25%',
						'margin-top': '0'

					})

				}

				$('#main-home small').hide().delay(500).fadeIn('fast');

				this.update();
			},

			update: function(event){
				Menu.change('home');



			}
		},



		about: {
			init: function(event){

				this.update()
			},


			update: function(event){
				Menu.change('about')
				App.setTitle('/ Обо мне');
			}
		},


		work: {
			init: function(event){

				App.projects = App.projects || $('#main-work').data('projects');


				ko.applyBindings({
					projects: App.projects,
					loadImages: function(elements){
						var elm = elements[1];
						var thumb = $(elm).find('img');
						var src = thumb.data('src') || false;


						if(src) mimage.preload(src, function(){
							$(elm).removeClass('loading')
							thumb.attr('src', src);
							thumb.removeData('src')
						})

					}
				}, $('#main-work').get(0))

				this.update()
			},


			update: function(event){
				Menu.change('work');

				App.setTitle('/ Портфолио')
			}
		},


		project: {
			init: function(event){

				$('#main-project nav').remove();

				App.projects = App.projects || $('#main-work').data('projects');
				App.projectsByURI = {};
				App.projectKO = {
					uri: 		ko.observable(),
					nome: 		ko.observable(),
					images: 	ko.observableArray(),
					bgcolor: 	ko.observable(),
					paddingtop: ko.observable(),

					next: 		ko.observable(),
					prev: 		ko.observable()

				};

				$.each(App.projects, function(index, value){
					App.projectsByURI[value.uri] = index;
				})



				ko.bindingHandlers.fadeVisible = {
					init: function(element, valueAccessor) {
						// Initially set the element to be instantly visible/hidden depending on the value
						var value = valueAccessor();
						$(element).toggle(ko.utils.unwrapObservable(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
					},
					update: function(element, valueAccessor) {
						// Whenever the value subsequently changes, slowly fade the element in or out
						var value = valueAccessor();
						ko.utils.unwrapObservable(value) ? $(element).dnone().fadeInIE() : $(element).fadeOutIE();
					}
				};


				ko.applyBindings(App.projectKO, $('#main-project').get(0));




				this.update(event);
			},


			update: function(event){


				$('html, body').animate({
					scrollTop: 0+'px'
				}, 300)


				Menu.change('work')
				App.project = App.projectsByURI[event.pathNames[1]];


				if(App.project >= 0){

					var project = App.projects[App.project];
					var next = (App.projects[App.project+1]) ? App.projects[App.project+1].uri : App.projects[0].uri;
					var prev = (App.projects[App.project-1]) ? App.projects[App.project-1].uri : App.projects[App.projects.length-1].uri;


					App.setTitle('/ Work / '+ project.name);

					App.projectKO.uri(project.uri);
					App.projectKO.nome(project.name);
					App.projectKO.images(project.images);
					App.projectKO.bgcolor(project.bgcolor);
					App.projectKO.paddingtop(project.paddingtop);

					App.projectKO.next(next);
					App.projectKO.prev(prev);




				} else {
					alert('404');
				}


			}
		},

		contact: {
			init: function(event){
				$('#main-contact form').data('success', function(data, form){
					form.addClass('success');
					mform.reset(form)

					setTimeout(function(){
						form.removeClass('success');
					}, 5000)
				})

				this.update()
			},


			update: function(event){
				Menu.change('contact');
				App.setTitle('/ Контакты')
			}
		},


	}


})(jQuery)



$(function(){

	App.init();

})