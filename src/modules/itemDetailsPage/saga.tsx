import { call, put, takeLatest } from "redux-saga/effects";
import { fetchItemBuy } from "./api";
import { getType } from "@reduxjs/toolkit";
import { actions } from "./reducer";
import { ActionType } from "typesafe-actions";

export function* fetchBuyItemSaga({
  payload,
}: ActionType<typeof actions.fetchBuyItemAction>) {
  try {
    yield call(fetchItemBuy, payload);
    yield put(actions.fetchBuyItemActionSuccess(''));
  } catch (error) {
    yield put(actions.fetchBuyItemActionFailed(error as string));
  }
}

export function* watchBuyItem() {
  yield takeLatest(getType(actions.fetchBuyItemAction), fetchBuyItemSaga);
}
