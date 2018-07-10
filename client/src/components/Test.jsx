import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "antd";
import { Button } from "antd";

import { getCurrentProfile } from "../actions/userDataActions";

import axios from "axios";

class Test extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    return (
      <div>
        <h1>Testtttttttt</h1>
        <Button type="primary">Primary</Button>

        <Icon type="heart-o" />
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
