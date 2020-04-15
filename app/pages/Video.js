import React, { PureComponent } from 'react' 
import {
    TouchableOpacity,
    Text,
    View,
    Alert,
    StyleSheet,
    Dimensions,
    Image,
    StatusBar
}from 'react-native'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

export default class Video extends PureComponent {
    
    constructor(props) {
        super(props);
        
    }

    tabArr = [
        {columnName: '推荐', requestCode: 'home'},
        {columnName: '搞笑', requestCode: 'home'},
        {columnName: '影视', requestCode: 'home'},
        {columnName: '音乐', requestCode: 'home'},
        {columnName: '现场', requestCode: 'home'},
        {columnName: '黑科技', requestCode: 'home'},
        {columnName: '小品', requestCode: 'home'},
        {columnName: '萌物', requestCode: 'home'},
        {columnName: '猎奇', requestCode: 'home'},
        {columnName: '军武', requestCode: 'home'},
        {columnName: '涨姿势', requestCode: 'home'}
    ]

    render(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor={'rgba(255,255,255,0)'} translucent={true} animated={true} />

                <View style={styles.container}>
                   
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingTop: 10,
    },
    tabViewItemContainer: {
        flex: 1,
        backgroundColor: '#FFCCCC',
        justifyContent: 'center',
        alignItems: 'center'
    },
})