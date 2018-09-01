<?php
$case = 0;
if(isset($_POST['case'])) $case = $_POST['case'];
if(isset($_GET['case'])) $case = $_GET['case'];
require_once "userManager.php";
switch ($case) {
	case 0: // Add User
		$userInfo = "";
		if(isset($_POST['userInfo'])) $userInfo = $_POST['userInfo'];
		if(isset($_GET['userInfo'])) $userInfo = $_GET['userInfo'];
		$_userInfo = json_decode($userInfo);
		if( AddUserInfo($_userInfo)){
			echo "YES";
		} else{
			echo "NO";
		}
		break;
	case 1: //Verify User info
		$userMail = "";
		if(isset($_POST['userMail'])) $userMail = $_POST['userMail'];
		if(isset($_GET['userMail'])) $userMail = $_GET['userMail'];
		$userPass = "";
		if(isset($_POST['userPass'])) $userPass = $_POST['userPass'];
		if(isset($_GET['userPass'])) $userPass = $_GET['userPass'];
		$verifyCode = UserVerify($userMail, $userPass);
		$retVal = new \stdClass;
		$retVal->code = $verifyCode;
		switch( $verifyCode){
			case 1: // User exists
				$retVal->ErrorMsg = "Success.";
				$retVal->UserInfo = GetUserInfo($userMail);
				echo json_encode($retVal);
			break;
			case 0: // No user
				$retVal->ErrorMsg = "Unregistered User.";
				echo json_encode($retVal);
			break;
			case -1: // pass incorrective
				$retVal->ErrorMsg = "Password incorrective.";
				echo json_encode($retVal);
			break;
		}
		break;
	case 2: // Get User Info
		$userMail = "";
		if(isset($_POST['userMail'])) $userMail = $_POST['userMail'];
		if(isset($_GET['userMail'])) $userMail = $_GET['userMail'];
		$userInfo = GetUserInfo($userMail);
		if( $userInfo != null){
			echo json_encode($userInfo);
		}
		break;
	case 3: //Get Customers Info
		$userMail = "";
		if(isset($_POST['userMail'])) $userMail = $_POST['userMail'];
		if(isset($_GET['userMail'])) $userMail = $_GET['userMail'];
		$arrRetVal = GetCustomerInfo($userMail);
		echo json_encode($arrRetVal);
		break;
	default:
		break;
}
?>