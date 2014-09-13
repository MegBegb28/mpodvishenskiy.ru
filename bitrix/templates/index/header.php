<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?>
<!DOCTYPE html>
<html class=" js flexbox canvas canvastext postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" type="text/css" href="<?=SITE_TEMPLATE_PATH?>/css/reset.css" class="css-finalize-read">
		<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.min.js"></script>
		<script src="<?=SITE_TEMPLATE_PATH?>/js/knockout-2.0.0.js"></script>
		<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.address-1.4.min.js"></script>
		<script src="<?=SITE_TEMPLATE_PATH?>/js/modernizr.custom.92456.js"></script>
		<script src="<?=SITE_TEMPLATE_PATH?>/js/medeiros.util.js"></script>
		<script src="<?=SITE_TEMPLATE_PATH?>/js/actions.js"></script>

		<!--[if lt IE 9]>
			<script src="<?=SITE_TEMPLATE_PATH?>/js/IE9.js"></script>
		<![endif]-->

		<?$APPLICATION->ShowHead();?>

		<title><?$APPLICATION->ShowTitle();?></title>
		<!-- <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" /> -->
	</head>
	<body>
		<div id="panel">
			<?$APPLICATION->ShowPanel();?>
		</div>