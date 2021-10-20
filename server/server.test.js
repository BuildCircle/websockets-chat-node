const server = require('./server');
const io = require('socket.io-client')

describe('server', () => {
    it('request', async () => {
        new Promise((resolve) => {const client = io("ws://127.0.0.1:8000");
        client.send(
            JSON.stringify({
              type: "content change",
              message: 'abcd',
            })
          ).on('message', (message) => {
              console.log(message)
              expect(message).toBe('abcd')
              resolve();
          })})
    })
});
