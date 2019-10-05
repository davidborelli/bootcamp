import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  // In development environment does not run
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
