export const DISPLAY_BANNER = "banner/DISPLAY_BANNER";
export const HIDE_BANNER = "banner/HIDE_BANNER";
export const DISMISS_BANNER = "banner/DISMISS_BANNER";

const initialState = {
  text: null,
  isShown: false,
  color: "gold"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_BANNER:
      return {
        ...state,
        text: action.text,
        color: action.color,
        isShown: true
      };
    case HIDE_BANNER:
      return {
        ...state,
        isShown: false
      };
    case DISMISS_BANNER:
      return {
        ...state,
        text: null,
        iShown: false
      };
    default:
      return state;
  }
};

export const displayBanner = (text, color = "gold", lifespan = 1000) => {
  return async dispatch => {
    dispatch({
      type: DISPLAY_BANNER,
      text,
      color
    });
    setTimeout(() => dispatch({ type: HIDE_BANNER }), lifespan);
    setTimeout(() => dispatch({ type: DISMISS_BANNER }), lifespan + 2000);
  };
};

export const hideBanner = () => {
  return dispatch => {
    dispatch({ type: HIDE_BANNER });
  };
};

export const dismissBanner = () => {
  return dispatch => {
    dispatch({ type: DISMISS_BANNER });
  };
};
