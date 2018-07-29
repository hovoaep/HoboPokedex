import React, { Component } from "react";
import axios from "axios";
import { Card, Icon, Popover } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
      loading: true,
      sliderAutoplay: false,
      pokemonImage: [],
      pokemonStats: [],
      pokemonTypes: [],
      name: ""
    };
  }
  componentWillMount() {
    axios
      .get(this.props.url)
      .then(res => {
        if (this.props.profile.userData.likes) {
          this.props.profile.userData.likes.includes(res.data.name)
            ? this.setState({ like: true })
            : null;
        }
        if (this.props.profile.userData.compare) {
          this.props.profile.userData.compare.includes(res.data.name)
            ? this.setState({ compare: true })
            : null;
        }

        this.setState({
          pokemonImage: Object.values(res.data.sprites)
            .filter(item => item !== null)
            .reverse(),
          pokemonStats: res.data.stats,
          pokemonTypes: res.data.types,
          name: res.data.name,
          loading: false
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
      openNotificationWithIcon(
        "error",
        "Sorry, you need authorize",
        "For authorize go to login page"
      );
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
      openNotificationWithIcon(
        "error",
        "Sorry, you need authorize",
        "For authorize go to login page"
      );
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
      autoplay: this.state.sliderAutoplay,
      autoplaySpeed: 1000
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
      width: this.props.width ? this.props.width : "25%",
      textAlign: "center"
    };
    const content = (
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    );
    var likeIconType = "";
    var compareIconType = "";
    var likeIconColor = "";
    var compareIconColor = "";
    if (this.state.like) {
      likeIconType = "heart";
      likeIconColor = "#08c";
    } else {
      likeIconType = "heart-o";
      likeIconColor = "#333";
    }
    if (this.state.compare) {
      compareIconType = "area-chart";
      compareIconColor = "#08c";
    } else {
      compareIconType = "line-chart";
      compareIconColor = "#333";
    }
    return (
      <div>
        <Card
          style={gridStyle}
          className="ant-card-grid"
          cover={<Slider {...sliderSettings}>{pokemonImageSlider}</Slider>}
          loading={this.state.loading}
          onMouseEnter={() => this.setState({ sliderAutoplay: true })}
          onMouseLeave={() => this.setState({ sliderAutoplay: false })}
          actions={[
            <Popover
              content={this.state.like ? "Remove from likes" : "Add to like"}
            >
              <Icon
                type={likeIconType}
                onClick={this.onHeartClick}
                style={{ fontSize: "25px", color: likeIconColor }}
              />
            </Popover>,
            <Popover
              content={
                this.state.compare ? "Remove from compare" : "Add to compare"
              }
            >
              <Icon
                type={compareIconType}
                onClick={this.onCompareClick}
                style={{ fontSize: "25px", color: compareIconColor }}
              />
            </Popover>
          ]}
        >
          <Meta
            title={
              <Link to={`/pokemon/${this.state.name}`}>{this.state.name}</Link>
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
