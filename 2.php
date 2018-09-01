<div class="Infermedica_root">
	
</div>

<script src="jquery.min.js"></script>
<script src="cookie.js"></script>
<script src="phoneCode.js"></script>
<script type="text/javascript">
	var strUserMail = getCookie("UserEmail");

	var objUserInfo = null;
	var strFirsrQuestion = "";

	var strFirstName = "";
	var strLastName = "";
	var strCountryCode = "";
	var strBirthday = "";
	var strGender = "";

	var customer_Age = "";
	var customer_Gender = "";
	var strAllCustomers = "";
	
	var cur_reg_firstName = "";
	var cur_reg_lastName = "";
	var cur_reg_gender = "";
	var cur_reg_year = "";
	var cur_reg_month = "";
	var cur_reg_day = "";

	var strMainSymptom = "";
</script>
<script src="country_select.js?<?= time();?>"></script>
<script src="controls.js?<?= time();?>"></script>
<script src="birth_select.js?<?= time();?>"></script>
<script src="status.js?<?= time();?>"></script>
<script src="drawContents.js?<?= time();?>"></script>
<link rel="stylesheet" href="main.css?<?=time();?>" type="text/css">