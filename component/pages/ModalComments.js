import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView, Pressable, StatusBar, FlatList } from 'react-native';

import { CredentialsContext } from '../../context/credentialsContext';

const width = (Dimensions.get('screen').width);
const height = (Dimensions.get('screen').height);

const Item = ({message}) => (
    <View style={style.commentContainer}>
        <Text style={style.commentText}>{message}</Text>
    </View>
);

export default function ModalComments({ navigation, route }) {
    // console.log(route)
    const { comments } = React.useContext(CredentialsContext);
    const renderItem = ({ item }) => (
        <Item key={item._id} message={item.message} />
    );


    return (
        <SafeAreaView style={style.container}>
            <StatusBar
                hidden={true}
            />
            <Text style={style.pageTitle}>Comments</Text>
            {
                comments.length>0?
                <FlatList
                data={comments}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                />
                :
                <Text style={style.commentText}>No comments yet </Text>
            }
            
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center',
    },
    pageTitle:{
        margin: 20,
        fontSize: 28,
        color: "#257efa",
        fontWeight: 'bold'
    },
    commentContainer: {
        height: 50,
        width : width -20,
        borderBottomColor: "#a2a8a3",
        borderBottomWidth: 1,
        paddingLeft: 10,
        justifyContent: 'center'
    },
    commentText: {
        fontSize: 17,
        color : '#5c5c5c'
    }
});

