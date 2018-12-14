var personListPanel = {};
personListPanel.view;
personListPanel.personsList;
personListPanel.columns;
personListPanel.row;

personListPanel.createChildren = function () {
}

personListPanel.createView = function () {
    personListPanel.view = service.doGet('..personListPanel.html');
    personPanel.view.innerHTML = personListPanel.view;
}

personListPanel.prepopulate = function () {
    var record = service.doGet('..assets/tableRecord.txt');
    personListPanel.row = record;
    var person = service.doGet('..assets/person.json');
    var persons = JSON.parse(person);
    personListPanel.personsList = persons;
    var table = document.getElementById('personTable');
    var headers = [];
    for (var key in persons[0]) {
        headers.push(key);
    }
    personListPanel.columns = headers;

    for (var i = 0; i < persons.length; i ++) {
        var newRecord = record.replace('pId', persons[i][headers[0]])
                              .replace('firstName', persons[i][headers[1]])
                              .replace('lastName', persons[i][headers[2]])
                              .replace('mailId', persons[i][headers[3]])
                              .replace('birthDate', persons[i][headers[4]])
                              .replace('deleteId', 'delete' + persons[i][headers[0]])
                              .replace('idName', persons[i][headers[1]] + persons[i][headers[2]]);
        table.innerHTML += newRecord;
    }
}

personListPanel.listenEvents = function () {
    var personsList = personListPanel.personsList;
    var column = personListPanel.columns;
    var personTable = document.getElementById('personTable');

    for (var i = 0; i < personsList.length; i++) {

        var rowId = personsList[i][column[1]] + personsList[i][column[2]];
            
        var deleteId = 'delete' + (i + 1);

        document.getElementById(rowId)
                .addEventListener('click', function() { personListPanel.fetchRecord(this);});
        document.getElementById(deleteId)
                .addEventListener('click', function() { personListPanel.onDelete(this);});
        document.getElementById('addPerson')
                .addEventListener('click', function() { eventManager.broadcast('addRow');});
    }
    eventManager.subscribe('submitPerson', onSubmitPerson);
}

personListPanel.setDefault = function () {
    var data = [];
    var column = personListPanel.columns;
    var personTable = document.getElementById('personTable');
    for (var j = 0; j < column.length; j++) {
        data[column[j]] = personTable.rows[1].cells[j].innerHTML;
    }
    eventManager.broadcast('selectRow', data);
}

var onSubmitPerson = function (details) {
    var record = personListPanel.row;
    var persons = personListPanel.personsList;
    var headers = personListPanel.columns;
    var personTable = document.getElementById('personTable');
    var personId = details[headers[0]];
    if (personId === '') {
        personId = persons.length + 1;
    }

    var invalidDetails = personListPanel.validate(details);
    if (invalidDetails) {
        return;
    } else {
        for (var i = 0; i < persons.length; i++) {
            for (var j = 1; j < headers.length; j++) {
                if (persons[i][headers[0]] == personId) {
                    console.log(i);
                    personTable.rows[i + 1].cells[j].innerHTML = details[headers[j]];
                }
            }
            console.log(personId);
        }

        if (personId > persons.length) {
            var personTable = document.getElementById('personTable');
            var newRecord = record.replace('pId', personId)
                                  .replace('firstName', details[headers[1]])
                                  .replace('lastName', details[headers[2]])
                                  .replace('mailId', details[headers[3]])
                                  .replace('birthDate', details[headers[4]])
                                  .replace('deleteId', 'delete' + details[headers[0]])
                                  .replace('idName', details[headers[1]] 
                                                   + details[headers[2]]);
            personTable.innerHTML += newRecord;
        }
    }
}

personListPanel.fetchRecord = function (selectedRecord) {
    var data = [];
    var column = personListPanel.columns;
    for (var j = 0; j < column.length; j++) {
            data[column[j]] = selectedRecord.cells[j].innerHTML;
    }
    eventManager.broadcast('selectRow', data);
}

personListPanel.validate = function (details) {
    var headers = personListPanel.columns;
    for (var j = 1; j < headers.length; j++) {
        if (details[headers[j]] === "") {
            window.alert('enter all the details');
            return false;
        }
    }
}

personListPanel.onDelete = function (selectedRecord) {
    var deletePerson = document.getElementById("delete" + selectedRecord);
    var personTable = document.getElementById('personTable');
    console.log(deletePerson);
    console.log(selectedRecord);
    // personTable.deleteRow(selectedRecord);
}
