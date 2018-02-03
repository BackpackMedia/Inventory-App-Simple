import React, {Component} from 'react';
import {View, ListView, Alert, AlertIOS} from 'react-native';
import Header from './components/Header'
import ListItem from './components/ListItem';
import Button from './components/Button';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCwE3hbbjog48VhhSYdCyxKF0lJA3vA3Xg",
    authDomain: "inventoryapp-f69f2.firebaseapp.com",
    databaseURL: "https://inventoryapp-f69f2.firebaseio.com",
    projectId: "inventoryapp-f69f2",
    storageBucket: "",
};

firebase.initializeApp(config);

var database = firebase.database();

export default class App extends Component {
  /*Setup and state*/
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
    this.itemsRef = database.ref('inventorySimple');
}

componentDidMount(){
  this.listenForItem(this.itemsRef);
}

componentDidUnMount(){
  this.state.itemsRef.off('value');
}

  render() {
    return (
      <View style={styles.container}>
      <Header title="Inventory Simple"/>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem.bind(this)}
        enableEmptySections={true}
        style={styles.listview}/>
        <Button title="Add Item" onPress={this.addItem.bind(this)} />
      </View>
    )
  }

  renderItem(item) {
    const onPress = () => {
        Alert.alert(
            'Delete Item',
            'delete ' + item.title + ' ?',
            [
                {text: 'Cancel', onPress: () => console.log('cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => this.itemsRef.child(item._key).remove()},
            ],
            {cancelable: false}
        )
    };
    const onLongPress = () => {
       AlertIOS.prompt(
           'Edit Item',
           'current item is ' + item.title,
           [
               {text: 'Cancel', onPress: () => console.log('cancel Pressed'), style: 'cancel'},
               {text: 'OK', onPress: (text) => this.itemsRef.child(item._key).update({title: text})},
            ],
       )
    };

    return(
        <ListItem item={item} onPress={onPress} onLongPress={onLongPress}/>
    );
  }

  listenForItem(itemsRef){
    itemsRef.on('value', (snap) => {
        //get array of children
        var items = [];
        snap.forEach((child) => {
            items.push({
                title: child.val().title,
                _key: child.key
            });
        });
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items)
        });
    });
}

  addItem() {
    AlertIOS.prompt(
      'Add Item',
      null,
      [
          {text: 'Cancel', onPress: () => console.log('cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: (text) => this.itemsRef.push({ title: text})},
       ],
    )
  }

}

const styles = {
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
    flex:1
  }
};
