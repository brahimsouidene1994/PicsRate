import React from 'react';
import {
    View, Text, SafeAreaView, ScrollView, Image, StyleSheet, Dimensions,
    Pressable, Alert, ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-paper';

import PictureService from "../../services/picture.service";

/**grid display */
const rows = 3;
const cols = 2;
const width = (Dimensions.get('screen').width / cols);
const height = (Dimensions.get('screen').height / rows);
/**grid display */

export default function PictureDetails({ navigation, route }) {
    const [currentPicture, setCurrentPicture] = React.useState(null);
    const [btnState, setBtnState] = React.useState(false);
    const { _id} = route.params;
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        getCurrentPicture(_id);
    })
    const getCurrentPicture = (id) => {
        PictureService.getOnePicture(id)
            .then(response => {
                setCurrentPicture(response)
            })
            .catch((error) => Alert.alert(error))
    }

    const handleStatus = (id, status) => {
        setBtnState(true);
        setLoading(true);
        PictureService.patchPictureStatus(id, status)
            .then(() => {
                Alert.alert(
                    "Status changing",
                    "Your picture's status changed with success :)",
                    [
                      { text: "OK"}
                    ]
                  );
                setLoading(false);
                setBtnState(false);
            })
            .catch((error) => Alert.alert(error))
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={style.container}>
                <View style={style.containerOne}>
                    <Text style={style.pageTitle}>Details</Text>
                    {!currentPicture ?
                        <ActivityIndicator size="large" color="#257efa" animating={true} />
                        :
                        <View style={style.containerInfo}>
                            <View style={{ paddingRight: 10, borderRightColor: '#a2a8a3', borderRightWidth: 1 }}>
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate('My Modal', currentPicture.path)
                                    }}
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed
                                                ? 'rgb(210, 230, 255)'
                                                : 'white'
                                        },
                                    ]}>
                                    <Image source={{ uri: currentPicture.path }} style={style.image} />
                                    <Text style={{ textAlign: 'center' }}>Open picture</Text>
                                </Pressable>
                            </View>
                            <View style={style.info}>
                                <Text style={style.infoLabel}>Context : 
                                    <Text style={style.infoValue}>{currentPicture.contextPic}</Text>
                                </Text>
                                <Text style={style.infoLabel}>Description :
                                    <Text style={style.infoValue}>{currentPicture.contextPic}</Text>
                                </Text>
                                <Text style={style.infoLabel}>Created at : 
                                    <Text style={style.infoValue}>{currentPicture.createdAt}</Text>
                                </Text>
                                <Text style={style.infoLabel} >Status :
                                    {currentPicture.status ? 
                                        <Text style={{ color: 'green', fontSize : 14 }}> Activated</Text> 
                                        : 
                                        <Text style={{ color: 'red', fontSize : 14 }}> Desactivated</Text>} 
                                </Text>                       
                                <Text style={style.infoLabel}>Votes :
                                  <Text style={style.infoValue}>45 vote</Text> 
                                </Text>
                                {currentPicture.status ?
                                    <Button
                                        style={{ borderRadius: 40 }}
                                        contentStyle={{ height: 50 }}
                                        labelStyle={{ color: "white", fontSize: 16, fontWeight: 'bold' }}
                                        mode="contained"
                                        color="red"
                                        loading={loading}
                                        disabled={btnState}
                                        onPress={() => handleStatus(_id, !currentPicture.status)}
                                    >
                                        stop test
                                    </Button>
                                    :
                                    <Button
                                        style={{ borderRadius: 40 }}
                                        contentStyle={{ height: 50 }}
                                        labelStyle={{ color: "white", fontSize: 16, fontWeight: 'bold' }}
                                        mode="contained"
                                        color="#257efa"
                                        loading={loading}
                                        disabled={btnState}
                                        onPress={() => handleStatus(_id, !currentPicture.status)}
                                    >
                                        start test
                                    </Button>
                                }
                            </View>
                        </View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    containerOne: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageTitle: {
        margin: 20,
        fontSize: 28,
        color: "#257efa",
        fontWeight: 'bold'
    },
    containerInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: width - 20,
        height: height,
        borderRadius: 10,
    },
    info: {
        width: width - 20,
        height: height,
        justifyContent: 'space-around',
        paddingLeft: 10
    },
    infoLabel:{
        fontSize :16,
        color : '#6b6969',
        textTransform : 'capitalize'

    },
    infoValue:{
        fontSize : 14,
        color :'#000'
    }
});
