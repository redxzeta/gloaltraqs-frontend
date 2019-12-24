import React, { Component } from "react";
import { getPin } from "../../actions//pins";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class test extends Component {
  static propTypes = {
    pin: PropTypes.array.isRequired,
    getPin: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getPin(13);
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = state => ({
  //state of redux

  pin: state.pins.pin
});

export default connect(mapStateToProps, { getPin })(test);
