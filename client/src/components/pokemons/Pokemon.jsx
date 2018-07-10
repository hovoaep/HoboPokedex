import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  likePokemon,
  unLikePokemon,
  addComparePokemon,
  deleteComparePokemon
} from "../../actions/userDataActions";
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
    console.log(33333333);
    axios
      .get(this.props.url)
      .then(res => {
        console.log(this.props.profile.userData.likes.includes(res.data.name));
        this.props.profile.userData.likes.includes(res.data.name)
          ? this.setState({ like: true })
          : null;
        this.props.profile.userData.compare.includes(res.data.name)
          ? this.setState({ compare: true })
          : null;
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
      let userData = this.props.profile.userData;
      console.log(userData);
      if (userData.likes.includes(this.state.name)) {
        this.props.unLikePokemon(this.state.name);
        this.setState({ like: false });
      } else {
        console.log(2222);
        this.props.likePokemon(this.state.name);
        this.setState({ like: true });
      }
    } else {
      alert("You need authenticated");
    }
  };

  onCompareClick = () => {
    if (this.props.auth.isAuthenticated) {
      let userData = this.props.profile.userData;
      if (userData.compare.includes(this.state.name)) {
        this.props.deleteComparePokemon(this.state.name);
        this.setState({ compare: false });
      } else {
        this.props.addComparePokemon(this.state.name);
        this.setState({ compare: true });
      }
    } else {
      alert("You need authenticated");
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
