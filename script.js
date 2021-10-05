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

  if (tabName === "Downstream Info"){
    build_table('./downstream.csv', 'downstream_table');
  }


}

function build_table(input_location, div_id_target) {
  
  fetch(location, {credentials: 'include'})  
    .then(function(response) {
      return response.text();
    })
    .then(function(data){
      var rows = data.trim().split(/\r?\n|\r/); // Regex to split/separate the CSV rows
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
  
    
    var div_container = document.getElementById('div_id_target');
    div_container.innerHTML += table;

    });

}
