import React, { Component } from "react";

class ActiveEmail extends Component {
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
          <button className="btn btn-submit" type="button">
            Resend Email
          </button>
        </p>
      </div>
    );
  }
}

export default ActiveEmail;
