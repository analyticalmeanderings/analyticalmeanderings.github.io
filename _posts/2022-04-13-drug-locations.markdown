---
layout:     post
title:      "What classes of drugs are most reliant on overseas manufacturers?"
date:       2022-04-12 12:00:00
author:     "Matt Christian"
header-img: "img/cover.jpeg"
---
What classes of drugs are most reliant on overseas manufacturers?
<span class="label label-danger">DRAFT</span>

<!--more-->
# Therapeutic class analysis

It's well known that signifacnt manufacturing capacity for US pharmaceutical is overseas. India and China account for less than 50% of DMFs for Dermatological and Ophthalmic Agents. Antivirals and Blood Glucose
Regulators are the most reliant on India and China for manufacturing capacity. Analgesics has the highest portion of DMFs sourced in the US at 25%.

<div id="class_drug" style="width: 900px; height: 500px"></div>
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
  getJSON("../assets/geographic_class_analysis.json")
  .then(drawChart)
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

