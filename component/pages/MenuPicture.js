import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome'

const MenuPicture = () => {
    return (
        <View >
            <Menu >
                <MenuTrigger >
                    <Icon name="ellipsis-v" size={20} color="#000" style={{width:30,height:30}}/>
                </MenuTrigger>
                <MenuOptions customStyles={{optionWrapper: { padding: 7}}} style={{padding:7}}>
                    <MenuOption 
                        style={{flexDirection:'row', justifyContent:'space-between', borderBottomColor:'#e0ddd3', borderBottomWidth:1}} 
                        onSelect={() => navigationState.navigate('New Test')}>
                            <Text style={{ color: '#000', fontSize:18  }}>New Picture</Text>
                    </MenuOption>
                    <MenuOption 
                        style={{flexDirection:'row', justifyContent:'space-between', borderBottomColor:'#e0ddd3', borderBottomWidth:1}} 
                        onSelect={() =>  navigationState.navigate('Vote')} >
                            <Text style={{ color: '#000', fontSize:18}}>Vote Pictures</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    )
}

export default MenuPicture
