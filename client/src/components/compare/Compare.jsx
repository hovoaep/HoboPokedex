import React, { Component } from "react";
import { connect } from "react-redux";
// import { fetchPokemons } from "../helpers/helper";
import Spinner from "../common/Spinner";

import { addComparePokemon } from "../../actions/authActions";
import Pokemon from "../pokemons/Pokemon";
class Compare extends Component {
  render() {
    const api = "https://pokeapi.co/api/v2/pokemon";
    const pokemonsNames = this.props.auth.user.compare;
    console.log(pokemonsNames);
    const PokemonCardList = pokemonsNames.length ? (
      pokemonsNames.map((pokemon, i) => (
        <Pokemon name={pokemon} key={pokemon} url={`${api}/${pokemon}`} />
      ))
    ) : (
      <div>
        <Spinner />
      </div>
    );
    return (
      <div>
        <button onClick={this.onClick}> CLikkkkkkk </button>
        <h1>test</h1>
        {PokemonCardList}
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
  { addComparePokemon }
)(Compare);
