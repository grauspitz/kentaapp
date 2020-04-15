import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  NativeModules,
  DeviceEventEmitter
} from 'react-native';
import JPush from 'jpush-react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  setBtnStyle: {
    width: 320,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3e83d7',
    borderRadius: 8,
    backgroundColor: '#3e83d7',
    padding: 10
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 25,
    color: '#ffffff'
  }
});

class Button extends React.Component {
  render() {
    return <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor='#e4083f'
        activeOpacity={0.5}
    >
      <View
          style={styles.setBtnStyle}>
        <Text
            style={styles.textStyle}>
          {this.props.title}
        </Text>
      </View>
    </TouchableHighlight>
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    JPush.init();
    //连接状态
    this.connectListener = result => {
      console.log("connectListener:" + JSON.stringify(result))
    };
    JPush.addConnectEventListener(this.connectListener);
    //通知回调
    this.notificationListener = result => {
      console.log("notificationListener:" + JSON.stringify(result))
    };
    JPush.addNotificationListener(this.notificationListener);
    //本地通知回调
    this.localNotificationListener = result => {
      console.log("localNotificationListener:" + JSON.stringify(result))
    };
    JPush.addLocalNotificationListener(this.localNotificationListener);
    //自定义消息回调
    this.customMessageListener = result => {
      console.log("customMessageListener:" + JSON.stringify(result))
    };
    JPush.addCustomMessagegListener(this.customMessageListener);
    //tag alias事件回调
    this.tagAliasListener = result => {
      console.log("别名事件回调:" + JSON.stringify(result))
    };
    JPush.addTagAliasListener(this.tagAliasListener);
    //手机号码事件回调
    this.mobileNumberListener = result => {
      console.log("mobileNumberListener:" + JSON.stringify(result))
    };
    JPush.addMobileNumberListener(this.mobileNumberListener);
  }
  render() {
    return (
        <View style={styles.container}>
          <ScrollView>
            <Button title="setLoggerEnable"
                    onPress={() => JPush.setLoggerEnable(true)
                    }/>

            <Button title="获取id"
                    onPress={() => JPush.getRegistrationID(result =>
                        console.log("registerID:" + JSON.stringify(result))
                    )}/>
            <Button title="添加标签"
                    onPress={() => JPush.addTags({sequence: 1, tags: ["cui1", "cui2", "cui3"]})}/>
            <Button title="升级标签"
                    onPress={() => JPush.updateTags({sequence: 2, tags: ["cui4", "cui5", "cui6"]})}/>
            <Button title="删除指定标签"
                    onPress={() => JPush.deleteTag({sequence: 3, tags: ["cui4"]})}/>
            <Button title="删除所有标签"
                    onPress={() => JPush.deleteTags({sequence: 4})}/>
            <Button title="获取指定标签"
                    onPress={() => JPush.queryTag({sequence: 4, tag: "1"})}/>
            <Button title="获取所有标签"
                    onPress={() => JPush.queryTags({sequence: 5})}/>
            <Button title="设置别名"
                    onPress={() => JPush.setAlias({sequence: 6,alias:"cuitao"})}/>
            <Button title="删除别名"
                    onPress={() => JPush.deleteAlias({sequence: 7})}/>
            <Button title="获取别名"
                    onPress={() => JPush.queryAlias({sequence: 8})}/>
            <Button title="设置移动手机号"
                    onPress={() => JPush.setMobileNumber({mobileNumber: "13888888888"})}/>
            <Button title="添加本地事件"
                    onPress={() => JPush.addLocalNotification({
                      messageID: "37", //发送本地通知必须存在：messageID
                      title: "标题啦啦",
                      content: "内容133",
                      extras: {"key123": "value123"}  //附加内容
                    })}/>

            {/*<Button title="setBadge"*/}
            {/*        onPress={() => JPush.setBadge({"badge":1,"appBadge":1})}/>*/}
            {/*<Button title="initCrashHandler"*/}
            {/*        onPress={() => JPush.initCrashHandler()}/>*/}

            <Button title="移除本地指定事件"
                    onPress={() => JPush.removeLocalNotification({messageID: '37'})}/>
          </ScrollView>
        </View>
    );
  }

}