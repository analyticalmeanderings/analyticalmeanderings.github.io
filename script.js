window.onload = function() {
  build_table('./downstream.csv', 'downstream_table');
  build_table('./upstream.csv', 'upstream_table');
  build_table('./downstream_risk.csv', 'downstream_risk');
  build_alerts();
}

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("downstream_table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function build_table(input_location, div_id_target) {
  
  fetch(input_location)
  .then(function(response){
      return response.text();
  })
  .then(function(data){
      var table_container = document.getElementById(div_id_target);
      csv_string_to_table(data, table_container);
  });

}

function csv_string_to_table(csv_string, element_to_insert_table) {
  var rows = csv_string.trim().split(/\r?\n|\r/); // Regex to split/separate the CSV rows
  var table = '';
  var table_rows = '';
  var table_header = '';

  rows.forEach(function(row, row_index) {
      var table_columns = '';
      var columns = row.split(','); // split/separate the columns in a row
      columns.forEach(function(column, column_index) {
          table_columns += row_index == 0 ? '<th>' + column + '</th>' : '<td>' + column + '</td>';
      });
      if (row_index == 0) {
          table_header += '<tr>' + table_columns + '</tr>';
      } else {
          table_rows += '<tr>' + table_columns + '</tr>';
      }
  });

  table += '<table>';
      table += '<thead>';
          table += table_header;
      table += '</thead>';
      table += '<tbody>';
          table += table_rows;
      table += '</tbody>';
  table += '</table>';

  element_to_insert_table.innerHTML += table;
}

function build_alerts(){
  // var url = 'http://api.mediastack.com/v1/news?'+
  //   'access_key=89dcc6770900488a730bb00004d7596d'+
  //   '&keywords=pharmaceutical';

  // var req = new Request(url);

  // fetch(req)
  //     .then(function(response) {
  //       var article_data = response.json()['data'];
  //       var article_titles = '<p>';
  //       for (let article = 0; article < 10; i++) {
  //         article_titles+=article_data[article]['title'];
  //         article_titles+='         ';
  //       }
  //       article_titles+='</p>';
  //       document.getElementById('alert_content').innerHTML += article_titles;
  //     })

  var axios = require("axios").default;

  var options = {
    method: 'GET',
    url: 'https://api.newscatcherapi.com/v2/search',
    params: {q: 'Bitcoin', lang: 'en', sort_by: 'relevancy', page: '1'},
    headers: {
      'x-api-key': 'lmuF_8rsnpOUx-jiITFC3jWBhmhXlSPtx4I4VbH_3bc'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}