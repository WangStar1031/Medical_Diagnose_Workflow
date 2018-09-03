
function gotoFirstWelcome(){
	objState.moveTo(-1);
}

function welcomBtnClicked(){
	strFirstQuestion = $(".Infermedica_answer input#mainAnswer").val();
	if( !strFirstQuestion){
		return;
	}
	strUserMail = getCookie("UserEmail");
	if(strUserMail == ""){
		objState.moveTo(0);
	} else{
		objState.moveTo(1);
	}
}
function keyPress(event){
	if( event.keyCode == 13){
		welcomBtnClicked();
	}
}
function drawFirstWelcome(){
	Initialize();
	var text = ["I have a headache..", "I want to talk to a doctor..","Start typing.."];

	var strHtml = "";
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Hello, how can I help you?</p></div>";
	strHtml += "<div class='Infermedica_answer'><input class='main-input Infermedica_input' type='text' id='mainAnswer' placeholder='" + text[0] + "' onkeyup='keyPress(event)'><button class='Infermedica_button_right' onclick='welcomBtnClicked()'>Ask Medics2You</button></div>";
	$(".Infermedica_root").html(strHtml);

	var counter = 1;
	var elem = document.getElementsByClassName("main-input")[0];
	if(elem)
	   inst = setInterval(change, 3000);

	function change() {
	  elem.setAttribute('placeholder', text[counter]);
	  counter++;
	  if (counter >= text.length) {
	    counter = 0;
	  }
	}
	if( strUserMail != ""){
		$.get( "api_userManager.php?case=2&userMail=" + strUserMail, function( data ) {
			objUserInfo = JSON.parse(data);
		});
	}
}

