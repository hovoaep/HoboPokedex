import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { likePokemon, unLikePokemon } from "../../actions/authActions";
import PokemonStates from "./PokemonStates";

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      pokemonImage: null,
      pokemonStats: [],
      pokemonTypes: [],
      name: ""
    };
  }
  componentDidMount() {
    axios
      .get(this.props.url)
      .then(res => {
        let id = res.data.id.toString();
        let likes = this.props.auth.user.likes;
        console.log(likes.includes(id));
        if (likes.includes(id)) {
          console.log("xxxx");
          this.setState({ like: true });
        }
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
      console.log(this.props);
      let pokemonData = {};
      let pokemonId = this.props.url.substring(34, 35);
      let id = this.props.auth.user.id;
      pokemonData.id = id;
      pokemonData.pokemonId = pokemonId;
      console.log(pokemonId);
      let likes = this.props.auth.user.likes;
      if (likes.includes(pokemonId)) {
        console.log("unlike");
        this.props.unLikePokemon(pokemonData);
        this.setState({ like: false });
      } else {
        console.log("like");
        this.props.likePokemon(pokemonData);
        console.log(111111);
        this.setState({ like: true });
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
        </div>
        <a onClick={this.onHeartClick}>
          <span />
          {this.state.like ? "unLike" : "like"}
        </a>
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
