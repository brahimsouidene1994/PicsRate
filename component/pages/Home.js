import React from 'react';
import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import {CredentialsContext} from '../../context/credentialsContext';
import PictureService from "../../services/picture.service";
import Picture from './Picture';

function Home({navigation}) {
    const {userCredentials, setUpNavigation, fillPictures} = React.useContext(CredentialsContext); 
    const [picturesState, setPicturesState] = React.useState([]);
    React.useEffect(()=>{
        if(userCredentials)
            checkPictures(userCredentials.id);    
    },[userCredentials, picturesState]);
    // React.useEffect(()=>{
    //     // if(picturesState.length > 0 ){
    //     //     console.log(picturesState)
    //     // }
    // },[])


    const checkPictures =  (id)=>{
      PictureService.getPicturesByCurrentUser(id)
        .then((data)=>{
            fillPictures(data)
            setPicturesState(data);
            setUpNavigation(navigation);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    const picturesTests = picturesState.map((pic) => {
        return (
            <Picture key={pic._id} style={style.boxContainer} pic={pic} navigation={navigation} />
        )
    });
    
    return (
        <ScrollView style={style.container} >
            <View style={style.sectionContainer}>
                {
                picturesTests.length>0?
                    picturesTests
                    :
                    <ActivityIndicator size="large" color="#257efa" animating={true} />
                }
            </View>
        </ScrollView>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
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
