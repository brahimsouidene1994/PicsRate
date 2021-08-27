import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
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
            <Menu>
                <MenuTrigger >
                    <Icon name="ellipsis-vertical" size={20} color="#fff" style={style.container} />
                </MenuTrigger>
                <MenuOptions customStyles={{optionWrapper: { padding: 7}}}>
                    <MenuOption onSelect={() => navigationState.navigate('New Test')}>
                        <Text style={{ color: 'black', fontSize:18 , borderBottomColor:'#000', borderBottomWidth:1 }}>New Picture</Text>
                    </MenuOption>
                    <MenuOption onSelect={() =>  navigationState.navigate('Vote')} >
                        <Text style={{ color: 'black', fontSize:18, borderBottomColor:'#000', borderBottomWidth:1 }}>Go Vote</Text>
                    </MenuOption>
                    <MenuOption onSelect={() =>  navigationState.navigate('Settings')} disabled={true}>
                        <Text style={{ color: 'black', fontSize:18, borderBottomColor:'#000', borderBottomWidth:1 }} >Settings</Text>
                    </MenuOption>
                    <MenuOption onSelect={() =>  logOut()} >
                        <Text style={{ color: 'black', fontSize:18, borderBottomColor:'#000', borderBottomWidth:1 }} >Logout</Text>
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