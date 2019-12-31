import axios from "axios";
import { LINK } from "../link/link";
import {
  GET_PINS,
  DELETE_PINS,
  ADD_PIN,
  EDIT_PIN,
  GET_PIN
  //GET_USER
} from "./types";

//GET PINS
export const getPins = () => dispatch => {
  axios
    .get(LINK + "pins/")
    .then(res => {
      dispatch({
        type: GET_PINS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deletePins = id => dispatch => {
  axios
    .delete(LINK + `pins/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_PINS,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

export const addPin = pin => dispatch => {
  axios
    .post(LINK + "pins/", pin)
    .then(res => {
      dispatch({
        type: ADD_PIN,
        payload: res.data
      });
      console.log("In add pin");
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const editPin = (pin, id) => dispatch => {
  console.log(id + " " + pin.title);
  axios
    .patch(LINK + `pins/${id}/`, pin)
    .then(res => {
      dispatch({
        type: EDIT_PIN,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const getPin = id => dispatch => {
  axios
    .get(LINK + `pins/${id}/`)
    .then(res => {
      dispatch({
        type: GET_PIN,
        payload: res.data
      });
    })
    .catch(error => console.log(error));
};
