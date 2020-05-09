import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "reactstrap";
const config = {
  headers: {
    "X-Arqive-Api-Key": process.env.REACT_APP_API_KEY,
  },
};

export default function ManageComments() {
  const [flagComments, setflagComments] = useState("");
  const [showReport, setshowReport] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ARQIVE}/commentStory/`, config)
      .then((res) => {
        setflagComments(res.data);
      })
      .catch

      // => console.log(error)
      ();
  }, [flagComments]);

  const toggleReports = (id) => {
    setshowReport((prevshowReport) => ({
      ...showReport,
      [id]: !prevshowReport[id],
    }));
  };
  const onDeleteComment = (id) => {
    axios
      .delete(`${process.env.REACT_APP_ARQIVE}/commentStory/${id}/`, config)
      .then((res) => {
        setflagComments(flagComments.filter((comment) => comment.id !== id));
      })
      .catch

      // => console.log(error)
      ();
  };
  return (
    <div>
      {flagComments && (
        <DisplayComments
          comments={flagComments}
          onDelete={onDeleteComment}
          toggleReports={toggleReports}
          showReport={showReport}
        />
      )}
    </div>
  );
}

const DisplayComments = (props) => {
  return (
    <div className="container-fluid manage-container">
      manage flagged comments
      <Card className={"manage-card"}>
        <table className="table manage-table table-responsive-sm table-responsive-md">
          <thead className="manage-table-head">
            <th>User </th>
            <th>Comment</th>
            <th>number of flags</th>
            <th>action</th>
            <th>reason</th>
          </thead>
          <tbody>
            {props.comments.map((pin) => {
              return (
                <tr key={pin.id}>
                  <td>{pin.username ? pin.username : "Anonymous"}</td>
                  <td>{pin.description}</td>
                  <td>{pin.flagscore} flags</td>
                  <td>
                    <button
                      onClick={() => props.onDelete(pin.id)}
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
                      ? pin.flaggingComment && (
                          <CommentReports reports={pin.flaggingComment} />
                        )
                      : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const CommentReports = (props) => {
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
