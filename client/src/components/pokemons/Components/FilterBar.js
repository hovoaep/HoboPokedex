import React, { Component } from 'react';
import { Input, Select } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
import axios from 'axios';

class FilterBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			pokemonTypes: []
		}
	}

	componentDidMount() {
		axios.get('https://pokeapi.co/api/v2/type/')
		.then(res => {
			console.log('res', res);
			this.setState({
				pokemonTypes: res.data.results
			});
		})
		.catch(err => {
			console.log('err', err);
		})
	}

	render() {
		const children = this.state.pokemonTypes.map((pokemonType, i) =>
			<Option value={pokemonType.name} key={i}>{pokemonType.name}</Option>
		);

		return (
    		<div>
    			{/*<Search
			      placeholder="Search for Pokemon"
			      onSearch={value => console.log(value)}
			      style={{ width: '48%' }}
			    />*/}
				  <Select defaultValue="none" style={{ width: '20%', float: 'right' }} onChange={e => this.props.updateFilter(e)}>
			      <Option value="none">Filter By Pokemon Type</Option>
			      {children}
			    </Select>
    		</div>
		)
	}
}

export default FilterBar;
