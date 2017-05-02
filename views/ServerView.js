exports.view = {
        layout: {
            lg: [{
                x: 0,
                y: 0,
                h: 4,
                w: 8,
                i: "1"
            },{
                x: 8,
                y: 0,
                h: 4,
                w: 4,
                i: "2"
            },{
                x: 0,
                y: 4,
                h: 4,
                w: 8,
                i: "3"
            }],
            sm: [{
                x: 0,
                y: 0,
                h: 3,
                w: 8,
                i: "1"
            },{
                x: 8,
                y: 0,
                h: 4,
                w: 4,
                i: "2"
            }],
            md: [{
                x: 0,
                y: 0,
                h: 3,
                w: 8,
                i: "1"
            },{
                x: 8,
                y: 0,
                h: 4,
                w: 4,
                i: "2"
            }]
        },
        widgets: [{
            id: "1",
            type: "LineChartWidgetLog",
            settings: {
                dataStore: "jenkins-emca-ide-kpi",
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
		    filters: []
  		}
            }
        },
        {
            id: "2",
            type: "PieChartWidget",
            settings: {
                dataStore: "jenkins-emca-ide-kpi",
                groupBy: [{ field: "groupId" }],
                queries: [{ name: "Categories", aggregation: "UNIQUE", field: "testName" }]
            }
        },
		{
            id: "3",
            type: "BubbelChart",
            settings: {
                dataStore: "infrastructure-linuxunix-performance-load",
                groupBy: [{ field: "hostname" }],
                queries: [{ name: "Users", aggregation: "AVG", field: "users", filter: { logic: "AND", filters: [{field: "hostname", operator: "STARTSWITH", value: "esekilxv857"}]}}],
		
				filter: {
					logic: "AND",
					filters: []
	  			}
            }
        },
    ]
}
