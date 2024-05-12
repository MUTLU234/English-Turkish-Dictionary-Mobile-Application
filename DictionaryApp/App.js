import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import LoginSigninScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
// import firebase from "firebase/app";
// import "firebase/auth"


// const firebaseConfig = {
//   apiKey: "AIzaSyAPHgk6RnF1KBAoYGAFSbHFox4gce_aOcU",
//   authDomain: "dictionary-e7247.firebaseapp.com",
//   projectId: "dictionary-e7247",
//   storageBucket: "dictionary-e7247.appspot.com",
//   messagingSenderId: "762657350301",
//   appId: "1:762657350301:web:2b142a2cca30360f7dea74"
// };

// firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
