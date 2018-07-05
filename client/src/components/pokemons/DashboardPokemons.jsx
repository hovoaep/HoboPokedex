import React, { Component } from "react";
import Pagination from "react-js-pagination";
import Pokemon from "./Pokemon";
import Spinner from "../common/Spinner";
import { fetchPokemons } from "../helpers/helper";
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
  }
  componentWillMount() {
    fetchPokemons(0, 0, "type", pokemonTypes =>
      this.setState({ pokemonTypes })
    );
    // if (type) {
    //   fetchPokemons(
    //     this.state.page,
    //     this.state.pageSize,
    //     "search",
    //     pokemonListAll =>
    //       this.setState({
    //         pokemonListAll,
    //         totalPokemon: pokemonListAll.length,
    //         pokemonList: pokemonListAll.slice(0, this.state.pageSize),
    //         search: type
    //       }),
    //     "",
    //     type
    //   );
    // } else {
    // if (!type) {

    // }
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let url = new URLSearchParams(nextProps.location.search);
    let type = url.get("type");
    let reality = false;
    if (typeof type === "string" && this.state.search !== type) {
      reality = true;
    } else {
      reality = false;
    }
    if (reality) {
      fetchPokemons(
        this.state.page,
        this.state.pageSize,
        "search",
        pokemonListAll =>
          this.setState({
            pokemonListAll,
            totalPokemon: pokemonListAll.length,
            pokemonList: pokemonListAll.slice(0, this.state.pageSize),
            search: type
          }),
        "",
        type
      );
    } else {
      fetchPokemons(
        this.state.page,
        this.state.pageSize,
        "",
        (pokemonList, totalPokemon) =>
          this.setState({ pokemonList, totalPokemon })
      );
    }
    return true;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  }

  handlePageChange = pageNumber => {
    this.setState({ page: pageNumber }, () => {
      if (this.state.search) {
        let length = pageNumber * this.state.pageSize;
        let newPokemons = this.state.pokemonListAll.slice(length, length + 10);
        this.setState({ pokemonList: newPokemons });
      } else {
        fetchPokemons(
          this.state.page,
          this.state.pageSize,
          this.state.search,
          (pokemonList, totalPokemon) =>
            this.setState({ pokemonList, totalPokemon })
        );
      }
    });
  };

  onSelectChange = event => {
    let newPageSize = Number(event.target.value);
    this.setState({ pageSize: newPageSize, page: 1 }, () => {
      if (!this.state.search) {
        fetchPokemons(
          this.state.page,
          this.state.pageSize,
          this.state.search,
          (pokemonList, totalPokemon) =>
            this.setState({ pokemonList, totalPokemon })
        );
      } else {
        this.handlePageChange(this.state.page);
      }
    });
  };

  onSelectTypeChange = evt => {
    this.setState({ page: 1, search: evt.target.value });
    this.props.history.push(`dashboard?type=${evt.target.value}`);
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
