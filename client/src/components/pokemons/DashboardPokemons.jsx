import React, { Component } from "react";
import Pokemon from "./Pokemon";
import Spinner from "../common/Spinner";
import { fetchPokemons } from "../helpers/helper";
import { Card, Select, Pagination } from "antd";
const Option = Select.Option;

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
    this.setState({ loading: true });
    fetchPokemons(0, 0, "type", pokemonTypes => {
      let temp = [];
      pokemonTypes.forEach(type => {
        let elm = (
          <Option key={type} value={type}>
            {type}
          </Option>
        );
        temp.push(elm);
      });
      this.setState({ pokemonTypes: temp });
    });
    let url = new URLSearchParams(this.props.location.search);
    let type = url.get("type");
    if (!type) {
      fetchPokemons(
        this.state.page,
        this.state.pageSize,
        "",
        (pokemonList, totalPokemon) =>
          this.setState({ pokemonList, totalPokemon, loading: false })
      );
    }
    if (type) {
      fetchPokemons(
        this.state.page,
        this.state.pageSize,
        "search",
        pokemonListAll =>
          this.setState({
            pokemonListAll,
            totalPokemon: pokemonListAll.length,
            pokemonList: pokemonListAll.slice(0, this.state.pageSize),
            search: type,
            loading: false
          }),
        "",
        type
      );
    } else {
    }
  }
  componentWillReceiveProps(nextProps) {
    let url = new URLSearchParams(nextProps.location.search);
    let type = url.get("type");
    let reality = false;
    if (typeof type === "string" && this.state.search !== type) {
      reality = true;
    } else {
      reality = false;
    }
    if (reality) {
      this.setState({ loading: true });
      fetchPokemons(
        this.state.page,
        this.state.pageSize,
        "search",
        pokemonListAll =>
          this.setState({
            pokemonListAll,
            totalPokemon: pokemonListAll.length,
            pokemonList: pokemonListAll.slice(0, this.state.pageSize),
            search: type,
            loading: false
          }),
        "",
        type
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  }

  handlePageChange = (pageNumber, pageSize) => {
    this.setState(
      { page: pageNumber, pageSize: pageSize, loading: true },
      () => {
        if (this.state.search) {
          let length = pageNumber * this.state.pageSize;
          let newPokemons = this.state.pokemonListAll.slice(
            length,
            length + 10
          );
          this.setState({ pokemonList: newPokemons, loading: false });
        } else {
          fetchPokemons(
            this.state.page,
            this.state.pageSize,
            this.state.search,
            (pokemonList, totalPokemon) =>
              this.setState({ pokemonList, totalPokemon, loading: false })
          );
        }
      }
    );
  };

  onSelectChange = event => {};

  onSelectTypeChange = value => {
    this.setState({ page: 1, search: value });
    this.props.history.push(`dashboard?type=${value}`);
  };

  onShowSizeChange = (current, pageSize) => {
    this.setState({ pageSize: pageSize, page: 1, loading: true }, () => {
      if (!this.state.search) {
        fetchPokemons(
          this.state.page,
          this.state.pageSize,
          this.state.search,
          (pokemonList, totalPokemon) =>
            this.setState({ pokemonList, totalPokemon, loading: false })
        );
      } else {
        this.handlePageChange(this.state.page);
      }
    });
  };

  render() {
    const PokemonCardList = !this.state.loading ? (
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
        <Select
          showSearch
          style={{ width: "100%" }}
          onChange={this.onSelectTypeChange}
          placeholder="Select a type"
        >
          {this.state.pokemonTypes}
        </Select>
        <Card>{PokemonCardList}</Card>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="mt-4 form-group"
        >
          <Pagination
            showSizeChanger
            onShowSizeChange={this.onShowSizeChange}
            onChange={this.handlePageChange}
            defaultCurrent={1}
            total={this.state.totalPokemon ? this.state.totalPokemon : 50}
          />,
        </div>
      </div>
    );
  }
}

export default DashboardPokemons;
