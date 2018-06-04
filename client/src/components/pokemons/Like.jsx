import React, { Component } from "react";

class Like extends Component {
  render() {
    return (
      <div>
        <a onClick={this.props.click}>
          <i className={this.props.like} /> Like
        </a>
      </div>
    );
  }
}

export default Like;
