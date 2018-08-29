
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
	strHtml += "<div class='Infer_Medi_question'><p>Hello, how can I help you?</p></div>";
	strHtml += "<div class='Infer_Medi_answer'><input type='text' id='mainAnswer'><button onclick='welcomBtnClicked()'>Ask Medics2You</button></div>";
	$(".Infer_Med_root").html(strHtml);
}
function drawLoginBefore(){
	var strHtml = "";
	strHtml += "<div class='Infer_Medi_header'>";
	strHtml += "<button class='Infer_Medi_back' onclick='objState.moveTo(-1)'>Back</button>";
	strHtml += "<button class='Infer_Medi_exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infer_Medi_question'><p>Befor I can help, I need to take some details from you.</p></div>";
	strHtml += "<div class='Infer_Medi_answer'>";
	strHtml += "<button onclick='objState.moveTo(1)'>Get Started</button>";
	strHtml += "<button class='Infer_Medi_already' onclick='objState.moveTo(2)'>I already have an account.</button>";
	strHtml += "</div>";
	$(".Infer_Med_root").html(strHtml);
}
function drawLogin(){
	var strHtml = "";
	strHtml += "<div class='Infer_Medi_header'>";
	strHtml += "<button class='Infer_Medi_back' onclick='objState.moveTo(0)'>Back</button>";
	strHtml += "<button class='Infer_Medi_exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infer_Medi_question'><p>Log in to your account</p></div>";
	strHtml += "<div class='Infer_Medi_answer'>";
	strHtml += "<label>Email</label><br/>";
	strHtml += "<input type='email' name='email'><br/>";
	strHtml += "<label>Password</label><br/>";
	strHtml += "<input type='password' name='password'><br/>"
	strHtml += "<button onclick='objState.moveTo(0)'>Log in</button>";
	strHtml += "<button class='Infer_Medi_forgot' onclick='objState.moveTo(1)'>Forgotten your passowrd?</button>";
	strHtml += "</div>";
	$(".Infer_Med_root").html(strHtml);
}
function signIn1Next() {
	strFirstName = $("input[name='firstName']").val();
	if( strFirstName == ""){
		alert("Please insert First Name.");
		return;
	}
	setCookie("User_First_Name", strFirstName, 1);
	objState.moveTo(1);
}
function drawSign1(){
	var strHtml = "";
	strHtml += "<div class='Infer_Medi_header'>";
	strHtml += "<button class='Infer_Medi_back' onclick='objState.moveTo(0)'>Back</button>";
	strHtml += "<button class='Infer_Medi_exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infer_Medi_question'><p>Let\'s set-up your profile, it only takes a miutes.</p></div>";
	strHtml += "<div class='Infer_Medi_answer'>";
	strHtml += "<label>First name</label><br/>";
	strHtml += "<input type='text' name='firstName'><br/>";
	strHtml += "<label>Last name</label><br/>";
	strHtml += "<input type='text' name='lastName'><br/>"
	strHtml += "<button onclick='signIn1Next()'>Next</button>";
	strHtml += "<button class='Infer_Medi_already' onclick='objState.moveTo(2)'>I already have an account</button>";
	strHtml += "</div>";
	$(".Infer_Med_root").html(strHtml);
}
function drawSign2(){
	var strHtml = "";
	strHtml += "<div class='Infer_Medi_header'>";
	strHtml += "<button class='Infer_Medi_back' onclick='objState.moveTo(0)'>Back</button>";
	strHtml += "<button class='Infer_Medi_exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infer_Medi_question'><p>Hi, " + strFirstName + "</p></div>";
	strHtml += "<div class='Infer_Medi_answer'>";
	strHtml += "<p>We\'re going to be asking you a few more questions in order to provide you with the most accurate medical advice.</p>";
	strHtml += "<label>Country</label><br/>";
	strHtml += countrySelect + "<br/>";
	strHtml += "<label>Date of birth</label><br/>";
	strHtml += strBirth + "<br/>";
	strHtml += "<label>Gender</label><br/>";
	strHtml += makeOptionButtons(["Male", "Female"]) + "<br/>";
	strHtml += "<button onclick='objState.moveTo(1)'>Next</button>";
	strHtml += "<button class='Infer_Medi_already' onclick='objState.moveTo(2)'>I already have an account</button>";
	strHtml += "</div>";
	$(".Infer_Med_root").html(strHtml);
}
function drawSign3(){
	var strHtml = "";
	strHtml += "<div class='Infer_Medi_header'>";
	strHtml += "<button class='Infer_Medi_back' onclick='objState.moveTo(0)'>Back</button>";
	strHtml += "<button class='Infer_Medi_exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infer_Medi_question'><p>Finally. We just need an email address and password to keep your data safe.</p></div>";
	strHtml += "<div class='Infer_Medi_answer'>";
	strHtml += "<label>Email</label><br/>";
	strHtml += "<input type='email' name='email'><br/>";
	strHtml += "<label>Password</label><br/>";
	strHtml += "<input type='password' name='password'><br/>"
	strHtml += "<p>Use at least 8 charactrers including a number an uppercase and a lowercase letter.</p>";
	strHtml += "<input type='checkbox' name='chkAgree'> I agree to the terms & confditions<br/>";
	strHtml += "<p>By proceeding you acknowledge that you have read and agree to the <span>Terms & Conditions</span></p>";
	strHtml += "<p>Use of the Medics2You service is subject to the <span>Privacy Policy</span></p>";
	strHtml += "<button onclick='objState.moveTo(1)'>Create account</button>";
	strHtml += "</div>";
	$(".Infer_Med_root").html(strHtml);
}
function drawWelcomeBack(){
	var strHtml = "";
	strHtml += "<div class='Infer_Medi_header'>";
	strHtml += "<button class='Infer_Medi_back' onclick='objState.moveTo(0)'>Back</button>";
	strHtml += "<button class='Infer_Medi_exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infer_Medi_question'><p>Hi, welcome back to Medics2You. I\'m here to make sure you get the medical help you need.</p></div>";
	strHtml += "<div class='Infer_Medi_answer'>";
	strHtml += "<p>If this is an emergency, please call 999. I need to let you know. I\'m still learning about symptoms in pregnancy, skin problems, and mental health issues, so for these please speak to a GP.</p>";
	strHtml += "<p>Who can I help today?</p>"
	strHtml += "<button onclick='objState.moveTo(1)'>Someone else</button>";
	strHtml += "<button onclick='objState.moveTo(2)'>Myself</button>";
	strHtml += "</div>";
	$(".Infer_Med_root").html(strHtml);
}
function drawWhoCanI(){
	var strHtml = "";
	strHtml += "<div class='Infer_Medi_header'>";
	strHtml += "<button class='Infer_Medi_back' onclick='objState.moveTo(0)'>Back</button>";
	strHtml += "<button class='Infer_Medi_exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infer_Medi_question'><p>Hi, "+strFirstName+". Who can I help today?</p></div>";
	strHtml += "<div class='Infer_Medi_answer'>";
	strHtml += "<button onclick='objState.moveTo(1)'>Someone else</button>";
	strHtml += "<button onclick='objState.moveTo(2)'>Myself</button>";
	strHtml += "</div>";
	$(".Infer_Med_root").html(strHtml);
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
	strHtml += "<div class='Infer_Medi_header'>";
	strHtml += "<button class='Infer_Medi_back' onclick='objState.moveTo(0)'>Back</button>";
	strHtml += "<button class='Infer_Medi_exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infer_Medi_question'><p>Who needs my help today?</p></div>";
	strHtml += "<div class='Infer_Medi_answer'>";
	strHtml += "<button onclick='setCustomer();objState.moveTo(1)'>I don\'t know I don\'t know</button>";
	for( var i = 0; i < arrCustomers.length; i++){
		var customer = arrCustomers[i];
		strHtml += "<button onclick='setCustomer(" + customer + ");objState.moveTo(1)'>";
		strHtml += customer.firstName + " " + customer.lastName + "</button>";
	}
	strHtml += "<button onclick='objState.moveTo(2)'>Someone else</button>";
	strHtml += "</div>";
	$(".Infer_Med_root").html(strHtml);

}
function alertMsg(value){
	if( !value){
		alert("Please enter the value.");
		return false;
	}
	return true;
}
function drawSomeoneReg1(){
	var strHtml = "";
	strHtml += "<div class='Infer_Medi_header'>";
	strHtml += "<button class='Infer_Medi_back' onclick='objState.moveTo(0)'>Back</button>";
	strHtml += "<button class='Infer_Medi_exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infer_Medi_question'><p>What is their first name?</p></div>";
	strHtml += "<div class='Infer_Medi_answer'>";
	strHtml += "<input type='text' name='firstName' placeholder='Type something...'>";
	strHtml += "<button onclick='cur_reg_firstName=$(\"input[name='firstName'\").val();if(verifyValue(cur_reg_firstName))objState.moveTo(1);'>Send</button>";
	strHtml += "</div>";
	$(".Infer_Med_root").html(strHtml);
}
function drawSomeoneReg2(){
	var strHtml = "";
	strHtml += "<div class='Infer_Medi_header'>";
	strHtml += "<button class='Infer_Medi_back' onclick='objState.moveTo(0)'>Back</button>";
	strHtml += "<button class='Infer_Medi_exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infer_Medi_question'><p>What is " + cur_reg_firstName + "\'s surname?</p></div>";
	strHtml += "<div class='Infer_Medi_answer'>";
	strHtml += "<input type='text' name='firstName' placeholder='Type something...'>";
	strHtml += "<button onclick='cur_reg_lastName=$(\"input[name='lastName']\").val();if(verifyValue(cur_reg_firstName))objState.moveTo(1);'>Send</button>";
	strHtml += "</div>";
	$(".Infer_Med_root").html(strHtml);
}
function drawSomeoneReg3(){
	var strHtml = "";
	strHtml += "<div class='Infer_Medi_header'>";
	strHtml += "<button class='Infer_Medi_back' onclick='objState.moveTo(0)'>Back</button>";
	strHtml += "<button class='Infer_Medi_exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infer_Medi_question'><p>What is " + cur_reg_firstName + "\'s gender?</p></div>";
	strHtml += "<div class='Infer_Medi_answer'>";
	strHtml += "<button onclick='cur_reg_gender=\"Male\";objState.moveTo(1);'>Send</button>";
	strHtml += "<button onclick='cur_reg_gender=\"Female\";objState.moveTo(1);'>Send</button>";
	strHtml += "</div>";
	$(".Infer_Med_root").html(strHtml);
}
function submitCustomer(){
	if(verifyBirth() == false){
		return;
	}
	customer_Age = (new Date()).getFullYear() - cur_reg_year * 1;
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
	strHtml += "<div class='Infer_Medi_header'>";
	strHtml += "<button class='Infer_Medi_back' onclick='objState.moveTo(0)'>Back</button>";
	strHtml += "<button class='Infer_Medi_exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div style='clear:both;'></div>"
	strHtml += "<div class='Infer_Medi_question'><p>What is " + cur_reg_firstName + "\'s date of birth?</p></div>";
	strHtml += "<div class='Infer_Medi_answer'>";
	strHtml += strBirth;
	strHtml += "<button onclick='submitCustomer();'>Send</button>";
	strHtml += "</div>";
	$(".Infer_Med_root").html(strHtml);
}
function drawSomeoneChildren(){

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
	}
}
drawContents();
