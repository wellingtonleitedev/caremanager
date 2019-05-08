import React, { Component } from "react";
import { View, TextInput, Button, Image, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";
import { theme } from "../../styles";
import { userSchema } from "../../schemas";
import LoadingView from "../../components/LoadingView";

export class Signin extends Component {
  state = {
    email: null,
    password: null,
    error: null,
    user: {
      name: "",
      email: "",
      password: ""
    },
    signin: false,
    success: false
  };

  componentDidMount() {
    this._openDBUsers();
  }

  _openDBUsers = () => {
    Realm.open({
      schema: [userSchema],
      path: "users.realm",
      deleteRealmIfMigrationNeeded: true
    }).then(async realm => {
      realm.write(() => {
        realm.create(
          userSchema.name,
          {
            id: 1,
            name: "Wellington Leite",
            email: "wellios",
            password: "123"
          },
          true
        );
      });

      if (this.state.signin && this.state.email !== "") {
        const user = realm
          .objects(userSchema.name)
          .filtered(`email = "${this.state.email}"`);

        if (user.length > 0 && this.state.password === user[0].password) {
          this.setState(
            {
              user: {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                password: user[0].password
              },
              success: true
            },
            async () => {
              const loged = JSON.stringify(this.state.user);
              await AsyncStorage.setItem("@user", loged);
              this.props.navigation.navigate("Home");
            }
          );
        } else {
          this.setState({
            error: "Credenciais inválidas!"
          });
        }
      }
    });
  };

  _handleSubmit = async () => {
    const { email, password, user } = this.state;

    if (!email || !password) {
      this.setState({
        error: "Você deve preencher todos os campos!"
      });
    } else {
      this.setState(
        {
          signin: true
        },
        () => {
          this._openDBUsers();
        }
      );
    }
  };

  render() {
    const { error, email, password } = this.state;
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageView}
          source={require("../../../assets/hospital.png")}
        />
        {error && (
          <Text style={{ color: "#f00", textAlign: "center" }}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          placeholder="Digite seu e-mail"
          value={email}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={password => this.setState({ password })}
          placeholder="Sua senha"
          value={password}
        />
        <Button
          color={theme.colors.secondary}
          onPress={this._handleSubmit}
          title="Entrar"
        />
      </View>
    );
  }
}
