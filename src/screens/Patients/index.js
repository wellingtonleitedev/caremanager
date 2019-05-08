import React, { Component } from "react";
import { View, Text, FlatList, SafeAreaView, ScrollView } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import ButtonIcon from "../../components/ButtonIcon";
import Realm from "realm";
import { patientSchema } from "../../schemas";

export class Patients extends Component {
  constructor(props) {
    super(props);

    this._handlePress = this._handlePress.bind(this);
  }

  state = {
    data: [],
    patient: "",
    delete: false,
    close: false,
    message: ""
  };

  componentDidMount() {
    this._openDBPatients();
  }

  _openDBPatients = () => {
    Realm.open({
      schema: [patientSchema],
      path: "patients.realm",
      deleteRealmIfMigrationNeeded: true
    }).then(realm => {
      if (this.state.delete && this.state.patientId !== "") {
        realm.write(() => {
          realm.create(
            patientSchema.name,
            {
              id: this.state.patientId,
              enabled: false
            },
            true
          );
        });
        this.setState(
          {
            patientId: "",
            delete: false,
            message: "Paciente excluído!"
          },
          () => {
            this._openDBPatients();
          }
        );
      }
      const patients = realm
        .objects(patientSchema.name)
        .filtered("enabled = true");
      this.setState({
        ...this.state,
        data: [...this.state.data, ...patients]
      });
    });
  };

  _deletePatient = patient => {
    this.setState(
      {
        delete: true,
        patientId: patient
      },
      () => {
        this._openDBPatients();
      }
    );
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.list}>
        <View>
          <View style={styles.patient}>
            <Icon
              style={styles.icon}
              name="user-injured"
              size={18}
              color="#000"
            />
            <Text style={styles.listText}>{item.name}</Text>
          </View>
          <View style={styles.hospital}>
            <Icon style={styles.icon} name="hospital" size={18} color="#000" />
            <Text style={styles.listText}>{item.hospital}</Text>
          </View>
        </View>
        <ButtonIcon
          color="#fff"
          style={styles.buttonDelete}
          name="times"
          size={15}
          onPress={() => this._deletePatient(item.id)}
        />
      </View>
    );
  };

  _handlePress() {
    const {
      navigation: { navigate }
    } = this.props;

    navigate("Create");
  }

  render() {
    const { navigation } = this.props;
    const { data, message } = this.state;
    return (
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          {message !== "" && <Text style={styles.success}>{message}</Text>}
          {navigation.getParam("success") ? (
            <Text style={styles.success}>{navigation.getParam("success")}</Text>
          ) : null}
          {navigation.getParam("error") ? (
            <Text style={styles.error}>{navigation.getParam("error")}</Text>
          ) : null}
          {data.length ? (
            <View style={styles.flatListView}>
              <ScrollView>
                <FlatList
                  keyExtractor={item => item.id}
                  data={this.state.data}
                  renderItem={this.renderItem}
                />
              </ScrollView>
            </View>
          ) : null}
          <View style={styles.buttonView}>
            <ButtonIcon
              color="#fff"
              style={styles.button}
              name="plus"
              size={18}
              onPress={this._handlePress}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
