var personInfoPanel = {};

personInfoPanel.view;
personInfoPanel.fields = ['pId', 'firstName', 'lastName', 'mailId', 'birthDate'];
personInfoPanel.info;

personInfoPanel.createChildren = function () {
}

personInfoPanel.createView = function () {
    personInfoPanel.view = service.doGet('personInformationPanel.html');
    personPanel.view.innerHTML += personInfoPanel.view;
}

personInfoPanel.listenEvents = function () {
    var fields = personInfoPanel.fields;

    // for ( var i = 0; i < fields.length; i++) {
        // details[fields[i]] = document.getElementById(fields[i]).value;
    // }
    document.getElementById('resetInfo')
            .addEventListener('click', function () { onReset();});
    // document.getElementById('submitInfo')
            // .addEventListener('click', function () { eventManager.broadcast('submitPerson', details);});

            document.getElementById('submitInfo')
            .addEventListener('click', function () { personSubmitted(); });

    eventManager.subscribe('selectRow', onSelectRow);
    eventManager.subscribe('addRow', onAddRow)
}

var onSelectRow = function (details) {
    var fields = personInfoPanel.fields;
    for ( var i = 0; i < fields.length; i++) {
        document.getElementById(fields[i]).value = details[fields[i]];
    }
    personInfoPanel.info = details;
}

var onReset = function () {
    var fields = personInfoPanel.fields;
    var newId = document.getElementById('pId').value;
    var details = personInfoPanel.info;
    if (newId == "") {
        for ( var i = 1; i < fields.length; i++) {
            document.getElementById(fields[i]).value = "";
        }
    } else {
        for ( var i = 1; i < fields.length; i++) {
            document.getElementById(fields[i]).value = details[fields[i]];
        }
    }
}

var onAddRow = function () {
    var fields = personInfoPanel.fields;
    for ( var i = 0; i < fields.length; i++) {
        document.getElementById(fields[i]).value = "";
    }
    document.getElementById('pId').style.display = 'none';
    document.getElementById('id').style.display = 'none';
}

personInfoPanel.setDefault = function () {
    // console.log('personInfoPanel setDefault');
    // var fields = personInfoPanel.fields;
    // var personList = document.getElementById('personTable');
    // for ( var i = 0; i < fields.length; i++) {
        // document.getElementById(fields[i]).value = personList.rows[1].cells[i].innerHTML;
    // }
    // eventManager.subscribe('')
}

var personSubmitted = function () {
    var fields = personInfoPanel.fields;
    var details = {};
    for ( var i = 0; i < fields.length; i++) {
        details[fields[i]] = document.getElementById(fields[i]).value;
    }
    eventManager.broadcast('submitPerson', details);
}