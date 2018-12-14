var person;
var headers;
var table;
var STATUS = 200;
var RESPONSE = 4;

var getPerson = function () {
    var xhttpRequest = new XMLHttpRequest();
    xhttpRequest.onreadystatechange = function () {
        if (this.readyState === RESPONSE && this.status === STATUS) {
            person = JSON.parse(this.responseText);
            constructTable(person);
        }
    };
    xhttpRequest.open("GET", "..assets/person.json", true);
    xhttpRequest.send();
}

var constructTable = function () {
    headers = [];
    for (var personId = 0; personId < person.length; personId++) {
        for (var key in person[personId]) {
            if (headers.indexOf(key) === -1) {
                headers.push(key);
            }
        }
    }
    headerLength = headers.length;
    table = document.createElement("TABLE");
    var tr = table.insertRow(-1);
    
    for (var column = 0; column < headers.length; column++) {
        var th = document.createElement("th");
        th.innerHTML = headers[column];
        tr.appendChild(th);
    }

    for (var personId = 0; personId < person.length; personId++) {
        tr = table.insertRow(-1);
        for (var column = 0; column < headers.length; column++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = person[personId][headers[column]];
        }
    }

    var divContainer = document.getElementById("table");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    constructForm();

    populateForm();

    onAdd();
    action();
}

var constructForm = function () {
    var personDetails = document.getElementById("Info");
    personDetails.innerHTML = "";
    for (var column = 0; column < headers.length; column++) {
        var label = document.createElement("LABEL");
        label.innerHTML = headers[column];
        personDetails.appendChild(label);
        var personInfo = document.createElement("Input");
        personInfo.type = "text";
        personInfo.id = headers[column];
        var information = table.rows[1].cells[column].innerHTML;
        personInfo.value = information;
        personDetails.appendChild(personInfo);
    }
}

var populateForm = function () {
    document.getElementById("submitPerson").style.display = "block";
    var onSubmit = document.getElementById("submitPerson");
    onSubmit.innerHTML = "submit";

    document.getElementById("resetChanges").style.display = "block";
    var onReset = document.getElementById("resetChanges");
    onReset.innerHTML = "reset";

    for (var personId = 1; personId < table.rows.length; personId++) {
        table.rows[personId].onclick = function () {
            var selectedRow = this.rowIndex;
            var row = this.cells[0].innerHTML;
            var onDeletePerson = document.getElementById("deletePerson" + row);

            for (var column = 0; column < headers.length; column++) {
                document.getElementById(headers[column])
                        .value = this.cells[column].innerHTML;
            }

            onSubmit.onclick = function () {
                for (var column = 0; column < headers.length; column++) {
                    table.rows[selectedRow]
                         .cells[column]
                         .innerHTML = document.getElementById(headers[column])
                                              .value;
                }
            };

            onReset.onclick = function () {
                for (var column = 0; column < headers.length; column++) {
                    document.getElementById(headers[column])
                            .value = table.rows[selectedRow]
                                          .cells[column]
                                          .innerHTML;
                }
            };

            onDeletePerson.onclick = function () {
                table.deleteRow(selectedRow);
            };
        }
    }
}

var onAdd = function () {
    document.getElementById("addPerson").style.display = "block";
    var add = document.getElementById("addPerson");
    var onSubmit = document.getElementById("submitPerson");
    var onReset = document.getElementById("resetChanges");
    add.innerHTML = "add";

    add.onclick = function () {
        for (var column = 0; column < headers.length; column++) {
            document.getElementById(headers[column]).value = "";
        }

        onSubmit.onclick = function () {
            var newRow = table.insertRow(table.rows.length);
            for (var column = 0; column < headers.length; column++) {
                var newCell = newRow.insertCell(-1);
                newCell.innerHTML = document.getElementById(headers[column]).value;
            }
            populateForm();
        };

        onReset.onclick = function () {
            for (var column = 0; column < headers.length; column++) {
              document.getElementById(headers[column]).value = "";
            }
        }
    };
}

var action = function () {
    var th = document.createElement("th");
    th.innerHTML = "action";
    table.rows[0].appendChild(th);

    for(var personId = 1; personId <= person.length; personId++) {
        var newCell = table.rows[personId].insertCell(headers.length);
        var deleteButton = document.createElement("button");
        deleteButton.id = "deletePerson" + personId;
        deleteButton.innerHTML = "Delete";
        newCell.appendChild(deleteButton);
    }
}

