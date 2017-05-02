import React from "react";
import { connect } from "react-redux";
import ReactDom from "react-dom";
import echarts from "echarts";
import _ from "lodash"
import TimeUtil from "./../utils/TimeUtil"
import FreezeData from "./FreezeData"




class ServersOverview extends React.Component {


    componentDidMount() {
        var self = this;
        this.chartInstance = echarts.init(this.chartContainer);
        if(this.chartInstance){
            this.chartInstance.on('click', function (params) {
                if(params.componentType === "series") {
                    var option = self.chartInstance.getOption();
                    var yAxis = option.yAxis;
                    var data = yAxis[0].data;
 
                    self.props.history.push(encodeURI('/servers/' + data[params.data[1]]));
                }

            });
        }
    }

    componentWillUnmount() {
        if (this.chartInstance) {
            this.chartInstance.dispose();
        }
    }
    componentDidUpdate(prevProps) {
        const options = this.state,
            { settings, aggregationResult, bounds, sentSignal } = this.props;

        if (bounds !== prevProps.bounds)
            this.chartInstance.resize();

        var chartData = new FreezeData(aggregationResult.values)
        

        var option = {
            title: {
                text: 'EMCA-IDE Server usage',
            },
            legend: {
                data: ['Usage'],
                left: 'right'
            },

            tooltip: {
                position: 'top',
                formatter: function (params) {
                    var servers = _.uniq(chartData.serverData);
                    return servers[params.value[1]] + 
                        '<br/>' + params.value[2] + ' users' + 
                        '<br/>Total UI Freeze: ' + TimeUtil.toMinutesAndSeconds(params.value[3] / 1000) + 
                        '<br/>Per user UI Freeze: '+ TimeUtil.toMinutesAndSeconds(params.value[3] / 1000 / params.value[2]) +
                        '<br/>' + TimeUtil.toLocaleDateString(params.value[0]);
                }
            },
            grid: {
                left: 2,
                bottom: 50,
                right: 10,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: chartData.uniqueDate(),
                boundaryGap: true,

                axisLine: {
                    show: false
                },
                axisLabel: {
                    formatter: function (params) {
                        if(new Date(params).getHours() < 4){
                            return TimeUtil.toLocaleDateString(params);
                        } else {
                            return TimeUtil.toTime(params);
                        }
                    },
                    rotate: -45,
                    interval: 0
                }
            },
            yAxis: {
                type: 'category',
                data: chartData.servers,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#dbdbdb',
                        type: 'solid'
                    }
                },
                clickable:true,
                axisLabel: {
                    interval: 0,
                    
                }
            },
            series: [{
                name: 'Punch Card',
                type: 'scatter',
                symbolSize: function (val) {
                    return Math.sqrt(val[2]) * 10;
                },
                data: chartData.transform(),
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var freezePerUserTimeInterval = params.value[3] / params.value[2];
                            var t = Math.round(freezePerUserTimeInterval / 30 / 1000);
                            if (t > 6) {
                                t = 6;
                            }
                            var colorMap = ["#00ff00","#bfff00","#ffff33","#f9d057","#f29e2e","#e76818","#d7191c"]
                            return colorMap[t];
                        }
                    },
                }

            }]
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

export default connect(mapStoreToProps)(ServersOverview);