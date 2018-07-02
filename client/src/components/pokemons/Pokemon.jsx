import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { likePokemon, unLikePokemon } from "../../actions/authActions";
import PokemonStates from "./PokemonStates";
import Slider from "react-slick";

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      pokemonImage: [],
      pokemonStats: [],
      pokemonTypes: [],
      name: ""
    };
  }
  componentDidMount() {
    axios
      .get(this.props.url)
      .then(res => {
        console.log(res.data.sprites);
        let id = res.data.id.toString();
        let likes = this.props.auth.user.likes;
        if (this.props.auth.isAuthenticated) {
          if (likes.includes(id)) {
            this.setState({ like: true });
          }
        }
        this.setState({
          pokemonImage: Object.values(res.data.sprites)
            .filter(item => item !== null)
            .reverse(),
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
      console.log(this.props.url);
      let pokemonData = {};
      let pokemonId = this.props.url.substring(34, this.props.url.length - 1);
      let id = this.props.auth.user.id;
      pokemonData.id = id;
      pokemonData.pokemonId = pokemonId;
      // console.log(pokemonId);
      let likes = this.props.auth.user.likes;
      if (likes.includes(pokemonId)) {
        // console.log("unlike");
        this.props.unLikePokemon(pokemonData);
        this.setState({ like: false });
      } else {
        // console.log("like");
        this.props.likePokemon(pokemonData);
        // console.log(111111);
        this.setState({ like: true });
      }
    } else {
      alert("You need authenticated");
    }
  };

  render() {
    const PokemonTypesTags = this.state.pokemonTypes.length ? (
      this.state.pokemonTypes.map((pokemonType, i) => (
        <span className="pokemonType" key={i}>
          {pokemonType.type.name}
        </span>
      ))
    ) : (
      <div
        className="card mr-2 mb-2"
        style={{ width: "210px", display: "inline-block" }}
      >
        <img
          src="https://media.giphy.com/media/sM503VtpDzxLy/giphy.gif"
          alt="Loading"
          className="card-img-top"
        />
      </div>
    );
    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000
    };
    const pokemonImageSlider = this.state.pokemonImage.length ? (
      this.state.pokemonImage.map((item, key) => {
        return (
          <img
            key={key}
            className="card-img-top"
            data-test={item}
            src={item}
            alt={this.state.name.toUpperCase()}
          />
        );
      })
    ) : (
      <span>Loading</span>
    );
    console.log(pokemonImageSlider);
    return (
      <div>
        <div
          className="card mr-2 mb-2"
          style={{ width: "210px", display: "inline-block" }}
        >
          {/* <img
            className="card-img-top"
            src={this.state.pokemonImage}
            alt={this.state.name.toUpperCase()}
          /> */}
          <Slider {...sliderSettings}>{pokemonImageSlider}</Slider>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-center">
            <div>
              <h5 className="card-title">{this.state.name.toUpperCase()}</h5>
              <div className="card-text">
                {/* <PokemonStates states={this.state.pokemonStats} /> */}
                {PokemonTypesTags}
              </div>
            </div>
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

export default connect(
  mapStateToProps,
  { likePokemon, unLikePokemon }
)(Pokemon);
