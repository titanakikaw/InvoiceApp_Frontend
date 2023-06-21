const initInvoiceState = [

]

export default (state = initInvoiceState, { type, payload}) => {
    switch(type){
        case 'LOAD_INVOICE_SUCCESS':
            return payload;
        case 'ADD_INVOICE_SUCCESS':
            return [...state, payload];
        case 'UPDATE_INVOICE_SUCCESS':
            const index = state.findIndex((x) => x.id === payload.id);
            if(index != -1){
                return [...state.splice(0, index), payload, ...state.splice(index + 1)]
            }
        case 'DELETE_INVOICE_SUCCESS':{
            console.log(payload)
            const index = state.findIndex((x) => x.id === payload);
            if(index != -1){
                return [...state.splice(0, index), ...state.splice(index + 1)]
            }
            return payload;
        }
        default:
            return state
    }
}