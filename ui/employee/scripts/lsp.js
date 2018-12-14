var lsp = {};
lsp.view;

lsp.createChildren = function () {
}

lsp.createView = function () {
    lsp.view = service.doGet("..lsp.html");
    app.appView.innerHTML = lsp.view;
}

lsp.listenEvents = function () {
    document.getElementById('personItem').addEventListener('click', function () 
        {   eventManager.broadcast('selectItem', 'person'); });
    document.getElementById('addressItem').addEventListener('click', function () 
        {eventManager.broadcast('selectItem', 'address');});
}

lsp.setDefault = function () {
    eventManager.broadcast('selectItem', 'person');
}