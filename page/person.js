import React, {Component} from 'react';
import {Keyboard,ScrollView,ImageBackground,View, Text, TextInput, StyleSheet, Image, PixelRatio, } from 'react-native';
import Button from '../component/Button';
import { StackNavigator } from 'react-navigation'
import JPush from 'jpush-react-native';




export default class PersonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo:global.userinfo
    };
  }
  UNSAFE_componentWillMount(){
    let username=this.state.userinfo.userDetail.data.user_login
    // console.log("用户名1",username)
    this.setState({
      username:username
    })
  }
  componentDidUpdate() {
   
}
  render() {
    // console.log("用户名2",this.state.username)
    return (
<View style={styles.view}>
<View style={styles.con}>
      <Text style={styles.text}>更多</Text>
  </View>
  <View style={styles.content}>
  <Image resizeMode='contain'  source={{uri:'https://www.kenta.cn/app3/data/avatar/'+this.state.username+'.jpg'}} style={{ width: '100%', height: '100%'}}/>
  <Text>{this.state.username}</Text>
  </View>
  <View style={styles.editGroup}>
    <View style={{height: 1/PixelRatio.get(), }}/>
      <View style={{marginTop: 10}}>
        <Button text="注销" onPress={() =>{
          JPush.deleteAlias({sequence: 7})
          this.props.navigation.navigate('LoginScreen', {otherParam: 'anything you want here',})
          fetch("https://www.kenta.cn/app3/wp-admin/admin-ajax.php?action=logout")
        }}/>
      </View>
  </View>
</View>
    );
  }
}



const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  content:{
  marginTop:100,
  height: 100,
  alignItems:'center',
  justifyContent:'center',
  },

editGroup: {
  margin: 20,
},
edit:{
  height: 40,
  fontSize: 13,
  backgroundColor: '#fff',
  paddingLeft: 15,
  paddingRight: 15,
},
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
