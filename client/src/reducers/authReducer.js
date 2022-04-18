export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;
  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        isAuthenticated,
        user,
        loading: false,
      };

    default:
      return state;
  }
};
