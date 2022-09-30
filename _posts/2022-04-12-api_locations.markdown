---
layout:     post
title:      "Report on Global API Manufacturing"
date:       2022-04-14 12:00:00
author:     "Matt Christian"
header-img: "img/cover.jpeg"
---
Increasing visibility to decrease risk. Applying Machine Learning to geographically assess global API manufacturing.

<!--more-->
# Global API manufacturing capacity is concentrated in India​ (the money slide)

{% include image.html url="/img/map.PNG"%}

Heat map of API facilities approved by US, EU, Japan, Korea and NZ. Each unit either a product-facility-approval country combination or lower level of resolution (depending on granularity of the data). Hoverable details for each country like XXX US DMFs, YYY EU CEPs etc. This is the money slide

# India dominates in API registration filings to stringent regulatory authorities 

{% include image.html url="/img/foreign_reg.PNG"%}

# Facilities in India tend to have broader capabilities whereas Chinese firms are more specialized

{% include image.html url="/img/firm_size.png"%}

# US API registrations from European and the US manufacturers have declined over time
<div id="dmf_area2" style="width: 900px; height: 500px"></div>

# EU API registrations from European and the US manufacturers have declined over time

<script
  type="text/javascript"
  src="https://www.gstatic.com/charts/loader.js"
></script>

<script>
async function getJSON(filename) {
  const response = await fetch(filename)
  return response.json()
}

google.charts.load('current', {
  'packages': ['corechart']
});
google.charts.setOnLoadCallback(loadAndDrawChart);

function loadAndDrawChart() {
  getJSON("../assets/out_dmf_yearly_active.json")
  .then(drawChart)
}

function drawChart(rawData) {
  var data = google.visualization.arrayToDataTable([
    ['Region', 'India', 'China', 'Europe', 'United States', 'Other',  { role: 'annotation' }],
    ...rawData.map(
      ({year, India, China, Europe, US, Other, total}) => {
        return [year, India, China, Europe, US, Other, total]
      }
    )
  ]);
  var options = {
    title: "Geographic evolution of new pharmaceutical manufacturing capacity",
    legend: { position: 'bottom', maxLines: 3 },
    vAxis: {
      minValue: 0,
      ticks: [0, .25, .5, .75, 1],
      title: 'Portion of new Type II currently active API DMFs by region', 
      titleTextStyle: {italic: false}
    },
    hAxis: {
      title: 'Year of DMF Submission', 
      titleTextStyle: {italic: false}
    },
    annotations: {
      textStyle: {
        color: 'black',
      },
    },
    series: [
      {color:'#ec9332'},
      {color:'#c44129'},
      {color:'#3e8410'},
      {color:'#0560bd'},
      {color:'#D3D3D3', visibleInLegend: false},
    ],
    isStacked: 'percent',
  };

    var chart = new google.visualization.AreaChart(
      document.getElementById("dmf_area2")
    );
    chart.draw(data, options);
}
</script>

# Methodology

The Medicine Supply Map team applied Natural Language Processing (NLP) and geocoding algorithms to connect DMF holders to specific manufacturing facilities. The model accurately uncovers facility information for more than 80% of active, type II, API DMFs.

# Additional research ideas:

1. Studying therapeutic class implications
2. Evaluating the offshoring impact on drug shortage risk. Prior work has shown a negative correlation between shortage risk and geographic diversity (diversifying supply points enhances supply chain resilience).
3. Generic vs non-generics by location
4. Impact of competition
5. Number of products by facility
6. Proxy for outsourcing

To learn more about how geographic diversity impacts shortage risk, please visit our [website](https://www.usp.org/supply-chain/medicine-supply-map)

