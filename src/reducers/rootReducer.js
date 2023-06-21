import { combineReducers } from "redux"
import AuthReducer from "./AuthReducer"
import InvoiceReducer from "./InvoiceReducer"

export default combineReducers({
    Auth: AuthReducer,
    Invoices: InvoiceReducer
})