// walletReducer.js
import { SET_WALLET_VALUE } from '../actions/WalletActionType';

const initialState = {
  value: 0,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET_VALUE:
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

export default walletReducer;
