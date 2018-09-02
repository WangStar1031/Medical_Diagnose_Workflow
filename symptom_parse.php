<?php
$contents = file_get_contents("symptoms.json");
$arrSymptoms = json_decode($contents);
$min = 100;
foreach ($arrSymptoms as $value) {
	if( $min > strlen( $value->common_name)){
		$min = strlen( $value->common_name);
	}
	//echo strlen( $value->common_name) . " : " .  $value->common_name . "<br>";
}
echo count($arrSymptoms) . "<br>";
echo $min;
?>