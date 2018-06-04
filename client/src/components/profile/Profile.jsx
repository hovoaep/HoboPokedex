import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Pokemon from "../pokemons/Pokemon";
import Spinner from "../common/Spinner";
import { bindActionCreators } from "redux";
import { setCurrentUser } from "../../actions/authActions";
// import { Link } from "react-router-dom";

class Profile extends Component {
  render() {
    console.log("render8");
    const pokemons = this.props.auth.user.likes.map(item => {
      return `https://pokeapi.co/api/v2/pokemon/${Number(item)}`;
    });
    console.log(pokemons.length);
    var PokemonCardList = pokemons.length ? (
      pokemons.map((pokemon, i) => <Pokemon key={i} url={pokemon} />)
    ) : (
      <div>
        <Spinner />
      </div>
    );
    console.log(PokemonCardList);
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
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
