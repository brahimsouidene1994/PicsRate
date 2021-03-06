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
import {useCredentials, usePictures} from '../../context/credentialsContext';
import { COLORS } from '../constants/Colors';

export default function MenuPages() {
    const {navigationState, handleStates} = useCredentials();
    const  {clearPictures} = usePictures();
    const logOut = () =>{
        AuthService.logout();
        handleStates(null, false);
        clearPictures();
    }
    return (
        
        <View >
            <Menu >
                <MenuTrigger >
                    <IconIonic name="ellipsis-vertical-circle-outline" size={40} color={COLORS.WHITE} style={style.container} />
                </MenuTrigger>
                <MenuOptions customStyles={{optionWrapper: { padding: 7}}} style={{padding:7}}>
                    <MenuOption 
                        style={{flexDirection:'row', justifyContent:'space-between', borderBottomColor:COLORS.GRAYBORDER, borderBottomWidth:1}} 
                        onSelect={() => navigationState.navigate('New Test')}>
                            <IconMat name="add-photo-alternate" size={25} color={COLORS.BLUE}/>
                            <Text style={{ color: COLORS.BLACK, fontSize:18  }}>New Picture</Text>
                    </MenuOption>
                    <MenuOption 
                        style={{flexDirection:'row', justifyContent:'space-between', borderBottomColor:COLORS.GRAYBORDER, borderBottomWidth:1}} 
                        onSelect={() =>  navigationState.navigate('Vote')} >
                         <IconMat name="how-to-vote" size={25} color={COLORS.BLUE}/>
                            <Text style={{ color: COLORS.BLACK, fontSize:18}}>Vote Pictures</Text>
                    </MenuOption>
                    <MenuOption 
                        style={{flexDirection:'row', justifyContent:'space-between', borderBottomColor:COLORS.GRAYBORDER, borderBottomWidth:1}} 
                        onSelect={() =>  navigationState.navigate('Settings')} disabled={true}>
                            <IconIonic name="settings" size={25} color={COLORS.BLUE}/>
                         <Text style={{ color: COLORS.BLACK, fontSize:18, }} >Settings</Text>
                    </MenuOption>
                    <MenuOption 
                        style={{flexDirection:'row', justifyContent:'space-between', borderBottomColor:COLORS.GRAYBORDER, borderBottomWidth:1}} 
                        onSelect={() =>  logOut()} >
                            <IconEntypo name="log-out" size={25} color={COLORS.BLUE}/>
                            <Text style={{ color: COLORS.BLACK, fontSize:18 }} >Logout</Text>
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