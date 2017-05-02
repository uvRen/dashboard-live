import React from "react";
import { compose } from "inovia-widget-api";
import { storeSettings, filterSettings, aggregationInjectable, aggregationSettings } from "insight-widget-api";
import responsiveInjectable from "inovia-widget-extension-responsive";

import InvertedBarChart from "./InvertedBarChart";

const defaultOptions = {
    type: "line"
};

export default function echartsWidget(options) {

    options = Object.assign({}, defaultOptions, options);
    
    class TypedEchartsWidgetHoc extends React.Component {
        render() {
            return <InvertedBarChart {...this.props} options={options} />;
        }
    }

    return compose(
        [aggregationInjectable(), responsiveInjectable(), TypedEchartsWidgetHoc],
        [storeSettings(), filterSettings(), aggregationSettings()]
    );
}


