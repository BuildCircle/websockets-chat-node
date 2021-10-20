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
let users = [];

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
    // sendMessage(JSON.stringify({message: text}))

    connection.on('message', function(message) {
        object = JSON.parse(message.utf8Data)
        if (object.type === 'user login') {
            users.push(object.username)
            sendMessage(JSON.stringify({users: users, type: 'user login'}))
        } else if (object.type === 'content change') {
            text = object.message
            sendMessage(JSON.stringify({message: text, type: 'content change'}))
        }
    })
});
