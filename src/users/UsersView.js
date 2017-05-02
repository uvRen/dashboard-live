exports.view = {
        layout: {
            lg: [{
                x: 0,
                y: 0,
                h: 4,
                w: 8,
                i: "1"
            }],
            sm: [{
                x: 0,
                y: 0,
                h: 3,
                w: 8,
                i: "1"
            }],
            md: [{
                x: 0,
                y: 0,
                h: 3,
                w: 8,
                i: "1"
            }]
        },
        widgets: [{
            id: "1",
            type: "BarChartWidget",
            settings: {
				title: "Unique users",
				showTitle: true,
                dataStore: "applications-eclipse-session",
                queries: [{ name: "Unique users", aggregation: "UNIQUE", field: "UserName"},
			 ],
				filter: {
					logic: "AND",
					filters: [{ field: "FreeText", operator: "EQ", value: "EMCA-IDE"},{field:"_time", operator: "GT", value: "1month"}]
		  		}
            }
        },]
}
