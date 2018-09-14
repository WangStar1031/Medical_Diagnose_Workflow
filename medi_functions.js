function parseResponse1(_response){
	if( _response.mentions.length == 0){
		objState.moveTo(2);
	} else{
		var choice_id = _response.mentions[0].choice_id;
		var common_name = _response.mentions[0].common_name;
		var id = _response.mentions[0].id;
		var name = _response.mentions[0].name;
		var orth = _response.mentions[0].orth;
		var type = _response.mentions[0].type;
		strMainSymptom = orth;
		strMainId = id;
		arrInitialSymptoms = [];
		drawSymptomConfirm();
	}
}
function getParse(){
	var strAnswer = strFirstQuestion;
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://api.infermedica.com/v2/parse",
	  "method": "POST",
	  "headers": {
	    "App-Id": g_strAppId,
	    "App-Key": g_strAppKey,
	    "Content-Type": "application/json",
	    "Cache-Control": "no-cache"
	  },
	  "processData": false,
	  "data": '{"sex": "' + customer_Gender + '", "age": "' + customer_Age + '", "text": "' + strAnswer + '"}'
	}

	$.ajax(settings).done(function (response) {
		parseResponse1(response);
	});	
}
function getAllSymptoms4InputAgain(){

	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://api.infermedica.com/v2/symptoms",
	  "method": "GET",
	  "headers": {
	    "App-Id": g_strAppId,
	    "App-Key": g_strAppKey,
	    "Content-Type": "application/json",
	    "Cache-Control": "no-cache"
	  }
	}

	$.ajax(settings).done(function (response) {
		arrAllSymptoms = response;
		drawSymptomInputAgain();
	});		
}
var parsedSymptoms = [];
function DrawSearches_Suggests(arrDrawings){
	if( isSearch == false && isSuggest == false){
		return;
	}
	if( isSuggest && isSearch){
		isSearch = false;
		isSuggest = false;
		for( var i = 0; i < arrDrawings.length; i++){
			var drawing = arrDrawings[i];
			var isContains = false;
			for( var j = 0; j < parsedSymptoms.length; j++){
				var search_suggest = parsedSymptoms[j];
				if( drawing.id == search_suggest.id){
					isContains = true;
					break;
				}
			}
			if( !isContains){
				parsedSymptoms.push(drawing);
			}
		}
		// console.log(parsedSymptoms);
		drawSearch_Suggest_1();
	} else{
		for( var i = 0; i < arrDrawings.length; i++){
			var drawing = arrDrawings[i]
			parsedSymptoms.push( drawing);
		}
		// console.log(parsedSymptoms);
	}
}
function parseSearch(response){
	var arrSearches = [];
	for( var i = 0; i < response.length; i++){
		var answer = response[i];
		arrSearches.push(answer);
	}
	isSearch = true;
	DrawSearches_Suggests(arrSearches);
}
function parseSuggest(response){
	var arrSuggest = [];
	for( var i = 0; i < response.length; i++){
		var answer = response[i];
		arrSuggest.push(answer);
	}
	isSuggest = true;
	DrawSearches_Suggests(arrSuggest);
}
function get_Search_Suggest(){
	parsedSymptoms = [];
	isSearch = false;
	isSuggest = false;
	// Search
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.infermedica.com/v2/search?phrase="+strMainSymptom+"&max_results=8",
		"method": "GET",
		"headers": {
			"App-Id": g_strAppId,
			"App-Key": g_strAppKey,
			"Cache-Control": "no-cache"
		}
	}
	$.ajax(settings).done(function (response) {
		parseSearch(response);
	});
	//Suggest
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.infermedica.com/v2/suggest",
		"method": "POST",
		"headers": {
		"App-Id": g_strAppId,
		"App-Key": g_strAppKey,
		"Content-Type": "application/json",
		"Cache-Control": "no-cache"
		},
		"processData": false,
		"data": '{"sex": "' + customer_Gender.toLowerCase() + '", "age": "' + customer_Age + '","selected": ["'+strMainId+'"]}'
	}

	$.ajax(settings).done(function (response) {
		parseSuggest(response);
	});
}
function getDiagnosis(_arrEvidence){
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
		console.log(response);
		objDiagAnal.parseDiagnosisResult( response);
	});
}
function getSymtoms(_arrEvidence){
	for( var i = 0; i < _arrEvidence.length; i++){
		var symptom = _arrEvidence[i].id;
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
			console.log(response);
			objDiagAnal.parseSymptomsResult( response);
		});	
	}
}