const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
    httpServer: server
});

const clients = {};
let text = '';

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

const sendMessage = (json) => {
    Object.keys(clients).map((client) => {
        clients[client].sendUTF(json);
    });
}  

wsServer.on('request', function(request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))

    sendMessage(JSON.stringify({message: text}))

    connection.on('message', function(message) {
        msg = JSON.parse(message.utf8Data).message
        text = msg
        sendMessage(JSON.stringify({message: msg}))
    })
});
