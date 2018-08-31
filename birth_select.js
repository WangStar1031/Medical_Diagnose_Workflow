var strBirth = "";
strBirth += "<select class='Infermedica_select' name='day' id='dayddl'>";
strBirth += "<option value='' hidden selected>DD</option>";
for( var i = 1; i <=31; i++){
	strBirth += "<option value='" + i + "'>" + i + "</option>";
}
strBirth += "</select>";
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
strBirth += "<select class='Infermedica_select' name='month' id='monthddl'>";
strBirth += "<option value='' hidden selected>MMM</option>";
for( var i = 1; i <= 12; i++){
	strBirth += "<option value='" + i + "'>" + month[i-1] + "</option>";
}
strBirth += "</select>";

strBirth += "<select class='Infermedica_select' name='day' id='yearddl'>";
strBirth += "<option value='' hidden selected>YYYY</option>";
var nCurYear = (new Date()).getFullYear();
for( var i = nCurYear; i >= nCurYear - 100; i--){
	strBirth += "<option value='" + i + "'>" + i + "</option>";
}
strBirth += "</select>";
function verifyBirth(){
	if( $("#dayddl option:selected").val() == "" || $("#monthddl option:selected").val() == "" || $("#yearddl option:selected").val() == ""){
		alert("Please select birthday.");
		return false;
	}
	cur_reg_day = $("#dayddl option:selected").val();
	cur_reg_month = $("#monthddl option:selected").val();
	cur_reg_year = $("#yearddl option:selected").val();
	return true;
}