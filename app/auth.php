<?php

set_time_limit(0);
ini_set('memory_limit', '50M'); //uses sth like 100 - just given it more
session_start();

require("../need/twitteroauth.php");
require_once('../need/dbconn.php');

if(isset($_COOKIE['stickinotePass']) ) {

	$id = trim($_COOKIE['stickinotePass']);
	$q = "select * from noticeboard where pswd='$id'";
	$use =  mysqli_query ($dbc, $q) or trigger_error("Query: $q\n<br/>MySQL Error: " . mysqli_error($dbc));
	$keys = mysqli_fetch_array($use, MYSQLI_ASSOC);

	$token = $keys['token'];
	$secret = $keys['secret'];

}else{

	if(isset($_GET['oauth_verifier']) && !empty($_SESSION['oauth_token']) && !empty($_SESSION['oauth_token_secret'])){
		$token = $_SESSION['oauth_token'];
		$secret = $_SESSION['oauth_token_secret'];
		$access = 1;
	}
	else{
		// Something's missing, go back to square 1
		header('Location: http://PrittyNote.com/app/twitter.php');
		exit();
	}

}

//connection instance, with two new parameters we got in twitter_login.php  
$connection = new TwitterOAuth(KEY, SECRET, $token, $secret);

//if new user, then we need verification
if(isset($access) && $access == 1) {
	$access_token = $connection->getAccessToken($_GET['oauth_verifier']);
	$token = $access_token['oauth_token'];
	$secret = $access_token['oauth_token_secret'];
}

//set the user's COOKIE FOR REFERRAL
$user = $connection->get('account/verify_credentials');

$_SESSION['stickonoteTwId'] = $user->id_str;
$_SESSION['stickinoteTwname'] = $user->screen_name;
$_SESSION['stickinoteAccess'] = array('token'=>$token, 'secret'=>$secret);  //PUT IN SESSION

include_once('../need/config.php');
setcookie('stickinoteTwId', $user->id_str, COOKIE_VALIDITY, '/'); //5 days time out
setcookie('stickinoteTwname', $user->screen_name, COOKIE_VALIDITY, '/'); //5 days time out

if(!empty($user) ) {

	//INSERT USER IN THE DATABASE IF NOT EXIST
	$q = "select * from noticeboard where twid='{$user->id_str}'";
	$r =  mysqli_query ($dbc, $q) or trigger_error("Query: $q\n<br/>MySQL Error: " . mysqli_error($dbc));
	$re = mysqli_fetch_array($r, MYSQLI_ASSOC);
	
	if(mysqli_num_rows($r) != 1) { //if user has never used his/her twitter account, add the details to his/her account
		
		$q = "update noticeboard set twid='{$user->id_str}', twname='{$user->screen_name}', twimage='{$user->profile_image_url}', token='$token', secret='$secret', lastlogin=now() where pswd='{$_COOKIE['stickinotePass']}'";
		$r =  mysqli_query ($dbc, $q) or trigger_error("Query: $q\n<br/>MySQL Error: " . mysqli_error($dbc));
	
	}else{
		//if user already exists, just update his credentials
		$t = "update noticeboard set twname='{$user->screen_name}', token='$token', secret='$secret' where twid='{$user->id_str}'";
		$ts =  mysqli_query ($dbc, $t) or trigger_error("Query: $t \n<br/>MySQL Error: " . mysqli_error($dbc));
	}

}

//FOLLOW ME -> THE ADMIN
/*
$followadmin = $connection->get('friendships/exists', array('user_a'=>$user->id_str, 'user_b'=>219248574));  
if($followadmin){
	//do nothing
}else{
$connection->post('friendships/create', array('user_id'=>219248574));
$m = "insert into followers(myid, following) values('{$user->id_str}', '219248574')"; //update in DB
$fm =  mysqli_query ($dbc, $m) or trigger_error("Query: $m \n<br/>MySQL Error: " . mysqli_error($dbc));
}

//ADVERTISE BACK TO HIS TWEETER ACC HIS ACTIVITY
for($a=0;$a<2;$a++) {
$rand = rand(0,10);
$connection->post('statuses/update', array('status'=> $status[$rand], 'include_entities'=>'true'));
}
*/


$redirect = BASE_URL.'index.php';
header('location:'.$redirect);
exit();

$title = 'Stickinote | '.$user->screen_name.' #TeamFollowBack';
include_once('./includes/header.php');

?>

<h2> Hey <span style="color: red;">@<?php echo $user->screen_name; ?></span> You are now signed in</h2>
<a href="../index.php">Go Back</a>
<h2><a style="color: #adff2f;" href="../need/signOut.php" title="sign out">not you, or sign out!</a></h2>
