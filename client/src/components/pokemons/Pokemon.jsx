import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  likePokemon,
  unLikePokemon,
  addComparePokemon,
  deleteComparePokemon
} from "../../actions/authActions";
import Slider from "react-slick";
import Type from "./Type";
import { Link } from "react-router-dom";

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      compare: false,
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
        let user = this.props.auth.user;
        let id = res.data.id.toString();

        let likes = user.likes;
        let compare = user.compare;
        if (this.props.auth.isAuthenticated) {
          if (likes.includes(id)) {
            this.setState({ like: true });
          }
          if (compare.includes(this.props.name)) {
            this.setState({ compare: true });
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
      let pokemonData = {};
      let pokemonId = this.props.url.substring(34, this.props.url.length - 1);
      let id = this.props.auth.user.id;
      pokemonData.id = id;
      pokemonData.pokemonId = pokemonId;
      let likes = this.props.auth.user.likes;
      if (likes.includes(pokemonId)) {
        this.props.unLikePokemon(pokemonData);
        this.setState({ like: false });
      } else {
        this.props.likePokemon(pokemonData);
        this.setState({ like: true });
      }
    } else {
      alert("You need authenticated");
    }
  };

  onCompareClick = () => {
    let user = this.props.auth.user;
    let pokemonName = this.props.name;
    if (user.compare.includes(pokemonName)) {
      this.props.deleteComparePokemon(user.id, pokemonName);
      this.setState({ compare: false });
    } else {
      this.props.addComparePokemon(user.id, pokemonName);
      this.setState({ compare: true });
    }
  };

  render() {
    const PokemonTypesTags = this.state.pokemonTypes.length ? (
      this.state.pokemonTypes.map((pokemonType, i) => (
        <Type type={pokemonType.type.name} key={i} />
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
    return (
      <div>
        <Link to={`/pokemon/${this.state.name}`} className="underline">
          <div
            className="card mr-2 mb-2"
            style={{ width: "210px", display: "inline-block" }}
          >
            <Slider {...sliderSettings}>{pokemonImageSlider}</Slider>
          </div>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-center">
              <div>
                <h5 className="card-title">{this.state.name.toUpperCase()}</h5>
              </div>
            </div>
          </div>
        </Link>
        <div className="card-text">
          <ul>
            {/* <PokemonStates states={this.state.pokemonStats} /> */}
            {PokemonTypesTags}
          </ul>
        </div>
        <button onClick={this.onHeartClick}>
          <span />
          {this.state.like ? "unLike" : "like"}
        </button>

        <span onClick={this.onCompareClick}>
          {this.state.compare ? "unCompare" : "Compare"}{" "}
        </span>
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
  { likePokemon, unLikePokemon, addComparePokemon, deleteComparePokemon }
)(Pokemon);
