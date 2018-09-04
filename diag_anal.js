// objDiagAnal
class diagAnal{
	constructor( _prevState, _initialSymptoms){
		this.stepCount = 0;
		this.curSymptoms = [];
		this.stateList = [];
		this.stateList.push("diagnosis");
		this.prevState = _prevState;
		this.arrSymptoms = [];
		this.arrSymptoms.push(_initialSymptoms);
		this.initialSymptoms = _initialSymptoms;
		this.curSymptomCount = 0;
		this.curSymptomList = [];
		this.curSymptomResponseList = [];
		this.run();
	}
	goBack(){
		this.stateList.pop();
		this.arrSymptoms.pop();
		if( this.stateList.length == 0){
			if( this.prevState == g_states.STAT_SEARCH_SUGGEST){
				objState.moveTo(0);
			} else{
				objState.moveTo(-2);
			}
		}else{
			this.run();
		}
	}
	makeEvidence(){
		var retVal = [];
		for( var i = 0; i < this.arrSymptoms.length; i++){
			var symtoms = this.arrSymptoms[i];
			for( var j = 0; j < symtoms.length; j++){
				retVal.push(symtoms[j]);
			}
		}
		return retVal;
	}
	run(){
		debugger;
		switch( this.stateList[this.stateList.length - 1]){
			case "diagnosis":
				this.stepCount++;
				getDiagnosis(this.makeEvidence());
			break;
			case "symptom":
				this.curSymptomList = [];
				this.curSymptomCount = 0;
				getSymtoms(this.arrSymptoms[this.arrSymptoms.length-1].filter(function(_this){
					return _this.choice_id == "present";
				}));
			break;
		}
	}
	confirmDiag(_id, _choice){
		var arrBuf = [{"id": _id, "choice_id" : _choice}];
		if( _choice == "present"){
			this.stateList.push("symptom");
		} else{
			this.stateList.push("diagnosis");
		}
		this.arrSymptoms.push(arrBuf);
		this.run();
	}
	drawSingleDiagQuestion(_question){
		var item = _question.items[0];
		var strHtml = "";
		strHtml += "<div class='Infermedica_header'>";
		strHtml += "<button class='Infermedica_back' onclick='objDiagAnal.goBack()'><b>⇦</b>   Back</button>";
		strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
		strHtml += "</div>";
		strHtml += "<div style='clear:both;'></div>";
		strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>" + _question.text + "</p></div>";
		strHtml += "<div class='Infermedica_answer'>";
		for( var i = 0; i < item.choices.length; i++){
			var choice = item.choices[i];
			strHtml += "<button class='Infermedica_button' onclick='objDiagAnal.confirmDiag(\"" + item.id + "\", \"" + choice.id + "\")'>" + choice.label + "</button>";
		}
		strHtml += "</div>";
		$(".Infermedica_root").html(strHtml);
	}
	drawDiagnosisQuestion(_question){
	}
	confirmCheckList(){
		this.stateList.push("symptom");
		var checkList = $("input.Infermedica_answer_chk");
		var arrSymptoms = [];
		for( var i = 0; i < checkList.length; i++){
			var chk = checkList.eq(i);
			if( chk.prop("checked")){
				arrSymptoms.push({"id": chk.attr("name"), "choice_id": "present"});
			} else{
				arrSymptoms.push({"id": chk.attr("name"), "choice_id": "absent"});
			}
		}
		this.arrSymptoms.push(arrSymptoms);
		this.run();
	}
	drawSymptomList(){
		debugger;
		var arrChildSymptoms = [];
		for( var i = 0; i < this.curSymptomResponseList.length; i++){
			var children = this.curSymptomResponseList[i].children;
			for( var j = 0; j < children.length; j++){
				arrChildSymptoms.push(children[j].id);
			}
		}
		if( arrChildSymptoms.length == 0){

		} else if( arrChildSymptoms.length == 1){

		} else{

		}
		if( this.curSymptomResponseList.length == 1){
			var _response = this.curSymptomResponseList[0];
			if( _response.children.length == 0){
				this.run();
				return;
			}
			var strHtml = "";
			strHtml += "<div class='Infermedica_header'>";
			strHtml += "<button class='Infermedica_back' onclick='objDiagAnal.goBack()'><b>⇦</b>   Back</button>";
			strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
			strHtml += "</div>";
			strHtml += "<div style='clear:both;'></div>";
			strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>" + _response.question + "</p></div>";
			strHtml += "<div class='Infermedica_answer'>";
			strHtml += "<button class='Infermedica_button' onclick='objDiagAnal.confirmDiag(\"" + _response.id + "\", \"present\")'>YES</button>";
			strHtml += "<button class='Infermedica_button' onclick='objDiagAnal.confirmDiag(\"" + _response.id + "\", \"absent\")'>No</button>";
			strHtml += "<button class='Infermedica_button' onclick='objDiagAnal.confirmDiag(\"" + _response.id + "\", \"unkown\")'>Don\'t know</button>";
			strHtml += "</div>";
			$(".Infermedica_root").html(strHtml);

		} else{
			var strHtml = "";
			strHtml += "<div class='Infermedica_header'>";
			strHtml += "<button class='Infermedica_back' onclick='objDiagAnal.goBack()'><b>⇦</b>   Back</button>";
			strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
			strHtml += "</div>";
			strHtml += "<div style='clear:both;'></div>";
			strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>Please select below conditions.</p></div>";
			strHtml += "<div class='Infermedica_answer'>";
			for( var i = 0; i < this.curSymptomResponseList.length; i++){
				var _response = this.curSymptomResponseList[i];
				strHtml += "<input class='Infermedica_answer_chk' type='checkbox' name='" +_response.id + "'>" + _response.question + "<br>";
			}
			strHtml += "<button class='Infermedica_button symptom_Confirm' style='visibility:hidden' onclick='objDiagAnal.confirmCheckList();'>Next</button>";
			strHtml += "</div>";
			$(".Infermedica_root").html(strHtml);
		}
		this.curSymptomResponseList = [];
		this.curSymptomCount = 0;
	}
	parseSymptomsResult(_response){
		debugger;
		var lastSymptoms = this.arrSymptoms[this.arrSymptoms.length - 1].filter(function(_this){
			return _this.choice_id == "present";
		});
		this.curSymptomResponseList.push(_response);
		this.curSymptomCount ++;
		if( lastSymptoms.length == this.curSymptomCount){
			this.drawSymptomList();
		}
	}
	parseDiagnosisResult(_response){
		var conditions = _response.conditions;
		for( var i = 0; i < conditions.length; i++){
			var condition = conditions[i];
			if( condition.probability >= 0.9){
				alert("finished");
				// this.stateList.push("finish");
				// this.gotoFinish(conditions);
				return;
			}
		}
		if( this.stepCount >= 15){
			alert("Not found.");
			return;
		}
		var question = _response.question;
		if( question.type == "single"){
			this.drawSingleDiagQuestion(question);
		} else{
			this.drawDiagnosisQuestion(question);
		}
	}
	gotoPrevState(){
		if( this.curSymptoms.length){

		} else{
			if( this.stateList.length == 1){
				if( this.prevState == g_states.STAT_SEARCH_SUGGEST){
					objState.moveTo(0);
				} else{
					objState.moveTo(-2);
				}
			} else{

			}
		}
	}
}