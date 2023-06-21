import {  all } from 'redux-saga/effects'
import { AUTH_SAGA } from './authSaga';
import { INVOICE_SAGA } from './invoiceSaga';

export function* rootSaga() {
    yield all([
      AUTH_SAGA(),
      INVOICE_SAGA()
      // Other sagas...
    ]);
  }
  