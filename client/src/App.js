import logo from './logo.svg';
import './App.css';

import React, { Component, useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8000');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      data: 'initstate'
    };
  }

  // logInUser = () => {
  //   const username = this.username.value;
  //   if (username.trim()) {
  //     const data = {
  //       username
  //     };
  //     this.setState({
  //       ...data
  //     }, () => {
  //       client.send(JSON.stringify({
  //         ...data,
  //         type: "userevent"
  //       }));
  //     });
  //   }  
  // }

  buttonClick = () => {
    client.send(JSON.stringify({
      message: "Hello world!"
    }));
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const state = JSON.parse(message.data).message
      console.log(state);
      this.setState({data: state});
    };
  }

  render() {
    return (
        <div>
          Practical Intro To WebSockets.
          <button onClick={() => this.buttonClick()}>Press me</button>
          <p>{this.state.data}</p>
        </div>
    );
  }
}

export default App;



// function App() {
//   useEffect(() => {
//     client.onopen = () => {
//       console.log('WebSocket Client Connected');
//     };
//     client.onmessage = (message) => {
//       console.log(message);
//     };
//   }, []);
//
//   const onButtonClick = () => {
//       client.send(JSON.stringify({
//           type: "message",
//           msg: "Hello world!",
//       }))
//   }
//
//   return (
//       <div>
//         Practical Intro To WebSockets.
//         <button onClick={() => onButtonClick()}>Send message</button>
//       </div>
//   );
// }
//
// export default App;
//