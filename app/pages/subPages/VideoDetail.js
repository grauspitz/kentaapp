import React, { PureComponent } from 'react' 
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
}from 'react-native'

const {width: screenWidth, height:screenHeight} = Dimensions.get('window')

export default class VideoDetail extends PureComponent {
    
    constructor(props){
        super(props);

        this.state = {
            isFullScreen: false,
            voteCount: 0,
            isVote: false
        }
    }

   

  
  



   
    render(){
        return(
            <View style={styles.container} >
               
           
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoInfoContainer:{
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    infoTopContainer:{
        flexDirection: 'row',
        minHeight: 60,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    infoTitle:{
        color: '#000',
        fontSize: 16,
        maxWidth: screenWidth * 0.8,
        lineHeight: 28,
    },
    infoRight: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 60,
        height: 40,
        marginLeft: 20,
        borderLeftColor: '#bfbfbf',
        borderLeftWidth: 1,
    },
    infoZoveImg: {
        width: 20,
        height: 20,
    },
    infoZoveText: {
        fontSize: 12,
    },
    vedioPlayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    vedioUserContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    vedioUserImg: {
        width: 26,
        height: 26,
        borderRadius: 26,
        marginRight: 5
    },
    subscriptionBtn: {
        width: 70,
        height: 30,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})