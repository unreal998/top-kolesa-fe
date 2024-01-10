import { all } from 'redux-saga/effects';
import { watchShopGetItems } from '../modules/shopPage/saga';
import { watchMainPageSaga } from '../modules/mainPage/saga';
import { watchAdressByInputSaga } from '../modules/checkoutPage/saga';
import { watchOrderData } from '../modules/orderPage/saga';

export function* rootSaga() {
  yield all([
    watchShopGetItems(),
    watchMainPageSaga(),
    watchAdressByInputSaga(),
    watchOrderData(),
  ]);
}
