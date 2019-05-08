import React, { Component } from "react";
import { View, Image, ActivityIndicator, StatusBar } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { theme } from "../../styles";

export class AuthLoading extends Component {
  componentDidMount() {
    this._verifyStore();
  }

  _verifyStore = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    try {
      const user = await AsyncStorage.getItem("@user");

      if (user !== null) {
        navigate("Home");
      } else {
        navigate("Signin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageView}
          source={require("../../../assets/hospital.png")}
        />
        <ActivityIndicator style={styles.loadingIndicator} />
      </View>
    );
  }
}
