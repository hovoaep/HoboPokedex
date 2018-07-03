import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import PokemonImageSlider from "../pokemons/PokemonImageSlider";
import { fetchPokemons } from "../helpers/helper";
import Spinner from "../common/Spinner";
import Type from "../pokemons/Type";

class PokemonProfile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      pokemonName: "",
      type: [],
      images: [],
      pokemonChartData: {},
      evolutionChain: []
    };
  }
  componentWillMount() {
    console.log("Mountes");
    fetchPokemons(
      1,
      10,
      "pokemon",
      data => {
        console.log(data);
        let type = [];
        data.types.forEach(item => type.push(item.type.name));
        console.log(type, "type");
        let temp = {
          datasets: [
            {
              data: [],
              label: `${data.name.toUpperCase()} statics`,
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)"
            }
          ],
          labels: []
        };
        data.stats.forEach(item => {
          temp.datasets[0].data.push(item.base_stat);
          temp.labels.push(item.stat.name);
        });
        console.log(data.stats);
        console.log(temp);
        let images = Object.values(data.sprites)
          .filter(item => item !== null)
          .reverse();
        this.setState({
          pokemonChartData: temp,
          loading: true,
          images: images,
          pokemonName: data.name,
          type
        });
        return;
      },
      this.props.match.params.id
    );
  }
  render() {
    const elm = this.state.loading ? (
      <Bar
        data={this.state.pokemonChartData}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false
        }}
      />
    ) : (
      <span>Nothing</span>
    );
    const type = this.state.type.map(item => <Type type={item} />);

    return (
      <div>
        {this.state.loading ? (
          <div>
            <h1>{this.state.pokemonName.toUpperCase()}</h1>
            {type}
            <div className="col-md-4">
              {this.state.loading && (
                <PokemonImageSlider images={this.state.images} />
              )}
            </div>
            {elm}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default PokemonProfile;
