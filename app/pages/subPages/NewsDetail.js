import React, { PureComponent } from 'react' 
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    Button,
    View,
    Alert,
    Image,
    ScrollView,
}from 'react-native'


const {width: sreenWidth, height: screenHeight} = Dimensions.get('window')

export default class NewsDetail extends PureComponent {

    constructor(props){
        super(props);

        this.state = {
            newsData: '',
            body: '',
        }
    }

    _renderNode(node, index, siblings, parent, defaultRender){
        if (node.name === 'img'){
            const a = node.attribs
            return(
                <Image source={{uri:a.src}} key={index} resizeMode={'stretch'} style={{flex:1, height:230, marginBottom:35}} />
            )
        }
    }

  

  

    render(){
        return(
            <View style={styles.container}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
});

const htmlStyles = StyleSheet.create({
    p: {
        color: '#2c2c2c',
        lineHeight: 30,
        fontSize:16
    }
});