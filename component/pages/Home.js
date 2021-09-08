import React from 'react';
import {Text, View, ScrollView, StyleSheet, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native';
import { CredentialsContext } from '../../context/credentialsContext';
import PictureService from "../../services/picture.service";
import Picture from './Picture';

function Home({ navigation }) {
    const { userCredentials, setUpNavigation, fillPictures, pictures } = React.useContext(CredentialsContext);
    const [pictureState, setPictureState] = React.useState([]);

    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        if (userCredentials)
            checkPictures(userCredentials.id);
    }, [userCredentials]);
    React.useEffect(() => {
        // if (pictureState.length>0)
        //     console.log(pictureState)
    }, [pictureState]);
    const checkPictures = (id) => {
        PictureService.getPicturesByCurrentUser(id)
            .then((data) => {
                fillPictures(data);
                setPictureState(data);
                setUpNavigation(navigation);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const picturesTests = pictureState.map((pic) => {
        return (
            <Picture key={pic._id} style={style.boxContainer} pic={pic} navigation={navigation} />
        )
    });
    
    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar
                animated={true}
                backgroundColor="#000"/>
            <ScrollView style={style.container} >
                <View style={style.sectionContainer}>
                    {
                        pictureState.length> 0?
                         picturesTests
                         :
                         <ActivityIndicator size="large" color="#257efa" animating={true} />  
                    }            
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    sectionContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    }

});
export default Home
