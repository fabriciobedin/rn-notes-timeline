import React from 'react'
import { TextInput, ScrollView, StyleSheet, Button } from "react-native"

import FormRow from "../components/FormRow"

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  onChangeHandler(field, value) {
    this.setState({[field]: value})
  }

  login() {

  }

  getRegister() {
    
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FormRow>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="user@email.com"
            value={this.state.email}
            onChangeText={(value) => this.onChangeHandler("email", value)}
          />
        </FormRow>
        <FormRow>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="******"
            value={this.state.password}
            onChangeText={(value) => this.onChangeHandler("password", value)}
          />
        </FormRow>
        <Button title="ENTRAR" color="#0a0" onPress={() => this.login()} />
        <Button title="CADASTRE-SE" color="#a08f7" onPress={() => this.getRegister()} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 200,
  },
  input: {
    paddingLeft: 5,
    paddingRight:5
  }
})