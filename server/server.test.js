// const startServer =  require('./server');
var W3CWebSocket = require("websocket").client;
var client = new W3CWebSocket();

describe("server", () => {

  beforeAll(async () => {

    client.on("connect", () => {
      console.log("WE ARE CONNECTED!")
    })

    client.connect("ws://127.0.0.1:8000");
  })

  it("request", () => {
   
    // client.send(
    //   "request",
    //   JSON.stringify({
    //     type: "content change",
    //     message: "abcd",
    //   })
    // );
    // expect.assertions(1)
    console.log("1st console log", client);
    new Promise((resolve) => {
      const timer = setInterval(() => {
        console.log(client);
        if (client.readyState === 1) {
          client.send(
            "request",
            JSON.stringify({
              type: "content change",
              message: "abcd",
            })
          );
          clearInterval(timer);
          resolve(client);
        }
      }, 1000);

      // .on('message', (message) => {
      //     console.log(message)
      //     expect(message).toBe('abcd')
      //     resolve();
      // })
    });
  });
});
