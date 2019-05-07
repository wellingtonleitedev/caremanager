import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const ButtonIcon = props => (
  <View>
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon name={props.name} color={props.color} size={props.size} />
    </TouchableOpacity>
  </View>
);

export default ButtonIcon;
