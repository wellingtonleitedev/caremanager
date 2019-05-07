import { createStackNavigator } from "react-navigation";
import { Signin, AuthLoading } from "../screens";

const AuthStackNavigator = createStackNavigator({
  Auth: {
    screen: AuthLoading,
    navigationOptions: () => ({
      header: null
    })
  },
  Signin: {
    screen: Signin,
    navigationOptions: () => ({
      header: null
    })
  }
});

export default AuthStackNavigator;
