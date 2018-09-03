var g_states = Object.freeze({
	"STAT_FIRST_WELCOME"			: 0, 
	"STAT_LOGIN_BEFORE"				: 1,
	"STAT_LOGIN"					: 2,
	"STAT_FORGOT_PASS"				: 3,
	"STAT_SIGN_1"					: 4,
	"STAT_SIGN_2"					: 5,
	"STAT_SIGN_3"					: 6,
	"STAT_WELCOME_BACK"				: 7,
	"STAT_WHO_CAN_I"				: 8,
	"STAT_WHO_CAN_SOMEONE"			: 9,
	"STAT_SOMEONE_REG_1"			: 10,
	"STAT_SOMEONE_REG_2"			: 11,
	"STAT_SOMEONE_REG_3"			: 12,
	"STAT_SOMEONE_REG_4"			: 13,
	"STAT_SOMEONE_CHILDREN"			: 14,
	// "STAT_SOMEONE_CHILDREN_AGAIN"	: 15,
	"STAT_DIAGNOSIS_READY"			: 16,
	"STAT_SYMPTOM_CONFIRM"			: 17,
	"STAT_SYMPTOM_INPUT_AGAIN"		: 18,
	"STAT_SELECT_DEMOGRAPHICS"		: 19,
	"STAT_SELECT_GEOGRAPHICAL"		: 20,
	"STAT_SEARCH_SUGGEST"			: 21,
	// "STAT_DIAGNOSIS_FIRST"			: 22,
	"STAT_DIAGNOSIS_LOOP"			: 23,
	// "STAT_DIAGNOSIS_FINISH"			: 24,
	"STAT_DIAGNOSIS_RESULT"			: 25,
	"STAT_DIAGNOSIS_FEEDBACK"		: 26,
	"STAT_DIAGNOSIS_FAULT"			: 27,

});

