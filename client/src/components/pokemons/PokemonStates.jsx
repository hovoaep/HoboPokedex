import React, { Component } from "react";

class PokemonStates extends Component {
  render() {
    const states = this.props.states.map((item, i) => {
      return (
        <li key={i}>
          {item.stat.name.toUpperCase()} - {item.base_stat}
        </li>
      );
    });
    return (
      <ul style={{ listStyle: "none", textAlign: "justify" }}>{states}</ul>
    );
  }
}
export default PokemonStates;
