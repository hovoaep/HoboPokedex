import axios from "axios";
import { notification } from "antd";

export const fetchPokemons = function(
  page = 0,
  pageSize = 0,
  type = "",
  cb,
  id = "",
  search = ""
) {
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
    .get(`${api}?limit=${pageSize}&offset=${(page - 1) * pageSize}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept"
      }
    })
    .then(res => {
      switch (type) {
        case "search":
          let newPokemons = [];
          for (let i = 0; i < res.data.pokemon.length; i++) {
            let temp = {};
            temp.name = res.data.pokemon[i].pokemon.name;
            temp.url = res.data.pokemon[i].pokemon.url;
            newPokemons.push(temp);
          }
          cb(newPokemons);
          break;
        case "pokemon":
          cb(res.data);
          break;
        case "type":
          let temp = [];
          res.data.results
            .filter(item => item.name.toString() !== "unknown")
            .forEach(item => temp.push(item.name));
          cb(temp);
          break;
        default:
          cb(res.data.results, res.data.count);
          break;
      }
    })
    .catch(err => {
      console.log("err", err);
    });
};

export const getTypeColor = typeName => {
  switch (typeName) {
    case "water":
      return "#67B3EC";
    case "grass":
      return "#7AC657";
    case "electric":
      return "#F8E075";
    case "ground":
      return "#CBAB82";
    case "poison":
      return "#DDB0CB";
    case "bug":
      return "#A8B732";
    case "flying":
      return "#8E8BD1";
    case "fighting":
      return "#BE322E";
    case "fire":
      return "#EE803B";
    case "steel":
      return "#B8B8CF";
    case "rock":
      return "#B79F41";
    case "ghost":
      return "#705A96";
    case "psychic":
      return "#F65B89";
    case "ice":
      return "#9AD8D7";
    case "dragon":
      return "#7043F4";
    case "dark":
      return "#8D8D8D";
    case "fairy":
      return "#FD6AD3";
    default:
      return "#d0cece";
  }
};

export const openNotificationWithIcon = (type, title, text) => {
  notification[type]({
    message: title,
    description: text
  });
};