class stateManager{
	constructor(){
		this.state = g_states.STAT_FIRST_WELCOME;
	}
	getState(){
		return this.state;
	}
	moveTo( _where){
		if( _where == -1){
			this.state = g_states.STAT_FIRST_WELCOME;
			drawContents();
			return;
		}
		switch(this.state){
			case g_states.STAT_FIRST_WELCOME:
				if( _where == 0){
					this.state = g_states.STAT_LOGIN_BEFORE;
				} else{
					this.state = g_states.STAT_WHO_CAN_I;
				}
			break;
			case g_states.STAT_LOGIN_BEFORE:
				switch(_where){
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_SIGN_1; break;
					case 2: this.state = g_states.STAT_LOGIN; break;
				}
			break;
			case g_states.STAT_LOGIN:
				switch(_where){
					case 0: this.state = g_states.STAT_LOGIN_BEFORE; break;
					case 1: this.state = g_states.STAT_WELCOME_BACK; break;
					case 2: this.state = g_states.STAT_FORGOT_PASS; break;
				}
				break;
			case g_states.STAT_FORGOT_PASS:
				switch(_where){
					case 0: this.state = g_states.STAT_LOGIN_BEFORE; break;
				}
				break;
			case g_states.STAT_SIGN_1:
				switch(_where){
					case 0: this.state = g_states.STAT_LOGIN_BEFORE; break;
					case 1: this.state = g_states.STAT_SIGN_2; break;
					case 2: this.state = g_states.STAT_LOGIN; break;
				}
				break;
			case g_states.STAT_SIGN_2:
				switch(_where){
					case 0: this.state = g_states.STAT_SIGN_1; break;
					case 1: this.state = g_states.STAT_SIGN_3; break;
					case 2: this.state = g_states.STAT_LOGIN; break;
				}
				break;
			case g_states.STAT_SIGN_3:
				switch(_where){
					case 0: this.state = g_states.STAT_SIGN_2; break;
					case 1: this.state = g_states.STAT_WELCOME_BACK; break;
				}
				break;
			case g_states.STAT_WELCOME_BACK:
				switch(_where){
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
					case 2: this.state = g_states.STAT_DIAGNOSIS_READY; break;
				}
				break;
			case g_states.STAT_WHO_CAN_I:
				switch(_where){
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
					case 2: this.state = g_states.STAT_DIAGNOSIS_READY; break;
				}
				break;
			case g_states.STAT_WHO_CAN_SOMEONE:
				switch(_where){
					case 0: this.state = g_states.STAT_WHO_CAN_I; break;
					case 1: this.state = g_states.STAT_SYMPTOM_CONFIRM; break;
					case 2: this.state = g_states.STAT_SOMEONE_REG_1; break;
				}
				break;
			case g_states.STAT_SOMEONE_REG_1:
				switch(_where){
					case 0: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
					case 1: this.state = g_states.STAT_SOMEONE_REG_2; break;
				}
				break;
			case g_states.STAT_SOMEONE_REG_2:
				switch(_where){
					case 0: this.state = g_states.STAT_SOMEONE_REG_1; break;
					case 1: this.state = g_states.STAT_SOMEONE_REG_3; break;
				}
				break;
			case g_states.STAT_SOMEONE_REG_3:
				switch(_where){
					case 0: this.state = g_states.STAT_SOMEONE_REG_2; break;
					case 1: this.state = g_states.STAT_SOMEONE_REG_4; break;
				}
				break;
			case g_states.STAT_SOMEONE_REG_4:
				switch(_where){
					case 0: this.state = g_states.STAT_SOMEONE_REG_3; break;
					case 1: this.state = g_states.STAT_SOMEONE_CHILDREN; break;
					case 2: this.state = g_states.STAT_SYMPTOM_CONFIRM; break;
				}
				break;
			case g_states.STAT_SOMEONE_CHILDREN:
				switch(_where){
					case 0: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
// ?					case 1: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
				}
				break;
			// case g_states.STAT_SOMEONE_CHILDREN_AGAIN:
			// 	switch(_where){
			// 		case 0: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
			// 	}
			// 	break;
			case g_states.STAT_DIAGNOSIS_READY:
				switch(_where){
					case 0: this.state = g_states.STAT_WHO_CAN_I; break;
					case 1: this.state = g_states.STAT_SYMPTOM_CONFIRM; break;
				}
				break;
			case g_states.STAT_SYMPTOM_CONFIRM:
				switch(_where){
					case 1: this.state = g_states.STAT_SELECT_DEMOGRAPHICS; break;
					case 2: this.state = g_states.STAT_SYMPTOM_INPUT_AGAIN; break;
				}
				break;
			case g_states.STAT_SYMPTOM_INPUT_AGAIN:
				switch(_where){
					case 1: this.state = g_states.STAT_SELECT_DEMOGRAPHICS; break;
				}
				break;
			case g_states.STAT_SELECT_DEMOGRAPHICS:
				switch(_where){
					case 0: this.state = g_states.STAT_SYMPTOM_INPUT_AGAIN; break;
					case 1: this.state = g_states.STAT_SELECT_GEOGRAPHICAL; break;
				}
				break;
			case g_states.STAT_SELECT_GEOGRAPHICAL:
				switch(_where){
					case 0: this.state = g_states.STAT_SELECT_DEMOGRAPHICS; break;
					case 1: this.state = g_states.STAT_SEARCH_SUGGEST; break;
				}
				break;

			case g_states.STAT_SEARCH_SUGGEST:
				switch(_where){
					case 0: this.state = g_states.STAT_SELECT_GEOGRAPHICAL; break;
					case 1: this.state = g_states.STAT_DIAGNOSIS_LOOP; break;
				}
				break;
			// case g_states.STAT_DIAGNOSIS_FIRST:
			// 	switch(_where){
			// 		case 0: this.state = g_states.STAT_SEARCH_SUGGEST; break;
			// 		case -2: this.state = g_states.STAT_SELECT_GEOGRAPHICAL; break;

			// 		case 1: this.state = g_states.STAT_SEARCH_SUGGEST; break;
			// 	}
			// 	break;
			case g_states.STAT_DIAGNOSIS_LOOP:
				switch(_where){
					case -2: this.state = g_states.STAT_SELECT_GEOGRAPHICAL; break;
					case 0: this.state = g_states.STAT_SEARCH_SUGGEST; break;
					case 1: this.state = g_states.STAT_DIAGNOSIS_RESULT; break;
					case 2: this.state = g_states.STAT_DIAGNOSIS_FAULT; break;
				}
				break;
			case g_states.STAT_DIAGNOSIS_RESULT:
				switch(_where){
					case 1: this.state = g_states.STAT_DIAGNOSIS_FEEDBACK; break;
					// case 2: this.state = g_states.STAT_FIRST_WELCOME; break;
				}
				break;
			case g_states.STAT_DIAGNOSIS_FEEDBACK:
				// switch(_where){
				// 	case 1: this.state = g_states.STAT_FIRST_WELCOME; break;
				// }
				break;
			case g_states.STAT_DIAGNOSIS_FAULT:
				// switch(_where){
				// 	case 1: this.state = g_states.STAT_FIRST_WELCOME; break;
				// }
				break;
		}
		drawContents();
	}

}
