import React, { Component } from "react";
import { View, TextInput, Button, Image, Text } from "react-native";
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
    loading: false
  };

  componentDidMount() {
    this._createDefaultUser();
  }

  _createDefaultUser = () => {
    Realm.open({
      path: "userList.realm",
      schema: [userSchema],
      deleteRealmIfMigrationNeeded: true
    })
      .then(realm => {
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

        const user = realm.objectForPrimaryKey(userSchema.name, 1);
        this.setState({
          user: {
            name: user.name,
            email: user.email,
            password: user.password
          },
          loading: true
        });
      })
      .catch(err => console.log(err));
  };

  handleSubmit = async () => {
    const {
      navigation: { navigate }
    } = this.props;

    const { email, password, user } = this.state;

    if (!email || !password) {
      this.setState({
        error: "Você deve preencher todos os campos!"
      });
    } else {
      if (email == user.email && password == user.password) {
        navigate("Home", { user: user.name });
      } else {
        this.setState({
          error: "Suas credenciais estão invalidas"
        });
      }
    }
  };

  render() {
    const { error, loading } = this.state;
    return !loading ? (
      <LoadingView />
    ) : (
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
          placeholder="Digite seu usuário"
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={password => this.setState({ password })}
          placeholder="Sua senha"
        />
        <Button
          color={theme.colors.secondary}
          onPress={this.handleSubmit}
          title="Entrar"
        />
      </View>
    );
  }
}
