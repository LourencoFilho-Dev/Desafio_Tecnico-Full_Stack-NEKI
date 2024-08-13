import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather'; 

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator para a HomeScreen
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Skills') {
            iconName = 'list'; 
          } else if (route.name === 'Profile') {
            iconName = 'user'; 
          } else {
            // Lidando com rotas desconhecidas (opcional)
            iconName = 'help-circle'; 
          }

          return <Icon name={iconName} size={size} color={color} />;
        },

        // Migrando as opções de tabBarOptions para screenOptions
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [{ display: 'flex' }, null], 
      })}
    >
      <Tab.Screen name="Skills" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeTabs} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
