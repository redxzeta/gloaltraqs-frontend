import React, { Component } from "react";
import PropTypes from "prop-types";

export class AddComment extends Component {
  state = {
    pin: "",
    commenter: "",
    description: ""
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {}

  render() {
    const { description } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add a commennt</h2>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Comment</label>
            <input
              className="form-control"
              type="text"
              name="description"
              onChange={this.onChange}
              value={description}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddComment;
