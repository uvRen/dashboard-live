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
            }, {
				x: 8,
				y: 4,
				h: 4,
				w: 4,
				i: "3"
			}, {
                x: 0,
                y: 4,
                h: 4,
                w: 8,
                i: "4"
  	    	}, {
                x: 0,
                y: 8,
                h: 4,
                w: 8,
                i: "5"
  	    	}, {
                x: 8,
                y: 8,
                h: 4,
                w: 4,
                i: "6"
  	    	}, {
                x: 0,
                y: 12,
                h: 4,
                w: 8,
                i: "7"
  	    	}, {
                x: 8,
                y: 12,
                h: 4,
                w: 4,
                i: "8"
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
            type: "PieChartWidget",
            settings: {
				title: "Filter on servers",
				showTitle: true,
             	dataStore: "jenkins-emca-ide-kpi",
              	groupBy: [{ field: "server" }],
               	queries: [{ name: "Servers", aggregation: "UNIQUE", field: "server" }]
            }
        },
		{
            id: "4",
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
            id: "5",
            type: "BarChartWidget",
            settings: {
                dataStore: "applications-eclipse-freeze",
                groupBy: [{field: "UserName"}],
                queries: [{ name: "freeze > 40s", aggregation: "AVG", field: "FreezeLasted", filter: { logic: "AND", filters: [{ field: "FreezeLasted", operator: "GT", value: 40000 }, {field: "FreeText", operator: "EQ", value: "EMCA-IDE"}]}}],
				filter: {
					logic: "AND",
					filters: []
		  		}
            }
        },
		{
            id: "6",
            type: "PieChartWidget",
            settings: {
             dataStore: "applications-eclipse-freeze",
              groupBy: [{ field: "HostName" }],
               queries: [{ name: "Freeze/Server", aggregation: "CNT", field: "FreezeLasted", filter: { logic: "AND", filters: [{ field: "HostName", operator: "STARTSWITH", value: "esekilxv769"}]}}]
            }
        },
		{
            id: "7",
            type: "BarChartWidget",
            settings: {
                dataStore: "infrastructure-linuxunix-performance-load",
                groupBy: [{field: "hostname"}],
                queries: [{ name: "CPU", aggregation: "AVG", field: "usedcpu", filter: { logic: "AND", filters: [{ field: "hostname", operator: "STARTSWITH", value: "esekilxv769"}]}},
			  			{ name: "Memory", aggregation: "AVG", field: "usedmem", filter: { logic: "AND", filters: [{ field: "hostname", operator: "STARTSWITH", value: "esekilxv769"}]}}],
				filter: {
					logic: "AND",
					filters: []
		  		}
            }
        },
		{
            id: "8",
            type: "PieChartWidget",
            settings: {
             dataStore: "infrastructure-linuxunix-performance-load",
              groupBy: [{ field: "hostname" }],
               queries: [{ name: "Users", aggregation: "UNIQUE", field: "users", filter: { logic: "AND", filters: [{ field: "hostname", operator: "STARTSWITH", value: "esekilxv769"}]}}]
            }
        },
    ]
}
