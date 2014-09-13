<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
if (!empty($arResult))
{
	?>
	<nav>
		<ul>
			<?foreach($arResult as $arItem)
			{
				if($arParams["MAX_LEVEL"] == 1 && $arItem["DEPTH_LEVEL"] > 1)
					continue;

				if($arItem["SELECTED"])
				{
					?>
					<li><a href="<?=$arItem["LINK"]?>" class="active"><?=$arItem["TEXT"]?></a></li>
					<?
				}
				else
				{
					?>
					<li><a href="<?=$arItem["LINK"]?>"><?=$arItem["TEXT"]?></a></li>
					<?
				}
			}?>
		</ul>
	</nav>
	<?
}?>
<!--
	<nav>
		<ul>
			<li><a href="#/about" class="active">Обо мне</a></li>
			<li><a href="#/work">Портфолио</a></li>
			<li><a href="#/contact">Контакты</a></li>
		</ul>
	</nav>
 -->