import { View, Text, SafeAreaView, StatusBar, Platform } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import APP from "./src/App"
import { NativeBaseProvider } from 'native-base';
import LoginScreen from './src/screens/LoginScreen';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <SafeAreaView

          style={{
            paddinTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1,
            backgroundColor: "white",

          }}
        >
          <StatusBar
            backgroundColor={"white"}
            barStyle={"dark-content"}
            translucent={false}
          />
          {/* <APP></APP> */}
          {/* <HomeScreen></HomeScreen> */}

          {/* <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
        </Stack.Navigator> */}



          <Stack.Navigator>

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="App"
              component={APP}
              options={{ headerShown: false }}
            />



          </Stack.Navigator>


        </SafeAreaView>
      </NavigationContainer>
    </NativeBaseProvider>




  )
}

export default App







