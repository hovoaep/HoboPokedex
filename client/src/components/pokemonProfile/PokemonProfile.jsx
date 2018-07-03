import React, { Component } from "react";
import { fetchPokemons } from "../helpers/helper";
class PokemonProfile extends Component {
  constructor() {
    super();
    this.state = { pokemonList: [], totalPokemon: 0 };
  }
  componentDidMount() {
    console.log("Mountes");
    fetchPokemons(1, 10, "", (pokemonList, totalPokemon) => {
      this.setState({
        pokemonList,
        totalPokemon
      });
      return;
    });
    fetchPokemons(0, 0, "type", (...args) => console.log(...args));
  }
  render() {
    console.log(this.props.match.params.id);

    return <div> TEst </div>;
  }
}

export default PokemonProfile;
