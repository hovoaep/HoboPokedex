import React, { Component } from "react";
import axios from "axios";

class ActiveEmail extends Component {
  componentWillMount() {
    if (this.props.match.params.id) {
      axios
        .get(`/api/users/verify/${this.props.match.params.id}`)
        .then(res => {
          this.props.history.push(res.data);
        })
        .catch(err => console.log(err));
    }
  }
  resendMail = () => {
    console.log(this.props);
  };
  render() {
    console.log();
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
          <button className="btn btn-submit" type="button">
            Resend Email
          </button>
        </p>
      </div>
    );
  }
}

export default ActiveEmail;
