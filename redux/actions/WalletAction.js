// walletActions.js
import { SET_WALLET_VALUE } from './walletActionTypes';

export const setWalletValue = (value) => ({
  type: SET_WALLET_VALUE,
  payload: value,
});
