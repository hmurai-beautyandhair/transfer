import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./components/Main.js";
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={props => <Main {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;