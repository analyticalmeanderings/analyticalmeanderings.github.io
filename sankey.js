(function () {
  google.charts.load("current", { packages: ["sankey"] });
  google.charts.setOnLoadCallback(drawChart);

  var data = loadData();

  function loadData() {

    dataRegistry
    .then(async (dataRegistry)=>{
        console.log(dataRegistry)
        const sankeyData = dataRegistry["scenario"];
        console.log(sankeyData)
        const response = await fetch(sankeyData);
        const data = await response.json();
        console.log(data);
    })


  }

  function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "From");
    data.addColumn("string", "To");
    data.addColumn("number", "Count of Manufacturing Sites");
    // TODO: Make a for loop after you aggregate, to "add rows"
    // sankey data is hidden here
    // probably going to cap the number of entries
    // groupby (Country_API, and Country_FDF)
    // agg count of records

    data.addRows([
      ["Upstream Manufacturing (China)", "Downstream Manufacturing (US)", 5],
      [
        "Upstream Manufacturing (China)",
        "Downstream Manufacturing (Germany)",
        7,
      ],
      [
        "Upstream Manufacturing (China)",
        "Downstream Manufacturing (Mexico)",
        6,
      ],
      ["Upstream Manufacturing (India)", "Downstream Manufacturing (US)", 2],
      [
        "Upstream Manufacturing (India)",
        "Downstream Manufacturing (Germany)",
        9,
      ],
      [
        "Upstream Manufacturing (India)",
        "Downstream Manufacturing (Mexico)",
        4,
      ],
    ]);

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
})();
