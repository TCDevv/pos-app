import reducer from "./reducers";
import thunk from "redux-thunk";
import { configureStore  } from "@reduxjs/toolkit";

const middleware = [thunk];

const store = configureStore({
    reducer,
    middleware
});
           
export default store;