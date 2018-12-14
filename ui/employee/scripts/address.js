
var getAddress = function () {
      var xhttpRequest = new XMLHttpRequest();
      xhttpRequest.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              var address = JSON.parse(this.responseText);
              constructAddressTable(address);
          }
      };
      xhttpRequest.open("GET", "..assets/address.json", true);
      xhttpRequest.send();
}

function constructAddressTable(address) {
      var headers = [];
      for (var i = 0; i < address.length; i++) {
          for (var key in address[i]) {
              if (headers.indexOf(key) === -1) {
                  headers.push(key);
              }
          }
      }
      headerLength = headers.length;
      var table = document.createElement("TABLE");
      var tr = table.insertRow(-1);

      for (var i = 0; i < headers.length; i++) {
          var th = document.createElement("th");
          th.innerHTML = headers[i];
          tr.appendChild(th);
      }

      for (var i = 0; i < address.length; i++) {
          tr = table.insertRow(-1);
          for (var j = 0; j < headers.length; j++) {
              var tabCell = tr.insertCell(-1);
              tabCell.innerHTML = address[i][headers[j]];
          }
      }

    var divContainer = document.getElementById("table");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    constructAddressForm(headers, address);

    populateAddressForm(table, headers);

    onAddAddress(table, headers);
    actionDelete(table, headers, address);
}

function constructAddressForm(headers, address) {
    var addressDetails = document.getElementById("Info");
    addressDetails.innerHTML = "";
    for (i = 0; i < headers.length; i++) {
        var label = document.createElement("LABEL");
        label.innerHTML = headers[i];
        addressDetails.appendChild(label);
        var addressInfo = document.createElement("Input");
        addressInfo.type = "text";
        addressInfo.id = headers[i];
        var information = address[0][headers[i]];
        addressInfo.value = information;
        addressDetails.appendChild(addressInfo);
    }
}

function populateAddressForm(table, headers) {
    document.getElementById("submitPerson").style.display = "block";
    var onSubmit = document.getElementById("submitPerson");
    onSubmit.innerHTML = "submit";

    document.getElementById("resetChanges").style.display = "block";
    var onReset = document.getElementById("resetChanges");
    onReset.innerHTML = "reset";

    for (i = 0; i < table.rows.length; i++) {
      table.rows[i].onclick = function () {
          var selectedRow = this.rowIndex;
          var row = this.cells[0].innerHTML;
          var onDeleteaddress = document.getElementById("deleteaddress" + row);
          for (j = 0; j < headers.length; j++) {
              document.getElementById(headers[j]).value = this.cells[j].innerHTML;
          }
          onSubmit.onclick = function () {
            for (j = 0; j < headers.length; j++) {
                table.rows[selectedRow].cells[j].innerHTML = document.getElementById(headers[j]).value;
            }
          };
          onReset.onclick = function () {
            for (j = 0; j < headers.length; j++) {
              document.getElementById(headers[j]).value = table.rows[selectedRow].cells[j].innerHTML;
            }
          };
          onDeleteaddress.onclick = function () {
            table.deleteRow(selectedRow);
          };
      }
    }
}

function onAddAddress(table, headers) {
    document.getElementById("addPerson").style.display = "block";
    var add = document.getElementById("addPerson");
    var onSubmit = document.getElementById("submitPerson");
    var onReset = document.getElementById("resetChanges");
    add.innerHTML = "add";
    add.onclick = function () {
        for (j = 0; j < headers.length; j++) {
            document.getElementById(headers[j]).value = "";
        }
        onSubmit.onclick = function () {
            var newRow = table.insertRow(table.rows.length);
            for (var i = 0; i < headers.length; i++) {
                var newCell = newRow.insertCell(-1);
                newCell.innerHTML = document.getElementById(headers[i]).value;
            }
        };
        onReset.onclick = function () {
            for (j = 0; j < headers.length; j++) {
              document.getElementById(headers[j]).value = "";
            }
        }

    };
}

function actionDelete(table, headers, address) {
    var th = document.createElement("th");
    th.innerHTML = "action";
    table.rows[0].appendChild(th);
    for(i = 1; i <= address.length; i++) {
      var newCell = table.rows[i].insertCell(headers.length);
      var deleteButton = document.createElement("button");
      deleteButton.id = "deletePerson" + i;
      deleteButton.innerHTML = "Delete";
      newCell.appendChild(deleteButton);
    }
}


