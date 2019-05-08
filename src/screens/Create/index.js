import React, { Component } from "react";
import { View, TextInput, Button, SafeAreaView, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";
import { theme } from "../../styles";
import Realm from "realm";
import { patientSchema } from "../../schemas";

export class Create extends Component {
  state = {
    patient: "",
    hospital: "",
    success: true
  };

  _handleSubmit = async () => {
    const {
      navigation: { navigate }
    } = this.props;

    const { patient, hospital } = this.state;
    const sessionID = JSON.parse(await AsyncStorage.getItem("@user")).id;
    try {
      Realm.open({
        schema: [patientSchema],
        path: "patients.realm",
        deleteRealmIfMigrationNeeded: true
      }).then(realm => {
        let newID = 1;
        const lastPatient = realm
          .objects(patientSchema.name)
          .sorted("id", true)
          .slice(0, 1);

        if (lastPatient.length > 0) {
          newID += lastPatient[0].id;
        }

        realm.write(() => {
          realm.create(patientSchema.name, {
            id: newID,
            name: patient,
            user_id: sessionID,
            hospital: hospital
          });
        });
      });
    } catch (err) {
      console.tron.log(err);
    } finally {
      this.setState(
        {
          patient: "",
          hospital: "",
          message: "Paciente cadastrado com sucesso!"
        },
        this._navigate()
      );
    }
  };

  _navigate = () => {
    if (this.state.success) {
      this.props.navigation.navigate("Home", {
        success: "Paciente cadastrado com sucesso!"
      });
    }
  };

  render() {
    const { patient, hospital } = this.state;
    return (
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          <View style={styles.formView}>
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              onChangeText={patient => this.setState({ patient })}
              placeholder="Nome do Paciente"
              value={patient}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              onChangeText={hospital => this.setState({ hospital })}
              placeholder="Nome do Hospital"
              value={hospital}
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
