var eventManager = {};
// eventManager.subscribers = new Map();
eventManager.subscribers = [];

eventManager.broadcast = function(eventName, data) {
    var toFunction = eventManager.subscribers[eventName];
    // var toFunction = eventManager.subscribers.get(eventName);
    // console.log(eventManager.subscribers);
    toFunction(data);
}


eventManager.subscribe = function (eventName, functionName) {
    eventManager.subscribers[eventName] = functionName;
    // eventManager.subscribers.set(eventName, functionName);
}