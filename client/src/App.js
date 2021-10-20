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
      user: null,
      userSubmitted: false,
    };
  }

  componentWillMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const state = JSON.parse(message.data).message;
      this.setState({ text: state });
    };
  }

  onEditorStateChange = (e) => {
    this.setState({ text: e.target.value }, () => {
      client.send(
        JSON.stringify({
          type: "content change",
          message: this.state.text,
        })
      );
    });
  };

  submitUser = (e) => {
    e.preventDefault();
    this.setState({userSubmitted: true})
    client.send(
      JSON.stringify({
        type: "user login",
        username: this.state.user,
      })
    );
  };

  render() {
    if (this.state.userSubmitted) {
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
    } else {
      return (
        <form onSubmit={(e) => this.submitUser(e)}>
          <input
            type="text"
            value={this.state.user}
            onChange={(e) => this.setState({ user: e.target.value })}
          ></input>
          <input type="submit" value="Login"></input>
        </form>
      );
    }
  }
}

export default App;
// {/* <button onClick={() => this.buttonClick()}>Press me</button>
// <p>{this.state.data}</p> */}

{
  /* <form className=“form” onSubmit={onSubmit}>
        <div className=“form-group”>
          <input
            type=“email”
            placeholder=“Email Address”
            name=“email”
            value={email}
            onChange={onChange}
          />
        </div>
        <input type=“submit” className=“btn btn-black” value=“Login” />
      </form> */
}
