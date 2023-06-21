import axios from "axios"
import { takeLatest, takeEvery, call, put,all, fork } from "redux-saga/effects"
import axiosInstance from "../utils/axiosInstance"

function* LOAD_INVOICE(){
    try {
        const response = yield call(axiosInstance.get, '660/invoices', { params: {
            userId: 1
        }})
        
        yield put({
            type: "LOAD_INVOICE_SUCCESS",
            payload: response
        })
    } catch (error) {
        console.log(error)
    }
}


function* ADD_INVOICE({payload}){
   
    try {
        const response = yield call(axiosInstance.post, '660/invoices',payload)
        
        yield put({
            type: "ADD_INVOICE_SUCCESS",
            payload: response
        })
    } catch (error) {
        console.log(error)
    }
}

function* UPDATE_INVOICE({payload}){
    try {
        const { invoiceId, ...rest } = payload
        const response = yield call(axiosInstance.put, `660/invoices/${payload.invoiceId}`, rest)
        yield put({
            type: "UPDATE_INVOICE_SUCCESS",
            payload: response
        })
    } catch (error) {
        
    }
}

function* DELETE_INVOICE({payload}){
    try {
        const response = yield call(axiosInstance.delete, `660/invoices/${payload}`)
       
        yield put({
            type: "DELETE_INVOICE_SUCCESS",
            payload
        })
    } catch (error) {
        
    }
}


function* AddInvoiceRequest(){
    yield takeLatest("ADD_INVOICE_REQUEST" ,ADD_INVOICE)
}

function* LoadInvoiceRequest(){
    yield takeLatest("LOAD_INVOICE_REQUEST", LOAD_INVOICE)
}
function* UpdateInvoiceRequest(){
    yield takeLatest("UPDATE_INVOICE_REQUEST", UPDATE_INVOICE)
}
function* DeleteInvoiceRequest(){
    yield takeLatest("DELETE_INVOICE_REQUEST", DELETE_INVOICE)
}


export function* INVOICE_SAGA(){
    yield all([
        fork(AddInvoiceRequest),
        fork(UpdateInvoiceRequest),
        fork(LoadInvoiceRequest),
        fork(DeleteInvoiceRequest)
    ])

}