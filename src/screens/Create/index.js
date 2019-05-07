import React, { Component } from "react";
import { View, TextInput, Button, SafeAreaView, Text } from "react-native";
import styles from "./styles";
import { theme } from "../../styles";
import Realm from "realm";
import { patientSchema } from "../../schemas";

export class Create extends Component {
  state = {
    patient: "",
    hospital: ""
  };

  _handleSubmit = () => {
    const {
      navigation: { navigate }
    } = this.props;

    const { patient, hospital } = this.state;

    Realm.open({
      schema: [patientSchema]
    })
      .then(realm => {
        realm.write(() => {
          realm.create(patientSchema.name, {
            id: parseInt(Math.random() * 1000),
            name: patient,
            hospital: hospital
          });
        });

        realm.close().then(() => {
          navigate("Home", {
            success: `Paciente, ${patient} cadastrado com sucesso!`
          });
        });
      })
      .catch(err =>
        navigate("Home", {
          error: `Não foi possível cadastrar o paciente, ${patient}!`
        })
      );
  };

  render() {
    return (
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          <View style={styles.formView}>
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              onChangeText={patient => this.setState({ patient })}
              placeholder="Nome do Paciente"
            />
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              onChangeText={hospital => this.setState({ hospital })}
              placeholder="Nome do Hospital"
            />
            <Button
              style={styles.button}
              color={theme.colors.secondary}
              onPress={this._handleSubmit}
              title="Cadastrar"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
