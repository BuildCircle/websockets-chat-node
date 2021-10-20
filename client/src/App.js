import logo from "./logo.svg";
import "./App.css";

import React, { Component, useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "a",
      // data: 'initstate'
    };
  }

  onEditorStateChange = (e) => {
    this.setState({text: e.target.value}, () => {
      client.send(
        JSON.stringify({
          message: this.state.text,
        })
      );
    })
  };

  componentWillMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const state = JSON.parse(message.data).message;
      // console.log(state)
      this.setState({ text: state });
    };
  }

  render() {
    return (
      <div>
        <textarea 
        value={this.state.text} 
        onChange={(e) => this.onEditorStateChange(e)}
        >
          {this.state.text}
        </textarea>
      </div>
    );
  }
}

export default App;
// {/* <button onClick={() => this.buttonClick()}>Press me</button>
// <p>{this.state.data}</p> */}
