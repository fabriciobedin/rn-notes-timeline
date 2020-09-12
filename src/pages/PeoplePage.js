import React from "react"
import { Text, ScrollView, SafeAreaView, StyleSheet } from "react-native"
import { FloatingAction } from 'react-native-floating-action'
import * as firebase from 'firebase';

import PeopleList from '../components/PeopleList'

export default class PeoplePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      people:[]
    }
  }

  componentDidMount() {
    var db = firebase.database();
    db.ref('/usr/people').on('value', querySnapshot => { 
      let data = []
      querySnapshot.forEach(child => { 
        data.push({
          id: child.val().id,
          nome: child.val().desc
        })
      })
      console.log(data)
      this.setState({ people: data})
    })
  }

  addPerson() {
    var db = firebase.database();
    db.ref('/usr/people')
      .push({ desc: 'Alguem' })
      .then(() => { console.log('Inserido') })
      .catch(() => {console.log('Erro ao registrar')})
  }

  renderList() {
    const ret = this.state.people.map(person => {
      const { id, nome } = person
      return <Text key={id}>{id} - {nome}</Text>
    });
    return ret
  }

  render() {
    const actions = [{
      text: 'Nova Pessoa',
      icon: require('../img/icons/add_person.png'),
      name: 'btnNovaPessoa',
      position: 2
    }]
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <PeopleList people={this.state.people} />
        </ScrollView>

        <FloatingAction
          actions={actions}
          onPressItem={() => this.addPerson()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});
