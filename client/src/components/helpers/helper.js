import axios from "axios";

export const fetchPokemons = function(
  page = 0,
  pageSize = 0,
  type = "",
  cb,
  id = "",
  search = ""
) {
  // this.setState({ pokemonList: [] });
  let api = "https://pokeapi.co/api/v2";
  switch (type) {
    case "search":
      api = `${api}/type/${search}`;
      break;
    case "pokemon":
      api = `${api}/pokemon/${id}`;
      break;
    case "type":
      api = `${api}/type`;
      break;
    default:
      api = `${api}/pokemon`;
  }
  axios
    .get(`${api}?limit=${pageSize}&offset=${(page - 1) * pageSize}`)
    .then(res => {
      switch (type) {
        case "search":
          api = `${api}/type/${search}`;
          break;
        case "pokemon":
          api = `${api}/pokemon/${id}`;
          break;
        case "type":
          api = `${api}/type`;
          break;
        default:
          api = `${api}/pokemon`;
      }
      if (type === "search") {
        let newPokemons = [];
        for (let i = 0; i < res.data.pokemon.length; i++) {
          let temp = {};
          temp.name = res.data.pokemon[i].pokemon.name;
          temp.url = res.data.pokemon[i].pokemon.url;
          newPokemons.push(temp);
        }
        cb(newPokemons);
      } else if (type === "type") {
        let temp = [];
        res.data.results
          .filter(item => item.name != "unknown")
          .forEach(item => temp.push(item.name));
        cb(temp);
      } else if (type === "pokemon") {
        cb(res.data.results);
      } else {
        cb(res.data.results, res.data.count);
      }
    })
    .catch(err => {
      console.log("err", err);
    });
};
