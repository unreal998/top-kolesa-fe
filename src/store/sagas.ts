import {all} from 'redux-saga/effects'
import { watchShopGetItems } from '../modules/shopPage/saga'

export function* rootSaga() {
    yield all([
        watchShopGetItems()
    ])
}