import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { likePokemon, unLikePokemon } from "../../actions/authActions";
import PokemonStates from "./PokemonStates";
import Like from "./Like";
import classnames from "classnames";
class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: "far fa-heart",
      pokemonImage: null,
      pokemonStats: [],
      pokemonTypes: [],
      name: "",
      likes: []
    };
  }
  componentDidMount() {
    console.log(this.props.url);
    axios
      .get(this.props.url)
      .then(res => {
        this.setState({
          pokemonImage: res.data.sprites.front_default,
          pokemonStats: res.data.stats,
          pokemonTypes: res.data.types,
          name: res.data.name
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  onHeartClick = () => {
    if (this.props.auth.isAuthenticated) {
      let pokemonData = {};
      let pokemonId = this.props.url.substring(34, this.props.url.length - 1);
      let id = this.props.auth.user.id;
      pokemonData.id = id;
      pokemonData.pokemonId = pokemonId;
      if (this.props.auth.user.likes.indexOf(pokemonId) !== -1) {
        console.log("unlike");
        this.props.unLikePokemon(pokemonData);
        this.setState({ like: "far fa-heart" });
      } else {
        console.log("like");
        this.props.likePokemon(pokemonData);
        this.setState({ like: "fas fa-heart" });
      }
    } else {
      alert("You need authenticated");
    }
  };

  render() {
    const PokemonTypesTags = this.state.pokemonTypes.length ? (
      this.state.pokemonTypes.map((pokemonType, i) => (
        <span key={i}>{pokemonType.type.name}</span>
      ))
    ) : (
      <span>Loading ...</span>
    );
    return (
      <div
        onClick={this.onHeartClick}
        className="card mr-2"
        style={{ width: "200px", display: "inline-block" }}
      >
        <img
          className="card-img-top"
          src={this.state.pokemonImage}
          alt={this.state.name.toUpperCase()}
        />
        <div className="card-body">
          <h5 className="card-title">{this.state.name.toUpperCase()}</h5>
          <div className="card-text">
            <PokemonStates states={this.state.pokemonStats} />
            {PokemonTypesTags}
          </div>
          <a onClick={this.props.click}>
            {/* <i className={likeCLass} /> Like */}
            {this.state.like ? (
              <i className="fas fa-heart" />
            ) : (
              <i className="far fa-heart" />
            )}
            {Like}
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { likePokemon, unLikePokemon })(
  Pokemon
);
