<?php
if( !file_exists("users.json")){
	file_put_contents("users.json", "");
}
$users = @file_get_contents("users.json");
$arrUsers = [];
if( $users){
	$arrUsers = json_decode($users);
	// print_r($arrUsers[0]->email);
}
function AddUserInfo( $_userInfo){
	// $firstName = $_userInfo->firstName;
	// $lastName = $_userInfo->lastName;
	// $country = $_userInfo->country;
	// $birth = $_userInfo->birth;
	// $gender = $_userInfo->gender;
	// $email = $_userInfo->email;
	// $password = $_userInfo->password;
	$isExist = false;
	global $arrUsers;
	foreach ($arrUsers as $value) {
		$email = $value->email;
		if( $email == $_userInfo->email){
			$isExist = false;
			return false;
		}
	}
	if( $arrUsers == []){
		$_userInfo->Id = 1;
	} else{
		$_userInfo->Id = count($arrUsers) + 1;
	}
	$arrUsers[] = $_userInfo;
	file_put_contents("users.json", json_encode($arrUsers));
	return true;
}
function UserVerify($_email, $_pass){
	global $arrUsers;
	foreach ($arrUsers as $value) {
		$email = $value->email;
		if( $email == $_email){
			if( $value->password == $_pass){
				return 1;
			} else{
				return -1;
			}
		}
	}
	return 0;
}
function GetUserInfo($_email){
	global $arrUsers;
	foreach ($arrUsers as $value) {
		if( $value->email == $_email){
			return $value;
		}
	}
	return null;
}
// print_r(GetUserInfo($arrUsers[0]->email));
if( !file_exists("customers.json")){
	file_put_contents("customers.json", "");
}
$customers = @file_get_contents("customers.json");
$arrCustomers = [];
if( !$customers){
	$arrCustomers = json_decode($customers);
}
function AddCustomerInfo($_email, $_customerInfo){
	$user = GetUserInfo($_email);
	if( !$user){
		return false;
	}
	$userId = $user->Id;
	$_customerInfo->userId = $userId;

	$firstName = $_customerInfo->firstName;
	$lastName = $_customerInfo->lastName;
	$gender = $_customerInfo->gender;
	$birth = $_customerInfo->birth;

}
function GetCustomerInfo($_email){
	global $arrCustomers;
	$user = GetUserInfo($_email);
	$userId = $user->Id;
	$arrRetVal = [];
	foreach ($arrCustomers as $value) {
		if( $value->userId == $userId){
			$arrRetVal[] = $value;
		}
	}
	return $arrRetVal;
}
?>