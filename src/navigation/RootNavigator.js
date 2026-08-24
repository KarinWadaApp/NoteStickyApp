import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NotebookScreen from '../screens/NotebookScreen';
import StickyCreateScreen from '../screens/StickyCreateScreen';
import StickyDetailScreen from '../screens/StickyDetailScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FAFAFA' }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Notebook" component={NotebookScreen} />
        <Stack.Screen name="StickyCreate" component={StickyCreateScreen} />
        <Stack.Screen name="StickyDetail" component={StickyDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
