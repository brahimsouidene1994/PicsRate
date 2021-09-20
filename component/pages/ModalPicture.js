import React from 'react'
import { View, Image,StyleSheet, Dimensions, SafeAreaView, Pressable, StatusBar } from 'react-native';
import {COLORS} from '../constants/Colors';

const width = (Dimensions.get('screen').width) ;
const height = (Dimensions.get('screen').height);
export default function ModalPicture({navigation ,route}) {
    return (
        <SafeAreaView style={{flex : 1, backgroundColor: COLORS.BLACK}}>
            <StatusBar
                hidden={true}
            />
            <Pressable
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <View style={style.container}>
                    <Image source={{uri:route.params}} style={style.picture}/>
                </View>
            </Pressable>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    container : {
        height : height,
        paddingTop : StatusBar.currentHeight + 30,
        justifyContent : 'flex-start',
        alignItems : 'center',
        
    },
    picture:{
        height : (height /1.25 ) ,
        width : width -20
    }
});

