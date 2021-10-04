import React from 'react';
import {View , Text, Image, StyleSheet} from 'react-native';
import { Bubbles  } from 'react-native-loader';
import {useCredentials} from '../../context/credentialsContext';
import { COLORS } from '../constants/Colors';
function SplashScreen() {
    const {handleStateSplashScreen} = useCredentials();
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const splashScreenVisibility = () =>{
            wait(5000).then(() => handleStateSplashScreen());
    }
    return (
        <View style={style.container}>
            <Image
                style={style.iconApp}
                source={require('../../assets/logo_app.png')} 
            />
            <Bubbles size={10} color={COLORS.BLUE} />
            {splashScreenVisibility()}
        </View>
    )
}
const style = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    text:{
        fontSize:25,
        fontWeight:'bold',
        color:'red'
    },
    iconApp:{
        width:200,
        height:150
    }
});
export default SplashScreen
