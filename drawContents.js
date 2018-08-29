function welcomBtnClicked(){
	if(getCookie("User_First_Name") == ""){
		objState.moveTo(0);
	} else{
		objState.moveTo(1);
	}
}
function drawFirstWelcome(){
	var strHtml = "";
	strHtml += "<div class='question'><p>Hello, how can I help you?</p></div>";
	strHtml += "<div class='answer'><input type='text' id='mainAnswer'><button onclick='welcomBtnClicked()'>Ask Medics2You</button></div>";
	$(".root").html(strHtml);
}
function drawLoginBefore(){
	var strHtml = "";
	strHtml += "<div class='header'>";
	strHtml += "<button class='back' onclick='objState.moveTo(-1)'>Back</button>";
	strHtml += "<button class='exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div class='question'><p>Befor I can help, I need to take some details from you.</p></div>";
	strHtml += "<div class='answer'>";
	strHtml += "<button onclick='objState.moveTo(0)'>Get Started</button>";
	strHtml += "<button class='already' onclick='objState.moveTo(1)'>I already have an account.</button>";
	strHtml += "</div>";
	$(".root").html(strHtml);
}
function drawStateLogin(){
	var strHtml = "";
	strHtml += "<div class='header'>";
	strHtml += "<button class='back' onclick='objState.moveTo(-1)'>Back</button>";
	strHtml += "<button class='exit' onclick='objState.moveTo(-1)'>Exit</button>";
	strHtml += "</div>";
	strHtml += "<div class='question'><p>Log in to your account</p></div>";
	strHtml += "<div class='answer'>";
	strHtml += "<label>Email</label>";
	strHtml += "<input type='email' name='email'>";
	strHtml += "<label>Password</label>";
	strHtml += "<input type='password' name='password'>"
	strHtml += "<button onclick='objState.moveTo(0)'>Log in</button>";
	strHtml += "<button class='already' onclick='objState.moveTo(1)'>Forgotten your passowrd?</button>";
	strHtml += "</div>";
	$(".root").html(strHtml);
}
function drawContents(){
	switch(objState.getState()){
		case g_states.STAT_FIRST_WELCOME: drawFirstWelcome(); break;
		case g_states.STAT_LOGIN_BEFORE: drawLoginBefore(); break;
		case g_states.STAT_LOGIN: drawStateLogin(); break;
	}
}
drawContents();