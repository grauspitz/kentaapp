import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AttentionScreen from './page/attention';
import ListScreen from './page/list';
import PersonScreen from './page/person';
import MoreScreen from './page/more';

function AttentionIcon(props) {
  if (props.focused) {
      return (
          <Image source={require('./img/公告点击.png')} style={props.style}></Image>
      )
  } else {
      return (
          <Image source={require('./img/公告.png')} style={props.style}></Image>
      )
  }
}
function ListIcon(props) {
  if (props.focused) {
      return (
          <Image source={require('./img/列表点击.png')} style={props.style}></Image>
      )
  } else {
      return (
          <Image source={require('./img/列表.png')} style={props.style}></Image>
      )
  }
}
function MoreIcon(props) {
  if (props.focused) {
      return (
          <Image source={require('./img/更多点击.png')} style={props.style}></Image>
      )
  } else {
      return (
          <Image source={require('./img/更多.png')} style={props.style}></Image>
      )
  }
}
function PersonIcon(props) {
  if (props.focused) {
      return (
          <Image source={require('./img/个人点击.png')} style={props.style}></Image>
      )
  } else {
      return (
          <Image source={require('./img/个人.png')} style={props.style}></Image>
      )
  }
}


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function App() {
  return (
      <Tab.Navigator 
      headerMode="screen"
      tabBarOptions={{
        activeTintColor: '#e5514d',
        inactiveTintColor: '#8a8a8a',
      }}
      >
      <Stack.Screen 
          name="AttentionScreen" 
          component={AttentionScreen}
        	options={{
          tabBarLabel: '关注',
          tabBarIcon: ({ focused,color, size }) => (
            <AttentionIcon style={{ width: size, height: size }} focused={focused} />
        )
      }} 
          /> 
        <Stack.Screen 
        	name="ListScreen" 
        	component={ListScreen}
          options={{
            tabBarLabel: '项目列表',
            tabBarIcon: ({ focused,color, size }) => (
              <ListIcon style={{ width: size, height: size }} focused={focused} />
          )
        }} 
          />
             <Stack.Screen 
        	name="PersonScreen" 
        	component={PersonScreen}
          options={{
            tabBarLabel: '个人中心',
            tabBarIcon: ({ focused,color, size }) => (
              <PersonIcon style={{ width: size, height: size }} focused={focused} />
          )
        }} 
          />
            <Stack.Screen 
        	name="MoreScreen" 
        	component={MoreScreen}
          options={{
            tabBarLabel: '更多',
            tabBarIcon: ({ focused,color, size }) => (
              <MoreIcon style={{ width: size, height: size }} focused={focused} />
          )
        }} 
          />
     </Tab.Navigator>
  );
}
export default App;




