import React, { Component } from "react";
import axios from "axios";
import { Card, Icon } from "antd";
import { connect } from "react-redux";
import {
  likePokemon,
  unLikePokemon,
  addComparePokemon,
  deleteComparePokemon
} from "../../actions/userDataActions";
import Slider from "react-slick";
import Type from "./Type";
import { openNotificationWithIcon } from "../helpers/helper";
const { Meta } = Card;

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
      if (userData.likes.includes(this.state.name)) {
        this.props.unLikePokemon(this.state.name);
        this.setState({ like: false });
        openNotificationWithIcon(
          "info",
          "You dislike this pokeomn",
          "For seen your pokemon go to profile page"
        );
      } else {
        openNotificationWithIcon(
          "success",
          "Congratulations you like this pokemon",
          "For seen your pokemon go to profile page"
        );
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
        openNotificationWithIcon(
          "info",
          "You uncompare this pokeomn",
          "For seen your pokemon go to compare page"
        );
      } else {
        this.props.addComparePokemon(this.state.name);
        this.setState({ compare: true });
        openNotificationWithIcon(
          "success",
          "Congratulations you add compare this pokemon",
          "For seen all your pokemon go to compare page"
        );
      }
    } else {
      alert("You need authenticated");
    }
  };

  render() {
    const PokemonTypesTags = this.state.pokemonTypes.map((pokemonType, i) => (
      <Type type={pokemonType.type.name} key={i} />
    ));

    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000
    };
    const pokemonImageSlider = this.state.pokemonImage.map((item, key) => {
      return (
        <img
          key={key}
          className="card-img-top"
          data-test={item}
          src={item}
          alt={this.state.name.toUpperCase()}
        />
      );
    });
    const gridStyle = {
      width: "25%",
      textAlign: "center"
    };
    return (
      <div>
        <Card
          style={gridStyle}
          className="ant-card-grid"
          cover={<Slider {...sliderSettings}>{pokemonImageSlider}</Slider>}
          actions={[
            <Icon
              type={this.state.like ? "heart" : "heart-o"}
              onClick={this.onHeartClick}
              style={{ fontSize: "25px" }}
            />,
            <Icon
              type={this.state.compare ? "area-chart" : "line-chart"}
              onClick={this.onCompareClick}
              style={{ fontSize: "25px" }}
            />
          ]}
        >
          <Meta
            title={
              <a href={`/pokemon/${this.state.name}`}> {this.state.name} </a>
            }
            description={PokemonTypesTags}
          />
        </Card>
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
