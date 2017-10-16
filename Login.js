import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Container, Tabs, Tab, TabHeading, InputGroup, Input, List, ListItem, Spinner, Badge, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import LoginStore from './LoginStore'
import { observer } from 'mobx-react/native'
import app from "./config_firebase"



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
export default class Login extends Component {
    static navigationOptions = {
        title: 'Login Screen'
    };

    login = () => {
        if (LoginStore.email.trim().length == 0 || LoginStore.password.trim().length == 0) {
            LoginStore.setResponseMessage("Ingrese datos antes de continuar")
            return
        }
        var email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!email_pattern.test(LoginStore.email.trim())) {
            LoginStore.setResponseMessage("Éste no es un email válido")
            return
        }
        var password_pattern = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;
        if (!password_pattern.test(LoginStore.password.trim())) {
            LoginStore.setResponseMessage("Ingrese una contraseña mas robusta")
            return
        }

        LoginStore.setLoading(true)
        app.auth.signInWithEmailAndPassword(LoginStore.email.trim(), LoginStore.password.trim())
            .then(() => {
                LoginStore.setIsLogued(true)
                LoginStore.setLoading(false)
                LoginStore.setResponseMessage('Sesion iniciada');
                this.props.navigation.navigate("Users")
            })
            .catch(function (error) {

                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    LoginStore.setResponseMessage('Wrong password.');
                } else {
                    LoginStore.setResponseMessage(errorMessage);

                }
                LoginStore.setLoading(false)

            });
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
                                    onChangeText={(text) => LoginStore.setEmail(text)}
                                    value={LoginStore.email}
                                    placeholder={"Email Address "} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Icon name="md-unlock" style={{ color: '#00C497' }} />
                                <Input
                                    onChangeText={(text) => LoginStore.setPassword(text)}
                                    value={LoginStore.password}
                                    secureTextEntry={true}
                                    placeholder={"Password"} />
                            </InputGroup>
                        </ListItem>
                    </List>
                    <Button primary full disabled={LoginStore.isLoading} onPress={() => { this.login() }}>
                        <Text>Login</Text>
                    </Button>
                    {
                        LoginStore.isLoading ? <Spinner color='green' /> : <Text> {LoginStore.responseMessage}</Text>
                    }
                </Content>
            </Container >
        );
    }
}


