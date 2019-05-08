import { createStackNavigator } from "react-navigation";
import { Patients, Create } from "../screens";
import { theme } from "../styles";

const AppStackNavigator = createStackNavigator(
  {
    Patients: {
      screen: Patients,
      navigationOptions: () => ({
        title: "Lista de Pacientes"
      })
    },
    Create: {
      screen: Create,
      navigationOptions: () => ({
        title: "Cadastrar Paciente"
      })
    }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.primary
      }
    }
  }
);

export default AppStackNavigator;
