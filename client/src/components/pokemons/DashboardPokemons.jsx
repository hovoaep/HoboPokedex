import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import Pokemon from "./Pokemon";
import Spinner from "../common/Spinner";
import FilterPokemon from "./FilterPokemon";
class DashboardPokemons extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      pokemonList: [],
      pokemonListAll: [],
      totalPokemon: 0,
      pageSize: 10,
      page: 1,
      disablePagination: false,
      search: "",
      pokemonTypes: []
    };
    this.onChange = this.onChange.bind(this);
    this.fetchPokemons = this.fetchPokemons.bind(this);
    this.fetchSelectsValue = this.fetchSelectsValue.bind(this);
  }
  componentWillMount() {
    this.fetchSelectsValue();
    this.fetchPokemons(this.state.page, this.state.pageSize);
  }
  fetchSelectsValue() {
    axios
      .get(`https://pokeapi.co/api/v2/type`)
      .then(res => {
        console.log(res);
        let temp = [];
        res.data.results
          .filter(item => item.name != "unknown")
          .forEach(item => temp.push(item.name));
        this.setState({ pokemonTypes: temp });
      })
      .catch(err => console.log(err));
  }

  fetchPokemons(page, pageSize) {
    this.setState({ pokemonList: [] });
    let api = "https://pokeapi.co/api/v2";
    if (this.state.search) {
      api = `${api}/type/${this.state.search}`;
    } else {
      api = `${api}/pokemon`;
    }
    axios
      .get(`${api}?limit=${pageSize}&offset=${(page - 1) * pageSize}`)
      .then(res => {
        if (this.state.search) {
          let newPokemons = [];
          for (let i = 0; i < res.data.pokemon.length; i++) {
            let temp = {};
            temp.name = res.data.pokemon[i].pokemon.name;
            temp.url = res.data.pokemon[i].pokemon.url;
            newPokemons.push(temp);
          }
          this.setState({
            pokemonListAll: newPokemons,
            totalPokemon: newPokemons.length,
            pokemonList: newPokemons.slice(0, this.state.pageSize)
          });
        } else {
          this.setState({
            pokemonList: res.data.results,
            totalPokemon: res.data.count
          });
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  handlePageChange = pageNumber => {
    this.setState({ page: pageNumber });
    if (this.state.search) {
      let length = pageNumber * this.state.pageSize;
      let newPokemons = this.state.pokemonListAll.slice(length, length + 10);
      this.setState({ pokemonList: newPokemons });
    } else {
      this.fetchPokemons(pageNumber, this.state.pageSize);
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  }

  onSelectChange = event => {
    let newPageSize = Number(event.target.value);
    this.setState({ pageSize: newPageSize }, () => {
      if (!this.state.search) {
        this.fetchPokemons(this.state.page, this.state.pageSize);
      } else {
        this.handlePageChange(this.state.page);
      }
    });
  };

  onSelectTypeChange = evt => {
    this.setState({ page: 1 });
    this.setState({ search: evt.target.value }, () => {
      this.fetchPokemons(this.state.page, this.state.pageSize);
    });
  };

  render() {
    const PokemonCardList = this.state.pokemonList.length ? (
      this.state.pokemonList.map((pokemon, i) => (
        <Pokemon name={pokemon.name} key={pokemon.name} url={pokemon.url} />
      ))
    ) : (
      <div>
        <Spinner />
      </div>
    );

    const pokemonTypes = this.state.pokemonTypes.length ? (
      this.state.pokemonTypes.map(item => (
        <option key={item} val={item}>
          {item}
        </option>
      ))
    ) : (
      <option>Loading...</option>
    );
    return (
      <div>
        <select
          onChange={this.onSelectTypeChange}
          className="form-control mb-2"
          style={{ width: "100%" }}
        >
          {pokemonTypes}
        </select>
        <div className="pokemonList">{PokemonCardList}</div>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="mt-4 form-group"
        >
          <Pagination
            activePage={this.state.page}
            itemsCountPerPage={this.state.pageSize - 1}
            totalItemsCount={this.state.totalPokemon}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
            itemClass={"page-item"}
            linkClass={"page-link"}
          />
          <select
            onChange={this.onSelectChange}
            className="form-control"
            style={{ width: "auto" }}
          >
            <option value="10">10 / PAGE</option>
            <option value="20">20 / PAGE</option>
            <option value="30">30 / PAGE</option>
            <option value="40">40 / PAGE</option>
            <option value="50">50 / PAGE</option>
          </select>
        </div>
      </div>
    );
  }
}

export default DashboardPokemons;
