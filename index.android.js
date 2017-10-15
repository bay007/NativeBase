import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Container, Tabs, Tab, TabHeading, InputGroup, Input, List, ListItem, Spinner, Badge, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import Login from './LoginStore'
import { observer } from 'mobx-react/native'

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCxkNxMQlioVzzUhy7s7-2Q44_UjVWUR2E",
  authDomain: "chat-5fb009008.firebaseapp.com",
  databaseURL: "https://chat-5fb009008.firebaseio.com",
  projectId: "chat-5fb009008",
  storageBucket: "chat-5fb009008.appspot.com",
  messagingSenderId: "473086010169"
};
const app = firebase.initializeApp(config);
database = app.database().ref()

function DelayPromise(delay) {
  //return a function that accepts a single variable
  return function (data) {
    //this function returns a promise.
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        //a promise that is resolved after "delay" milliseconds with the data provided
        resolve(data);
      }, 400 + delay * Math.random());
    });
  };
}

@observer
export default class AwesomeNativeBase extends Component {

  componentDidMount = () => {
    Login.setLoading(true)
    database.on("value", (snapshot) => {
      k = snapshot.child("/users").val()
      console.log("valor: " + k)
      data = ""
      k.map(k => {
        console.log(k)
        data += k.email + "\n"
      })
      Login.setResponseMessage(data);
      Login.setLoading(false)
    })
  }

  login = () => {
    if (Login.email.trim().length == 0 || Login.password.trim().length == 0) {
      Login.setResponseMessage("Ingrese datos antes de continuar")
      return
    }
    var email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email_pattern.test(Login.email.trim())) {
      Login.setResponseMessage("Éste no es un email válido")
      return
    }
    var password_pattern = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;
    if (!password_pattern.test(Login.password.trim())) {
      Login.setResponseMessage("Ingrese una contraseña mas robusta")
      return
    }

    Login.setLoading(true)
    database.once("value")
      .then(function (snapshot) {
        k = snapshot.child("/users").val()
        console.log("valor: " + k)
        data = ""
        k.map(k => {
          console.log(k)
          data += k.email + "\n"
        })
        Login.setResponseMessage(data);
        Login.setLoading(false)
      }).catch((error) => {
        Login.setResponseMessage("No se pudlo logrear")
        Login.setLoading(false)
        console.log(error)
      });
    /*
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then(DelayPromise(1000))
      .then((responseJson) => {
        Login.setResponseMessage(responseJson.title);
        Login.setLoading(false)
      })
      .catch((error) => {
        Login.setResponseMessage("No se pudlo logrear")
        Login.setLoading(false)
      });*/

  }

  render = () => {
    return (
      <Container>
        <Header >
          <Text>Login</Text>
        </Header >
        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Icon name="md-person" style={{ color: '#0A69FE' }} />
                <Input
                  style={{ color: '#00C497' }}
                  onChangeText={(text) => Login.setEmail(text)}
                  value={Login.email}
                  placeholder={"Email Address "} />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="md-unlock" style={{ color: '#00C497' }} />
                <Input
                  onChangeText={(text) => Login.setPassword(text)}
                  value={Login.password}
                  secureTextEntry={true}
                  placeholder={"Password"} />
              </InputGroup>
            </ListItem>
          </List>
          <Button primary full disabled={Login.isLoading} onPress={() => { this.login() }}>
            <Text>Login</Text>
          </Button>
          {
            Login.isLoading ? <Spinner color='green' /> : <Text> {Login.responseMessage}</Text>
          }
        </Content>
      </Container >
    );
  }
}

AppRegistry.registerComponent('AwesomeNativeBase', () => AwesomeNativeBase);
