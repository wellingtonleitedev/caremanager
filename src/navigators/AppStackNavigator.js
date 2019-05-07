import { createStackNavigator } from "react-navigation";
import { Patients, Create } from "../screens";
import { theme } from "../styles";

const AppStackNavigator = createStackNavigator({
  Patients: {
    screen: Patients,
    navigationOptions: () => ({
      header: null
    })
  },
  Create: {
    screen: Create,
    navigationOptions: () => ({
      title: "Cadastrar Paciente"
    })
  }
});

export default AppStackNavigator;
