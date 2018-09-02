<div class="Infermedica_root">
	
</div>

<script src="jquery.min.js"></script>
<script src="cookie.js"></script>
<script src="phoneCode.js"></script>
<script src="status.js?<?= time();?>"></script>
<script type="text/javascript">
	var strUserMail = getCookie("UserEmail");

	var objUserInfo = null;
	var strFirstQuestion = "";
	var arrCustomers = [];

	var strFirstName = "";
	var strLastName = "";
	var strCountryCode = "";
	var strBirthday = "";
	var strGender = "";

	var customer_Age = "";
	var customer_Gender = "";
	
	var cur_reg_firstName = "";
	var cur_reg_lastName = "";
	var cur_reg_gender = "";
	var cur_reg_year = "";
	var cur_reg_month = "";
	var cur_reg_day = "";

	let objState = new stateManager();

	var strMainSymptom = "";
	var strMainId = "";
	var isSearch = false;
	var isSuggest = false;

	var arrAllSymptoms = [];
	var arrEvidences = [];
	var arrInitialSymptoms = [];
	var arrDemographics = [];
	var arrGeographics = [];
	 function Initialize(){
		strMainSymptom = "";
		strMainId = "";
		isSearch = false;
		isSuggest = false;

		arrAllSymptoms = [];
		arrEvidences = [];
		arrInitialSymptoms = [];
		arrDemographics = [
			{id : "p_28", state : "absent", description: "Do you smoke or were you smoking for at least ten years in your life?"},
			{id : "p_10", state : "absent", description: "Do you have a high level of cholesterol?"},
			{id : "p_9", state : "absent", description: "Do you have hypertension?"},
			{id : "p_8", state : "absent", description: "Do you have diabetes?"}
		];
		arrGeographics = [
			{id:"p_13", stete: "absent", description:"North America without Mexico<br/>"},
			{id:"p_14", stete: "absent", description:"Latin and South America<br/>"},
			{id:"p_15", stete: "absent", description:"Europe<br/>"},
			{id:"p_16", stete: "absent", description:"Northern Africa<br/>"},
			{id:"p_17", stete: "absent", description:"Central Africa<br/>"},
			{id:"p_18", stete: "absent", description:"Southern Africa<br/>"},
			{id:"p_19", stete: "absent", description:"Australia and Oceania<br/>"},
			{id:"p_20", stete: "absent", description:"Russia, Kazakhstan and Mongolia<br/>"},
			{id:"p_21", stete: "absent", description:"Middle East<br/>"},
			{id:"p_22", stete: "absent", description:"India, China and Southeastern Asia<br/>"},
		 ];
	 }
</script>
<script src="country_select.js?<?= time();?>"></script>
<script src="controls.js?<?= time();?>"></script>
<script src="birth_select.js?<?= time();?>"></script>
<script src="medi_functions.js?<?= time();?>"></script>
<script src="drawContents.js?<?= time();?>"></script>
<link rel="stylesheet" href="main.css?<?=time();?>" type="text/css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">