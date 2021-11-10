(function () {
  google.charts.load("current", { packages: ["sankey"] });
  google.charts.setOnLoadCallback(drawChart);

  var chartData = loadData();

  function loadData() {
    return dataRegistry.then(async (dataRegistry) => {
      const sankeyData = dataRegistry["scenario"];
      const response = await fetch(sankeyData);
      const data = await response.json();

      // object with API as key and FDF as object

      const parsedData = [];
      for (const { Country_API, Country_FDF } of data) {
        const Country_API_mod = "API Manufacturing ("+Country_API+")";
        const Country_FDF_mod = "FDF Manufacturing ("+Country_FDF+")";
        
        const found = parsedData.find(([entry_API, entry_FDF]) => {
          return entry_API === Country_API_mod && entry_FDF === Country_FDF_mod;
        });

        if (found !== undefined) {
          found[2]++;
        } else {
          parsedData.push([Country_API_mod, Country_FDF_mod, 1]);
        }
      }
      return parsedData.sort((a,b)=>{return b[2]-a[2]}).slice(0,10);

    });
  }

  function drawChart() {
    chartData.then((chartData)=>{
        var data = new google.visualization.DataTable();
        data.addColumn("string", "From");
        data.addColumn("string", "To");
        data.addColumn("number", "Count of Manufacturing Sites");
        // TODO: Make a for loop after you aggregate, to "add rows"
        // sankey data is hidden here
        // probably going to cap the number of entries
        // groupby (Country_API, and Country_FDF)
        // agg count of records
        console.log(chartData); 
        data.addRows(chartData);
    
        var colors = [
          "#a6cee3",
          "#b2df8a",
          "#fb9a99",
          "#cab2d6",
          "#ffff99",
          "#1f78b4",
          "#33a02c",
        ];
        // Sets chart options.
        var options = {
          width: 800,
          height: 400,
          sankey: {
            node: {
              colors: colors,
              label: { fontName: "Arial", fontSize: 16 },
            },
            link: {
              colorMode: "gradient",
              colors: colors,
            },
          },
        };
    
        // Instantiates and draws our chart, passing in some options.
        var chart = new google.visualization.Sankey(
          document.getElementById("sankey_basic")
        );
        chart.draw(data, options);
      }


    )}

})();
