var rsp = {};
rsp.view;

rsp.createChildren = function () {
}

rsp.createView = function () {
    rsp.view = service.doGet("..rsp.html");
    app.appView.innerHTML += rsp.view;

    rsp.view = document.getElementById('rsp');
}

rsp.listenEvents = function () {
    eventManager.subscribe('selectItem', onSelectItem);
}

var onSelectItem = function (data) {
    if (data === 'person') {
        personPanel.init();
    } else if (data === 'address') {
        addressPanel.init();
    }
}


