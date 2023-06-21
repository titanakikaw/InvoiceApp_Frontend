const initAuthState = {}

export default (state = initAuthState, { type, payload}) => {
    switch(type){
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
           
            localStorage.setItem("accessToken", JSON.stringify(payload))
            return payload;

        case "LOGOUT": 
            localStorage.removeItem("accessToken");
            return initAuthState;
        default:
            return state
    }
}