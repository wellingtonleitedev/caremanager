import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import styles from "./styles";

const LoadingView = () => (
  <View style={styles.container}>
    <Text style={styles.loadingText}>Carregando...</Text>
    <ActivityIndicator style={styles.loadingIndicator} />
  </View>
);

export default LoadingView;
