import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import { observer } from 'mobx-react/native'
import Login from './Login'
import Users from './Users'

const Menu = DrawerNavigator({
  Users: { screen: Users },
  Login: { screen: Login }
})

const App = StackNavigator({
  Login: { screen: Login },

  Menu: { screen: Menu }
}, {
    initialRouteName: "Login",
    headerMode: "none"
  }
);



export default class AwesomeNativeBase extends Component {

  render = () => {
    return (<Root><App /></Root>)
  }

}

AppRegistry.registerComponent('AwesomeNativeBase', () => AwesomeNativeBase);
