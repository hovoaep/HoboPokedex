import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import Pokemon from "./Pokemon";
import Spinner from "../common/Spinner";
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
      search: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchPokemons = this.fetchPokemons.bind(this);
  }
  componentWillMount() {
    this.fetchPokemons(this.state.page, this.state.pageSize);
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
    if (this.state.serach) {
      let length = pageNumber * this.state.pageSize;
      let newPokemons = this.state.pokemonListAll.slice(length, length + 10);
      this.setState({ pokemonList: newPokemons });
    } else {
      this.fetchPokemons(pageNumber, this.state.pageSize);
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.fetchPokemons(this.state.page, this.state.pageSize);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="search"
            name="search"
            className="form-control"
            value={this.state.search}
            onChange={this.onChange}
            placeholder="Search by type"
          />
        </form>
        <div className="pokemonList">{PokemonCardList}</div>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="mt-4 form-group"
        >
          <Pagination
            activePage={this.state.page}
            itemsCountPerPage={this.state.pageSize}
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
