var strSelOption = "";
function makeOptionButtons(arrOptions, btnOpt_fullWidth=false){
	var strHtml = "";
	for( var i = 0; i < arrOptions.length; i++){
		strHtml += "<button class='Infer_Medi_Option";
		if( btnOpt_fullWidth == true){
			strHtml += " Infer_Medi_Btn_Full_Width";
		}
		strHtml += "' ";
		strHtml += "onclick='strSelOption=\""+arrOptions[i]+"\";$(\".Infer_Medi_Option\").removeClass(\"activated\"); $(this).addClass(\"activated\");'>";
		strHtml += arrOptions[i];
		strHtml += "</button>";
	}
	return strHtml;
}