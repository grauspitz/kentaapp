import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  LoginScreen  from './page/login';
import  ListScreen  from './page/person';
import  MoreScreen  from './page/more';
import  PersonScreen  from './page/list';
import  AttentionScreen  from './page/attention';
import  RouterScreen  from './router';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();


function App() {
  setTimeout(()=>{ SplashScreen.hide()}, 100)
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Login"
      headerMode="none"           
      screenOptions={{               
        title: '总路由',
        headerStyle: {
          backgroundColor: '#ee7530',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        }
      }}
      >
        <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        // headerMode="none"
        />
         <Stack.Screen 
        	name="RouterScreen" 
          component={RouterScreen}
          headerMode="screen"
          options={({ route }) => ({ title: route.params.name })}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


