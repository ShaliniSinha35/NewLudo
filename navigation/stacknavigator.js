import { StyleSheet, Text, View } from "react-native";
import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../Screens/RegisterScreen";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from "../Screens/HomeScreen";
import GameScreen from "../Screens/GameScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";




const StackNavigator = () => {
  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator>
   
 <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />

<Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          /> 

        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});