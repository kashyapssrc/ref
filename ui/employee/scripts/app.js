var app = {};
app.appView;

var init = function () {
  app.createChildren();
  app.createView();
  app.listenEvents();
  app.setDefault();
}

app.createChildren = function () {
    lsp.createChildren();
    rsp.createChildren();
}

app.createView = function () {
    app.appView = document.getElementById('app');
    lsp.createView();
    rsp.createView();
}

app.listenEvents = function () {
    lsp.listenEvents();
    rsp.listenEvents();
}

app.setDefault = function () {
    lsp.setDefault();
}