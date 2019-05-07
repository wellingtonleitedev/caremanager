import { StyleSheet } from "react-native";
import { theme } from "../../styles";

export default StyleSheet.create({
  container: {
    backgroundColor: "#1D2331",
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  imageView: {
    alignSelf: "center",
    marginBottom: 50
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 20
  },
  button: {
    backgroundColor: theme.colors.secondary
  }
});
