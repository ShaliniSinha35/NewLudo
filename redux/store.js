// store.js
import { legacy_createStore as createStore } from "redux";
import walletReducer from './reducers/WalletReducer';

const store = createStore(walletReducer);

export default store;
