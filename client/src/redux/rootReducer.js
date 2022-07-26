import { combineReducers } from "redux";
import { bigbasketFeatureKey, bigbasketReducer } from "./bigbasket/bigbasket.reducer";

export const rootReducer = combineReducers({
    [bigbasketFeatureKey]: bigbasketReducer
});