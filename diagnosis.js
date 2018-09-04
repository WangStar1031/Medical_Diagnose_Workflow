class Diagnose{
	constructor( _prevState, _initialSymptoms){
		this.prevState = _prevState;
		this.initialSymptoms = _initialSymptoms;

		this.arrAllSteps = [];

		this.startDiagnose([]);
	}
	makeEvidence(_arrSymptoms){
		var retVal = [];
		for( var i = 0; i < this.initialSymptoms.length; i++){
			retVal.push(this.initialSymptoms[i]);
		}
		for( var i = 0; i < this.arrAllSteps.length; i++){
			var symtoms = this.arrAllSteps[i].startSymptoms;
			for( var j = 0; j < symtoms.length; j++){
				retVal.push(symtoms[j]);
			}
		}
		return retVal;
	}
	getDiagnosis(_arrEvidence){
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.infermedica.com/v2/diagnosis",
			"method": "POST",
			"headers": {
			"App-Id": "939b290c",
			"App-Key": "c79ff4280eb37d80c5ec3d0a3ae150ee",
			"Content-Type": "application/json",
			"Cache-Control": "no-cache"
			},
			"processData": false,
			"data": '{"sex": "' + customer_Gender.toLowerCase() + '", "age": "' + customer_Age + '","evidence": '+ JSON.stringify(_arrEvidence) + ', "extras":{"disable_groups":true}}'
		}

		$.ajax(settings).done(function (response) {
			objDiagnosis.parseDiagnosisResult( response);
		});
	}
	startDiagnose(_arrSymptoms){
		var oneStep = {"step": this.arrAllSteps.length + 1, "startSymptoms": _arrSymptoms, "symptomSteps": []};
		this.arrAllSteps.push(oneStep);

		var evidence = this.makeEvidence(_arrSymptoms);
		this.getDiagnosis( evidence);
	}
	showFinalResult(conditions){
		alert("Final");
	}
	showFailedResult(){
		alert("Failed");
	}
	goBack(){

	}
	confirmSymptoms(){
		var arrChks = $("input.Infermedica_answer_chk");
		var arrSymptoms = [];
		for( var i = 0; i < arrChks.length; i++){
			var curChk = arrChks.eq(i);
			var id = curChk.attr("name");
			var isChecked = curChk.prop("checked");
			arrSymptoms.push({"id": id, "choice_id": (isChecked == true ? "present" : "absent")});
		}
		this.solveSymptoms(arrSymptoms);
	}
	getSymtoms(_arrSymptoms, _isFirst = true){
		for( var i = 0; i < _arrSymptoms.length; i++){
			var symptom = _arrSymptoms[i].id;
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://api.infermedica.com/v2/symptoms/" + symptom,
				"method": "GET",
				"headers": {
				"App-Id": "939b290c",
				"App-Key": "c79ff4280eb37d80c5ec3d0a3ae150ee",
				"Content-Type": "application/json",
				"Cache-Control": "no-cache"
				}
			}

			$.ajax(settings).done(function (response) {
				if( _isFirst){
					objDiagnosis.parseSymptomsResult( response);
				}
				else{
					objDiagnosis.parseSymptomsResult_1( response);
				}
			});	
		}
	}
	processSymptomResponse(){
		this.arrChildrenIds = [];
		for( var i = 0; i < this.curSymptomResponse.length; i++){
			var response = this.curSymptomResponse[i];
			for( var j = 0; j < response.children.length; j++){
				// var id = response.children[j].id;
				this.arrChildrenIds.push(response.children[j]);
			}
		}
		if( this.arrChildrenIds.length == 0){
			var arrSymptoms = [];
			var curStepSymptoms = this.arrAllSteps[this.arrAllSteps.length - 1].symptomSteps;
			for( var i = 0; i < curStepSymptoms.length; i++){
				for( var j = 0; j < curStepSymptoms[i].length; j++){
					arrSymptoms.push(curStepSymptoms[i][j]);
				}
			}
			this.startDiagnose(arrSymptoms);
		} else{
			this.arrChildrenResponse = [];
			this.getSymtoms(this.arrChildrenIds, false);
		}
	}
	drawQuestion4Symptom(){
		var strHtml = "";
		if( this.arrChildrenResponse.length == 1){
			var response = this.arrChildrenResponse[0];
			strHtml += "<div class='Infermedica_header'>";
			strHtml += "<button class='Infermedica_back' onclick='objDiagnosis.goBack()'><b>⇦</b>   Back</button>";
			strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
			strHtml += "</div>";
			strHtml += "<div style='clear:both;'></div>";
			strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>" + response.question + "</p></div>";
			strHtml += "<div class='Infermedica_answer'>";
				strHtml += "<button class='Infermedica_button' onclick='objDiagnosis.confirmDiag(\"" + response.id + "\", \"present\")'>Yes</button>";
				strHtml += "<button class='Infermedica_button' onclick='objDiagnosis.confirmDiag(\"" + response.id + "\", \"absent\")'>No</button>";
				strHtml += "<button class='Infermedica_button' onclick='objDiagnosis.confirmDiag(\"" + response.id + "\", \"unknown\")'>Don\'t know</button>";
			strHtml += "</div>";
		} else{
			strHtml += "<div class='Infermedica_header'>";
			strHtml += "<button class='Infermedica_back' onclick='objDiagnosis.goBack()'><b>⇦</b>   Back</button>";
			strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
			strHtml += "</div>";
			strHtml += "<div style='clear:both;'></div>";
			strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>Please check below options.</p></div>";
			strHtml += "<div class='Infermedica_answer'>";
			for( var i = 0; i < this.arrChildrenResponse.length; i++){
				var response = this.arrChildrenResponse[i];
				if( !response.question)
					continue;
				strHtml += "<input class='Infermedica_answer_chk' type='checkbox' name='" + response.id + "'>" + response.question + "<br>";
			}
			strHtml += "<button class='Infermedica_button' onclick='objDiagnosis.confirmSymptoms()'>Next</button>";
			strHtml += "</div>";
		}
		// return;
		$(".Infermedica_root").html(strHtml);
	}
	parseSymptomsResult_1(_response){
		this.arrChildrenResponse.push(_response);
		if( this.arrChildrenResponse.length == this.arrChildrenIds.length){
			this.drawQuestion4Symptom();
		}
	}
	parseSymptomsResult( _response){
		this.curSymptomResponse.push(_response);
		if( this.curSymptomResponse.length == this.curPostedSymptoms.length){
			this.processSymptomResponse();
		}
	}
	solveSymptoms(_arrSymptoms){
		this.arrAllSteps[this.arrAllSteps.length - 1].symptomSteps.push(_arrSymptoms);
		this.curPostedSymptoms = _arrSymptoms.filter(function(_this){
			return _this.choice_id == "present";
		});
		if( this.curPostedSymptoms.length == 0){
			var arrSymptoms = [];
			var curStepSymptoms = this.arrAllSteps[this.arrAllSteps.length - 1].symptomSteps;
			for( var i = 0; i < curStepSymptoms.length; i++){
				for( var j = 0; j < curStepSymptoms[i].length; j++){
					arrSymptoms.push(curStepSymptoms[i][j]);
				}
			}
			this.startDiagnose(arrSymptoms);
		} else{
			this.curSymptomResponse = [];
			this.getSymtoms( this.curPostedSymptoms);
		}
	}
	confirmDiag(_symptomId, _choice_id){
		if( _choice_id == "present"){
			if( _symptomId.substring(0,2) == "p_"){
				this.startDiagnose([{"id":_symptomId, "choice_id": _choice_id}]);
			} else{
				this.solveSymptoms([{"id":_symptomId, "choice_id": _choice_id}]);
			}
		} else{
			this.startDiagnose([{"id": _symptomId, "choice_id": _choice_id}]);
		}
	}
	makeQuestion4Diagnose(_question){
		this.arrAllSteps[this.arrAllSteps.length - 1].question = _question;

		var item = _question.items[0];
		var strHtml = "";
		strHtml += "<div class='Infermedica_header'>";
		strHtml += "<button class='Infermedica_back' onclick='objDiagnosis.goBack()'><b>⇦</b>   Back</button>";
		strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
		strHtml += "</div>";
		strHtml += "<div style='clear:both;'></div>";
		strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>" + _question.text + "</p></div>";
		strHtml += "<div class='Infermedica_answer'>";
		for( var i = 0; i < item.choices.length; i++){
			var choice = item.choices[i];
			strHtml += "<button class='Infermedica_button' onclick='objDiagnosis.confirmDiag(\"" + item.id + "\", \"" + choice.id + "\")'>" + choice.label + "</button>";
		}
		strHtml += "</div>";
		$(".Infermedica_root").html(strHtml);
	}
	parseDiagnosisResult(_response){
		debugger;
		var conditions = _response.conditions;
		if( conditions.length){
			if( conditions[0].probability > 0.9){
				this.showFinalResult(conditions);
				return;
			}
		}
		if( this.arrAllSteps.length >= 15){
			this.showFailedResult();
			return;
		}
		this.makeQuestion4Diagnose(_response.question);
		
	}
}