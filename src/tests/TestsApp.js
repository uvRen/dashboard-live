import React, { Component } from 'react';

import { view as Dashboard } from "inovia-dashboard";
import { connect } from "react-redux";
import EchartsWidget, { PieChartWidget, ScatterChartWidget } from "insight-widgets-echarts";
import { buildFilterSignal } from "insight-widget-api";
import { actions } from "inovia-dashboard";
import moment from "moment";


import { view as UsersView } from "./TestsView";

function mapStoreToProps(store) {
    return {
        dashboard: store.dashboard
    };
}

const widgetMappings = {
    "BarChartWidget": EchartsWidget({ type: "bar", yAxis: { type: "log" } }),
    "LineChartWidgetLog": EchartsWidget({ type: "line", yAxis: { type: "log" } }),
    "LineChartWidget": EchartsWidget({ type: "line"}),
    "PieChartWidget": PieChartWidget,
    "ScatterChartWidget": ScatterChartWidget,
    "BubbelChart": EchartsWidget({ type: "scatter" })
};

class TestsApp extends Component {
    constructor(props) {
        super(props);

		this.props.dispatch(actions.replace(UsersView));

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

export default connect(mapStoreToProps)(TestsApp);
