exports.view = {
        layout: {
            lg: [
                {
                x: 0,
                y: 0,
                h: 24,
                w: 12,
                i: "4"
            }],
            md: [{
                x: 0,
                y: 0,
                h: 24,
                w: 8,
                i: "4"
            }],
            sm: [{
                x: 0,
                y: 0,
                h: 24,
                w: 6,
                i: "4"
            }],
            
        },
        widgets: [/*{
            id: "1",
            type: "LineChartWidget",
            settings: {
				title: "SWTBot test on teamservers",
				showTitle: true,
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
				title: "Filter on testcategories",
				showTitle: true,
                dataStore: "jenkins-emca-ide-kpi",
                groupBy: [{ field: "groupId" }],
                queries: [{ name: "Categories", aggregation: "UNIQUE", field: "testName" }]
            }
        },
		{
            id: "3",
            type: "BubbelChart",
            settings: {
				title: "Users per server",
				showTitle: true,
                dataStore: "infrastructure-linuxunix-performance-load",
                groupBy: [{ field: "hostname" }],
                queries: [{ name: "Users", aggregation: "AVG", field: "users", filter: { logic: "AND", filters: [{field: "hostname", operator: "STARTSWITH", value: "esekilxv857"}]}}],
		
				filter: {
					logic: "AND",
					filters: []
	  			}
            }
        },*/
        {
            id: "4",
            type: "ServersOverview",
            settings: {
				title: "EMCA-IDE Problem Hotspots",
				showTitle: true,
                dataStore: "applications-eclipse-session",
                groupBy: [{field:"HostName"},{ field: "_time", interval: "4hour"}],
                queries: [{ name: "Users", aggregation: "UNIQUE", field: "UserName"},{name:"FreezeTime", aggregation:"SUM",field:"FreezeTime"},],
				filter: {
					logic: "AND",
					filters: [{field:"_time", operator:"GT", value:"1week"},{field:"FreeText", operator:"EQ", value:"EMCA-IDE"}]
		  		}
            }
        },
    ]
}
