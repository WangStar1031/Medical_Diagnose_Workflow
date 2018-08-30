<style type="text/css">
	.Infermedica_root{
    	position: relative;
		text-align: left;
	    width: 100%;
	    height: 100%;
	    max-width: 667px;
	    max-height: 840px;
	    padding: 0;
	    margin: 0 auto;
	    overflow: visible;
    	display: -ms-flexbox;
    	display: flex;
    	-ms-flex-direction: column;
    	flex-direction: column;
    	-ms-flex: 1 0 auto;
    	flex: 1 0 auto;
    	overflow: visible;
	}

	.Infermedica_question {
	    position: relative;
	    margin-bottom: 10px;
	    padding-top: 27px;
	}

	.Infermedica_question_header {
		font-size: 22px;
	    letter-spacing: -.3px;
	    line-height: 1.5em;
	    margin-top: 25px;
	    margin-bottom: 25px;
	    font-family: Visuelt,sans-serif;
	    text-rendering: optimizeLegibility;
	    font-weight: 700;
	    color: #d2205a;
	}

	@media screen and (min-width: 500px) {
		.Infermedica_question_header {
		    line-height: 1.3em;
		    letter-spacing: -.5px;
		    font-size: 30px;
		}
	}

	.Infermedica_answer {
		position: relative;
		min-height: 100%;
    	-webkit-animation-fill-mode: both;
    	animation-fill-mode: both;
	    -webkit-font-smoothing: antialiased;
	    -moz-box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;v
	    outline: none;
	}

	.Infermedica_button_right {
		top: 3%;
		min-width: 50px;
		border-radius: 40px;
	    background-color: #293a8a;
	    font-family: 'HelveticaNeue';
	    text-align: center;
	    color: #ffffff;
	    padding: 12px  24px;		
		border: none;
		position: absolute;
		-webkit-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
		font-size: 1rem;
		right: 0px;
		font-weight: 700;		
	    margin: 0;
	    outline: none;
	    vertical-align: baseline;
	    -moz-box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    letter-spacing: normal;
	    cursor: pointer;
	    overflow: visible;
	}

	@media screen and (min-width: 550px) {
		.Infermedica_button_right {
			top: 4%;
			font-size: 14px;
			font-weight: 700;
		}
	}	

	.Infermedica_button_right:hover, .Infermedica_button_right:focus, .Infermedica_button_right:hover {
	    background-color: #d2205a;
	    border: none;
	}

	.Infermedica_button_full {
	    position: relative;
	    width: 100%;
		margin-top: 10px;
		background: #293a8a;
	    outline: none;
		border-radius: 40px;
    	padding: 12px 24px;
    	display: block;
	    text-align: center;
	    cursor: pointer;
	    color: #ffffff;
	    font-size: 16px;
	    font-weight: 700;
	    font-family: Visuelt,sans-serif;
	    -ms-flex: 1 0 auto;
	    flex: 1 0 auto;
	    border: none;
	    -webkit-transition: padding .2s;
	    -o-transition: padding .2s;
	    transition: padding .2s;
	    -webkit-transition-timing-function: ease-out;
	    -o-transition-timing-function: ease-out;
	    transition-timing-function: ease-out;

	}

	.Infermedica_button_full:hover, .Infermedica_button_full:focus, .Infermedica_button_full:hover {
	    background-color: #d2205a;
	    border: none;
	}

	.Infermedica_button {
	    position: relative;
	    width: 100%;
		margin-top: 10px;
		background: #f5f5f8;
	    outline: none;
		border-radius: 40px;
    	padding: 12px 24px;
    	display: block;
	    text-align: left;
	    cursor: pointer;
	    color: #400099;
	    font-size: 16px;
	    font-weight: 700;
	    font-family: Visuelt,sans-serif;
	    -ms-flex: 1 0 auto;
	    flex: 1 0 auto;
	    border: none;
	    -webkit-transition: padding .2s;
	    -o-transition: padding .2s;
	    transition: padding .2s;
	    -webkit-transition-timing-function: ease-out;
	    -o-transition-timing-function: ease-out;
	    transition-timing-function: ease-out;
	}

	.Infermedica_button:hover, .Infermedica_button:focus, .Infermedica_button:hover {
	    background-color: #e4eaf0;
	}

	.Infermedica_input {
		border: none;
	    border-bottom: 1px solid rgba(39,41,43,0.15);
	    border-radius: 0;
	    padding-top: 1.3rem;
	    padding-bottom: 1.3rem;
	    padding-left: 0;
	    color: rgba(0,0,0,0.8);
        font-size: 1em;
	    font-family: 'HelveticaNeue';
	    line-height: 1.2;
	    width: 100%;
	    margin: 0em;
	    padding: 0.7em 1em;
	    outline: none;
	    background: #FFFFFF;
	    box-shadow: 0em 0em 0em 0em transparent inset;
	    -webkit-transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
	    transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
	    -webkit-appearance: none;
	    -webkit-tap-highlight-color: rgba(255,255,255,0);
	    -moz-box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	}

	@media screen and (min-width: 550px) {
	    .Infermedica_input {
			padding-top: 1.3rem;
			padding-bottom: 1.3rem; 
		} 
	}

	.Infermedica_header .Infermedica_back{
		float: left;
    	border: 0;
		background-color: transparent;
		cursor: pointer;
		overflow: hidden;
		font-size: 14px;
		line-height: 14px;
	}
	.Infermedica_header .Infermedica_exit{
		float: right;
    	border: 0;
		background-color: transparent;
		cursor: pointer;
		overflow: hidden;
		font-size: 14px;
		line-height: 14px;
	}

</style>
<link rel="stylesheet" href="main.css?<?=time();?>" type="text/css">

<div class="Infermedica_root">
	
</div>

<script src="jquery.min.js"></script>
<script type="text/javascript">
	var strFirstName = "";
	var strLastName = "";
	var strCountryCode = "";
	var strGender = "";
	var strYear = "";
	var strMonth = "";
	var strDay = "";
	var customer_Age = "";
	var customer_Gender = "";
	var strAllCustomers = "";
	var cur_reg_firstName = "";
	var cur_reg_lastName = "";
	var cur_reg_gender = "";
	var cur_reg_year = "";
	var cur_reg_month = "";
	var cur_reg_day = "";
</script>
<script src="cookie.js"></script>
<script src="phoneCode.js"></script>
<script src="country_select.js?<?= time();?>"></script>
<script src="controls.js?<?= time();?>"></script>
<script src="birth_select.js?<?= time();?>"></script>
<script src="status.js?<?= time();?>"></script>
<script src="drawContents.js?<?= time();?>"></script>
