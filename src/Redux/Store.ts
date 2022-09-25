import { combineReducers, createStore } from "redux";
import { CompanyReducer } from "./CompanyState";
import { CustomerReducer } from "./CustomerState";
import { AuthReducer } from "./AuthAppState";

const reducers = combineReducers({customerReducer: CustomerReducer,  companyReducer :CompanyReducer,authReducer:AuthReducer});
const store = createStore(reducers) //TODO replace create store

export default store;