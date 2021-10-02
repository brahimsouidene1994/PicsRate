import React from 'react';
import { Text, StyleSheet, Dimensions, Pressable, Alert, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import IconIonic from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PictureService from '../../services/picture.service';
import MenuPicture from './MenuPicture';
import { usePictures } from '../../context/credentialsContext';

import { COLORS } from '../constants/Colors';

/**grid display */
const rows = 3;
const cols = 2;
const marginHorizontal = 4;
const marginVertical = 6;
const width = (Dimensions.get('screen').width / cols) - (marginHorizontal * cols);
const height = (Dimensions.get('screen').height / rows);
/**grid display */

function Picture(props) {
    const { fillPictures, pictures } = usePictures();
    const { _id, contextPic, path, status, voters } = props.pic;
    const [loading, setLoading] = React.useState(false);

    const deletePicture = () => {
        setLoading(true);
        PictureService.deletePicture(_id)
            .then(() => {
                Alert.alert(
                    "Success!!",
                    "You picture is deleted :)",
                    [
                        {
                            text: "OK", onPress: () => {
                                setLoading(false);
                                filterPictures(_id);
                            }
                        }
                    ]
                );
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const filterPictures = (id) => {
        if(!pictures)return;
        if(pictures.length > 0){
            const newArrayPictures = pictures.filter(singlePicture => singlePicture._id !== id);
            fillPictures(newArrayPictures);
        }
    }

    return (

        <Pressable
            onPress={() => {
                props.navigation.navigate('Picture Details', _id);
            }}
            onLongPress={() => {

            }}
            delayLongPress={1000}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? 'rgb(210, 230, 255)'
                        : 'white'
                },
            ]}>
            <Text style={style.cardIcon}>
                {status ?
                    <IconIonic name="globe-outline" style={style.textStatusActivated} /> :
                    <IconIonic name="lock-closed-outline" style={style.textStatusDisactivated} />
                }
            </Text>
            <ActivityIndicator size={50} animating={loading} color={'red'} style={style.cardActivityIndicator} />
            <Card style={style.boxContainer} mode={'outlined'}>
                <Card.Cover source={{ uri: path }} style={style.cardImage} />
                <Card.Actions style={{ backgroundColor: 'transparent', justifyContent: 'space-between' }}>
                    <Text style={style.cardBottomText}>{contextPic}</Text>
                    <Text style={style.cardBottomText}>{voters.length}V</Text>
                    {!status ?
                        <Icon name="delete-outline" size={25} onPress={() => {
                            Alert.alert(
                                "Warning",
                                "Are you sure about deleting this picture!!",
                                [
                                    { text: "YES", onPress: () => deletePicture() },
                                    { text: "Cancel" }
                                ]
                            );
                        }} />
                        :
                        <Icon name="delete-off-outline" size={25} onPress={() => {
                            Alert.alert(
                                "Warning",
                                "You picture is activated, you can't delete it :)",
                                [
                                    { text: "OK" }
                                ]
                            );
                        }} />
                    }
                    {/* <MenuPicture /> */}
                </Card.Actions>
            </Card>
        </Pressable>
    )
}
const style = StyleSheet.create({
    boxContainer: {
        position: 'relative',
        marginTop: marginVertical,
        marginBottom: marginVertical,
        marginLeft: marginHorizontal,
        marginRight: marginHorizontal,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.CARDBACKGROUND,
        borderRadius: 5,
    },
    cardIcon: {
        width: 100,
        height: 100,
        position: 'absolute',
        zIndex: 50,
        top: 10,
        left: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardActivityIndicator: {
        width: 100,
        height: 100,
        position: 'absolute',
        zIndex: 50,
        top: 50,
        left: 50,
    },

    cardImage: {
        width: width,
        height: height - 40,
        borderRadius: 5
    },
    textStatusActivated: {
        fontSize: 50,
        color: COLORS.GREEN,
        textShadowColor: COLORS.BLACK,
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 20
    },
    textStatusDisactivated: {
        fontSize: 50,
        color: COLORS.RED,
        textShadowColor: COLORS.BLACK,
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 20
    },
    cardBottomText: {
        textTransform: 'capitalize',
        fontSize: 14,

    }
});
export default Picture