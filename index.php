<?
if(isset($_REQUEST['contact']))
{
	require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

		if(empty($_REQUEST['nome']) && empty($_REQUEST['email']) && empty($_REQUEST['message']))
			echo '{"error":true}';
		else
		{
			foreach ($_REQUEST as $key => $value) {
				unset($_REQUEST[$key]);
				$_REQUEST[htmlspecialchars($key)] = htmlspecialchars($value);
			}
			if(strlen($_REQUEST['nome']) > 2 && strlen($_REQUEST['email']) > 5 && strlen($_REQUEST['message']) > 2)
				if(mail('maximbmstu@gmail.com', 'Contact me', 'вам пишет ' . $_REQUEST['nome'] . '<br> Email ' . $_REQUEST['email'] . '<br>  Сообщение ' . $_REQUEST['message']))
					echo json_encode(array('error' => false));
		}

}
else
{
	require($_SERVER['DOCUMENT_ROOT'].'/bitrix/header.php');
	$APPLICATION->SetTitle('Главная');
	?>

	<div id="container">
		<section class="main active" id="main-home" style="height: 0px;">
			<nav>
				<ul>
					<li><a href="#/about" class="active">Обо мне</a></li>
					<li><a href="#/work">Портфолио</a></li>
					<li><a href="#/contact">Контакты</a></li>
				</ul>
			</nav>

			<h1>Привет!</h1>
			<h2>Меня зовут Максим Подвишенский и я создаю качественные сайты.</h2>
			<small>Я разработчик <a href="http://1c-bitrix.ru">1c-Bitrix</a>.</small>
		</section>
		<section class="main" id="main-about" style="height: auto;">
			<h1>Итак...</h1>
			<h2>Кто я такой и с чем меня едят.</h2>
			<article class="box-really-like">
				<h1>Я люблю</h1>
				<ul>
					<li>WeB 	</li>
					<li>Linux	</li>
					<li>Apple 	</li>
					<li>Bitrix 	</li>
					<li>Кофе	</li>
					<li>Музыку	</li>
				</ul>
			</article>
			<article class="box-bit-of-me">
				<h1>Немного о себе</h1>
				<p>Я Максим, мне 25 лет. Живу и работаю в Москве. Выпускник МГТУ им. Н.Э. Баумана по специальности "Комплексное обеспечение информационной безопасности автоматизированных систем".</p>
				<p>У меня есть три года опыта разработки интернет-проектов. В общем, я действительно люблю свою работу. Мои навыки включают разработку сайтов на платформе 1c-Bitrix и полный пакет серверных технологий.</p>
				<p>Самое главное, что нужно знать обо мне, что я создаю качественные сайты. Ныряю с головой в поставленные задачи и предлагаю оптимальные решения.</p>
				<!-- <p></p> -->

				<!-- <p>Мне 25 лет Я живу в Москве. Я закончил МГТУ им. Н.Э. Баумана по специальности "Информационная безопасность". У меня есть три года опыта работы с инернет проектами, и я действительно люблю свою работу. Короче, это я.</p> -->
				<!-- <p>Самое главное, что нужно знать обо мне, что я люблю создавать качетвенные сайты.</p> -->
				<!-- <p>Мои навыки включают разработку сайтов на платформе 1c-Bitrix и полный пакет серверных технологий.</p> -->
			</article>
			<div class="clearfix social">
				<ul>
					<li><a href="http://vk.com/id2332212"><i class="dribbble replacement">vk</i></a></li>
					<li><a href="http://www.facebook.com/mp.gladiator"><i class="facebook replacement">facebook</i></a></li>
					<li><a href="http://ru.linkedin.com/pub/максим-подвишенский/60/945/738/"><i class="linkedin replacement">linkedin</i></a></li>
					<li><a href="http://brainstorage.me/MegBegb/portfolio"><i class="behance replacement">brainstorage</i></a></li>
				</ul>
			</div>
			<address>© 2014 All rights reserved.</address>
		</section>
		<!-- <section class="main" id="main-work" data-projects="[{&quot;ordem&quot;:1,&quot;name&quot;:&quot;Unificado&quot;,&quot;type&quot;:&quot;Game Platform&quot;,&quot;uri&quot;:&quot;unificado&quot;,&quot;images&quot;:[&quot;img/project-unificado/img-01.png&quot;,&quot;img/project-unificado/img-02.png&quot;,&quot;img/project-unificado/img-03.png&quot;,&quot;img/project-unificado/img-04.png&quot;,&quot;img/project-unificado/img-05.png&quot;,&quot;img/project-unificado/img-06.png&quot;,&quot;img/project-unificado/img-07.png&quot;,&quot;img/project-unificado/img-08.png&quot;],&quot;bgcolor&quot;:&quot;#ffffff&quot;,&quot;paddingtop&quot;:&quot;364px&quot;},{&quot;ordem&quot;:2,&quot;name&quot;:&quot;Paquetá&quot;,&quot;type&quot;:&quot;Corporate website&quot;,&quot;uri&quot;:&quot;paqueta&quot;,&quot;images&quot;:[&quot;img/project-paqueta/img-01.jpg&quot;,&quot;img/project-paqueta/img-02.png&quot;,&quot;img/project-paqueta/img-03.jpg&quot;,&quot;img/project-paqueta/img-04.jpg&quot;,&quot;img/project-paqueta/img-05.jpg&quot;,&quot;img/project-paqueta/img-06.jpg&quot;],&quot;bgcolor&quot;:&quot;#54656d&quot;,&quot;paddingtop&quot;:&quot;0px&quot;},{&quot;ordem&quot;:3,&quot;name&quot;:&quot;Ponto Pronto&quot;,&quot;type&quot;:&quot;Corporate website&quot;,&quot;uri&quot;:&quot;ponto-pronto&quot;,&quot;images&quot;:[&quot;img/project-ponto-pronto/img-01.jpg&quot;,&quot;img/project-ponto-pronto/img-02.jpg&quot;,&quot;img/project-ponto-pronto/img-03.jpg&quot;,&quot;img/project-ponto-pronto/img-04.jpg&quot;],&quot;bgcolor&quot;:&quot;#1f1f1f&quot;,&quot;paddingtop&quot;:&quot;0px&quot;},{&quot;ordem&quot;:4,&quot;name&quot;:&quot;Sinoscar&quot;,&quot;type&quot;:&quot;Corporate website&quot;,&quot;uri&quot;:&quot;sinoscar&quot;,&quot;images&quot;:[&quot;img/project-sinoscar/img-01.jpg&quot;,&quot;img/project-sinoscar/img-02.png&quot;,&quot;img/project-sinoscar/img-03.jpg&quot;,&quot;img/project-sinoscar/img-04.jpg&quot;,&quot;img/project-sinoscar/img-05.jpg&quot;,&quot;img/project-sinoscar/img-06.jpg&quot;,&quot;img/project-sinoscar/img-07.jpg&quot;],&quot;bgcolor&quot;:&quot;#ffffff&quot;,&quot;paddingtop&quot;:&quot;0px&quot;},{&quot;ordem&quot;:5,&quot;name&quot;:&quot;Banrisul&quot;,&quot;type&quot;:&quot;Proposal&quot;,&quot;uri&quot;:&quot;banrisul&quot;,&quot;images&quot;:[&quot;img/project-banrisul/img-01.png&quot;],&quot;bgcolor&quot;:&quot;#0b68b3&quot;,&quot;paddingtop&quot;:&quot;112px&quot;},{&quot;ordem&quot;:6,&quot;name&quot;:&quot;Cambionet&quot;,&quot;type&quot;:&quot;Cambio exchange&quot;,&quot;uri&quot;:&quot;cambionet&quot;,&quot;images&quot;:[&quot;img/project-cambionet/img-01.png&quot;,&quot;img/project-cambionet/img-02.jpg&quot;,&quot;img/project-cambionet/img-03.jpg&quot;,&quot;img/project-cambionet/img-04.jpg&quot;,&quot;img/project-cambionet/img-05.jpg&quot;,&quot;img/project-cambionet/img-06.jpg&quot;,&quot;img/project-cambionet/img-07.png&quot;],&quot;bgcolor&quot;:&quot;#eeeeee&quot;,&quot;paddingtop&quot;:&quot;325px&quot;},{&quot;ordem&quot;:7,&quot;name&quot;:&quot;Común Tierra Project&quot;,&quot;type&quot;:&quot;Sustainable communities&quot;,&quot;uri&quot;:&quot;comun-tierra&quot;,&quot;images&quot;:[&quot;img/project-comun-tierra/img-01.png&quot;,&quot;img/project-comun-tierra/img-02.png&quot;,&quot;img/project-comun-tierra/img-03.png&quot;],&quot;bgcolor&quot;:&quot;#629b32&quot;,&quot;paddingtop&quot;:&quot;417px&quot;},{&quot;ordem&quot;:9,&quot;name&quot;:&quot;Residencial Pinheiro Grosso&quot;,&quot;type&quot;:&quot;Website&quot;,&quot;uri&quot;:&quot;pinheiro-grosso&quot;,&quot;images&quot;:[&quot;img/project-pinheiro-grosso/img-01.png&quot;,&quot;img/project-pinheiro-grosso/img-02.png&quot;],&quot;bgcolor&quot;:&quot;#bdbca6&quot;,&quot;paddingtop&quot;:&quot;90px&quot;},{&quot;ordem&quot;:9,&quot;name&quot;:&quot;Shopping Total&quot;,&quot;type&quot;:&quot;Website&quot;,&quot;uri&quot;:&quot;shopping-total&quot;,&quot;images&quot;:[&quot;img/project-shopping-total/img-01.png&quot;,&quot;img/project-shopping-total/img-02.jpg&quot;,&quot;img/project-shopping-total/img-03.jpg&quot;],&quot;bgcolor&quot;:&quot;#ece8e3&quot;,&quot;paddingtop&quot;:&quot;70px&quot;},{&quot;ordem&quot;:10,&quot;name&quot;:&quot;Foernges&quot;,&quot;type&quot;:&quot;Corporate website&quot;,&quot;uri&quot;:&quot;foernges&quot;,&quot;images&quot;:[&quot;img/project-foernges/img-01.png&quot;,&quot;img/project-foernges/img-02.jpg&quot;,&quot;img/project-foernges/img-03.jpg&quot;,&quot;img/project-foernges/img-04.jpg&quot;],&quot;bgcolor&quot;:&quot;#eeeeee&quot;,&quot;paddingtop&quot;:&quot;124px&quot;},{&quot;ordem&quot;:11,&quot;name&quot;:&quot;Senac-RS&quot;,&quot;type&quot;:&quot;Corporate website&quot;,&quot;uri&quot;:&quot;senac-rs&quot;,&quot;images&quot;:[&quot;img/project-senac-rs/img-01.png&quot;],&quot;bgcolor&quot;:&quot;#235f9e&quot;,&quot;paddingtop&quot;:&quot;100px&quot;},{&quot;ordem&quot;:12,&quot;name&quot;:&quot;Tennis Ranking&quot;,&quot;type&quot;:&quot;Associação Leopoldina Juvenil&quot;,&quot;uri&quot;:&quot;tennis-ranking&quot;,&quot;images&quot;:[&quot;img/project-tennis-ranking/img-01.jpg&quot;],&quot;bgcolor&quot;:&quot;#8d3e0b&quot;,&quot;paddingtop&quot;:&quot;197px&quot;}]" style="height: 0px;"> -->
		<section class="main" id="main-work" data-projects="[{&quot;ordem&quot;:1,&quot;name&quot;:&quot;a1park&quot;,&quot;type&quot;:&quot;Сетьпарковок&quot;,&quot;uri&quot;:&quot;a1park&quot;,&quot;images&quot;:[&quot;img/project-a1park/a1park2.png&quot;],&quot;bgcolor&quot;:&quot;#ffffff&quot;,&quot;paddingtop&quot;:&quot;64px&quot;},{&quot;ordem&quot;:2,&quot;name&quot;:&quot;viosnet&quot;,&quot;type&quot;:&quot;Социальнаясеть&quot;,&quot;uri&quot;:&quot;viosnet&quot;,&quot;images&quot;:[&quot;img/project-viosnet/viosnet.png&quot;],&quot;bgcolor&quot;:&quot;#ffffff&quot;,&quot;paddingtop&quot;:&quot;64px&quot;},{&quot;ordem&quot;:3,&quot;name&quot;:&quot;mebelvia&quot;,&quot;type&quot;:&quot;Интернетмагазин&quot;,&quot;uri&quot;:&quot;mebelvia&quot;,&quot;images&quot;:[&quot;img/project-mebelvia/mebelvia.png&quot;],&quot;bgcolor&quot;:&quot;#ffffff&quot;,&quot;paddingtop&quot;:&quot;64px&quot;}]" style="height: 0px;">
			 <h1>Проекты :)</h1>
			<h2>Здесь находятся мои самые удачные работы.</h2>
			 <script id="projects-list-tmpl" type="text/html">
				<li class="loading">
					<a data-bind="attr: {href: '#/project/'+uri}">
						<span>
							<h2 data-bind="text: name"></h2>
							<h4 data-bind="text: type"></h4>
						</span>

						<img data-bind="attr: {'data-src': 'img/project-' + uri + '/thumb.jpg'}" src="img/spacer.gif" />
					</a>
				</li>
			</script>
			<ul class="clearfix works" data-bind="template: {name: 'projects-list-tmpl', foreach: projects, afterRender: loadImages}"></ul>
			<small>Внимание! Все проекты, над которыми я работал, находятся тут -> <a href="http://brainstorage.me/MegBegb/portfolio">Brainstorage</a>.</small>
			<address>© 2014 All rights reserved.</address>
		</section>
		<section class="main" id="main-contact" style="height: 0px;">

			<h1>Пишите!</h1>
			<h2>Свяжитесь со мной по любому вопросу.</h2>
			<!-- <h2>If you're a real human being, feel free to send me an email.</h2> -->
			<small>В настоящее время я доступен для любых проектов.</small>

			<form action="?contact" method="post" class="ajax">
				<fieldset>
					<input type="text" name="nome" placeholder="Имя" class="required">
					<input type="email" name="email" placeholder="email" class="required[email]">
					<textarea name="message" placeholder="Сообщение" class="required"></textarea>

					<div class="errormessage"></div>

					<a class="submit">Отправить</a>
				</fieldset>

				<div class="success">
					<h3>Thanks for your message!</h3>
					<small>I'll try to get back to you as soon as possible.</small>
				</div>
			</form>

			<address>© 2014 All rights reserved.</address>
		</section>

	</div>
	<section id="main-project" class="main active" style="height: auto;">

		<div id="nav-projects" class="clearfix">
			<a href="#/work" class="back replacement">voltar</a>

			<h1 data-bind="text: nome"></h1>

			<ul>
				<li><a data-bind="attr: {href: '#/project/'+next()}" class="next" href="#/project/sinoscar">Вперед</a></li>
				<li><a data-bind="attr: {href: '#/project/'+prev()}" class="prev" href="#/project/paqueta">Назад</a></li>
			</ul>

		</div><!-- end nav-projects -->


		<div id="project" data-bind="fadeVisible: uri">
			<div class="bg" data-bind="style: {'backgroundImage': '', 'backgroundColor': bgcolor()}" style="background-image: url(http://www.luiskonrad.com/img/project-ponto-pronto/bg.jpg); background-color: rgb(31, 31, 31);"></div>


			<ul id="project-images" data-bind="foreach: images(), style: {'paddingTop': paddingtop()}" style="padding-top: 0px;">
				<li><img data-bind="attr: {src: $data}" src=""></li>

			</ul>

		</div>


	</section>
	<?
	require($_SERVER['DOCUMENT_ROOT'].'/bitrix/footer.php');
}
?>