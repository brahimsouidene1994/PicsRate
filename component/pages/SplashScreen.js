import React from 'react';
import {View , Text, StyleSheet} from 'react-native';
import {useCredentials} from '../../context/credentialsContext';
function SplashScreen() {
    const {handleStateSplashScreen} = useCredentials();
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const splashScreenVisibility = () =>{
            wait(2000).then(() => handleStateSplashScreen());
    }
    return (
        <View style={style.container}>
            <Text>PicsRate</Text>
            {splashScreenVisibility()}
        </View>
    )
}
const style = StyleSheet.create({
    container:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    text:{
        fontSize:25,
        fontWeight:'bold',
        color:'red'
    }
});
export default SplashScreen
