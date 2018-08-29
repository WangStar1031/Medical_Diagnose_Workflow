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
	"STAT_SOMEONE_CHILDREN_AGAIN"	: 15,
	"STAT_DIAGNOSIS_READY"			: 16,
	"STAT_SYMPTOM_CONFIRM"			: 17,
	"STAT_SYMPTOM_INPUT_AGAIN"		: 18,
	"STAT_SYMPTOM_CONFIRM_AGAIN"	: 19,
	"STAT_SYMPTOM_INPUT_NEW"		: 20,
});

class stateManager{
	constructor(){
		this.state = g_states.STAT_FIRST_WELCOME;
	}
	getState(){
		return this.state;
	}
	moveTo( _where){
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
					case -1: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_SIGN_1; break;
					case 2: this.state = g_states.STAT_LOGIN; break;
				}
			break;
			case g_states.STAT_LOGIN:
				switch(_where){
					case -1: this.state = g_states.STAT_LOGIN_BEFORE; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_WELCOME_BACK; break;
					case 2: this.state = g_states.STAT_FORGOT_PASS; break;
				}
				break;
			case g_states.STAT_FORGOT_PASS:
				switch(_where){
					case -1: this.state = g_states.STAT_LOGIN_BEFORE; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
				}
				break;
			case g_states.STAT_SIGN_1:
				switch(_where){
					case -1: this.state = g_states.STAT_LOGIN_BEFORE; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_SIGN_2; break;
					case 2: this.state = g_states.STAT_LOGIN; break;
				}
				break;
			case g_states.STAT_SIGN_2:
				switch(_where){
					case -1: this.state = g_states.STAT_SIGN_1; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_SIGN_3; break;
					case 2: this.state = g_states.STAT_LOGIN; break;
				}
				break;
			case g_states.STAT_SIGN_3:
				switch(_where){
					case -1: this.state = g_states.STAT_SIGN_2; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_WELCOME_BACK; break;
				}
				break;
			case g_states.STAT_WELCOME_BACK:
				switch(_where){
					case -1: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
					case 1: this.state = g_states.STAT_DIAGNOSIS_READY; break;
				}
				break;
			case g_states.STAT_WHO_CAN_I:
				switch(_where){
					case -1: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
					case 1: this.state = g_states.STAT_DIAGNOSIS_READY; break;
				}
				break;
			case g_states.STAT_WHO_CAN_SOMEONE:
				switch(_where){
					case -1: this.state = g_states.STAT_WHO_CAN_I; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_SYMPTOM_CONFIRM; break;
					case 2: this.state = g_states.STAT_SOMEONE_REG_1; break;
				}
				break;
			case g_states.STAT_SOMEONE_REG_1:
				switch(_where){
					case -1: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_SOMEONE_REG_2; break;
				}
				break;
			case g_states.STAT_SOMEONE_REG_2:
				switch(_where){
					case -1: this.state = g_states.STAT_SOMEONE_REG_1; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_SOMEONE_REG_3; break;
				}
				break;
			case g_states.STAT_SOMEONE_REG_3:
				switch(_where){
					case -1: this.state = g_states.STAT_SOMEONE_REG_2; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_SOMEONE_REG_4; break;
					case 1: this.state = g_states.STAT_FORGOT_PASS; break;			}
				break;
			case g_states.STAT_SOMEONE_REG_4:
				switch(_where){
					case -1: this.state = g_states.STAT_SOMEONE_REG_3; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_SYMPTOM_CONFIRM; break;
				}
				break;
			case g_states.STAT_SOMEONE_CHILDREN:
				switch(_where){
					case -1: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
// ?					case 1: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
				}
				break;
			case g_states.STAT_SOMEONE_CHILDREN_AGAIN:
				switch(_where){
					case -1: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
// ?					case 1: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
				}
				break;
			case g_states.STAT_DIAGNOSIS_READY:
				switch(_where){
					case -1: this.state = g_states.STAT_WHO_CAN_I; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_SYMPTOM_CONFIRM; break;
				}
				break;
			case g_states.STAT_SYMPTOM_CONFIRM:
				switch(_where){
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
// ?					case 1: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
					case 2: this.state = g_states.STAT_SYMPTOM_INPUT_AGAIN; break;
				}
				break;
			case g_states.STAT_SYMPTOM_INPUT_AGAIN:
				switch(_where){
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_SYMPTOM_CONFIRM_AGAIN; break;
				}
				break;
			case g_states.STAT_SYMPTOM_CONFIRM_AGAIN:
				switch(_where){
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
// ?					case 1: this.state = g_states.STAT_WHO_CAN_SOMEONE; break;
					case 2: this.state = g_states.STAT_SYMPTOM_INPUT_AGAIN; break;
				}
				break;
			case g_states.STAT_SYMPTOM_INPUT_NEW:
				switch(_where){
					case -1: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 0: this.state = g_states.STAT_FIRST_WELCOME; break;
					case 1: this.state = g_states.STAT_WHO_CAN_I; break;
				}
				break;

			break;
		}
		drawContents();
	}

}

let objState = new stateManager();