import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFlaggedPins,
  getNextFlaggedPins,
  deletePins,
} from "../../actions/pins";
import { Link } from "react-router-dom";

function ManageFlag() {
  const [showReport, setshowReport] = useState("");
  const flaggedPins = useSelector((state) => state.pins.flaggedPins);
  const dispatch = useDispatch(); // dispatches the action

  useEffect(() => {
    //similar to component did mount
    dispatch(getFlaggedPins());
  }, []);
  const toggleReports = (id) => {
    setshowReport((prevshowReport) => ({
      ...showReport,
      [id]: !prevshowReport[id],
    }));
  };
  const adminDelete = (id) => {
    dispatch(deletePins(id));
  };

  return (
    <div className={"manage-container"}>
      manage flagged posts
      <div className="container-fluid">
        <PrevNext next={flaggedPins.next} previous={flaggedPins.previous} />
        {flaggedPins.results && (
          <ListFlags
            pins={flaggedPins.results}
            handleDelete={adminDelete}
            toggleReports={toggleReports}
            showReport={showReport}
          />
        )}
      </div>
    </div>
  );
}

export default ManageFlag;

const PrevNext = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      {props.previous ? (
        <button
          onClick={() => dispatch(getNextFlaggedPins(props.previous))}
          className="btn btn-outline-primary"
        >
          Previous{" "}
        </button>
      ) : (
        ""
      )}
      {props.next ? (
        <button
          onClick={() => dispatch(getNextFlaggedPins(props.next))}
          className="btn btn-outline-primary"
        >
          Next
        </button>
      ) : (
        ""
      )}
    </>
  );
};

function ListFlags(props) {
  const dispatch = useDispatch();
  return (
      <card>
        <table className="table manage-table table-responsive-sm table-responsive-md">
          <thead className="manage-table-head">
            <th>
              story title
            </th>
            <th>
              owner
            </th>
            <th>
              number of flags
            </th>
            <th>
              action
            </th>
            <th>
              reason
            </th>
            <th>
              link to story
            </th>
          </thead>
          <tbody>
            {props.pins.map((pin, index) => {
              return (
                <tr key={index}>
                  <td>{pin.title}</td>
                  <td>{pin.username ? <Link to={`/users/${pin.username}`}>{pin.username}</Link> : "Anonymous"}</td>
                  <td>{pin.flagscore} flags</td>
                  <td>
                    <button
                      onClick={() => dispatch(deletePins(pin.id))}
                      className="btn btn-sm default-btn-purple"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => props.toggleReports(pin.id)}
                      className="btn btn-sm default-btn-purple"
                    >
                      Show Reports
                    </button>
                    {props.showReport[pin.id]
                      ? pin.flaggerstory && (
                          <div className={"manage-reports"}>
                            <StoryReports reports={pin.flaggerstory} />
                          </div>
                        )
                      : null}
                  </td>
                  <td>
                    <Link to={`/Story/${pin.id}`}>View Story</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </card>
  );
}

const StoryReports = (props) => {
  console.log(props);
  return (
    <ul>
      {props.reports.length > 0
        ? props.reports.map((report) => {
            return <li key={report.id}>{report.reason}</li>;
          })
        : "none"}
    </ul>
  );
};
