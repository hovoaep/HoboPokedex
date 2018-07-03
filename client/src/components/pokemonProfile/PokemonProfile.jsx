import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import PokemonImageSlider from "../pokemons/PokemonImageSlider";
import { fetchPokemons } from "../helpers/helper";
import Spinner from "../common/Spinner";

class PokemonProfile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      pokemonName: "",
      images: [],
      pokemonChartData: {}
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
          pokemonName: data.name
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
    return (
      <div>
        {this.state.loading ? (
          <div>
            <h1>{this.state.pokemonName.toUpperCase()}</h1>
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
