---
layout:     post
title:      "US dependence on foreign manufacturing capacity for antiviral medications"
date:       2022-04-12 12:00:00
author:     "Matt Christian"
header-img: "img/cover.jpeg"
---
What classes of drugs are most reliant on foreign manufacturers?

<!--more-->
# Therapeutic class analysis

Over 80% of API antiviral manufacturing sites that support US markets are located in India and China. <br>

Analgesics have the highest portion of DMFs sourced in the US at 25%.

<div id="class_drug" style="width: 900px; height: 500px"></div>
<div id="aggro" style="width: 900px; height: 500px"></div>
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
google.charts.setOnLoadCallback(loadAndDrawChart2);

function loadAndDrawChart() {
  getJSON("../assets/geographic_class_analysis.json")
  .then(drawChart)
}
function loadAndDrawChart2() {
  getJSON("../assets/classAntivirals.json")
  .then(drawChart2)
}



function drawChart(rawData) {
  
  var data = google.visualization.arrayToDataTable([
    ['therapeutic_class', {label: 'India', type: 'number'}, {label: 'China', type: 'number'}, {label: 'United States', type: 'number'}, {label: 'Other', type: 'number'}],
    ...rawData.map(
      ({therapeutic_class, India, China, US, Other}) => {
        return [therapeutic_class, India, China, US, Other]
      }
    )
  ]);
  
  var options = {
    title: "Geographic by therapeutic class",
    legend: { position: 'bottom', maxLines: 3 },
    hAxis: {
      title: 'Portion of Active Type II API DMFs', 
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
      {color:'#0560bd'},
      {color:'#D3D3D3', visibleInLegend: false},
    ],
    isStacked: 'percent',
  };

    var chart = new google.visualization.BarChart(
      document.getElementById("class_drug")
    );
    chart.draw(data, options);
}

function drawChart2(rawData) {
  var data = google.visualization.arrayToDataTable([
    ['Region', 'India', 'China', 'Europe', 'United States', 'Other'],
    ...rawData.map(
      ({year, India, China, Europe, US, Other}) => {
        return [year, India, China, Europe, US, Other]
      }
    )
  ]);
  var options = {
    title: "Geographic evolution of antiviral pharmaceutical manufacturing capacity",
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
      document.getElementById("aggro")
    );
    chart.draw(data, options);
}
</script>

# Methodology

The Medicine Supply Map team applied Natural Language Processing (NLP) and geocoding algorithms to connect DMF holders to specific manufacturing facilities. The model accurately uncovers facility information for more than 80% of active, type II, API DMFs.

# Additional research ideas:

2. Evaluating the offshoring impact on drug shortage risk. Prior work has shown a negative correlation between shortage risk and geographic diversity (diversifying supply points enhances supply chain resilience).
3. Generic vs non-generics by location
4. Impact of competition
5. Number of products by facility
6. Proxy for outsourcing

To learn more about how geographic diversity impacts shortage risk, please visit our [website](https://www.usp.org/supply-chain/medicine-supply-map)

