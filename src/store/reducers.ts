import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { shopPageSlice } from "../modules/shopPage/reducer";

const slices = [
    shopPageSlice
];

const toolkitReducers = Object.fromEntries(
    slices.map(({name, reducer}) => [name, reducer])
);

export const rootReducer = combineReducers({
    ...toolkitReducers
})

export type AppSate = StateType<typeof rootReducer>