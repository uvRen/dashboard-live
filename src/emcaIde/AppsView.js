exports.view = {
        
}

exports.emcaide = {
	 layout: {
            lg: [
                {
                x: 0.5,
                y: 0,
                h: 3,
                w: 11,
                i: "1"
            },{
                x: 0.5,
                y: 3,
                h: 2.5,
                w: 5.5,
                i: "2"
            },{
                x: 6,
                y: 3,
                h: 2.5,
                w: 5.5,
                i: "3"
            },{
                x: 0.5,
                y: 5.5,
                h: 3,
                w: 11,
                i: "4"
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
                groupBy: [{ field: "_time", interval: "1day" }],
                queries: [{ name: "Unique users", aggregation: "UNIQUE", field: "UserName"},
			 ],
				filter: {
					logic: "AND",
					filters: [{ field: "FreeText", operator: "EQ", value: "EMCA-IDE"}]
		  		}
            }
        },
		{
			id: "2",
            type: "InvertedBarChartError",
            settings: {
				title: "Top errors last 7 days",
				showTitle: true,
                dataStore: "applications-eclipse-error",
                groupBy: [{ field: "ErrorException" }],
                queries: [{ name: "Error", aggregation: "CNT", field: "ErrorException", filter: { logic: "AND", filters: [{field: "_time", operator: "GT", value: "7day"}, { field: "FreeText", operator: "EQ", value: "EMCA-IDE"}]}},
			 ],
				filter: {
					logic: "AND",
					filters: [{field:"_time", operator:"GT", value:"1week"}]
		  		}
            }
		},
		{
			id: "3",
            type: "InvertedBarChart",
            settings: {
				title: "Most inflicted users",
				showTitle: true,
                dataStore: "applications-eclipse-error",
                groupBy: [{ field: "UserName" }],
                queries: [{ name: "Error", aggregation: "CNT", field: "UserName"},
			 ],
				filter: {
					logic: "AND",
					filters: [{field:"_time", operator:"GT", value:"1week"}]
		  		}
            }
		},
		{
            id: "4",
            type: "LineChart",
            settings: {
				title: "General performace of EMCA-IDE",
				showTitle: true,
                dataStore: "jenkins-emca-ide-kpi-load",
                groupBy: [{ field: "_time", interval: "1hour" }],
                queries: [{ name: "importSmallProjectTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "importSmallProjectTest"}]}},
	 			  { name: "importMediumProjectTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "importMediumProjectTest"}]}},
	 			  { name: "importLargeProjectTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "importLargeProjectTest"}]}},
	 			  { name: "indexSmallTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "indexSmallTest"}]}},
	 			  { name: "indexMediumTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "indexMediumTest"}]}},
	 			  { name: "indexLargeTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "indexLargeTest"}]}},
	 			  { name: "scrollLargeFileTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "scrollLargeFileTest"}]}},
	 			  { name: "StartUpPackagesInstalled", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "StartUpPackagesInstalled"}]}},
	 			  { name: "StartUpFromScratch", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "StartUpFromScratch"}]}}
			 	],
				filter: {
					logic: "AND",
					filters: [{ field: "stressLoad", operator: "EQ", value: 0}]
		  		}
         	}
        },
    ]
}
