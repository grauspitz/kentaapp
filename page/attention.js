
import React, { Component} from 'react';
import { View, Text, StyleSheet,Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast, {DURATION} from 'react-native-easy-toast';
import {Container,Header,List, Content, Button,ListItem, Left, Body, Right, Title} from 'native-base';
import { Overlay, Label, Select, Button as TButton} from 'teaset';
import JPush from 'jpush-react-native';
import _ from 'lodash'
 
export default class SetDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1,2,3,4,5],
      storeData:[]
    };
  }
  componentWillUnmount(){
  }

    componentDidMount() {
      this.readMsg()
          //通知回调
          var _this=this
          this.notificationListener = result => {
            console.log("result",result)
            var key=result.messageID
            var content="标题:"+result.title+",内容:"+result.content
            _this.setMsg(key,content)
            _this.readMsg()
          };
          JPush.addNotificationListener(this.notificationListener);
    }
  
async readMsg() {
        const value = await AsyncStorage.getAllKeys()
        console.log("全部的key",value)
        const storeData = await AsyncStorage.multiGet(value)
        console.log("本地数据",storeData)
        this.setState({storeData:storeData})
 }
 setMsg(title,content){
  AsyncStorage.setItem(title,content);
  console.log("保存成功!")
}
	  render(){
      console.log("渲染列表",this.state.storeData)
return(
   <Container>
        <Header style={{ backgroundColor: "#e5514d" }}
        androidStatusBarColor="#e5514d"
        iosBarStyle="light-content">
          <Left style={styles.flex}/>
          <Body style={styles.flex}>
            <Title>消息列表 </Title>
          </Body>
          <Right style={styles.flex}/>
        </Header>
        {_.map(this.state.storeData,function(n){
			            return (
                    <ListItem >
                      <Text>{n[0]}</Text>
                      <Text>{n[1]}</Text>
                    </ListItem>                    
			            );
			      })}
      </Container>
)
}
}
const styles = StyleSheet.create({
  flex:{
    flex: 1
  }
});