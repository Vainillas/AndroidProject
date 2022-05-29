/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React from 'react';
import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import List from './src/components/List';
import Detail from './src/components/Detail';


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <View style={[backgroundStyle,styles.container]}>
        <List/>
        <Detail/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

export default App;