function drawLoginBefore(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(-1)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Befor I can help, I need to take some details from you.</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<button class='Infermedica_button_full' onclick='objState.moveTo(1)'>Get Started</button>";
	strHtml += "<div class='Infermedica_already' onclick='objState.moveTo(2)'><i class='fa fa-user-circle-o'></i> I already have an account.</div>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function verifyLogin(){
	var strEmail = $("input.Infermedica_input[name='email']").val();
	var strPass = $("input.Infermedica_input[name='password']").val();
	$.get("api_userManager.php?case=1&userMail=" + strEmail + "&userPass=" + strPass, function( data ) {
		var retVal = JSON.parse(data);
		if( retVal.ErrorMsg == "Success."){
			objUserInfo = retVal.UserInfo;
			strUserMail = objUserInfo.email;
			setCookie("UserEmail", strUserMail, 1);
			objState.moveTo(1);
		} else{
			$("p.Infermedica_Input_Error.login_required").show();
		}
	});
}
function drawLogin(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Log in to your account</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<label class='Infermedica_label'>Email</label><br/>";
	strHtml += "<input class='Infermedica_input' type='email' name='email'><br/>";
	strHtml += "<label class='Infermedica_label'>Password</label><br/>";
	strHtml += "<input class='Infermedica_input' type='password' name='password'><br/>";
	strHtml += "<p class='Infermedica_Input_Error login_required'>That email / password combination is not valid.</p>";
	strHtml += "<button class='Infermedica_button_full' onclick='verifyLogin()'>Log in</button>";
	strHtml += "<div class='Infermedica_forgot' onclick='objState.moveTo(2)'><i class='fa fa-user-circle-o'></i> Forgotten your passowrd?</div>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function verifySign1Infos() {
	var retVal = true;
	$("p.Infermedica_Input_Error").hide();
	strFirstName = $(".Infermedica_root input[name='firstName']").val();
	if( !strFirstName){
		$("p.Infermedica_Input_Error.firstName_required").show();
		retVal = false;
	}
	strLastName = $(".Infermedica_root input[name='lastName']").val();
	if( !strLastName){
		$("p.Infermedica_Input_Error.lastName_required").show();
		retVal = false;
	}
	if( retVal == false){
		return;
	}
	objState.moveTo(1);
}
function drawSign1(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Let\'s set-up your profile, it only takes a miutes.</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<label class='Infermedica_label'>First name</label><br/>";
	strHtml += "<input class='Infermedica_input' type='text' name='firstName'><br/>";
	strHtml += "<p class='Infermedica_Input_Error firstName_required'>This field is required</p>"
	strHtml += "<label class='Infermedica_label'>Last name</label><br/>";
	strHtml += "<input class='Infermedica_input' type='text' name='lastName'><br/>"
	strHtml += "<p class='Infermedica_Input_Error lastName_required'>This field is required</p>"
	strHtml += "<button class='Infermedica_button_full' onclick='verifySign1Infos()'>Next</button>";
	strHtml += "<div class='Infermedica_already' onclick='objState.moveTo(2)'><i class='fa fa-user-circle-o'></i> I already have an account</div>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function verifySign2Infos(){
	$("p.Infermedica_Input_Error").hide();
	if( verifyBirth() == false){
		$("p.Infermedica_Input_Error.birth_required").show();
		// return false;
	}
	strBirthday = cur_reg_year + "-" + cur_reg_month + "-" + cur_reg_day;
	strCountryCode = $("select.Infermedica_select[name='countries']").val();
	strGender = $(".Infermedica_Option.activated").html();
	if( !strGender){
		$("p.Infermedica_Input_Error.gender_required").show();
	}
	if( verifyBirth() == false || !strGender){
		return false;
	}
	return true;
}
function drawSign2(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Hi, " + strFirstName + ". good to meet you.</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<p class='Infermedica_Description'>We\'re going to be asking you a few more questions in order to provide you with the most accurate medical advice.</p>";
	strHtml += "<label class='Infermedica_label'>Country</label><br/>";
	strHtml += countrySelect + "<br/>";
	strHtml += "<label class='Infermedica_label'>Date of birth</label><br/>";
	strHtml += strBirth + "<br/>";
	strHtml += "<p class='Infermedica_Input_Error birth_required'>This field is required</p>"
	strHtml += "<label class='Infermedica_label'>Gender</label><br/>";
	strHtml += makeOptionButtons(["Male", "Female"]) + "<br/>";
	strHtml += "<p class='Infermedica_Input_Error gender_required'>This field is required</p>"
	strHtml += "<button class='Infermedica_button_full' onclick='if(verifySign2Infos())objState.moveTo(1)'>Next</button>";
	strHtml += "<div class='Infermedica_already' onclick='objState.moveTo(2)'><i class='fa fa-user-circle-o'></i> I already have an account</div>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function validateEmail(_email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(_email).toLowerCase());
}
function verifySign3Infos(){
	var retVal = true;
	$("p.Infermedica_Input_Error").hide();
	var strEmail = $("input.Infermedica_input[name='email']").val();
	if( !strEmail){
		$("p.Infermedica_Input_Error.email_required").show();
		retVal = false;
	} else if(!validateEmail(strEmail)){
		$("p.Infermedica_Input_Error.email_valid").show();
		retVal = false;
	}
	var strPass = $("input.Infermedica_input[name='password']").val();
	if( !strPass){
		$("p.Infermedica_Input_Error.password_required").show();
		retVal = false;
	} else if( (!(/[a-z]/.test(strPass))) || (!(/[A-Z]/.test(strPass))) || (strPass.length < 8)){
		$("p.Infermedica_Input_Error.password_verify").show();
		retVal = false;
	}
	if( $("input[name='chkAgree']").prop("checked") != true){
		$("p.Infermedica_Input_Error.terms_required").show();
		retVal = false;
	}
	if( !retVal){
		return;
	}
	objUserInfo = {firstName: strFirstName, lastName: strLastName, country: strCountryCode, birth: strBirthday, gender: strGender, email: strEmail, password: strPass};
	$.get("api_userManager.php?case=0&userInfo=" + JSON.stringify(objUserInfo), function( data ) {
		if( data == "YES"){
			setCookie("UserEmail", objUserInfo.email, 1);
			objState.moveTo(1);
		} else{
			alert("Couldn\'t create user.")
			return;
		}
	});

}
function drawSign3(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Finally. We just need an email address and password to keep your data safe.</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<label class='Infermedica_label'>Email</label><br/>";
	strHtml += "<input class='Infermedica_input' type='email' name='email'><br/>";
	strHtml += "<p class='Infermedica_Input_Error email_required'>This field is required</p>";
	strHtml += "<p class='Infermedica_Input_Error email_valid'>This doesn\'t look like a valid email address to us</p>";
	strHtml += "<label class='Infermedica_label'>Password</label><br/>";
	strHtml += "<input class='Infermedica_input' type='password' name='password'><br/>";
	strHtml += "<p class='Infermedica_Input_Error password_required'>This field is required</p>";
	strHtml += "<p class='Infermedica_Input_Error password_verify'>This password does not match the criteria</p>";
	strHtml += "<p class='Infermedica_Description' style='margin-top: 16px; font-size: 12px;'>Use at least 8 charactrers including a number an uppercase and a lowercase letter.</p>";
	strHtml += "<input class='' type='checkbox' name='chkAgree'> I agree to the terms & conditions<br/>";
	strHtml += "<p class='Infermedica_Input_Error terms_required'>You must accept the terms and conditons to use our services.</p>";
	strHtml += "<p class='Infermedica_Description' style='margin-top: 16px;'>By proceeding you acknowledge that you have read and agree to the <span style='color: #d2205a;'>Terms & Conditions</span></p>";
	strHtml += "<p class='Infermedica_Description'>Use of the Medics2You service is subject to the <span style='color: #d2205a;'>Privacy Policy</span></p>";
	strHtml += "<button class='Infermedica_button_full' onclick='verifySign3Infos()'>Create account</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function getCustomer_NextStep(){
	var strEmail = objUserInfo.email;
	$.get("api_userManager.php?case=3&userMail=" + strEmail, function( data ) {
		arrCustomers = JSON.parse(data);
		objState.moveTo(1);
	});
}
function drawWelcomeBack(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>Hi, welcome back to Medics2You. I\'m here to make sure you get the medical help you need.</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<p class='Infermedica_Description'>If this is an emergency, please call 999. I need to let you know. I\'m still learning about symptoms in pregnancy, skin problems, and mental health issues, so for these please speak to a GP.</p>";
	strHtml += "<p class='Infermedica_Description'>Who can I help today?</p>"
	strHtml += "<button class='Infermedica_button' onclick='getCustomer_NextStep()'>Someone else</button>";
	strHtml += "<button class='Infermedica_button' onclick='setCustomer(objUserInfo.gender, objUserInfo.birth);objState.moveTo(2)'>Myself</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function drawWhoCanI(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Hi, "+objUserInfo.firstName+". Who can I help today?</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<button class='Infermedica_button' onclick='getCustomer_NextStep()'>Someone else</button>";
	strHtml += "<button class='Infermedica_button' onclick='setCustomer(objUserInfo.gender, objUserInfo.birth);objState.moveTo(2)'>Myself</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function setCustomer(cus_Gender, cus_Birth){
	if( cus_Gender == 0){
		customer_Gender = "";
	} else{
		customer_Gender = cus_Gender;
	}
	if( cus_Birth == 0){
		customer_Age = "";
	} else{
		customer_Age = (new Date()).getFullYear() - cus_Birth.split("-")[0];
	}
}
function drawWhoCanSomeOne(){
		var strHtml = "";
		strHtml += "<div class='Infermedica_header'>";
		strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
		strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
		strHtml += "</div>";
		strHtml += "<div style='clear:both;'></div>"
		strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Who needs my help today?</p></div>";
		strHtml += "<div class='Infermedica_answer'>";
		strHtml += "<button class='Infermedica_button' onclick='setCustomer(0,0);objState.moveTo(1)'>I don\'t know I don\'t know</button>";
		for( var i = 0; i < arrCustomers.length; i++){
			var customer = arrCustomers[i];
			strHtml += "<button class='Infermedica_button' onclick='setCustomer(\"" + customer.gender + "\", \"" + customer.birth + "\");objState.moveTo(1)'>";
			strHtml += customer.firstName + " " + customer.lastName + "</button>";
		}
		strHtml += "<button class='Infermedica_button' onclick='objState.moveTo(2)'>Someone else</button>";
		strHtml += "</div>";
		$(".Infermedica_root").html(strHtml);
}
function verifyValue( _value){
	$("p.Infermedica_Input_Error").hide();
	if( !_value){
		$("p.Infermedica_Input_Error.Name_required").show();
		return false;
	}
	return true;
}
function drawSomeoneReg1(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>What is their first name?</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<p class='Infermedica_Input_Error Name_required'>There was a problem sending this message. Please try again.</p>";
	strHtml += "<input class='Infermedica_input' type='text' name='firstName' placeholder='Type something...'>";
	strHtml += "<button class='Infermedica_button_right' onclick='cur_reg_firstName=$(\"input\").val();if(verifyValue(cur_reg_firstName))objState.moveTo(1);'>Send</button>";

	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function drawSomeoneReg2(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>What is " + cur_reg_firstName + "\'s surname?</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<p class='Infermedica_Input_Error Name_required'>There was a problem sending this message. Please try again.</p>";
	strHtml += "<input class='Infermedica_input' type='text' name='firstName' placeholder='Type something...'>";
	strHtml += "<button class='Infermedica_button_right' onclick='cur_reg_lastName=$(\"input\").val();if(verifyValue(cur_reg_lastName))objState.moveTo(1);'>Send</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function drawSomeoneReg3(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>What is " + cur_reg_firstName + "\'s gender?</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<button class='Infermedica_button' onclick='cur_reg_gender=\"Male\";objState.moveTo(1);'>Male</button>";
	strHtml += "<button class='Infermedica_button' onclick='cur_reg_gender=\"Female\";objState.moveTo(1);'>Female</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function submitCustomer(){
	$("p.Infermedica_Input_Error").hide();
	if(verifyBirth() == false){
		$("p.Infermedica_Input_Error.date_required").show();
		return;
	}
	
	customer_Age = (new Date()).getFullYear() - (cur_reg_year * 1);

	if( customer_Age < 10){
		objState.moveTo(1);
	} else{
		var customer = { firstName: cur_reg_firstName, lastName: cur_reg_lastName, gender: cur_reg_gender, birth: cur_reg_year + "-" + cur_reg_month + "-" + cur_reg_day};
		$.get( "api_userManager.php?case=4&userMail=" + objUserInfo.email + "&customerInfo=" + JSON.stringify(customer), function( data ) {
			if( data == "YES"){
				objState.moveTo(2);
			}
		});
	}

}
function drawSomeoneReg4(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>What is " + cur_reg_firstName + "\'s date of birth?</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += strBirth;
	strHtml += "<button class='Infermedica_button_full' style='margin-top: 50px;' onclick='submitCustomer();'>Submit</button>";
	strHtml += "<p class='Infermedica_Input_Error date_required'>Please fill every field</p>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function submitPhoneNumber(){
	alert("sent your phone number.");
}
function drawSomeoneChildren(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>Thank you! I will also need to ask for a phone number to contact in case of emergency.</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<p class='Infermedica_Description'>With kids I take extra care.</p>";
	strHtml += "<label>+" + getPhoneCode4Country(strCountryCode) + "</label>";
	strHtml += "<input class='Infermedica_input' type='number'>";
	strHtml += "<button class='Infermedica_button_right' onclick='submitPhoneNumber();'>Send</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function drawDiagnosisReady(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>I\'m now going to ask you a few questions about your symptoms. Whilst some of my questions might seem unrelated, I was trained by doctors to consider many possible causes for the symptoms you entered. When I\'m done, I\'ll provide you with a report based on the information you with a report based on the information you\'ve given me.</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<p class='Infermedica_Description'>Before we start, I have to remind you that for regulatory reasons, at the moment, I can\'t help with skin problems, pregnancy or children\'s health. Please also note this isn\'t a personal diagnosis and is for information purposes only.</p>";
	strHtml += "<p class='Infermedica_Description'>If you or someone else are experiencing concerning symptoms, including any of the following. I would advise you contact emergency services immediately: (1) Servere, heavy or crushing chest pain, which may move to jaw, neck, arm, or back, or be associated with sweating, shortness of breath or nausea. (2) Signs of a stroke, which may include facial weakness, inablility to hold both arms up, or difficulty speaking. (3) Severe breathing problems.</p>";
	strHtml += "<button class='Infermedica_button' onclick='objState.moveTo(1);'>Continue</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function drawSymptomConfirm_1(){
	getParse();
}
function drawSymptomConfirm(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>Firstly, I\'d like to check that I understand you correctly. Is your main symptom: "+strMainSymptom+"?</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<button class='Infermedica_button' onclick='objState.moveTo(1);'>Yes</button>";
	strHtml += "<button class='Infermedica_button' onclick='objState.moveTo(2);'>No</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function removeSymptom(_id){
	arrInitialSymptoms = arrInitialSymptoms.filter(function(_this){
		return _this.id != _id;
	});
	drawSelectedSymptoms();
}
function drawSelectedSymptoms(){
	var strHtmlBuf = "";
	for( var i = 0; i < arrInitialSymptoms.length; i++){
		var curSymptom = arrInitialSymptoms[i];
		strHtmlBuf += "<div class='Infermedica_iniSymptoms' id='iniSymptom_" + curSymptom.id + "'>" + curSymptom.common_name + "<span onclick='removeSymptom(\"" + curSymptom.id + "\")'>X"+ "</span></div>";
	}
	if( arrInitialSymptoms.length){
		$(".Infermedica_button.symptom_Confirm").css("visibility","visible");
	} else{
		$(".Infermedica_button.symptom_Confirm").css("visibility","hidden");
	}
	$(".Infermedica_iniSymptoms_Group").html( strHtmlBuf);
}
function drawCurSymptoms(_arrCurSymptoms){
	var strHtml = "";
	strHtml += "<ul class='Infermedica_list curSymptoms'>";
	for( var i = 0; i < _arrCurSymptoms.length; i++){
		var symptom = _arrCurSymptoms[i];
		strHtml += "<li id='" + symptom.id + "'>" + symptom.common_name + "</li>";
	}
	strHtml += "</ul>";
	$("input.Infermedica_input#mainAnswer").after(strHtml);
	$("ul.Infermedica_list.curSymptoms li").click(function(){
		var selSymptomId = $(this).attr("id");
		var selSymptomTxt = $(this).text();
		arrInitialSymptoms.push(_arrCurSymptoms.filter(function(_this){
			return _this.id == selSymptomId;
		})[0]);
		drawSelectedSymptoms();
		console.log(selSymptomId + ":" + selSymptomTxt);
		$(".Infermedica_root input").val("");
		$("ul.Infermedica_list.curSymptoms").remove();
	});
}
function symptomChanged(event){
	$("ul.Infermedica_list.curSymptoms").remove();
	var strSymptom = $(".Infermedica_root input").val();
	if( strSymptom.length > 3){
		var arrCurSymptoms = arrAllSymptoms.filter(function(_this){
			var aa = _this.common_name.toLowerCase();
			if(aa.indexOf(strSymptom.toLowerCase()) == -1) return false;
			for( var i = 0; i < arrInitialSymptoms.length; i++){
				if( _this.id == arrInitialSymptoms[i].id) return false;
			}
			return true;
		});
		drawCurSymptoms(arrCurSymptoms);
	}
}
function drawSymptomInputAgain_1(){
	getAllSymptoms4InputAgain();
}
function symptomConfirmClicked(){
	objState.moveTo(1);
}
function drawSymptomInputAgain(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>I\'m sorry, I don\'t think I correctly understood your symptom.</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<p class='Infermedica_Description'>Please try again, checking the symptom in simple words.</p>";
	strHtml += "<input class='Infermedica_input' type='text' id='mainAnswer' onkeyup='symptomChanged(event)'>";
	strHtml += "<div class='Infermedica_iniSymptoms_Group'>";
	for( var i = 0; i < arrInitialSymptoms.length; i++){
		var curSymptom = arrInitialSymptoms[i];
		strHtml += "<div class='Infermedica_iniSymptoms' id='iniSymptom_" + curSymptom.id + "'>" + curSymptom.common_name + "</div>";
	}
	strHtml += "</div>";
	strHtml += "<button class='Infermedica_button symptom_Confirm' onclick='symptomConfirmClicked()' style='visibility: hidden;'>Confirm</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function confirmDemographics(){
	for( var i = 0; i < arrDemographics.length; i++){
		var demographic = arrDemographics[i];
		if( $("input.Infermedica_answer_chk[name='" + demographic.id + "']").prop("checked")){
			arrDemographics[i].state = "present";
		} else{
			arrDemographics[i].state = "absent";
		}
	}
	objState.moveTo(1);
}
function drawSelectDemographics(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>Please check all the statements below that apply to you</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	var isConfirmState = false;
	for( var i = 0; i < arrDemographics.length; i++){
		var demographic = arrDemographics[i];
		var chkVal = "";
		if( demographic.state == "present"){
			isConfirmState = true;
			chkVal = "checked";
		}
		strHtml += "<input class='Infermedica_answer_chk' type='checkbox' name='" + demographic.id + "' " + chkVal + ">" + demographic.description + "<br>";
	}
	strHtml += "<button class='Infermedica_button demogra_Confirm' style='visibility:hidden' onclick='confirmDemographics()'>Next</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
	$(".Infermedica_answer_chk").change(function(){
		if( $(".Infermedica_answer_chk:checked").length){
			$(".Infermedica_button.demogra_Confirm").css("visibility", "visible");
		} else{
			$(".Infermedica_button.demogra_Confirm").css("visibility", "hidden");
		}
	});
	if( isConfirmState){
		$(".Infermedica_button.demogra_Confirm").css("visibility", "visible");
	}
}
function confirmGeographics(){
	for( var i = 0; i < arrGeographics.length; i++){
		var geographic = arrGeographics[i];
		if( $("input.Infermedica_answer_chk[name='" + geographic.id + "']").prop("checked")){
			arrGeographics[i].state = "present";
		} else{
			arrGeographics[i].state = "absent";
		}
	}
	objState.moveTo(1);
}
function drawSelectGeoGraphical(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>Please select the region you live in and places you\'ve traveled to in the last 12 months.</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	var isChecked = false;
	for( var i = 0; i < arrGeographics.length; i++){
		var geographic = arrGeographics[i];
		if( geographic.state == "present")
			isChecked = true;
		strHtml += "<input class='Infermedica_answer_chk' type='checkbox' name='" + geographic.id + "' " + (geographic.state=="present"?"checked":"") + ">" + geographic.description + "<br>";
	}
	if( !isChecked){
		strHtml += "<button class='Infermedica_button demogra_Confirm' style='visibility:hidden' onclick='confirmGeographics()'>Next</button>";
	} else{
		strHtml += "<button class='Infermedica_button demogra_Confirm' onclick='confirmGeographics()'>Next</button>";
	}
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
	$(".Infermedica_answer_chk").change(function(){
		if( $(".Infermedica_answer_chk:checked").length){
			$(".Infermedica_button.demogra_Confirm").css("visibility", "visible");
		} else{
			$(".Infermedica_button.demogra_Confirm").css("visibility", "hidden");
		}
	});
}
function drawSearch_Suggest_1(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>Would you like information about any of the following?</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	for( var i = 0; i < parsedSymptoms.length; i++){
		var symptom = parsedSymptoms[i];
		var isCheckedVal = "";
		if( arrInitialSymptoms.filter(function(_this){
			return _this.id == symptom.id;
		}).length){
			isCheckedVal = "checked";
		}
		if( symptom.common_name){
			strHtml += "<input class='Infermedica_answer_chk' type='checkbox' name='" + symptom.id + "' " + isCheckedVal + ">" + symptom.common_name + "<br>";
		} else{
			strHtml += "<input class='Infermedica_answer_chk' type='checkbox' name='" + symptom.id + "' " + isCheckedVal + ">" + symptom.label + "<br>";
		}
	}
	strHtml += "<button class='Infermedica_button symptom_Confirm' style='visibility:hidden' onclick='objState.moveTo(1);'>Next</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
	for( var i = 0; i < arrInitialSymptoms.length; i++){
		var symptom = arrInitialSymptoms[i];

	}
	$(".Infermedica_answer_chk").change(function(){
		if( $(".Infermedica_answer_chk:checked").length){
			$(".Infermedica_button.symptom_Confirm").css("visibility", "visible");
		} else{
			$(".Infermedica_button.symptom_Confirm").css("visibility", "hidden");
		}
	});

}
function drawSearch_Suggest(){
	if( strMainSymptom == ""){
		objState.moveTo(1);
	} else{
		get_Search_Suggest();
	}
}
function drawDiagnosisLoop(){
	if( objDiagAnal == null){
		var prevState = g_states.STAT_SEARCH_SUGGEST;
		if( parsedSymptoms.length){
			arrStartSymptoms.push({"id": strMainId, "choice_id":"present", "initial":true});
			for( var i = 0; i < parsedSymptoms.length; i++){
				var symptom = parsedSymptoms[i];
				var checked = $("input.Infermedica_answer_chk[name='" + symptom.id + "']").prop("checked");
				if( checked){
					arrStartSymptoms.push({"id":symptom.id, "choice_id":"present"});
				} else{
					arrStartSymptoms.push({"id":symptom.id, "choice_id":"absent"});
				}
			}
		} else{
			prevState = g_states.STAT_SELECT_GEOGRAPHICAL;
			for( var i = 0; i < arrInitialSymptoms.length; i++){
				var symptom = arrInitialSymptoms[i];
				arrStartSymptoms.push({"id":symptom.id, "choice_id":"present", "initial":true});
			}
		}
		objDiagAnal = new diagAnal(prevState, arrStartSymptoms);	
	}
}
function drawDiagnosisResult(){

}
function drawDiagnosisFeedBack(){

}
function drawDiagnosisFault(){

}
function drawContents(){
	switch(objState.getState()){
		case g_states.STAT_FIRST_WELCOME: drawFirstWelcome(); break;
		case g_states.STAT_LOGIN_BEFORE: drawLoginBefore(); break;
		case g_states.STAT_LOGIN: drawLogin(); break;
		case g_states.STAT_SIGN_1: drawSign1(); break;
		case g_states.STAT_SIGN_2: drawSign2(); break;
		case g_states.STAT_SIGN_3: drawSign3(); break;
		case g_states.STAT_WELCOME_BACK: drawWelcomeBack(); break;
		case g_states.STAT_WHO_CAN_I: drawWhoCanI(); break;
		case g_states.STAT_WHO_CAN_SOMEONE: drawWhoCanSomeOne(); break;
		case g_states.STAT_SOMEONE_REG_1: drawSomeoneReg1(); break;
		case g_states.STAT_SOMEONE_REG_2: drawSomeoneReg2(); break;
		case g_states.STAT_SOMEONE_REG_3: drawSomeoneReg3(); break;
		case g_states.STAT_SOMEONE_REG_4: drawSomeoneReg4(); break;
		case g_states.STAT_SOMEONE_CHILDREN: drawSomeoneChildren(); break;
		case g_states.STAT_DIAGNOSIS_READY: drawDiagnosisReady(); break;
		case g_states.STAT_SYMPTOM_CONFIRM: drawSymptomConfirm_1(); break;
		case g_states.STAT_SYMPTOM_INPUT_AGAIN: drawSymptomInputAgain_1(); break;
		case g_states.STAT_SELECT_DEMOGRAPHICS: drawSelectDemographics(); break;
		case g_states.STAT_SELECT_GEOGRAPHICAL: drawSelectGeoGraphical(); break;
		case g_states.STAT_SEARCH_SUGGEST: drawSearch_Suggest(); break;
		// case g_states.STAT_DIAGNOSIS_FIRST: drawDiagnosisFirst(); break;
		case g_states.STAT_DIAGNOSIS_LOOP: drawDiagnosisLoop(); break;
		case g_states.STAT_DIAGNOSIS_FINISH: drawDiagnosisFinish(); break;
		case g_states.STAT_DIAGNOSIS_RESULT: drawDiagnosisResult(); break;
		case g_states.STAT_DIAGNOSIS_FEEDBACK: drawDiagnosisFeedBack(); break;
		case g_states.STAT_DIAGNOSIS_FAULT: drawDiagnosisFault(); break;

	}
}
drawContents();
