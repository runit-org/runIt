import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./services/reducers";

const initialState = {};
const middleware = [thunk];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store;

if (process.env.NODE_ENV === "development") {
  store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(...middleware))
  );
} else {
  store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
}

export default store;
