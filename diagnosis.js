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
			"App-Id": g_strAppId,
			"App-Key": g_strAppKey,
			"Content-Type": "application/json",
			"Cache-Control": "no-cache"
			},
			"processData": false,
			"data": '{"sex": "' + customer_Gender.toLowerCase() + '", "age": "' + customer_Age + '","evidence": '+ JSON.stringify(_arrEvidence) + '}'
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
		this.finalConditions = conditions;
		var strHtml = "";
		strHtml += "<div class='Infermedica_header'>";
		strHtml += "<button class='Infermedica_back' onclick='objDiagnosis.goBack()'><b>⇦</b>   Back</button>";
		strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
		strHtml += "</div>";
		strHtml += "<div style='clear:both;'></div>";
		strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>Great, we\'re all done.</p></div>";
		strHtml += "<div class='Infermedica_answer'>";
		strHtml += "<p>Please remember, this service is only for general information purposes and isn\'t a personal or medical diagnosis. If your symptoms persist, change or worsen, or you are concerned seek further advice.</p>";
		strHtml += "<button class='Infermedica_button' onclick='objState.moveTo(1)'>Continue</button>";
		strHtml += "</div>";
		$(".Infermedica_root").html(strHtml);
	}
	showFailedResult(){
		objState.moveTo(2);
	}
	goBack(){
		// debugger;
		var curStep = this.arrAllSteps[this.arrAllSteps.length - 1];
		if( curStep.step == 1 && curStep.symptomSteps.length == 0){
			objState.goTo(this.prevState);
			return;
		}
		if( curStep.symptomSteps.length == 0){
			this.arrAllSteps.pop();
			lastStep = this.arrAllSteps[this.arrAllSteps.length - 1];
			if( lastStep.symptomSteps.length <= 1){
				this.startDiagnose(this.arrAllSteps.pop().startSymptoms);
			} else{
				lastStep.symptomSteps.pop();
				this.solveSymptoms(lastStep.symptomSteps.pop());
			}
		} else if( curStep.symptomSteps.length == 1){
			var lastStep = this.arrAllSteps.pop();
			this.startDiagnose(lastStep.startSymptoms);
		} else{
			this.arrAllSteps[this.arrAllSteps.length - 1].symptomSteps.pop();
			var arrLastSymptoms = this.arrAllSteps[this.arrAllSteps.length - 1].symptomSteps.pop();
			this.solveSymptoms(arrLastSymptoms);
		}
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
				"App-Id": g_strAppId,
				"App-Key": g_strAppKey,
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
	// solveSymptoms(_arrSymptoms){
	// 	this.arrAllSteps[this.arrAllSteps.length - 1].symptomSteps.push(_arrSymptoms);
	// 	this.curPostedSymptoms = _arrSymptoms.filter(function(_this){
	// 		return _this.choice_id == "present";
	// 	});
	// 	if( this.curPostedSymptoms.length == 0){
	// 		var arrSymptoms = [];
	// 		var curStepSymptoms = this.arrAllSteps[this.arrAllSteps.length - 1].symptomSteps;
	// 		for( var i = 0; i < curStepSymptoms.length; i++){
	// 			for( var j = 0; j < curStepSymptoms[i].length; j++){
	// 				arrSymptoms.push(curStepSymptoms[i][j]);
	// 			}
	// 		}
	// 		this.startDiagnose(arrSymptoms);
	// 	} else{
	// 		this.curSymptomResponse = [];
	// 		this.getSymtoms( this.curPostedSymptoms);
	// 	}
	// }
	confirmDiag(_symptomId, _choice_id){
		this.startDiagnose([{"id":_symptomId, "choice_id": _choice_id}]);
	}
	drawSingleDiagQuestion(_question){
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
	confirmMultiDiag(){
		var arrSymptoms = [];
		var arrTrs = $(".Infermedica_answer table tr");
		for( var i = 1; i < arrTrs.length; i++){
			var curTr = arrTrs.eq(i);
			var name = curTr.attr("name");
			var choice_id = $(".Infermedica_answer input[name='"+name+"']:checked").val();
			arrSymptoms.push({"id":name, "choice_id":choice_id});
		}
		this.startDiagnose( arrSymptoms);
	}
	drawGroupMultiDiagQuestion(_question){
		this.arrAllSteps[this.arrAllSteps.length - 1].question = _question;

		var items = _question.items;
		var strHtml = "";
		strHtml += "<div class='Infermedica_header'>";
		strHtml += "<button class='Infermedica_back' onclick='objDiagnosis.goBack()'><b>⇦</b>   Back</button>";
		strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
		strHtml += "</div>";
		strHtml += "<div style='clear:both;'></div>";
		strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>" + _question.text + "</p></div>";
		strHtml += "<div class='Infermedica_answer'>";
		strHtml += "<p>Select one answer in each row.</p>";
		strHtml += "<table>";
		strHtml += "<tr>";
			strHtml += "<th> </th>";
			strHtml += "<th>Yes</th>";
			strHtml += "<th>No</th>";
			strHtml += "<th>Don\'t know</th>";
		strHtml += "</tr>";
		for( var i = 0; i < items.length; i++){
			var item = items[i];
			strHtml += "<tr name='" + item.id + "'>";
				strHtml += "<td>" + item.name + "</td>";
				strHtml += "<td><input class='Infermedica_answer_rad' type='radio' name='" + item.id + "' value='present'></td>";
				strHtml += "<td><input class='Infermedica_answer_rad' type='radio' name='" + item.id + "' value='absent'></td>";
				strHtml += "<td><input class='Infermedica_answer_rad' type='radio' name='" + item.id + "' value='unknown' checked></td>";
			strHtml += "</tr>";
		}
		strHtml += "</table>";
		strHtml += "<button class='Infermedica_button' onclick='objDiagnosis.confirmMultiDiag()'>Next</button>";
		strHtml += "</div>";
		$(".Infermedica_root").html(strHtml);
	}
	confirmSingleDiag(){
		var arrRadios = $(".Infermedica_answer input[name='radio']");
		var arrSymptoms = [];
		var isUnknown = false;
		if( arrRadios.eq(arrRadios.length - 1).prop("checked") == true){
			isUnknown = true;
		}
		for( var i = 0; i < arrRadios.length - 1; i++){
			var curRadio = arrRadios.eq(i);
			var id = curRadio.attr("id");
			if( curRadio.prop("checked") == true){
				if( isUnknown == true){
					arrSymptoms.push({"id":id, "choice_id":"unknown"});
				} else{
					arrSymptoms.push({"id":id, "choice_id":"absent"});
				}
			} else{
				arrSymptoms.push({"id":id, "choice_id":"present"});
			}
		}
		this.startDiagnose( arrSymptoms);
	}
	drawGroupSingleDiagQuestion(_question){
		this.arrAllSteps[this.arrAllSteps.length - 1].question = _question;

		var items = _question.items;
		var strHtml = "";
		strHtml += "<div class='Infermedica_header'>";
		strHtml += "<button class='Infermedica_back' onclick='objDiagnosis.goBack()'><b>⇦</b>   Back</button>";
		strHtml += "<button class='Infermedica_exit' onclick='objState.moveTo(-1)'>Exit  <b>X</b></button>";
		strHtml += "</div>";
		strHtml += "<div style='clear:both;'></div>";
		strHtml += "<div class='Infermedica_question'><p class='Infermedica_diagnosis_question_header'>" + _question.text + "</p></div>";
		strHtml += "<div class='Infermedica_answer'>";
		strHtml += "<p>Select one answer</p>";
		for( var i = 0; i < items.length; i++){
			var item = items[i];
			strHtml += "<p><input type='radio' name='radio' id='" + item.id + "'>" + item.name + "</p>";
			strHtml += "<hr>";
		}
		strHtml += "<p><input type='radio' name='radio' id='unknown' checked>I do not understand this question</p>";
		strHtml += "<button class='Infermedica_button' onclick='objDiagnosis.confirmSingleDiag()'>Next</button>";
		$(".Infermedica_root").html(strHtml);
	}
	parseDiagnosisResult(_response){
		// debugger;
		console.log(_response);
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
		var question = _response.question;
		if( question.type == "single"){
			this.drawSingleDiagQuestion(question);
		} else if( question.type == "group_single"){
			this.drawGroupSingleDiagQuestion(question);
		} else if( question.type == "group_multiple"){
			this.drawGroupMultiDiagQuestion(question);
		}
	}
}