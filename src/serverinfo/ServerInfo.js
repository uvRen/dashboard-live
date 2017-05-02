import React, { Component } from 'react';

import { view as Dashboard } from "inovia-dashboard";
import { connect } from "react-redux";
import ServersOverview from "./../components";
import InvertedBarChart from "./../components/InvertedBarChart";
import TimeLine from "./../components/TimeLine";
import { buildFilterSignal } from "insight-widget-api";
import { actions } from "inovia-dashboard";
import moment from "moment";
import EchartsWidget from "insight-widgets-echarts";

import { view as ServersView } from "./ServerInfoView";
import { getView } from "./ServerInfoView";

function mapStoreToProps(store) {
    return {
        dashboard: store.dashboard
    };
}

const widgetMappings = {
	"ServersOverview": ServersOverview(),
	"InvertedBarChartError": InvertedBarChart({ type: "error"}),
	"InvertedBarChart": InvertedBarChart(),
	"LineChart": EchartsWidget({ type: "line"}),
	"TimeLine": TimeLine()
};

class ServerInfo extends Component {
	constructor(props) {
        super(props);
		
		this.props.dispatch(actions.replace(getView(this.props.match.params.serverName)));

        this._onUpdateSetting = this._onUpdateSetting.bind(this);
        this._sendGlobalFilter = this._sendGlobalFilter.bind(this);
        this._toggleTimeSelect = this._toggleTimeSelect.bind(this);
        this._handleFromDateChange = this._handleFromDateChange.bind(this);
        this._handleToDateChange = this._handleToDateChange.bind(this);
        this._confirmTimeSelection = this._confirmTimeSelection.bind(this);

        this.state = {
            showTimeSelect: false,
            showTimeRangeDialog: false
        };
    }

    _sendGlobalFilter(_, value) {
        const { dispatch } = this.props;

        if(value !== "custom")
            dispatch(actions.sendSignalExternal("ALL", buildFilterSignal({ field: "_time", value, operator: "GT" })));
        else
            this.setState({ showTimeRangeDialog: true });
        this.setState({ showTimeSelect: false });
    }

    _handleFromDateChange(_, date) {
        this.setState({ fromDate: date });
    }

    _handleToDateChange(_, date) {
        this.setState({ toDate: date });
    }

    _toggleTimeSelect() {
        this.setState({ showTimeSelect: !this.state.showTimeSelect });
    }

    _confirmTimeSelection() {
        const { dispatch } = this.props,
            { fromDate, toDate } = this.state,
            fromDateFormatted = moment(fromDate).startOf("day").format(),
            toDateFormatted = moment(toDate).endOf("day").format();

        dispatch(
            actions.sendSignalExternal("ALL",
                buildFilterSignal({
                    logic: "AND",
                    filters: [
                        {
                            field: "_time",
                            value: fromDateFormatted,
                            operator: "GTE"
                        },
                        {
                            field: "_time",
                            value: toDateFormatted,
                            operator: "LTE"
                        }
                    ]}
                )
            )
        );
        this.setState({ showTimeRangeDialog: false });
    }

    _onUpdateSetting(setting) {
        const { dispatch, dashboard } = this.props,
            { settings, id } = dashboard.widgets.get(0);

        dispatch(actions.updateWidgetSetting(id, Object.assign({}, settings, setting)));
    }
	
	render() {
        const { dashboard } = this.props,
            { showTimeSelect, showTimeRangeDialog } = this.state;

        return (
			<div style={{height: "100%"}}>
		        <Dashboard showControls={false} dashboard={dashboard} widgetMappings={widgetMappings} breakPoints={{
					lg:
						1200,
					md:
						996,
					sm:
						768
					}} 
				/>
    		</div>
        );
    }
}
export default connect(mapStoreToProps)(ServerInfo);
