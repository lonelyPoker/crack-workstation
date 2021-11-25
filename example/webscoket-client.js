

var ws = new WebSocket("ws://127.0.0.1:15005/echo")

ws.onopen = function (event) {
    console.log("Connection open ...");
    ws.send("Hello WebSockets!");
};


ws.onmessage = function (event) {
    if (typeof event.data === String) {
        console.log("Received data string");
    }

    if (event.data instanceof ArrayBuffer) {
        var buffer = event.data;
        console.log("Received arraybuffer");
    }
    console.log("Received Message: " + evt.data);
    ws.close();
};

ws.onclose = function (evt) {
    console.log("Connection closed.");
};
 