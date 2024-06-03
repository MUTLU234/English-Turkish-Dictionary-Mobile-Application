import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ImageBackground } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'react-native';
import * as Speech from 'expo-speech';
export default function App() {
  const [newWord, setNewWord] = useState("");
  const [checkedWord, setCheckedWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");

 

  //AppRegistry.registerComponent(appName, () => App);

  function searchWord(enteredWord) {
    setNewWord(enteredWord);
  }

  getInfo = () => {
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord;

    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var word = response[0].word;
        setCheckedWord(word);

        var def = response[0].meanings[0].definitions[0].definition;
        setDefinition(def);

        var eg = response[0].meanings[0].definitions[0].example;
        setExample(eg);
      });
  };

  const speak = () => {
    Speech.speak(checkedWord);
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
        source={require("./assets/dictBkg.jpeg")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={{ flex: 0.3 }}>
          <Image
            source={require("./assets/dict.png")}
            style={styles.imageDesign}
          />
        </View>

        <View style={{ flex: 0.7 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TextInput
              style={styles.inputBox}
              placeholder="search a word"
              placeholderTextColor={"rgba(0,0,0,0.7)"}
              textAlign="center"
              clearButtonMode="always"
              onChangeText={searchWord}
              value={newWord}
            ></TextInput>

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
                onPress={() => {
                  getInfo();
                }}
              >
                <Text style={styles.buttonText}>Go !</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDesign}
              
              onPress={()=>{
                clear();
              }}
              >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  speak();
                }}
              >
                <Image
                  style={styles.speakerButton}
                  source={require("./assets/speaker.png")}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.textDesign}>
                Entered Word :{checkedWord}{" "}
              </Text>
              <Text style={styles.textDesign}>Definition : {definition} </Text>
              <Text style={styles.textDesign}>Example : {example} </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  imageDesign: {
    width: "80%",
    height: "120%",
    marginLeft: 50,
    marginTop: 30,
  },
  inputBox: {
    width: "80%",
    height: 50,
    borderWidth: 5,
    borderColor: "rgba(80, 235, 236 ,1)",
    marginTop: 100,
    fontSize: 25,
  },
  buttonDesign: {
    backgroundColor: "rgba(80, 235, 236,0.3)",
    width: 80,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 25,
    alignSelf: "center",
    marginTop: 5,
  },
  speakerButton: {
    width: 50,
    height: 40,
  },
  textDesign: {
    fontSize: 25,
    backgroundColor: "rgba(80, 235, 236,0.3)",
    marginTop: 10,
    alignSelf: "center",
  },
});