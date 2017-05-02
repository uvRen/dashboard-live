import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AppBar, Drawer, List, ListItem } from "material-ui"

import Apps from 'material-ui/svg-icons/navigation/apps';
import Users from 'material-ui/svg-icons/social/people';
import ServersIcon from 'material-ui/svg-icons/hardware/device-hub';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Tests from 'material-ui/svg-icons/action/done-all';
import FreezeMap from 'material-ui/svg-icons/places/ac-unit';
import ErrorMap from 'material-ui/svg-icons/alert/error';
import Bars from 'material-ui/svg-icons/av/equalizer';


export default class TopMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			slideIndex: 0,
		};
	}

	handleToggle = () => this.setState({ open: !this.state.open });

	handleChange = (value) => {
		this.setState({
			slideIndex: value,
		});
	};

	closeDrawer() { this.setState({ open: false }) }

	render() {
		const contentStyle = { transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };

		if (this.state.open) {
			contentStyle.marginLeft = 256;
		}
		return (
			<div>

				<Drawer docked={true} open={this.state.open}>
					<AppBar title="Dev Env" onLeftIconButtonTouchTap={this.handleToggle} />
					<List>
						<ListItem primaryText="Welome" leftIcon={<Dashboard />} containerElement={<Link to="/" />} />
						<ListItem primaryText="Servers" leftIcon={<ServersIcon />} containerElement={<Link to="/servers" />} />
						<ListItem primaryText="EMCA-IDE" leftIcon={<Apps />}
							primaryTogglesNestedList={true}
							initiallyOpen={true}
							nestedItems={[
								<ListItem
									key={0}
									primaryText="Overview"
									leftIcon={<Bars />}
									containerElement={<Link to="/apps/emca-ide" />}
								/>,
								<ListItem
									key={1}
									primaryText="UI Freeze"
									leftIcon={<FreezeMap />}
									containerElement={<Link to="/servers" />}
								/>,
								<ListItem
									key={2}
									primaryText="Errors"
									leftIcon={<ErrorMap />}
									containerElement={<Link to="/servers" />}
								/>,
								<ListItem key={3}
									primaryText="Users"
									leftIcon={<Users />}
									containerElement={<Link to="/users" />}
								/>,
								<ListItem key={4}
									primaryText="Tests"
									leftIcon={<Tests />}
									containerElement={<Link to="/tests" />}
								/>,
							]}> </ListItem>
					</List>
				</Drawer>
				<AppBar title="Dev Env" onLeftIconButtonTouchTap={this.handleToggle} />
			</div>
		);
	}
}
