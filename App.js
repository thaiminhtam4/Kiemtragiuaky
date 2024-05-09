import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import MyStack from './routers/MyStack';


const App = () => {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
};

export default App;