import React, { Component } from 'react';
import { Tooltip } from 'antd';

class PokemonStats extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="statDiv">
    		<Tooltip placement="top" title='Speed'>
					<div className="statBox">
						<div className="statName">SP</div>
						<div className="statValue">{this.props.stats?this.props.stats[0].base_stat:'--'}</div>
					</div>
				</Tooltip>
				<Tooltip placement="top" title='Special Defense'>
					<div className="statBox">
						<div className="statName">SD</div>
						<div className="statValue">{this.props.stats?this.props.stats[1].base_stat:'--'}</div>
					</div>
				</Tooltip>
				<Tooltip placement="top" title='Special Attack'>
					<div className="statBox">
						<div className="statName">SA</div>
						<div className="statValue">{this.props.stats?this.props.stats[2].base_stat:'--'}</div>
					</div>
				</Tooltip>
				<Tooltip placement="top" title='Defense'>
					<div className="statBox">
						<div className="statName">D</div>
						<div className="statValue">{this.props.stats?this.props.stats[3].base_stat:'--'}</div>
					</div>
				</Tooltip>
				<Tooltip placement="top" title='Attack'>
					<div className="statBox">
						<div className="statName">A</div>
						<div className="statValue">{this.props.stats?this.props.stats[4].base_stat:'--'}</div>
					</div>
				</Tooltip>
				<Tooltip placement="top" title='HP'>
					<div className="statBox">
						<div className="statName">HP</div>
						<div className="statValue">{this.props.stats?this.props.stats[5].base_stat:'--'}</div>
					</div>
				</Tooltip>
			</div>
		)
	}
}

export default PokemonStats;
