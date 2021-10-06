window.onload = function() {
  // TODO: remove the divs for build table, just build the table
  build_table('./downstream.csv', 'downstream_table');
  build_table('./upstream.csv', 'upstream_table');
  build_table('./downstream_risk.csv', 'downstream_risk');
  build_top10_table();
  build_alerts();
  // TODO: build map after https://www.kenan-flagler.unc.edu/programs/undergraduate-business/global-programs/
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

// TODO: build this function
function build_top10_table() {
  // TODO: remove the divs for build table, just build the table
  var input_table = document.getElementById('downstream_risk').getElementsByTagName("table");
  var output_table = document.getElementById('top10_table');
  output_table.innerHtml = input_table.innerHTML;

  var row = input_table.rows;
  console.log(input_table)
  console.log(row)

  for (var j = 2; j < row[0].cells.length; j++){
    for (var i = 0; i < row.length; i++){
      row[i].deleteCell(j);
    }
  }
}

// TODO: add funtiuonality to sort table
function filterTable(table_name, local_input) {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById(local_input);
  filter = input.value.toUpperCase();
  table = document.getElementById(table_name);
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
  var table_rows = '';
  var table_header = '';

  rows.forEach(function(row, row_index) {
      var table_columns = '';
      var columns = row.split(','); // split/separate the columns in a row
      columns.forEach(function(column, column_index) {
          table_columns += row_index == 0 ? '<th onclick="sortTable('+column_index.toString()+','+element_to_insert_table+')">' + column + '</th>' : '<td>' + column + '</td>';
          
      });
      if (row_index == 0) {
          table_header += '<tr>' + table_columns + '</tr>';
      } else {
          table_rows += '<tr>' + table_columns + '</tr>';
      }
  });

  table = '<table>' + table_header + table_rows + '</table>';
  console.log(table)
  element_to_insert_table.innerHTML = table;
}

function sortTable(n, element_to_insert_table) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(element_to_insert_table);
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
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

  // fetch("https://api.newscatcherapi.com/v2/search", {
  //   "method": "GET",
  //   params: {q: 'pharmaceutical', lang: 'en', sort_by: 'date', page: '1'},
  //   "headers": {'x-api-key': 'lmuF_8rsnpOUx-jiITFC3jWBhmhXlSPtx4I4VbH_3bc'}
  // })
  // .then(response => {
  //   console.log(response);  
  // })
  // .catch(err => {
  //   console.error(err);
  // });
}