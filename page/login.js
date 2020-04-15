import React, { useState, useEffect ,Component}  from 'react';
import {
  Platform,
  Animated,
  Keyboard,
  ScrollView,
  ImageBackground,
  View,
   Text,
   TextInput,
   StyleSheet,
   Image,
   PixelRatio,
   NativeModules,
 } from 'react-native';
import Button from '../component/Button';
import Toast, {DURATION} from 'react-native-easy-toast'
import Spinner from 'react-native-loading-spinner-overlay';
import JPush from 'jpush-react-native';
import moment from 'moment';
import momentLocale from 'moment/locale/zh-cn';
import io from 'socket.io-client';
import _ from 'lodash'


moment.updateLocale('zh-cn', momentLocale);
const JPushModule = NativeModules.JPushModule
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});



export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.socket = io('https://www.kenta.cn:8892');
    this.state = {
      username: '',
      password: '',
      spinner: false
    };
  }

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',this.keyboardDidShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',this.keyboardDidHide);
    JPushModule.init()
    // 别名事件回调
    this.tagAliasListener = result => {
      console.log("别名事件回调:" + JSON.stringify(result))
    };
}
//注销监听
componentWillUnmount () {
    this.keyboardWillShowListener && this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener && this.keyboardWillHideListener.remove();
    this.socket.emit('postid', '5e9527f2072e2c99a8d5999b');
}

//键盘弹起后执行
keyboardDidShow = () =>  {
    this._scrollView.scrollTo({x:0, y:100, animated:true});
}

//键盘收起后执行
keyboardDidHide = () => {
    this._scrollView.scrollTo({x:0, y:0, animated:true});
}
  render() {
    return (
<ImageBackground source={require('../img/loginbg.jpg')} style={{width: '100%', height: '100%'}}>
<Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
<Toast
    ref="toast"
    style={{backgroundColor:'#D8D8D8'}}
    position='top'
    positionValue={200}
    fadeInDuration={750}
    fadeOutDuration={1000}
    opacity={0.9}
    textStyle={{color:'black'}}
  />
<View style={styles.view}>
  <View style={styles.content}>
  <Image resizeMode='contain' source={require('../img/logo.png')} style={{ width: '100%', height: '100%'}}/>
  </View>
  <ScrollView ref={component => this._scrollView=component} scrollEnabled={false}
                        keyboardShouldPersistTaps="always">
  <View style={styles.editGroup}>
    <View style={styles.username}>
      <TextInput
        style={styles.edit}
        placeholder="用户名"
        placeholderTextColor="#c4c4c4"
        onChangeText={(text) => this.setState({text})}
        />
    </View>
    <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
      <View style={styles.password}>
        <TextInput
        style={styles.edit}
        placeholder="密码"
        placeholderTextColor="#c4c4c4"
        secureTextEntry={true}
        onChangeText={(password) => this.setState({password})}
        />
      </View>
      <View style={{marginTop: 10}}>
        <Button text="登录" onPress={this._handleClick.bind(this)}/>
      </View>
  </View>
  </ScrollView>
</View>
</ImageBackground>
    );
  }

  async _handleClick() {
    this.setState({
      spinner: true
    });
    console.log('username:' + this.state.text);
    console.log('password:' + this.state.password);
  let url =  "https://www.kenta.cn/app3/wp-admin/admin-ajax.php?action=login&username="+this.state.text+"&password="+this.state.password
 return fetch(url)
 .then((response) => response.json())
 .then((responseJson) => {
   if(responseJson.status=="error"){
    this.setState({
      spinner: false
    });
    this.refs.toast.show('密码错误!');
   }else{
   console.log("登录成功!",responseJson.status)
   global.userinfo = responseJson;
    this.setState({
      spinner: false,
      responseJson:responseJson
    });
     this.props.navigation.navigate('RouterScreen', {
      otherParam: responseJson,
    })
    var usernumber =global.userinfo.userMeta.hr_info.userid;
    // 设置别名
    JPush.setAlias({sequence:1,alias:usernumber})
    var username =global.userinfo.userMeta.nickname;
    var department =global.userinfo.userMeta.hr_info.横向部门;
    var gender =global.userinfo.userMeta.hr_info.身份证信息性别;
    var Hometown =global.userinfo.userMeta.hr_info.身份证信息常住地址.slice(0,3);
    // 设置标签
    JPushModule.setTags({sequence:1,tags:["Kenta",username,department,gender,Hometown]})
    var now=moment().format("YYYY-MM-DD HH:mm:ss");
    var obj ={
      "工号":usernumber,
      "提交时间":now,
      "标签":[username,department,gender,Hometown]
    }
    var post = {
      title:'AppTag',
      description:'AppTag',
      formtag:'AppTag',
      type: "collecteddata",
      poststatus:'abled',
      templateid:'5e9527f2072e2c99a8d5999b',
      collectedData: obj,
      fortest:false
          };
    //查重
     this._Duplicate(usernumber,obj,post)
   }
   return responseJson;
 })
 .catch((error) => {
   console.error(error);
 });
}

 async _Duplicate(usernumber,obj,post) {
console.log("查询工号",usernumber)
let url =  "https://www.kenta.cn:8892/type=getcollecteddata?id=5e9527f2072e2c99a8d5999b"
   try {
     const response = await fetch(url);
     const responseJson = await response.json();
     if (responseJson.status == "error") {
       this.refs.toast.show('tag查询失败!');
     }
     else {
       console.log("tag查询成功!");
       let _this = this;
       if(responseJson.length==0){
        this.socket.emit('collecteddata', post);
       }else{
         var markmsg=0
        _.map(responseJson,function(value){
          if (value.collectedData.工号 == usernumber) {
            markmsg+=1
            _this.socket.emit('updatePostId', value._id,{collectedData:obj});
             console.log("已存在人员,修改", usernumber);
          }
         })
         console.log("重复数量",markmsg)
         if(markmsg==0){
          _this.socket.emit('collecteddata',post);
         }
       }
     }
     return responseJson;
   }
   catch (error) {
     console.error(error);
   }
}
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
    content:{
    marginTop:100,
    height: 100,
    alignItems:'center',
    justifyContent:'center',
    },
  view: {
    flex: 1,
    // backgroundColor: 'rgb(22,131,251)',
  },
  editGroup: {
    margin: 20,
  },
  username: {
    marginTop: 100,
    height: 48,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  password: {
    height: 48,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  edit:{
    height: 40,
    fontSize: 13,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
  },
});

