import React, { Component } from "react";
// import Pagination from "react-js-pagination";
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
    fetchPokemons(
      this.state.page,
      this.state.pageSize,
      "",
      (pokemonList, totalPokemon) =>
        this.setState({ pokemonList, totalPokemon })
    );
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
    }
    return true;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  }

  handlePageChange = (pageNumber, pageSize) => {
    this.setState({ page: pageNumber, pageSize: pageSize }, () => {
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

  onSelectChange = event => {};

  onSelectTypeChange = value => {
    console.log(value);
    this.setState({ page: 1, search: value });
    this.props.history.push(`dashboard?type=${value}`);
  };

  onShowSizeChange = (current, pageSize) => {
    this.setState({ pageSize: pageSize, page: 1 }, () => {
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

  onPageChange = (page, pageSize) => {
    console.log(11);
    console.log(page, pageSize);
  };
  render() {
    console.log(this.state.pokemonList);
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
