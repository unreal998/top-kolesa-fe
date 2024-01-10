import { ActionType } from 'typesafe-actions';
import { getType } from '@reduxjs/toolkit';
import { actions } from './reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { OrderData } from './types';
import { fetchOrderData } from './api';

export function* fetchOrderDataSaga({
  payload,
}: ActionType<typeof actions.fetchOrderData>) {
  try {
    const orderData: OrderData = yield call(fetchOrderData, payload);
    yield put(actions.fetchOrderDataSuccess(orderData));
  } catch (error) {
    yield put(actions.fetchOrderDataFailed(error as string));
  }
}

export function* watchOrderData() {
  yield takeLatest(getType(actions.fetchOrderData), fetchOrderDataSaga);
}
