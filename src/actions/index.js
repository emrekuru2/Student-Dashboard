export const loginTime = () => {
  return {
    type: 'SignIn'
  }
}

export const logoutTime = () => {
  return {
    type : 'SignOut'
  }
}

export const showSuccessSnackbar = (message) => {
  return dispatch => {
    dispatch({ type: "Success", message});
  };
};

export const clearSnackbar = () => {
  return dispatch => {
    dispatch({ type: "Clear" });
  };
};
