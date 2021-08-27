import React from 'react'
import { View, Image,StyleSheet, Dimensions, SafeAreaView, Pressable } from 'react-native'

const width = (Dimensions.get('screen').width) ;
const height = (Dimensions.get('screen').height);
export default function ModalPicture({navigation ,route}) {
    // console.log(route)
    return (
        <SafeAreaView style={{flex : 1, backgroundColor:'#000'}}>
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
        paddingTop : 30,
        justifyContent : 'flex-start',
        alignItems : 'center',
        
    },
    picture:{
        height : (height /1.25 ) ,
        width : width -20
    }
});

