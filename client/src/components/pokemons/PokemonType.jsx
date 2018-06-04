import React, { Component } from "react";

class PokemonType extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const types = this.props.types.map(item => {
      <li> ${item.type.name} </li>;
    });
    return <ul>{types}</ul>;
  }
}
export default PokemonType;
