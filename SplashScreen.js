import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const SplashScreenComponent = () => {
  useEffect(() => {
    async function hideSplashScreen() {
      // Simulate some loading work
      await new Promise(resolve => setTimeout(resolve, 3000));
      SplashScreen.hideAsync();
    }

    hideSplashScreen();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/splash.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default SplashScreenComponent;
