import React from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";
import { BrowserRouter as Router, Route} from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import axios from "axios";
import echarts from "echarts";
import { discover } from "inovia-api-client";
import injectTapEventPlugin from "react-tap-event-plugin";
import { compose, createStore } from "redux";
import { combineReducers } from "redux";
import { reducer, actions } from "inovia-dashboard";

import TopMenu from "./Header";
import UsersApp from "./users/UsersApp";
import TestsApp from "./tests/TestsApp";
import ServersApp from "./servers/ServersApp";
import AppsApp from "./apps/AppsApp";
import ErrorsApp from "./ErrorsApp";
import Home from "./home/Home";
import ServerInfo from "./serverinfo/ServerInfo";

import { view as DefaultView } from "./servers/ServersView";

import "../node_modules/inovia-dashboard/dist/styles.css";
import "../node_modules/inovia-widget-api/dist/styles.css";
import "../node_modules/insight-widget-api/dist/styles.css";
import "../node_modules/insight-shared-components/dist/styles.css";
import "./index.css"

injectTapEventPlugin();

const store = compose(createStore)(combineReducers({ dashboard: reducer }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.dispatch(
    actions.replace(DefaultView))

const root = document.getElementById('root');
axios.get("/world.json")
    .then(response => response.data)
    .then(map => echarts.registerMap("world", map))
    .then(() => discover("/env.json"))
    .then(() => ReactDOM.render(( 
		<Provider store={store}>
			<MuiThemeProvider>
				<IntlProvider locale="en">
					<Router>
						<div>
							<TopMenu />
							<Route exact path="/" component={Home} />
							<Route exact path="/servers" component={ServersApp} />
							<Route path="/servers/:serverName" component={ServerInfo} />
							<Route path="/users" component={UsersApp} />
							<Route path="/apps" component={AppsApp} />
							<Route path="/tests" component={TestsApp} />
						</div>
	  				</Router> 
				</IntlProvider>
		  	</MuiThemeProvider>
	 	</Provider>), 
root));

