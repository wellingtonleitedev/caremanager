import './config/ReactotronConfig'
import React, { Component } from "react";
import AppSwitchNavigator from "./navigators/AppSwitchNavigator";

console.tron.log("Hello World")
export default class App extends Component {
  render() {
    return <AppSwitchNavigator />;
  }
}
