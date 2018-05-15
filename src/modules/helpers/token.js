import { push } from "react-router-redux";

export const VERIFYING_TOKEN = "token/CHECKING_TOKEN";
export const TOKEN_EXISTS = "token/TOKEN_VERIFIED";
export const TOKEN_MISSING = "token/TOKEN_MISSING";

const checkTokenAsync = (fn, ...args) => {
  return async (dispatch, getState) => {
    dispatch({ type: VERIFYING_TOKEN });

    const state = getState();
    if (state.player.token) {
      dispatch({ type: TOKEN_EXISTS });
      const response = await fn(state.player.token, ...args);
      return response;
    } else {
      dispatch({ type: TOKEN_MISSING });
      dispatch(push("/logout"));
    }
  };
};

export default checkTokenAsync;
