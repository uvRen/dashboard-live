import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import AppsEmcaIdeApp from "./../emcaIde/AppsEmcaIdeApp";

function mapStoreToProps(store) {
    return {
        dashboard: store.dashboard
    };
}

class AppsApp extends Component {
    render() {
        return (
			<div>
				<Route path="/apps/emca-ide" component={AppsEmcaIdeApp} />
			</div>
        );
    }
}

export default connect(mapStoreToProps)(AppsApp);
