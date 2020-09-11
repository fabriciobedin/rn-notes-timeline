import React from 'react';
import { StyleSheet, Text, View } from 'react-native'

const PeopleList = props => {
  const { people } = props;

  const ret = people.map(person => {
    const { id, nome } = person
    return <Text style={styles.list} key={id}>{id} - {nome}</Text>
  });

  return (
    <View>
      {ret}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 40
  }
})

export default PeopleList;