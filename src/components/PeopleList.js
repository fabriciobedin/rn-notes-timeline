import React from 'react';
import { StyleSheet, Text, View } from 'react-native'

const PeopleList = props => {
  const { people } = props;

  const ret = people.map(person => {
    const { id, nome } = person
    // return <Text style={styles.list} key={id}>{id} - {nome}</Text>
    return (
      <View style={styles.container} key={id}>
        <Text style={[styles.default, styles.id]}>{id}</Text>
        <Text style={[styles.default, styles.nome]}>{nome}</Text>
      </View>
    )
  });

  return (
    <View>
      {ret}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  default: {
    padding: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    borderStyle: 'solid'
  },
  id: {
    flex: 0.1,
    textAlign: 'center'
  },
  nome: {
    flex: 0.9
  }
})

export default PeopleList;