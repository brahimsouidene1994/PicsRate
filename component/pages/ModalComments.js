import React from 'react'
import { View, Text, StyleSheet, Dimensions, SafeAreaView, StatusBar, FlatList } from 'react-native';

import { CredentialsContext } from '../../context/credentialsContext';
import {COLORS} from '../constants/Colors';
const width = (Dimensions.get('screen').width);

const Item = ({message}) => (
    <View style={style.commentContainer}>
        <Text style={style.commentText}>{message}</Text>
    </View>
);

export default function ModalComments() {
    const [notesArray, setNotesArray]= React.useState([]);
    const { comments } = React.useContext(CredentialsContext);

    React.useEffect(()=>{
        fillNotesArray()
    },[])

    const renderItem = ({ item }) => (
        <Item key={item.id} message={item.message} />
    );

    const fillNotesArray= ()=>{
        if(comments === null) return ;
        if(comments.length > 0){
            let notes=[];
            let count = 0;
            comments.forEach(element => {
                if(element.message){
                    notes.push({id:count, message:element.message})
                }
                count++;
            });
            setNotesArray(notes);
        }
    }

    return (
        <SafeAreaView style={style.container}>
            <StatusBar
                hidden={true}
            />
            <Text style={style.pageTitle}>Notes</Text>
            {
                notesArray.length>0?
                <FlatList
                data={notesArray}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
        color: COLORS.BLUE,
        fontWeight: 'bold'
    },
    commentContainer: {
        height: 50,
        width : width -20,
        borderBottomColor: COLORS.GRAYDARK,
        borderBottomWidth: 1,
        paddingLeft: 10,
        justifyContent: 'center'
    },
    commentText: {
        fontSize: 17,
        color : COLORS.GRAYDARK
    }
});

