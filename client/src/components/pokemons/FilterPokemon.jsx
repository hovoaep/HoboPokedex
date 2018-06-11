import React, { Component } from "react";

class FilterPokemon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <option val={this.props.name}> {this.props.val} </option>;
  }
}

export default FilterPokemon;
