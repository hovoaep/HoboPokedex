import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPokemons } from "../helpers/helper";
import { Bar } from "react-chartjs-2";
import randomColor from "randomcolor";
import Spinner from "../common/Spinner";

import { addComparePokemon } from "../../actions/userDataActions";
import Pokemon from "../pokemons/Pokemon";
import PokemonChartHorzinal from "../pokemons/PokemonChartHorzinal";
class Compare extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      pokemonName: "",
      type: [],
      images: [],
      pokemonChartData: [],
      pokemonChartLabel: [],
      evolutionChain: []
    };
  }

  componentWillMount() {
    console.log(this.props.profile);
    this.props.profile.userData
      ? this.props.profile.userData.compare.forEach(item =>
          this.fetchPokemonStates(item)
        )
      : null;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.profile.loading) {
      console.log(this.props.profile.userData);
    }
    if (
      nextProps.profile.userData.compare.length !==
      this.state.pokemonChartData.length
    ) {
      console.log(22222);
      nextProps.profile.userData.compare.forEach(item =>
        this.fetchPokemonStates(item)
      );
    }
  }
  fetchPokemonStates = pokemon => {
    console.log(pokemon);
    fetchPokemons(
      0,
      0,
      "pokemon",
      data => {
        let element = {
          data: [],
          label: `${data.name.toUpperCase()} statics`,
          backgroundColor: randomColor({
            luminosity: "bright",
            format: "rgba",
            alpha: 0.2
          }),
          borderColor: randomColor({
            luminosity: "bright",
            format: "rgba",
            alpha: 1
          }),
          borderWidth: 1,
          hoverBackgroundColor: randomColor({
            luminosity: "bright",
            format: "rgba",
            alpha: 0.4
          }),
          hoverBorderColor: randomColor({
            luminosity: "bright",
            format: "rgba",
            alpha: 1
          })
        };
        let label = [];
        data.stats.forEach(item => {
          element.data.push(item.base_stat);
          label.push(item.stat.name);
        });
        let newObj = this.state.pokemonChartData;
        newObj.push(element);
        this.setState({
          pokemonChartData: newObj,
          pokemonChartLabel: label
        });
      },
      pokemon
    );
  };
  render() {
    var PokemonCardList = null;
    var BarChar = null;
    if (
      !this.props.profile.loading &&
      this.state.pokemonChartData.length ===
        this.props.profile.userData.compare.length
    ) {
      const obj = {
        datasets: this.state.pokemonChartData,
        labels: this.state.pokemonChartLabel
      };
      BarChar =
        this.props.profile.userData.compare.length ===
        this.state.pokemonChartData.length ? (
          <Bar data={obj} width={100} height={50} />
        ) : (
          <div>
            <Spinner />
          </div>
        );
      const api = "https://pokeapi.co/api/v2/pokemon";
      PokemonCardList =
        this.props.profile.userData.compare.length ===
        this.state.pokemonChartData.length ? (
          this.props.profile.userData.compare.map((pokemon, i) => (
            <div key={`${pokemon}${i}`} className="mb-3">
              <div className="row">
                <div className="col-4">
                  <Pokemon
                    name={pokemon}
                    key={pokemon}
                    width="100%"
                    url={`${api}/${pokemon}`}
                  />
                </div>
                <div className="col-8">
                  <PokemonChartHorzinal
                    data={{
                      datasets: [this.state.pokemonChartData[i]],
                      labels: this.state.pokemonChartLabel
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <Spinner />
          </div>
        );
    }

    return (
      <div>
        {BarChar !== null ? BarChar : <Spinner />}
        <div className="container mt-5">
          {!this.props.profile.loading && PokemonCardList}
        </div>
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
