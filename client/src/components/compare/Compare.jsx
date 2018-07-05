import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPokemons } from "../helpers/helper";
import { Bar } from "react-chartjs-2";
import randomColor from "randomcolor";
import Spinner from "../common/Spinner";

import { addComparePokemon } from "../../actions/authActions";
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
    this.props.auth.user.compare.forEach(item => this.fetchPokemonStates(item));
    console.log(this.state);
  }
  fetchPokemonStates = pokemon => {
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
    const api = "https://pokeapi.co/api/v2/pokemon";
    const pokemonsNames = this.props.auth.user.compare;
    console.log(pokemonsNames);
    const PokemonCardList =
      this.props.auth.user.compare.length ===
      this.state.pokemonChartData.length ? (
        pokemonsNames.map((pokemon, i) => (
          <div>
            <div className="row">
              <div className="col-4">
                <Pokemon
                  name={pokemon}
                  key={pokemon}
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

    const obj = {
      datasets: this.state.pokemonChartData,
      labels: this.state.pokemonChartLabel
    };
    console.log(obj);
    console.log(
      this.props.auth.user.compare.length,
      this.state.pokemonChartData.length
    );
    const BarChar =
      this.props.auth.user.compare.length ===
      this.state.pokemonChartData.length ? (
        <Bar data={obj} width={100} height={50} />
      ) : (
        <div>
          <Spinner />
        </div>
      );
    const options = {
      // maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            stacked: true
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      }
    };

    return (
      <div>
        {BarChar}
        <div className="container mt-5">{PokemonCardList}</div>
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
