import { call, put, takeLatest } from "redux-saga/effects";
import { getShopPageItems } from "./api";
import { getType } from '@reduxjs/toolkit';
import { ShopData, actions, } from "./reducer";
import { ActionType } from "typesafe-actions";

export function* getShopItems({payload}: ActionType<typeof actions.getShopItems>) {
    try {
        const result: ShopData = yield call(getShopPageItems, payload)
        yield put(actions.getShopItemsSuccess(result))
    } catch(error) {
        yield put(actions.getShopItemsFailure(error as string))
    }
}

export function* watchShopGetItems() {
    yield takeLatest(getType(actions.getShopItems), getShopItems);
}