exports.getView = function(servername) {
	return {
        layout: {
            lg: [
                {
                x: 0.5,
                y: 0,
                h: 3,
                w: 11,
                i: "4"
            },{
                x: 0.5,
                y: 3,
                h: 2.5,
                w: 5.5,
                i: "5"
            },{
                x: 6,
                y: 3,
                h: 2.5,
                w: 5.5,
                i: "6"
            },{
                x: 0.5,
                y: 5.5,
                h: 3,
                w: 11,
                i: "7"
            },{
                x: 0.5,
                y: 8.5,
                h: 3,
                w: 11,
                i: "8"
            }],
            md: [{
                x: 0,
                y: 0,
                h: 3,
                w: 8,
                i: "4"
            },{
                x: 0,
                y: 3,
                h: 2,
                w: 5,
                i: "5"
            }],
            sm: [{
                x: 0,
                y: 0,
                h: 3,
                w: 6,
                i: "4"
            },{
                x: 0,
                y: 3,
                h: 2,
                w: 5,
                i: "5"
            }],
            
        },
        widgets: [
        {
            id: "4",
            type: "LineChart",
            settings: {
				title: "Freeze time for " + servername,
				showTitle: true,
                dataStore: "applications-eclipse-session",
                groupBy: [{field: "_time", interval: "1day"}],
                queries: [{name:"FreezeTime", aggregation:"AVG",field:"FreezeTime"},
			 ],
				filter: {
					logic: "AND",
					filters: [{field:"HostName", operator:"EQ", value: servername}]
		  		}
            }
        },
		{
            id: "5",
            type: "InvertedBarChartError",
            settings: {
				title: "Error type",
				showTitle: true,
                dataStore: "applications-eclipse-error",
                groupBy: [{ field: "ErrorException" }],
                queries: [{name:"Error", aggregation:"CNT",field:"ErrorException"}
			 ],
				filter: {
					logic: "AND",
					filters: [{field:"_time", operator:"GT", value:"1week"}, { field: "FreeText", operator: "EQ", value: "EMCA-IDE"}, { field: "HostName", operator: "EQ", value: servername}]
				}
            }
        },
		{
            id: "6",
            type: "InvertedBarChart",
            settings: {
				title: "Most inflicted",
				showTitle: true,
                dataStore: "applications-eclipse-error",
                groupBy: [{ field: "UserName" }],
                queries: [{name:"Error", aggregation:"CNT",field:"ErrorException"}
			 ],
				filter: {
					logic: "AND",
					filters: [{field:"_time", operator:"GT", value:"1week"}, { field: "FreeText", operator: "EQ", value: "EMCA-IDE"}, { field: "HostName", operator: "EQ", value: servername}]
				}
            }
        },
		{
            id: "7",
            type: "LineChart",
            settings: {
				title: "Ping from eseki4080613 to " + servername,
				showTitle: true,
                dataStore: "serverdata-ping3",
                groupBy: [{ field: "_time", interval: "1day" }],
                queries: [{name:"Sweden", aggregation:"AVG",field:"average"}
			 ],
				filter: {
					logic: "AND",
					filters: [{ field: "destination", operator: "EQ", value: servername }]
				}
            }
        },
		{
            id: "8",
            type: "TimeLine",
            settings: {
				title: "Freeze per user over time",
				showTitle: true,
                dataStore: "applications-eclipse-session",
                groupBy: [{field: "_time", interval: "1second"}, { field: "UserName"}],
                queries: [{name:"Freeze/User", aggregation:"SUM",field:"FreezeTime"}
			 ],
				filter: {
					logic: "AND",
					filters: [{field:"_time", operator:"GT", value:"1week"}, { field: "HostName", operator: "EQ", value: servername}]
				}
            }
        },
    ]
}
}
