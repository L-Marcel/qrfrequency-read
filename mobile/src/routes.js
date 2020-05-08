import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View } from 'react-native';

const AppStack = createStackNavigator();

import Login from './pages/Login';
import Profile from './pages/Profile';
import QRRead from './pages/QRRead';
import Justify from './pages/Justify';

export default function Routes(){
    return(
        <NavigationContainer>
            <StatusBar backgroundColor="#ffffff" barStyle={'dark-content'} ></StatusBar>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                
                <AppStack.Screen name="Login" component={Login}></AppStack.Screen>
                <AppStack.Screen name="Profile" component={Profile}></AppStack.Screen>
                <AppStack.Screen name="Read" component={QRRead}></AppStack.Screen>
                <AppStack.Screen name="Justify" component={Justify}></AppStack.Screen>

            </AppStack.Navigator>
        </NavigationContainer>
    );
}