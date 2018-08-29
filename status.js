var g_states = Object.freeze({
	"STAT_FIRST_WELCOME"	: 0, 
	"STAT_LOGIN_BEFORE"		: 1,
	"STAT_LOGIN"			: 2,
	"STAT_WELCOME_BACK"		: 3,
	"STAT_FORGOT_PASS"		: 4,
	"STAT_WHO_CAN_I"		: 5,
	"STAT_SIGN_1"			: 6,
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
					case 0: this.state = g_states.STAT_LOGIN; break;
					case 1: this.state = g_states.STAT_SIGN_1; break;
				}
			break;
			case g_states.STAT_LOGIN:
				switch(_where){
					case -1: this.state = g_states.STAT_LOGIN_BEFORE; break;
					case 0: this.state = g_states.STAT_WELCOME_BACK; break;
					case 1: this.state = g_states.STAT_FORGOT_PASS; break;
				}
				break;
			case g_states.STAT_WHO_CAN_I:
			break;
		}
		drawContents();
	}

}

let objState = new stateManager();