import Reactotron from "reactotron-react-native";

if (__DEV__) {
  const tron = Reactotron.configure({ host: "192.168.15.15" })
    .useReactNative() // add all built-in react native plugins
    .connect();

  console.tron = tron;

  tron.clear();
}
