import { logout } from "../player";

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
      if (!response || response.statusCode === 401) {
        // dispatch(logout());
      }

      return response;
    } else {
      dispatch({ type: TOKEN_MISSING });
      // dispatch(logout());
    }
  };
};

export default checkTokenAsync;
