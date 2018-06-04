import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Pokemon from "../pokemons/Pokemon";
import Spinner from "../common/Spinner";
// import { Link } from "react-router-dom";

class Profile extends Component {
  render() {
    const pokemons = this.props.auth.user.likes.map(item => {
      return `https://pokeapi.co/api/v2/pokemon/${Number(item)}`;
    });
    console.log(pokemons.length);
    const PokemonCardList = pokemons.length ? (
      pokemons.map((pokemon, i) => <Pokemon key={i} url={pokemon} />)
    ) : (
      <div>
        <Spinner />
      </div>
    );
    const { user } = this.props.auth;
    // let profileContent;
    console.log(this.props);

    return (
      <div>
        <div>
          <h1>Hello dear {user.name}</h1>
        </div>
        <div>
          <h3>This is your likes</h3>
          <div className="pokemonList">{PokemonCardList}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps)(Profile);
