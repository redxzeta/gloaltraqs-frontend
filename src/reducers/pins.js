import {
  GET_PINS,
  DELETE_PINS,
  ADD_PIN,
  EDIT_PIN,
  GET_PIN,
  SEARCH_PINS,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_PINS_BY_OWNER,
  USER_FLAG_PIN,
  USER_FIRST_UPVOTE,
  USER_UPVOTE,
  USER_UNFLAG,
  GET_FLAGGED_PINS,
  GET_NEXT_FLAGGED_PINS,
  GET_MAX_PIN,
  GET_MIN_PIN,
} from "../actions/types.js";
import max from "date-fns/max";
import min from "date-fns/min";
import format from "date-fns/format";
const initialState = {
  pins: [],
  pin: [],
  upvote: false,
  flagState: false,
  validUser: false,
  pinId: 0,
  flaggedPins: [],
  pinMinDate: new Date(1000, 1, 1, 0, 0, 0, 0),
  pinMaxDate: new Date(),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PINS_BY_OWNER:
      return {
        ...state,
        pins: action.payload,
      };
    case SEARCH_PINS:
      return {
        ...state,
        pins: action.payload,
      };
    case GET_PIN:
      return {
        ...state,
        pin: action.payload,
        validUser: action.payload.validUser,
        flagState: action.payload.flagState,
        pinId: action.payload.id,
      };
    case GET_PINS:
      return {
        ...state,
        pins: action.payload,
      };
    case GET_MAX_PIN:
      return {
        ...state,
        pinMaxDate: action.payload,
      };
    case GET_MIN_PIN:
      console.log(action.payload);
      return {
        ...state,
        pinMinDate: action.payload,
      };
    case DELETE_PINS:
      return {
        ...state,
        pins: state.pins.filter((pins) => pins.id !== action.payload),

        pin: [],
      };
    case ADD_PIN:
      const addMinDate = min([
        (new Date(state.pinMinDate), new Date(action.payload.startDate)),
      ]);

      const addMaxDate = max([
        (new Date(state.pinMaxDate), new Date(action.payload.endDate)),
      ]);
      console.log(
        "initial min date: " +
          state.pinMaxDate +
          " added pin start date: " +
          action.payload.startDate +
          " result : " +
          addMaxDate
      );
      return {
        ...state,
        pins: [...state.pins, action.payload],
        pinMaxDate: addMaxDate,
        pinMinDate: addMinDate,
      };
    case EDIT_PIN:
      const editMinDate = min([
        (new Date(state.pinMinDate), new Date(action.payload.startDate)),
      ]);
      const editMaxDate = max([
        (new Date(state.pinMaxDate), new Date(action.payload.endDate)),
      ]);
      return {
        ...state,
        // fixes duplicated pin on map when editing pin
        pins: [
          ...state.pins.filter((pins) => pins.id !== action.payload.id),
          action.payload,
        ],
        pin: action.payload,
        pinMaxDate: editMaxDate,
        pinMinDate: editMinDate,
      };
    case ADD_COMMENT:
      const newComment = {
        ...state.pin,
        commentstory: [...state.pin.commentstory, action.payload],
      };

      return {
        ...state,
        pin: newComment,
      };

    case DELETE_COMMENT:
      const newComments = state.pin.commentstory.filter((p) => {
        if (p.id !== action.payload) {
          return p;
        } else {
          return null;
        }
      });

      const delComment = {
        ...state.pin,
        commentstory: newComments,
      };
      return {
        ...state,
        pin: delComment,
      };
    case USER_FLAG_PIN:
      const userFlag = {
        ...state.pin,
        flaggerstory: [...state.pin.flaggerstory, action.payload],
        userFlaggedBefore: true,
        flagState: action.payload.flagged,
      };
      return {
        ...state,
        pin: userFlag,
      };
    case USER_UNFLAG:
      const userUnFlag = {
        ...state.pin,
        flaggerstory: [
          ...state.pin.flaggerstory.filter((x) => x.id !== action.payload.id),
          action.payload,
        ],
        flagState: action.payload.flagged,
      };
      return {
        ...state,
        pin: userUnFlag,
      };
    case USER_FIRST_UPVOTE:
      const userFirstUpvote = {
        ...state.pin,
        updotes: [...state.pin.updotes, action.payload],
        upvotedBefore: true,
        userCurrentUpvote: true,
        updooots: state.pin.updooots + 1,
      };
      return {
        ...state,
        pin: userFirstUpvote,
      };
    case USER_UPVOTE:
      const userUp = {
        ...state.pin,
        updotes: [state.pin.updotes.filter((x) => x.id !== action.payload.id)],
        userCurrentUpvote: action.payload.upvote,
        updooots: state.pin.updooots - 1,
        // updooots: action.payload.upvote ? pin.updooots++ : pin.updoots--
      };
      return {
        ...state,
        pin: userUp,
      };
    case GET_NEXT_FLAGGED_PINS:
    case GET_FLAGGED_PINS:
      return {
        ...state,
        flaggedPins: action.payload,
      };
    default:
      return state;
  }
}
