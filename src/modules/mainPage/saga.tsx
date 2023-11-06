import { call, put, takeLatest } from "redux-saga/effects";
import { fetchFilterData } from "./api";
import { getType } from "@reduxjs/toolkit";
import { FilterParams, actions } from "./reducer";
import { ActionType } from "typesafe-actions";

function* getFilterData({ payload }: ActionType<typeof actions.getFilterData>) {
  try {
    const result: FilterParams = yield call(fetchFilterData);
    yield put(actions.getFilterDataSuccess(result));
  } catch (error) {
    yield put(actions.getFilterDataFailure(error as string));
  }
}

export function* watchMainPageSaga() {
  yield takeLatest(getType(actions.getFilterData), getFilterData);
}
