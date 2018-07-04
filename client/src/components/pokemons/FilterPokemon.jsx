import React, { Component } from "react";

class FilterPokemon extends Component {
  render() {
    return <option val={this.props.name}> {this.props.val} </option>;
  }
}

export default FilterPokemon;
