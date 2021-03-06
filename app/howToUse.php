<?php
/**
 * Created by Eugene Mutai
 * Date: 1/14/13
 * Time: 1:35 PM
 * Description: How to Use Instructions
 */

session_start();

$title ="PrittyNote - How To Use";
$load = 0;

include_once("../need/config.php");
include_once("../includes/header.php");

?>
<div style="width: 800px; margin: auto; text-align: center">
	<h1>How to Use Guide</h1>
</div>
<table class="howtouse">
	<tr>
		<td class="symbol"><h1># or @</h1></td>
		<td><p>for emphasition purposes, use either of this <span>eg. #life or @life</span> to highlight/make it a hashtag thus assigning it the hashtag/mention color currently chosen</p>
		<p><span>NOTE:</span> of the two, only <span>"#"</span> will be removed in the prittynote but the word retains the hashtag color</p></td>
	</tr>
	<tr>
		<td class="symbol"><h1>##</h1></td>
		<td><p>when used (placed before any word), it will treat all the rest of the words that come after it as hashtags thus all will be assigned the hashtag/mention color currently chosen
		</p></td>
	</tr>
	<tr>
		<td class="symbol"><h1>`</h1></td>
		<td><p>when used, it acts a new line inniator</p>
			<p><span>NOTE:</span> it's the value on the keyboard before number 1</p></td>
	</tr>
	<tr>
		<td class="symbol"><h1>350</h1></td>
		<td><p>Maximum characters allowed to qualify as a <span>PrittyNote.</span></p></td>
	</tr>
</table>

	<table class="imagehowtouse">
		<tr>
			<td>
				<h4><span>Themes and Fonts Option</span></h4>
				<img src="../images/howto/t&f.png" alt="">

				<p><span>Themes:</span> These are themes you can use for quick editing of the background color,
					default text color and highlighted or hashtag/mention words, in the PRO version you have over 30 themes to choose from.
					</p>
				<p><span>Fonts:</span> The fonts dropdown menu gives you an option to change how you'd like the
					text to look like font-wise. In PRO version you have over 50 fonts available to choose from.</p>
			</td>
			<td>
				<h4><span>Background Image Option</span> -- Available in PRO only</h4>
				<img src="../images/howto/uploadimage.png" alt="">

				<p>Do you feel a colored background doesn't suite your prittynote? It is not delivering the
					complete message? then pick an image from you computer, did I mention it is INSTANTLY LOADED
					for you to preview it as it will be as a prittynote, try it yourself!</p>
			</td>
		</tr>
		<tr>
			<td>
				<h4><span>Color Picker</span> -- Available in PRO only</h4>
				<img src="../images/howto/colorpicker.png">

				<p> Don't like the themes given! with these three color pickers you have unlimited choises in
					determining the color you want to use for the background, default text and hashtag or mention. just click on the one you want and a color pallette will appear where you can now pick the color you want and a vertical meter just to the right, to control the depth of the color</p>
			</td>
			<td>
				<h4><span>Twitter Intergration</span> -- Available in PRO only</h4>
				<img src="../images/howto/twitterbutton.png" alt="">

				<p>Have no clue what to write but still want to create a prittynote for some reason? Click on the
					this twitter button and load your tweets from Twitter onto a sidebar(it will appear when button is clicked) that will make your Twitter home timeline come alive. You then can click on a tweet and it will be copied and pasted onto your prittynote. You can as well go ahead and edit the tweet you chose in the text editor to your preference.</p>
			</td>
		</tr>
	</table>
	<div style="margin-bottom:70px"></div>

	<style type="text/css">
		.howtouse, .imagehowtouse{width: 800px; margin: auto}
		.howtouse td h1{margin: 0; padding: 0}
		.howtouse td.symbol{width: 25%; text-align: center}

		.imagehowtouse td, .howtouse td{border: 1px dashed #d3d3d3; padding: 0px 5px;}
		.imagehowtouse p, .howtouse p{font-size: 1.2em}
		.imagehowtouse h4{color: #666}
		.imagehowtouse h4 span{color: #c00}
		.imagehowtouse td{vertical-align: top}
	</style>

	<?php include_once('../includes/footer.php'); ?>

