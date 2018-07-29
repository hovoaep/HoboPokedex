import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { resendEmailActive } from "../../actions/authActions";

class ActiveEmail extends Component {
  componentWillMount() {
    let url = new URLSearchParams(this.props.location.search);
    let token = url.get("token");
    if (token) {
      axios
        .get(`/api/users/verify/${token}`)
        .then(res => {
          this.props.history.push(res.data);
        })
        .catch(err => console.log(err));
    }
  }
  resendMail = () => {
    if (this.props.auth.isActiveEmail) {
      let data = {
        email: this.props.auth.isActiveEmail
      };
      this.props.resendEmailActive(data);
    } else {
      alert("somthing wrong");
    }
  };
  render() {
    return (
      <div>
        <h2>One more step.</h2>
        <p>
          Now you need go to your input typet emial, and click atcive emial
          button
        </p>
        <p>After that you can Login your accout page</p>
        <p>
          If you not recive email, click this button{" "}
          <button
            onClick={this.resendMail}
            className="btn btn-submit"
            type="button"
          >
            Resend Email
          </button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resendEmailActive }
)(ActiveEmail);
