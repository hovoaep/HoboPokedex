import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import PokemonImageSlider from "../pokemons/PokemonImageSlider";
import { fetchPokemons } from "../helpers/helper";
import Spinner from "../common/Spinner";
import Type from "../pokemons/Type";
import axios from "axios";

class PokemonProfile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      pokemonName: "",
      type: [],
      images: [],
      pokemonChartData: {},
      evolutionChain: [],
      pokemonDescription: "",
      profileInfo: {
        height: "",
        eggGroups: [],
        abilities: [],
        weight: ""
      }
    };
  }
  componentWillMount() {
    fetchPokemons(
      1,
      10,
      "pokemon",
      data => {
        let pokemonInfo = {
          eggGroups: [],
          abilities: []
        };
        let type = [];
        data.types.forEach(item => type.push(item.type.name));
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
        let images = Object.values(data.sprites)
          .filter(item => item !== null)
          .reverse();
        axios.get(data.species.url).then(res => {
          let allText = res.data.flavor_text_entries.filter(
            item => item.language.name === "en"
          );
          let randomTextNumber = Math.floor(Math.random() * allText.length + 1);
          pokemonInfo.description = allText[randomTextNumber].flavor_text;
          res.data.egg_groups.forEach(item =>
            pokemonInfo.eggGroups.push(item.name)
          );
          this.setState({
            pokemonDescription: pokemonInfo.description,
            profileInfo: {
              ...this.state.profileInfo,
              eggGroups: pokemonInfo.eggGroups
            },
            loading: true
          });
        });
        data.abilities.forEach(item =>
          pokemonInfo.abilities.push(item.ability.name)
        );
        this.setState({
          pokemonChartData: temp,
          images: images,
          pokemonName: data.name,
          type,
          profileInfo: {
            ...this.state.profileInfo,
            height: data.height,
            weight: data.weight,
            abilities: pokemonInfo.abilities
          }
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
    const type = this.state.type.map(item => <Type key={item} type={item} />);
    const lists = this.state.profileInfo.abilities.length ? (
      <ul className="list-group text-left">
        <li className="list-group-item">
          <strong>Weight</strong> - {this.state.profileInfo.weight}{" "}
        </li>
        <li className="list-group-item">
          <strong>Height</strong> - {this.state.profileInfo.height}{" "}
        </li>
        <li className="list-group-item">
          <strong>Egg Groups</strong>
          <ul className="list-group">
            {this.state.profileInfo.eggGroups.map(item => (
              <li key={item} className="list-group-item">
                {item}
              </li>
            ))}
          </ul>
        </li>
        <li className="list-group-item">
          <strong>Abilities</strong>
          <ul className="list-group">
            {this.state.profileInfo.abilities.map(item => (
              <li key={item} className="list-group-item">
                {item}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    ) : (
      <span>Loading</span>
    );
    return (
      <div>
        {this.state.loading ? (
          <div>
            <h1>{this.state.pokemonName.toUpperCase()}</h1>
            <div className="row">
              <div className="col-md-3">
                <PokemonImageSlider images={this.state.images} />
                <p>{this.state.pokemonDescription}</p>
                <div className="ant-card-meta-description">{type}</div>
              </div>
              <div className="col-md-9">{elm}</div>
            </div>
            <div className="row ">
              <div className="col-md-12 mt-5">
                <h3>Profile info</h3>
                {lists}
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default PokemonProfile;
