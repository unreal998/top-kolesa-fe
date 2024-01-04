import { ActionType } from 'typesafe-actions';
import { getType } from '@reduxjs/toolkit';
import { BuyItemResponce, actions } from './reducer';
import { CityListResponce, WarehouseListResponce } from './types';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchCityByInput, fetchWarehouseByInput } from './api';
import { fetchItemBuy } from '../itemDetailsPage/api';

export function* fetchCityByInputSaga({
  payload,
}: ActionType<typeof actions.fetchCityListByInput>) {
  try {
    const result: CityListResponce = yield call(fetchCityByInput, payload);
    yield put(actions.fetchCityListByInputSuccess(result));
  } catch (error) {
    yield put(actions.fetchCityListByInputFailed(error as string));
  }
}

export function* fetchWarehouseByInputSaga({
  payload,
}: ActionType<typeof actions.fetchWarehouseListByInput>) {
  try {
    const result: WarehouseListResponce = yield call(
      fetchWarehouseByInput,
      payload,
    );
    yield put(actions.fetchWarehouseListByInputSuccess(result));
  } catch (error) {
    yield put(actions.fetchWarehouseListByInputFailed(error as string));
  }
}

export function* fetchBuyItemSaga({
  payload,
}: ActionType<typeof actions.fetchBuyItemAction>) {
  try {
    const orderId: BuyItemResponce = yield call(fetchItemBuy, payload);
    yield put(actions.fetchBuyItemActionSuccess(orderId));
  } catch (error) {
    yield put(actions.fetchBuyItemActionFailed(error as string));
  }
}

export function* watchAdressByInputSaga() {
  yield takeLatest(getType(actions.fetchCityListByInput), fetchCityByInputSaga);
  yield takeLatest(
    getType(actions.fetchWarehouseListByInput),
    fetchWarehouseByInputSaga,
  );
  yield takeLatest(getType(actions.fetchBuyItemAction), fetchBuyItemSaga);
}
