import React from "react";

import { userUnFlagPin } from "../../../actions/pins";
import { useDispatch } from "react-redux";

function Flag(props) {
  const dispatch = useDispatch();

  const flagid = props.pin.userFlaggedBefore
    ? props.pin.flaggerstory.filter((a) => a.flagger === props.user.id)[0].id
    : 0;
  return (
    <>
      {props.pin.userFlaggedBefore ? (
        <button
          type="submit"
          onClick={() => dispatch(userUnFlagPin(flagid, props.pin.flagState))}
          className="btn btn-primary btn-sm flag-story-btn"
        >
          {props.pin.flagState ? "Flagged" : "Flag"}
        </button>
      ) : (
        <button
          onClick={() => props.flagToggle(props.pin.id)}
          type="submit"
          className="btn btn-sm btn-primary flag-story-btn"
        >
          Flag
        </button>
      )}
    </>
  );
}

export default Flag;
