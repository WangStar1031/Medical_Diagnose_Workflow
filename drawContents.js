
let objState = new stateManager();

function gotoFirstWelcome(){
	objState.moveTo(-1);
}
function welcomBtnClicked(){
	if(getCookie("User_First_Name") == ""){
		objState.moveTo(0);
	} else{
		strFirstName = getCookie("User_First_Name");
		objState.moveTo(1);
	}
}
function drawFirstWelcome(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Hello, how can I help you?</p></div>";
	strHtml += "<div class='Infermedica_answer'><input class='Infermedica_input' type='text' id='mainAnswer'><button class='Infermedica_button_right' onclick='welcomBtnClicked()'>Ask Medics2You</button></div>";
	$(".Infermedica_root").html(strHtml);
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
	strHtml += "<div class='Infermedica_already' onclick='objState.moveTo(2)'>I already have an account.</div>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
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
	strHtml += "<input class='Infermedica_input' type='password' name='password'><br/>"
	strHtml += "<button class='Infermedica_button_full' onclick='objState.moveTo(0)'>Log in</button>";
	strHtml += "<div class='Infermedica_forgot' onclick='objState.moveTo(1)'>Forgotten your passowrd?</div>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function signIn1Next() {
	strFirstName = $(".Infermedica_root input[name='firstName']").val();
	if( strFirstName == ""){
		alert("Please insert First Name.");
		return;
	}
	setCookie("User_First_Name", strFirstName, 1);
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
	strHtml += "<label class='Infermedica_label'>Last name</label><br/>";
	strHtml += "<input class='Infermedica_input' type='text' name='lastName'><br/>"
	strHtml += "<button class='Infermedica_button_full' onclick='signIn1Next()'>Next</button>";
	strHtml += "<div class='Infermedica_already' onclick='objState.moveTo(2)'>I already have an account</div>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function verifySign2Infos(){
	if( verifyBirth() == false)
		return false;
	strYear = cur_reg_year;
	strMonth = cur_reg_month;
	strDay = cur_reg_day;
	strGender = $(".Infermedica_Option.activated").html();
	strCountryCode = $("select[name='countries'] option:selected").val();
	if( strGender == "" || strCountryCode == ""){
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
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Hi, " + strFirstName + "</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<p>We\'re going to be asking you a few more questions in order to provide you with the most accurate medical advice.</p>";
	strHtml += "<label class='Infermedica_label'>Country</label><br/>";
	strHtml += countrySelect + "<br/>";
	strHtml += "<label class='Infermedica_label'>Date of birth</label><br/>";
	strHtml += strBirth + "<br/>";
	strHtml += "<label class='Infermedica_label'>Gender</label><br/>";
	strHtml += makeOptionButtons(["Male", "Female"]) + "<br/>";
	strHtml += "<button class='Infermedica_button_full' onclick='if(verifySign2Infos())objState.moveTo(1)'>Next</button>";
	strHtml += "<div class='Infermedica_already' onclick='objState.moveTo(2)'>I already have an account</div>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
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
	strHtml += "<label class='Infermedica_label'>Password</label><br/>";
	strHtml += "<input class='Infermedica_input' type='password' name='password'><br/>"
	strHtml += "<p>Use at least 8 charactrers including a number an uppercase and a lowercase letter.</p>";
	strHtml += "<input class='Infermedica_input' type='checkbox' name='chkAgree'> I agree to the terms & confditions<br/>";
	strHtml += "<p>By proceeding you acknowledge that you have read and agree to the <span>Terms & Conditions</span></p>";
	strHtml += "<p>Use of the Medics2You service is subject to the <span>Privacy Policy</span></p>";
	strHtml += "<button class='Infermedica_button_full' onclick='objState.moveTo(1)'>Create account</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function drawWelcomeBack(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Hi, welcome back to Medics2You. I\'m here to make sure you get the medical help you need.</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<p>If this is an emergency, please call 999. I need to let you know. I\'m still learning about symptoms in pregnancy, skin problems, and mental health issues, so for these please speak to a GP.</p>";
	strHtml += "<p>Who can I help today?</p>"
	strHtml += "<button class='Infermedica_button' onclick='objState.moveTo(1)'>Someone else</button>";
	strHtml += "<button class='Infermedica_button' onclick='objState.moveTo(2)'>Myself</button>";
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
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Hi, "+strFirstName+". Who can I help today?</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<button class='Infermedica_button' onclick='objState.moveTo(1)'>Someone else</button>";
	strHtml += "<button class='Infermedica_button' onclick='objState.moveTo(2)'>Myself</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function setCustomer(customer=null){
	if( customer == null){
		customer_Age = "";
		customer_Gender = "";
		return;
	}
	customer_Age = (new Date()).getFullYear() - customer.birthYear;
	customer_Gender = customer.gender;
}
function drawWhoCanSomeOne(){
// strAllCustomers
	var arrCustomers = [];
	if( strAllCustomers != ""){
		arrCustomers = JSON.parse(strAllCustomers);
	}
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Who needs my help today?</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<button class='Infermedica_button' onclick='setCustomer();objState.moveTo(1)'>I don\'t know I don\'t know</button>";
	for( var i = 0; i < arrCustomers.length; i++){
		var customer = arrCustomers[i];
		strHtml += "<button class='Infermedica_button' onclick='setCustomer(" + customer + ");objState.moveTo(1)'>";
		strHtml += customer.firstName + " " + customer.lastName + "</button>";
	}
	strHtml += "<button class='Infermedica_button' onclick='objState.moveTo(2)'>Someone else</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);

}
function alertMsg(value){
	if( !value){
		alert("Please enter the value.");
		return false;
	}
	return true;
}
function verifyValue( _value){
	if( !_value)
		return false;
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
	strHtml += "<input class='Infermedica_input' type='text' name='firstName' placeholder='Type something...'>";
	strHtml += "<button class='Infermedica_button_right' onclick='cur_reg_lastName=$(\"input\").val();if(verifyValue(cur_reg_firstName))objState.moveTo(1);'>Send</button>";
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
	if(verifyBirth() == false){
		return;
	}
	customer_Age = (new Date()).getFullYear() - (cur_reg_year * 1);
	customer_Gender = cur_reg_gender;
	var customer = {birthYear: cur_reg_year, gender: customer_Gender};
	var arrCustomers = [];
	if( strAllCustomers != ""){
		arrCustomers = JSON.parse(strAllCustomers);
	}
	arrCustomers.push(customer);
	strAllCustomers = JSON.stringify(arrCustomers);
	console.log(strAllCustomers);
	if( customer_Age < 18){
		objState.moveTo(1);
	} else{
		objState.moveTo(2);
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
	strHtml += "<button class='Infermedica_button_right' onclick='submitCustomer();'>Submit</button>";
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
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Thank you! I will also need to ask for a phone number to contact in case of emergency.</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<p>With kids I take extra care.</p>";
	strHtml += "<label class='Infermedica_label'>+" + getPhoneCode4Country(strCountryCode) + "</label>";
	strHtml += "<input class='Infermedica_input' type='tel'>";
	strHtml += "<button class='Infermedica_button_right' onclick='submitPhoneNumber();'>Send</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function drawDiagnosisReady(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>I\'m now going to ask you a few questions about your symptoms. Whilst some of my questions might seem unrelated, I was trained by doctors to consider many possible causes for the symptoms you entered. When I\'m done, I\'ll provide you with a report based on the information you with a report based on the information you\'ve given me.</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<p>Before we start, I have to remind you that for regulatory reasons, at the moment, I can\'t help with skin problems, pregnancy or children\'s health. Please also note this isn\'t a personal diagnosis and is for information purposes only.</p>";
	strHtml += "<p>If you or someone else are experiencing concerning symptoms, including any of the following. I would advise you contact emergency services immediately: (1) Servere, heavy or crushing chest pain, which may move to jaw, neck, arm, or back, or be associated with sweating, shortness of breath or nausea. (2) Signs of a stroke, which may include facial weakness, inablility to hold both arms up, or difficulty speaking. (3) Severe breathing problems.</p>";
	strHtml += "<button class='Infermedica_button_full' onclick='objState.moveTo(1);'>Continue</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function drawSymptomConfirm(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Firstly, I\'d like to check that I understand you correctly. Is your main symptom: "+strMainSymptom+"?</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<button class='Infermedica_button_full' onclick='objState.moveTo(1);'>Yes</button>";
	strHtml += "<button class='Infermedica_button_full' onclick='objState.moveTo(2);'>No</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function symptomInputAgain(){
	var strSymptom = $(".Infermedica_root input").val();
	if( !strSymptom){
		alert("Please enter your symptom.");
		return;
	}
	objState.moveTo(1);
}
function drawSymptomInputAgain(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>I\'m sorry, I don\'t think I correctly understood your symptom.</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<p>Please try again, descriting the symptom in simple language.</p>";
	strHtml += "<input class='Infermedica_input' type='text' id='mainAnswer'><button class='Infermedica_button_right' onclick='symptomInputAgain()'>Send</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
}
function drawSymptomConfirmAgain(){
	var strHtml = "";
	strHtml += "<div class='Infermedica_header'>";
	strHtml += "<button class='Infermedica_back' onclick='objState.moveTo(0)'><b>⇦</b>   Back</button>";
	strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infermedica_question'><p class='Infermedica_question_header'>Once again, I\'d like to check that I understand you correctly. Is  your symptomo: "+strMainSymptom+"?</p></div>";
	strHtml += "<div class='Infermedica_answer'>";
	strHtml += "<button class='Infermedica_button_full' onclick='objState.moveTo(1);'>Yes</button>";
	strHtml += "<button class='Infermedica_button_full' onclick='objState.moveTo(2);'>No</button>";
	strHtml += "</div>";
	$(".Infermedica_root").html(strHtml);
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
		case g_states.STAT_SYMPTOM_CONFIRM: drawSymptomConfirm(); break;
		case g_states.STAT_SYMPTOM_INPUT_AGAIN: drawSymptomInputAgain(); break;
		case g_states.STAT_SYMPTOM_CONFIRM_AGAIN: drawSymptomConfirmAgain(); break;

	}
}
drawContents();
