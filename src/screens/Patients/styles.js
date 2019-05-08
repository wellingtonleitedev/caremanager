import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../styles";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  safearea: {
    flex: 1
  },
  container: {
    alignItems: "center",
    backgroundColor: "#1D2331",
    flex: 1,
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  success: {
    color: theme.colors.success,
    fontSize: 15
  },
  error: {
    color: theme.colors.error,
    fontSize: 15
  },
  flatListView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 20,
    width: width - 40
  },
  list: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  patient: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row"
  },
  hospital: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row"
  },
  icon: {
    marginBottom: 5,
    marginRight: 10
  },
  listText: {
    color: "#999"
  },
  buttonView: {
    alignSelf: "flex-end"
  },
  buttonDelete: {
    alignItems: "center",
    backgroundColor: "#f00",
    borderRadius: 100,
    justifyContent: "center",
    padding: 10,
    height: 40,
    width: 40
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.secondary,
    borderRadius: 100,
    justifyContent: "center",
    padding: 10,
    height: 50,
    width: 50
  }
});
