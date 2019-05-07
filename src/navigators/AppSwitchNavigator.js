import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthStackNavigator from "./AuthStackNavigator";
import AppStackNavigator from "./AppStackNavigator";
import { theme } from "../styles";

const AppSwitchNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStackNavigator,
      Home: AppStackNavigator
    },
    {
      initialRouteName: "Auth"
    }
  )
);

export default AppSwitchNavigator;
