var personPanel = {};
personPanel.view;

personPanel.init = function () {
    personPanel.createChildren();
    personPanel.createView();
    personPanel.prepopulate();
    personPanel.listenEvents();
    personPanel.setDefault();
}


personPanel.createChildren = function () {
    // var rspId = document.getElementById('rsp');
    personListPanel.createChildren();
    personInfoPanel.createChildren();
}

personPanel.createView = function () {
    personPanel.view = service.doGet('..personPanel.html');
    rsp.view.innerHTML = personPanel.view;

    personPanel.view = document.getElementById('personPanel');
    personListPanel.createView();
    personInfoPanel.createView();
}

personPanel.prepopulate = function () {
    personListPanel.prepopulate();
}

personPanel.listenEvents = function () {
    personListPanel.listenEvents();
    personInfoPanel.listenEvents();
}

personPanel.setDefault = function () {
    personListPanel.setDefault();
    personInfoPanel.setDefault();
}