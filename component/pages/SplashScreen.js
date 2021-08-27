import React from 'react';
import {View , Text, StyleSheet} from 'react-native';
import {CredentialsContext} from '../../context/credentialsContext';
function SplashScreen({navigation}) {
    const {authenticated} = React.useContext(CredentialsContext);
    const redirection = (page) =>{
            setTimeout(()=>{navigation.navigate(page)},3000);
    }
    return (
        <View style={style.container}>
            <Text>PicsRate</Text>
            {redirection()}
            {authenticated?<Text>connected </Text>:<Text>not connected</Text>}
            {authenticated?redirection("Home"):redirection("Login")}
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
