import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import IconIonic from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import AuthService from "../../services/auth.service";
import {CredentialsContext} from '../../context/credentialsContext';

export default function MenuPages() {
    const {navigationState, handleStates, clearPictures} = React.useContext(CredentialsContext);

    const logOut = () =>{
        AuthService.logout();
        handleStates(null, false);
        clearPictures();
    }
    return (
        
        <View >
            <Menu >
                <MenuTrigger >
                    <IconIonic name="ellipsis-vertical" size={20} color="#fff" style={style.container} />
                </MenuTrigger>
                <MenuOptions customStyles={{optionWrapper: { padding: 7}}} style={{padding:7}}>
                    <MenuOption 
                        style={{flexDirection:'row', justifyContent:'space-between', borderBottomColor:'#e0ddd3', borderBottomWidth:1}} 
                        onSelect={() => navigationState.navigate('New Test')}>
                            <IconMat name="add-photo-alternate" size={25} color="#257efa"/>
                            <Text style={{ color: '#000', fontSize:18  }}>New Picture</Text>
                    </MenuOption>
                    <MenuOption 
                        style={{flexDirection:'row', justifyContent:'space-between', borderBottomColor:'#e0ddd3', borderBottomWidth:1}} 
                        onSelect={() =>  navigationState.navigate('Vote')} >
                         <IconMat name="how-to-vote" size={25} color="#257efa"/>
                            <Text style={{ color: '#000', fontSize:18}}>Vote Pictures</Text>
                    </MenuOption>
                    <MenuOption 
                        style={{flexDirection:'row', justifyContent:'space-between', borderBottomColor:'#e0ddd3', borderBottomWidth:1}} 
                        onSelect={() =>  navigationState.navigate('Settings')} disabled={true}>
                            <IconIonic name="settings" size={25} color="#257efa"/>
                         <Text style={{ color: '#000', fontSize:18, }} >Settings</Text>
                    </MenuOption>
                    <MenuOption 
                        style={{flexDirection:'row', justifyContent:'space-between', borderBottomColor:'#e0ddd3', borderBottomWidth:1}} 
                        onSelect={() =>  logOut()} >
                            <IconEntypo name="log-out" size={25} color="#257efa"/>
                            <Text style={{ color: '#000', fontSize:18 }} >Logout</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    )
}
const style = StyleSheet.create({
    container:{
        width:50,
        textAlign:'center', 
    }
});