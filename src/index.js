import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

import { FullPage } from "./component/FullPage";

import "./scss/default.scss";

ReactDOM.render(
  <Router basename="/">
    <div>
      <Switch>
        <Route exact path="/" component={FullPage} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);
