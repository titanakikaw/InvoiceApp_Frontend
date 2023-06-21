import axios from "axios"
import { takeLatest, takeEvery, call, put } from "redux-saga/effects"

function* LOGIN_SAGA({payload}){
    try {
        const { data } = yield call(axios, {
            method: 'post',
            url: 'http://localhost:3000/login',
            data: payload, // Assuming the payload contains the request data
        });
        yield put({
            type: "LOGIN_SUCCESS",
            payload: data
        })
    } catch (error) {
        
    }
}


function* REGISTER_SAGA({payload}){
    try {
        const { data } = yield call(axios, {
            method: 'post',
            url: 'http://localhost:3000/register',
            data: payload, // Assuming the payload contains the request data
        });

    
        yield put({
            type: "REGISTER_SUCCESS",
            payload: data
        })
    
        
    } catch (error) {
        
    }
}


export function* AUTH_SAGA(){
    yield takeLatest("LOGIN_REQUEST" ,LOGIN_SAGA)
    yield takeLatest("REGISTER_REQUEST" ,REGISTER_SAGA)
}