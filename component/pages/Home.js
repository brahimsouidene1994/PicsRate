import React from 'react';
import {Text, View, ScrollView, StyleSheet, Image, ActivityIndicator,TouchableOpacity, StatusBar, SafeAreaView, Dimensions } from 'react-native';
import { CredentialsContext } from '../../context/credentialsContext';
import PictureService from "../../services/picture.service";
import Picture from './Picture';

import {COLORS} from '../Colors';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

function Home({ navigation }) {
    const { userCredentials, setUpNavigation, fillPictures, pictures } = React.useContext(CredentialsContext);
    const [pictureState, setPictureState] = React.useState([]);
    const [showEmptyBox, setshowEmptyBox] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
            checkPictures(userCredentials.id);
    }, [pictures]);
    const checkPictures = (id) => {
        PictureService.getPicturesByCurrentUser(id)
            .then((data) => {
                if(data.length > 0){
                    fillPictures(data);
                    setPictureState(data);
                    setUpNavigation(navigation);
                }
                else{setshowEmptyBox(true)}
                setLoading(false);
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
                {
                    pictureState.length > 0  ?

                    <ScrollView style={style.container} >
                        <View style={style.sectionContainer}>
                            {
                                picturesTests                           
                            }            
                        </View>
                    </ScrollView>
                    :
                    <View style={{flex:1, backgroundColor:COLORS.WHITE}}>
                        <ActivityIndicator size="large" color="#257efa" animating={loading} /> 
                        {showEmptyBox?
                            <View style={style.containerBox}>
                                <Text style={style.textTitle}>no pictures yet!! </Text>
                                <TouchableOpacity onPress={()=>navigation.navigate('New Test')}>
                                    <View style={style.button}>
                                        <Text style={style.btnText}>start new one</Text>
                                    </View>
                                </TouchableOpacity>
                                <Image
                                    style={style.emptyBox}
                                    source={require('../../assets/empty-box.gif')}
                                />
                            </View>
                            :
                            null
                        }
                    </View>
                }
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE
    },
    sectionContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBox:{
        backgroundColor: COLORS.WHITE,
        width:width,
        height:height,
        flex:1,
        justifyContent:'space-around',
        alignItems:'center'
    },
    emptyBox:{
        width:width/1.25,
        height:height/2
    },
    textTitle:{
        color:COLORS.GRAYDARK,
        fontSize:22,
        fontWeight:'bold',
        textTransform:'capitalize'
    },
    button: {
        width:width/2,
        alignItems: "center",
        backgroundColor: COLORS.VIOLET,
        padding: 12,
        borderRadius:40
    },
    btnText:{
        fontSize:18,
        fontWeight:'bold',
        textTransform:'capitalize',
        color:COLORS.WHITE
    }

});
export default Home
