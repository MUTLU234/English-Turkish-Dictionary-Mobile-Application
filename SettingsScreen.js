import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

const backgrounds = [
  { id: 1, image: require('./assets/background1.jpg') },
  { id: 2, image: require('./assets/background2.jpg') },
  { id: 3, image: require('./assets/background3.jpg') },
];

const SettingsScreen = ({ navigation }) => {
  const [selectedBackground, setSelectedBackground] = useState(1);
  const [currentBackground, setCurrentBackground] = useState(backgrounds[0].image);

  const selectBackground = (id) => {
    setSelectedBackground(id);
    const bg = backgrounds.find((bg) => bg.id === id);
    setCurrentBackground(bg.image);
  };

  const resetSettings = () => {
    setSelectedBackground(1);
    setCurrentBackground(backgrounds[0].image);
  };

  useEffect(() => {
    const bg = backgrounds.find((bg) => bg.id === selectedBackground);
    setCurrentBackground(bg.image);
  }, [selectedBackground]);

  return (
    <ImageBackground source={currentBackground} style={styles.container}>
      <Text style={styles.text}>Options</Text>
      
      <Text style={styles.text}>Select Background:</Text>
      <View style={styles.backgroundSelector}>
        {backgrounds.map((bg) => (
          <TouchableOpacity key={bg.id} onPress={() => selectBackground(bg.id)}>
            <Image
              source={bg.image}
              style={[
                styles.backgroundOption,
                selectedBackground === bg.id && styles.selectedBackground,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Reset Settings" onPress={resetSettings} />

      <Button
        title="Apply Background"
        onPress={() => navigation.navigate('Home', { backgroundId: selectedBackground })}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
  },
  backgroundSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundOption: {
    width: 50,
    height: 80,
    margin: 10,
    borderWidth: 4,
    borderColor: 'transparent',
  },
  selectedBackground: {
    borderColor: '#228b22',
  },
});

export default SettingsScreen;
