<?php
/**
 * Created by Eugene Mutai
 * Date: 3/29/13
 * Time: 2:22 PM
 * Description:
 */

set_time_limit(0);
ini_set('memory_limit', '50M'); //uses sth like 10 - just given it more
session_start();

$title ="PrittyNote - Welcome";
$load = 0;

include_once("../need/config.php");
include_once("../includes/header.php");

?>
<!-- Bootstrap Components -->
<link rel="stylesheet" type="text/css" href="../css/bootstrap/css/bootstrap.min.css" />

<div class="theContent">
	<div class="alert-error information">
		Wrong username or password
	</div>

	<table class="upgrade">
		<tr>
			<td class="intro">
				<img src="../images/dump2.jpg" alt="Stickinote" />
			</td>
			<td class="credentials">
				<form class="form-horizontal" action="../need/signMein.php" method="post">
					<div class="control-group">
						<label class="control-label" for="inputEmail">Email</label>
						<div class="controls">
							<input type="text" name="payer_email" id="inputEmail" placeholder="Email" value="">
							<p class="email"></p>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="inputPassword">Password</label>
						<div class="controls">
							<input type="password" name="password" id="inputPassword" placeholder="Password" value="">
							<p class="password"></p>
						</div>
					</div>

					<div class="control-group proceed">
						<div class="controls">
							<button type="submit" class="btn btn-danger">Sign In</button>
						</div>
					</div>
				</form>
			</td>
		</tr>
	</table>

</div>

<?php include_once('../includes/footer.php'); ?>

<script type="text/javascript">
	var email = $('#inputEmail'),
		passw = $('#inputPassword'),
		e = false, p = false, c = $('.information').html()

	var validate = setInterval(function() {
		allisGood()
	}, 500)

	$(window).bind('load', function() {
		email.bind('blur keyup', function() {
			confirmEmail($(this).val(), $(this))
		})//email address
		passw.bind('blur keyup', function() {
			passwordLen($(this).val(), $(this))
		})//password
	})

	//EMAIL VALIDATION
	function confirmEmail(str, el) {
		if(str.length != 0) {
			var regEx= /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/;
			var pregmatch = regEx.test(str);

			if(pregmatch) {
				el.siblings('p')
					.removeClass('red')
					.addClass('green')
					.html('nice email address')
				e = true
			}else{
				el.siblings('p')
					.removeClass('green')
					.addClass('red')
					.html('incomplete or invalid email address')
				e = false
				$('.proceed').hide()
			}
		}
	}

	function passwordLen(str, el) {
		if(str.length != 0) {
			var len = str.length
			if(len >= 6) {
				el.siblings('p')
					.removeClass('red')
					.addClass('green')
					.html('mmh! no one is going to crack that!')
				p = true
			}else{
				el.siblings('p')
					.removeClass('green')
					.addClass('red')
					.html('too short! must be above 6 characters')
				p = false
				$('.proceed').hide()
			}
		}
	}

	function allisGood() {
		if(email.val().length != 0 && e) {
			if(p && passw.val().length > 5) {
				$('.proceed').show(), $('.password').html('');
				$('.information')
					.removeClass('alert-info')
					.addClass('alert-success')
					.html('Yaey!! Let\'s finish up and have some fun.')
			}
		}else{
			$('.proceed').hide(), setInterval(validate);
			if(email.val().length != 0) {
				$('.email')
					.removeClass('green')
					.addClass('red')
					.html('Incomplete or invalid email address')
			}
		}
	}
</script>
