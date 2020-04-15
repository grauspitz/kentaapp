import React, {Component} from 'react';
import {Keyboard,ScrollView,ImageBackground,View, Text, TextInput, StyleSheet, Image, PixelRatio, } from 'react-native';
import Button from '../component/Button';
import { StackNavigator } from 'react-navigation'



export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',this.keyboardDidShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',this.keyboardDidHide);
}
  render() {
    return (
      <View style={styles.con}>
      <Text style={styles.text}>项目列表</Text>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  con: {
    justifyContent: 'center',
    alignItems:'center',
    height:60,
    backgroundColor:"#e5514d"
},
text: {
  fontSize: 20,
  color:"#fff",
  //不写下面两个，Android系统上文字会偏下
  includeFontPadding: false,
  textAlignVertical: 'center',    
}
});
