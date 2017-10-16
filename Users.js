import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Container, Tabs, Tab, TabHeading, InputGroup, Input, List, ListItem, Spinner, Badge, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { observer } from 'mobx-react/native'
import UsersStore from "./UsersStore"
import app from "./config_firebase"



@observer
export default class Users extends Component {
    static navigationOptions = {
        title: 'Users list'
    };

    componentDidMount = () => {
        app.database.on("value", (snapshot) => {
            users = snapshot.child("/users").val()
            UsersStore.setUserList(users)
        })
    }

    render = () => {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon
                                active
                                name="menu"
                                onPress={() => this.props.navigation.navigate("DrawerOpen")}
                            />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Users</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List dataArray={UsersStore.usersList.slice()}
                        renderRow={(item) =>
                            <ListItem>
                                <Text>{item.name}</Text>
                            </ListItem>
                        }>
                    </List>
                </Content>
            </Container >
        );
    }
}


