import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDom from "react-dom";
import echarts from "echarts";
import _ from "lodash"

import TopErrorData from "./TopErrorData";
import DefaultData from "./DefaultData";

class InvertedBarChart extends Component {

	componentDidMount() {
        this.chartInstance = echarts.init(this.chartContainer);
    }

	componentWillUnmount() {
        if (this.chartInstance) {
            this.chartInstance.dispose();
        }
    }

	componentDidUpdate(prevProps) {
		const options = this.state,
            { settings, aggregationResult, bounds, sentSignal } = this.props;

        if(bounds !== prevProps.bounds)
            this.chartInstance.resize();

		var chartData = [];
		if(this.props.options.type == "error")
			var chartData = new TopErrorData(aggregationResult.values);
		else
			var chartData = new DefaultData(aggregationResult.values);

		var dataStyle = { 
			normal: {
				label : {
					show: true,
					position: 'insideLeft',
					color: 'rgba(0,0,0,255)', // TODO: Want black font, but don't seem to work :( 
					formatter: function(params) {
						return chartData.errors[params.dataIndex];
					}
				}
			}
		};
		var option = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			xAxis : [
				{
				    type : 'value',
				    boundaryGap : [0, 0.5]
				}
			],
			tooltip: {
				position: 'top',
				formatter: function(params) {
					if(chartData instanceof TopErrorData) {
						var cause = chartData.cause[params.dataIndex];
						return "Error: " + chartData.errors[params.dataIndex] + "<br>"
								+ "Message: " + cause + "<br>"
								+ "Amount: " + chartData.number[params.dataIndex];
					} else if(chartData instanceof DefaultData) {
						return "User: " + chartData.errors[params.dataIndex] + "<br>"
								+ "Errors: " + chartData.number[params.dataIndex];
					}

				}
			},
			yAxis : [
				{	
					/* Show data inside the bar instead
					z: 1,
					zlevel: 1,
					position: 'right',
					*/
				    type : 'category',
				    data : chartData.errors,
					axisLabel: {
						show: false
					}
				}
			],
			series : [
				{
					name: settings.queries[0].name,
				    type:'bar',
					itemStyle: dataStyle,
				    data:chartData.number
				}
			]
		};
		
		if (prevProps.settings !== settings || prevProps.aggregationResult !== aggregationResult || sentSignal !== prevProps.sentSignal) {
            if (option) {
                this.chartInstance.setOption(option);
            }
        }
	}

	render() {
        return <div style={{ height: "100%" }} className="widget-stretch-height" ref={instance => this.chartContainer = ReactDom.findDOMNode(instance)} />;
    }
}


function mapStoreToProps(store) {
    return {
        aggregationResult: store.aggregationResult,
        bounds: store.bounds
    };
}

export default connect(mapStoreToProps)(InvertedBarChart);
