import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

let STORAGE_KEY = '@idade_usario';




export default function App() {

  const [input, setInput] = useState('');
  const saveData = async (idade) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, idade)
      alert('Data successfully saved')
    } catch (e) {
      console.log(e)
      alert('Failed to save the data to the storage')
    }
  }

  useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);

      if (value !== null) {
        setInput(value);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  }

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert('Storage successfully cleared!');
    } catch (e) {
      alert('Failed to clear the async storage.');
    }
  }

  const deleteAge = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.log(error.message);
    }
  }

  const onChangeText = value => setInput(value);

  const onSubmitEditing = () => {
    if (!input) return;

    saveData(input);
    setInput('');
  }

  return (
    <View style={styles.container}>
      <View >
        <Text>AsyncStorage React Native</Text>
      </View>
      <View >
        <Text >Enter your input here:</Text>
        <TextInput
          value={input}
          placeholder="Enter"
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        <Text >Your input is {input}</Text>
        <Pressable onPress={clearStorage}>
          <Text>Clear Storage</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
