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
    TextInput,
    TouchableOpacity,
}from 'react-native'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

export default class NewsSearch extends PureComponent {
    
    constructor(props) {
        super(props);
        
        this.state = {
            searchValue: this.props.navigation.state.params.keyword,
            placeholder: this.props.navigation.state.params.keyword
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
    container:{
        flex: 1,
        paddingLeft: 10,
        backgroundColor: '#f8f8f8',
    },
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 70,
        paddingTop: 25,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cdcdcd',
        borderRadius: 15,
        paddingHorizontal: 10,
    },
    searchImg: {
        width: 15,
        height: 15,
        marginRight: 5
    },
    inputStyle: {
        width: screenWidth * .7,
        padding: 0,
        color: '#000',
    },
    cancelBtn: {
        color: '#000'
    },
    hotSearch: {
        height: 25,
        marginTop: 30,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#bfbfbf',
        color: '#bfbfbf',
    },
    hotListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#bcbcbc'
    },
    itemText: {
      color: '#000',
        marginRight: 5
    },
    hotImg: {
        width: 15,
        height: 15,
    }
})