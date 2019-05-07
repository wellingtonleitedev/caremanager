import React, { Component } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";

export class AuthLoading extends Component {
  componentDidMount() {
    setTimeout(() => {
      this._verifyStore();
    }, 5000);
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
