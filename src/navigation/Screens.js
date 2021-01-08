import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from '../views/screens/Landing';
import LoginScreen from '../views/screens/Login';
import RegistrationScreen from '../views/screens/Register';
import AppHome from '../views/screens/AppHome';
import PublicChat from '../views/screens/PublicChat';
import Chat from '../views/screens/Chat';
import EntityChat from '../views/screens/EntityChat';
import Language from '../views/screens/Language';

const Stack = createStackNavigator();

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegistrationScreen}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppHome} />
      <Stack.Screen name="PublicChat" component={PublicChat} />
      <Stack.Screen name="EntityChat" component={EntityChat} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Language" component={Language} />
    </Stack.Navigator>
  );
}
