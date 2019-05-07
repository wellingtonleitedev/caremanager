import React, { Component } from "react";
import { View, Text, FlatList, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
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
    data: []
  };

  async componentDidMount() {
    this._getPatients();
    console.tron.log(await AsyncStorage.getItem('@user'))
  }

  _getPatients = () => {
    Realm.open({
      schema: [patientSchema],
      deleteRealmIfMigrationNeeded: true
    }).then(realm => {
      const patients = realm
        .objects(patientSchema.name)
        .filtered("enable = true");
      this.setState({
        ...this.state,
        data: [...this.state.data, ...patients]
      });
    });
  };

  _deletePatient = patient => {
    Realm.open({
      schema: [patientSchema]
    }).then(realm => {
      realm.write((realm) => {
        realm.create(
          {
            id: patient,
            enabled: false
          },
          true
        );
      });

      console.tron.log(realm)
    })
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.list}>
        <View>
          {item.enabled && <Text style={{ color: "#f00" }}>TRUE</Text>}
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
    const { data } = this.state;
    return (
      <SafeAreaView style={styles.safearea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Pacientes</Text>
          {navigation.getParam("success") ? (
            <Text>{navigation.getParam("success")}</Text>
          ) : null}
          {navigation.getParam("error") ? (
            <Text>{navigation.getParam("error")}</Text>
          ) : null}
        </View>
        <View style={styles.container}>
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
