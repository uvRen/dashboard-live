import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDom from "react-dom";
import echarts from "echarts";
import _ from "lodash"

import TimeLineData from "./TimeLineData";

class TimeLine extends Component {

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
		chartData = new TimeLineData(aggregationResult.values);
		
		var placeHoledStyle = {
			normal:{
				barBorderColor:'rgba(0,0,0,0)',
				color:'rgba(0,0,0,0)'
			},
			emphasis:{
				barBorderColor:'rgba(0,0,0,0)',
				color:'rgba(0,0,0,0)'
			}
		};
		var dataStyle = { 
			normal: {
				label : {
				    show: true,
				    position: 'insideLeft',
				    formatter: '{c}ms',

					color: 'rgba(0,0,0,255)'
				}
			}
		};

		var option = {
			tooltip : {
				trigger: 'axis',
				axisPointer : {           
				    type : 'shadow'        
				},
				formatter : '{b}<br/>{a0}:{c0}%<br/>{a2}:{c2}%<br/>{a4}:{c4}%<br/>{a6}:{c6}%'
			},

			xAxis : [
				{
				    type : 'value',
				    position: 'bottom',
				    splitLine: {show: false},
				    axisLabel: {show: true},
					formatter: '{a}'
				}
			],
			yAxis : [
				{
				    type : 'category',
				    splitLine: {show: false},
				    data : ['esibern', 'etoblek', 'epethja', 'ejesson']
				}
			],
			series : [
				{
				    type:'bar',
				    stack: 'A',
				    itemStyle : dataStyle,
				    data:[38, 50, 33, 72]
				},
				{
				    type:'bar',
				    stack: 'A',
				    itemStyle: placeHoledStyle,
				    data:[62, 50, 67, 28]
				},
				{
				    type:'bar',
				    stack: 'A',
				    itemStyle : dataStyle,
				    data:[61, 41, 42, 30]
				},
				{
				    type:'bar',
				    stack: 'A',
				    itemStyle: placeHoledStyle,
				    data:[39, 59, 58, 70]
				},
				{
				    type:'bar',
				    stack: 'A',
				    itemStyle : dataStyle,
				    data:[37, 35, 44, 60]
				},
				{
				    type:'bar',
				    stack: 'A',
				    itemStyle: placeHoledStyle,
				    data:[63, 65, 56, 40]
				},
				{
				    name:'ZTW',
				    type:'bar',
				    stack: 'A',
				    itemStyle : dataStyle,
				    data:[71, 50, 31, 39]
				},
				{
				    type:'bar',
				    stack: 'A',
				    itemStyle: placeHoledStyle,
				    data:[29, 50, 69, 61]
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

export default connect(mapStoreToProps)(TimeLine);
