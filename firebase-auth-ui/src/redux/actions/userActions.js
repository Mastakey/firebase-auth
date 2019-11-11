import {
  SET_USER,
  LOADING_USER,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  SIGNUP_USER,
  FORGOT_USER,
  CLEAR_USER
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
      console.log(res.data);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signUp = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    //email, password, confirmPassword, username
    await axios.post("/signup", userData);
    dispatch({ type: SIGNUP_USER });
    dispatch({ type: CLEAR_ERRORS });
    //history.push("/login");
  } catch (err) {
    dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: CLEAR_USER });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const forgotPassword = (userData) => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    await axios.post("/forgotpassword", userData);
    dispatch({ type: FORGOT_USER });
    dispatch({ type: CLEAR_ERRORS });
  }
  catch(err){
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }

}

export const clearUser = () => (dispatch) => {
  dispatch({ type: CLEAR_USER });
}
