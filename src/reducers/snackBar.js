const uiReducer = (state = {}, action) => {
  switch (action.type) {
    case "Success":
      return {
        ...state,
        snackbarOpen: true,
        snackbarMessage: action.message,
      };
    case "Clear":
      return {
        ...state,
        snackbarOpen: false,
        errorSnackbarOpen: false,
        infoSnackbarOpen: false
      };
    default:
      return state;
  }
};

export default uiReducer;
