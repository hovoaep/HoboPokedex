import React, { Component } from "react";
import { connect } from "react-redux";

import { getCurrentProfile } from "../actions/authActions";

import axios from "axios";

class Test extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    return (
      <div>
        <h1>Testtttttttt</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Test);
