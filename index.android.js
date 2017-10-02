import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Container, Tabs, Tab, TabHeading, List, ListItem, Spinner, Badge, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import ObservableListStore from './observableListStore'
import { observer } from 'mobx-react/native'


@observer
export default class AwesomeNativeBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contador: 50
    }
  }
  render() {
    return (
      <Container>
        <Header >
          <Text>Meseros</Text>
        </Header >
        <Tabs>

          <Tab heading={<TabHeading><Text>No Icon</Text></TabHeading>}>

            <Text>Este es 50={this.state.contador}</Text>
            <Button onPress={() => { this.setState({ contador: this.state.contador + 1 }) }}>
              <Text>Click Me! {this.state.contador} </Text>
            </Button>

            <Text>Este es el tab de no icon {ObservableListStore.count}</Text>
            <Button onPress={ObservableListStore.increment}>
              <Text>Click Me! {ObservableListStore.fullName} </Text>
            </Button>


          </Tab>
          <Tab heading={<TabHeading><Icon name="camera" /><Text>{ObservableListStore.menuCamera}</Text></TabHeading>}>
            <List dataArray={ObservableListStore.names.slice()}
              renderRow={(item) =>
                <ListItem>
                  <Text>{item}</Text>
                </ListItem>
              }>
            </List>

          </Tab>
          <Tab heading={<TabHeading><Icon name="apps" /></TabHeading>}>
            <Text>Este es el tab de apps</Text>
          </Tab>
        </Tabs>
      </Container >
    );
  }
}

AppRegistry.registerComponent('AwesomeNativeBase', () => AwesomeNativeBase);
