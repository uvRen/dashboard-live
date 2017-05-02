#!/bin/bash

dashboard="$1/dashboard"
widgetapi="$1/widget-api"
iwidgetapi="$1/insight-widget-api"
wer="$1/widget-extension-responsive"
wep="$1/widget-extension-pagination"
isc="$1/insight-shared-components"
iwe="$1/insight-widgets-echarts"
iws="$1/insight-widgets-simple"
dir="$(pwd)"

function link() {
    cd "$1"
    npm link ${*:2}
}

function install() {
    echo "installing $1 with ${*:2}"
    cd "$1"
    rm -rf node_modules
    rm -rf *.tgz
    if [ ! -z "${*:2}" ]; then
        echo "installing dev dependencies"
        npm install ${*:2}
    fi
    echo "installing dependencies"
    npm install
    echo "packing"
    npm pack
    echo "linking"
    npm link
}

install "$dashboard"
install "$widgetapi"
install "$wer" "$widgetapi"/*.tgz
install "$wep" "$widgetapi"/*.tgz
install "$isc"
install "$iwidgetapi" "$widgetapi"/*.tgz "$isc"/*.tgz
install "$iws" "$widgetapi"/*.tgz "$iwidgetapi"/*.tgz "$wer"/*.tgz "$wep"/*.tgz
install "$iwe" "$widgetapi"/*.tgz "$iwidgetapi"/*.tgz "$wer"/*.tgz
install "$dir" "$dashboard"/*.tgz "$widgetapi"/*.tgz "$wer"/*.tgz "$wep"/*.tgz "$iwidgetapi"/*.tgz "$iwe"/*.tgz "$iws"/*.tgz

link "$iwidgetapi" "inovia-widget-api" "insight-shared-components"
link "$iwe" "inovia-widget-api" "insight-widget-api" "inovia-widget-extension-responsive"
link "$iws" "inovia-widget-api" "insight-widget-api" "inovia-widget-extension-responsive" "inovia-widget-extension-pagination"
link "$dir" "inovia-dashboard" "inovia-widget-api" "insight-widget-api" "insight-widgets-simple" "insight-widgets-echarts"

