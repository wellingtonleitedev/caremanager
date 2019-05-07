import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../styles";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  safearea: {
    flex: 1
  },
  header: {
    backgroundColor: theme.colors.secondary,
    padding: 20,
    height: 170,
    width: width
  },
  headerText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },
  container: {
    alignItems: "center",
    backgroundColor: "#1D2331",
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  formView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    position: "absolute",
    width: width - 40,
    zIndex: 999
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 20
  },
  button: {
    borderRadius: 100
  }
});
