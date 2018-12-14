var service = {};

service.doGet = function (url) {
    var content;
    var xhttpRequest = new XMLHttpRequest();
    xhttpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          content = this.responseText;
        }
    };
    xhttpRequest.open("GET", url, false);
    xhttpRequest.send();
    return content;
}