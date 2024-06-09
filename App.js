import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import * as Speech from 'expo-speech';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import SettingsScreen from './SettingsScreen';
import SplashScreenComponent from './SplashScreen';

const Stack = createStackNavigator();

function HomeScreen({ route, navigation }) {
  const [newWord, setNewWord] = useState("");
  const [checkedWord, setCheckedWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [loading, setLoading] = useState(false);
  const [backgroundId, setBackgroundId] = useState(1);

  const backgrounds = {
    1: require('./assets/background1.jpg'),
    2: require('./assets/background2.jpg'),
    3: require('./assets/background3.jpg'),
  };

  useEffect(() => {
    if (route.params?.backgroundId) {
      setBackgroundId(route.params.backgroundId);
    }
  }, [route.params?.backgroundId]);

  function searchWord(enteredWord) {
    setNewWord(enteredWord);
  }

  const getInfo = () => {
    setLoading(true);
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord;

    return fetch(url)
      .then((data) => data.json())
      .then((response) => {
        if (response.title && response.title === "No Definitions Found") {
          setCheckedWord("No Definitions Found");
          setDefinition("");
          setExample("");
        } else {
          var word = response[0].word;
          setCheckedWord(word);

          var def = response[0].meanings[0].definitions[0].definition;
          setDefinition(def);

          var eg = response[0].meanings[0].definitions[0].example;
          setExample(eg);
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const speak = () => {
    if (checkedWord) {
      Speech.speak(checkedWord);
    }
  };

  const clear = () => {
    setCheckedWord("");
    setDefinition("");
    setExample("");
    setNewWord("");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgrounds[backgroundId]}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={{ flex: 0.3 }}>
          <Image
            source={require("./assets/Dictionary.png")}
            style={styles.imageDesign}
          />
        </View>

        <View style={{ flex: 0.7 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter the word"
              placeholderTextColor={"rgba(0,0,0,0.7)"}
              textAlign="center"
              clearButtonMode="always"
              onChangeText={searchWord}
              value={newWord}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "60%",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={getInfo}
              >
                <Text style={styles.buttonText}>Search</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={clear}
              >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={speak}
              >
                <Image
                  style={styles.speakerButton}
                  source={require("./assets/speaker.png")}
                />
              </TouchableOpacity>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#074eb8" />
            ) : (
              <View>
                <Text style={styles.textDesign}>Entered word: {checkedWord}</Text>
                <Text style={styles.textDesign}>Definition: {definition}</Text>
                <Text style={styles.textDesign}>Example: {example}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.settingsButton, { marginTop: 20 }]}
              onPress={() => navigation.navigate('Settings')}
            >
              <Image style={styles.settingsButton}
                source={require("./assets/settings.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        
        await new Promise(resolve => setTimeout(resolve, 2000)); 
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <SplashScreenComponent />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageDesign: {
    width: "75%",
    height: "120%",
    marginLeft: 50,
    marginTop: 30,
  },
  inputBox: {
    width: "90%",
    height: 40,
    borderRadius:15,
    borderWidth: 4,
    borderColor: "#074eb8",
    marginTop: 100,
    fontSize: 20,
  },
  buttonDesign: {
    backgroundColor: "#5f5f5f",
    width: 90,
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 5,
    color: "#fff",
  },
  speakerButton: {
    width: 40,
    height: 40,
    borderRadius:10,
  },
  settingsButton: {
    width: 60,
    height: 60,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
  },  
  textDesign: {
    fontSize: 20,
    backgroundColor: "#074eb8",
    marginTop: 5,
    alignSelf: "center",
    color: "#fff",
  },
});
