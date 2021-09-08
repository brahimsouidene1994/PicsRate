import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Dimensions, Pressable, ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { CredentialsContext } from '../../context/credentialsContext';
import PictureService from '../../services/picture.service';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import CommentService from '../../services/comment.service';

import SliderTraits from '../SliderTraits';

const height = Dimensions.get('screen').height / 2;
const width = Dimensions.get('screen').width;


export default function Vote({ navigation }) {

    const { userCredentials, randomPictureToVote, pickOneRandomPicture,   
        voteOne, voteTow, voteThree } = React.useContext(CredentialsContext);
    const [message, setMessage] = React.useState('');
    const [randomPicture, setRandomPicture] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [btnDisabled, setBtnDisabled] = React.useState(false);
    const [reload, setReload] = React.useState(false)
    React.useEffect(() => {
        pickPictureRandomly();
    }, [reload]);

    const pickPictureRandomly = () => {
        pickOneRandomPicture(null)
        PictureService.getRandomPictureOfOthers(userCredentials.id)
            .then((response) => {
                pickOneRandomPicture(response);
                setRandomPicture(response);
                // console.log(response)
            })
            .catch((error) => console.log(error));
    }

    const submitComment = () => {
        setLoading(true);
        setBtnDisabled(true);
        let comment = {
            userId: userCredentials.id,
            pictureId: randomPictureToVote._id,
            message: message,
            v1: voteOne,
            v2 : voteTow,
            v3 : voteThree
        };
        CommentService.saveNewComment(comment)
            .then(() => {
                Alert.alert(
                    "Comment",
                    "Success :)",
                    [
                        { text: "OK", onPress: () => setReload(!reload) }
                    ]
                );
                setLoading(false);
                setBtnDisabled(false);
                setMessage('')
            })
    }
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={style.container}>
                <View style={style.imageContainer}>
                    {
                        randomPictureToVote ?
                            <>
                                <Text style={style.textCategory}>{randomPictureToVote.category}</Text>
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate('My Modal', randomPictureToVote.path)
                                    }}
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed
                                                ? 'rgb(210, 230, 255)'
                                                : 'white'
                                        },
                                    ]}>
                                    <Image source={{ uri: randomPictureToVote.path }} style={style.picture} />
                                </Pressable>

                            </>
                            :
                            <ActivityIndicator size="large" color="#257efa" animating={true} />
                    }
                    <Button
                        style={style.btnChangePic}
                        labelStyle={{ color: "#000", fontSize: 18, flex: 1, justifyContent: 'center' }}
                        onPress={() => pickPictureRandomly()}
                    >
                        next<IconMat name="navigate-next" color="#000" size={20} />
                    </Button>
                </View>
                <View style={style.reactContainer}>
                    <SliderTraits category={randomPicture.category} />

                    <TextInput
                        label="Comment"
                        name="comment"
                        outlineColor={'#257efa'}
                        mode={'outlined'}
                        type="text"
                        left={<TextInput.Icon name="comment" color={(isTextInputFocused) =>
                            isTextInputFocused ? '#257efa' : '#b5b5b5'
                        } />}
                        value={message}
                        onChangeText={msg => { setMessage(msg) }}
                    />
                    <Button
                        style={style.btnSubmit}
                        labelStyle={{ color: "#fff", fontSize: 18, }}
                        onPress={() => submitComment(message)}
                        loading={loading}
                        disabled={btnDisabled}
                    >
                        save
                        <IconFA name="vote-yea" size={20} color='#fff' />
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        height: height,
        width: width,
    },
    picture: {
        height: height - 33,
        width: width
    },
    reactContainer: {
        flex: 1,
        padding: 10,
        width: width
    },
    btnChangePic: {
        backgroundColor: 'rgba(191, 186, 186, .5)',
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 50,
        width: 120,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#257efa',
        borderTopLeftRadius: 50,
    },
    btnSubmit: {
        backgroundColor: '#257efa'
    },
    textCategory: {
        padding: 6,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#40494f',
        textAlign: 'center',
        color: '#fff'
    }
});

