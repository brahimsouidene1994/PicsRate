import React from 'react';
import {View , Text, StyleSheet} from 'react-native';
import {CredentialsContext} from '../../context/credentialsContext';
function SplashScreen({navigation}) {
    const {handleStateSplashScreen} = React.useContext(CredentialsContext);
    const redirection = () =>{
            setTimeout(()=>{handleStateSplashScreen()},2000);
    }
    return (
        <View style={style.container}>
            <Text>PicsRate</Text>
            {redirection()}
        </View>
    )
}
const style = StyleSheet.create({
    container:{
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    text:{
        fontSize:25,
        fontWeight:'bold',
        color:'red'
    }
});
export default SplashScreen
