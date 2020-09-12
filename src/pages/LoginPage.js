import React from 'react'
import {
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  View,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert, AsyncStorage
} from "react-native";
import firebase from "firebase"

import FormRow from "../components/FormRow"

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
      message: ""
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('NT::UserData').then(userDataJson => {
      let userData = JSON.parse(userDataJson);
      if (userData != null) {
        this.access(userData)
      }
    })
    var firebaseConfig = {
      apiKey: "AIzaSyA1AhIvgXypkV92YpCoH-EXgii5Eh022pI",
      authDomain: "rn-notes-timeline.firebaseapp.com",
      databaseURL: "https://rn-notes-timeline.firebaseio.com",
      projectId: "rn-notes-timeline",
      storageBucket: "rn-notes-timeline.appspot.com",
      messagingSenderId: "61893764971",
      appId: "1:61893764971:web:00e199d62dc55c4d438e2e",
      measurementId: "G-LKD79ZN05F",
    };
    firebase.initializeApp(firebaseConfig)
    // firebase.analytics();
  }

  onChangeHandler(field, value) {
    this.setState({ [field]: value })
  }

  access(userData) {
    this.setState({ isLoading: false })
    AsyncStorage.setItem('NT::UserData', JSON.stringify(userData))
    this.props.navigation.replace("People")
  }

  // getMsgByErrorCode(errorCode) {
  //   switch (errorCode) {
  //     case "auth/wrong-password":
  //       return "Senha Incorreta!";
  //     case "auth/invalid-email":
  //       return "E-mail inválido";
  //     case "auth/user-not-found":
  //       return "Usuário não encontrado!";
  //     case "auth/user-disabled":
  //       return "Usuário desativado!";
  //     case "auth/email-already-in-use":
  //       return "Usuário já está em uso";
  //     case "auth/operation-not-allowed":
  //       return "Operação não permitida!";
  //     case "auth/weak-password":
  //       return "Senha muito fraca!";
  //     default:
  //       return "Erro desconhecido!";
  //   }
  // }

  getMessageByErrorCode(errorCode) {
    return {
      "auth/wrong-password": "Senha incorreta",
      "auth/invalid-email": "Email inválido",
      "auth/user-not-found": "usuário não encontrado",
      "auth/user-disabled": "Usuário desativado",
      "auth/email-already-in-use": "Usuário já está em uso",
      "auth/operation-not-allowed": "Operação não permitida",
      "auth/weak-password": "Senha muito fraca",
    }[errorCode];
  }

  getRegister() {
    const { email, password } = this.state;
    if (!email || !password) {
      Alert.alert('Cadastro!', "Para cadastrar informe o email e senha")
      return null;
    }
    Alert.alert(
      "Cadastro!",
      "Deseja cadastrar seu usuário com os dados informados?",
      [{
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Cadastrar",
        onPress: () => {this.register()}
      }]
    )
  }

  register() {
    const { email, password } = this.state;

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => { this.access(user) })
      .catch(error => {
        this.setState({
          message: this.getMessageByErrorCode(error.code),
          isLoading: false})
    })
  }

  login() {
    this.setState({ isLoading: true, message: "" });
    const { email, password } = this.state;

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => { this.access(user) })
      .catch((error) => {
        this.setState({
          message: this.getMessageByErrorCode(error.code),
          isLoading: false,
        });
      });
  }

  renderMessage() {
    const { message } = this.state;
    if (!message)
      return null;
    
    Alert.alert(
      "Erro!",
      message.toString(),
      [{
        text: 'OK',
        onPress:() => {this.setState({message: ''})}
      }]
    )
  }

  renderButton() {
    if (this.state.isLoading)
      return <ActivityIndicator size="large" style={styles.loading} />

    return (
      <View>
        <View style={styles.btn}>
          <Button title="ENTRAR" color="#0a0" onPress={() => this.login()} />
        </View>
        <View style={styles.btn}>
          <Button
            title="CADASTRE-SE"
            color="#999"
            onPress={() => this.getRegister()}
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <View style={styles.logoView}>
            <Image source={require("../img/logo.png")} style={styles.logo} />
          </View>
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
         {this.renderButton()}
         {this.renderMessage()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 200,
  },
  input: {
    paddingLeft: 5,
    paddingRight: 5,
    height: 30
  },
  btn: {
    paddingTop: 20,
  },
  logo: {
    aspectRatio: 1,
    resizeMode: "center",
    width: 200,
    height: 200,
  },
  logoView: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  loading: {
    padding: 20
  }
});