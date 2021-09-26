import React from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Image, Dimensions, Pressable, ScrollView, Alert, TouchableOpacity,
    KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { useCredentials, usePictures, useVotes } from '../../context/credentialsContext';
import PictureService from '../../services/picture.service';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import CommentService from '../../services/comment.service';
import ImageModal from 'react-native-image-modal';
import SliderTraits from '../SliderTraits';
import {COLORS} from '../constants/Colors';
const height = Dimensions.get('screen').height / 2;
const width = Dimensions.get('screen').width;


export default function Vote() {
    const {userCredentials} = useCredentials();
    const {randomPictureToVote, pickOneRandomPicture} =  usePictures();
    const {voteOne, voteTow, voteThree} = useVotes();
    const [message, setMessage] = React.useState('');
    const [randomPicture, setRandomPicture] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [btnDisabled, setBtnDisabled] = React.useState(false);
    const [reload, setReload] = React.useState(false)
    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    React.useEffect(() => {
        pickPictureRandomly();
    }, [reload]);

    const pickPictureRandomly = () => {
        pickOneRandomPicture(null)
        PictureService.getRandomPictureOfOthers(userCredentials.id)
            .then((response) => {
                if(response === null) return;
                if(response){
                    pickOneRandomPicture(response);
                    setRandomPicture(response);
                }
            })
            .catch((error) => console.log(error));
    }

    const submitComment = () => {
        setLoading(true);
        setBtnDisabled(true);
        if(typeof message===''){setMessage(null)}
        let comment = {
            userId: userCredentials.id,
            pictureId: randomPictureToVote._id,
            message: message,
            v1: voteOne,
            v2: voteTow,
            v3: voteThree
        };
        CommentService.saveNewComment(comment)
            .then(() => {
                setVisible(true);
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
                                <Text style={style.textCategory}>
                                    {randomPictureToVote.category}{' : '}
                                    <Text style={style.textContext}>
                                        {randomPictureToVote.contextPic}
                                    </Text>
                                </Text>
                                <ImageModal
                                    resizeMode="contain"
                                    source={{
                                            uri: randomPictureToVote.path
                                    }}
                                    style={style.picture}
                                />
                            </>
                            :
                            <ActivityIndicator size="large" color={COLORS.BLUE} animating={true} />
                    }
                    <TouchableOpacity
                        onPress={() => pickPictureRandomly()}
                        style={style.btnChangePic}
                    >
                        <View style={style.btnLabel}>
                            <Text style={{ fontSize: 18, color: COLORS.BLACK, fontWeight: 'bold' }}>Change </Text>
                            <IconMat name="navigate-next" color={COLORS.BLACK} size={25} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={style.reactContainer}>
                    <SliderTraits category={randomPicture.category} />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" || Platform.OS === "android" ? "padding" : "position"} style={{ flex: 1 }}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                {randomPicture.commentsStatus?
                                    <TextInput
                                        style={{ width: width - 30 }}
                                        label="Comment"
                                        name="comment"
                                        outlineColor={COLORS.BLUE}
                                        mode={'outlined'}
                                        type="text"
                                        left={<TextInput.Icon name="comment" color={(isTextInputFocused) =>
                                            isTextInputFocused ? COLORS.BLUE : COLORS.GRAYLIGHT
                                        } />}
                                        value={message}
                                        onChangeText={msg => { setMessage(msg) }}
                                    />
                                    :
                                    null                                
                                }
                                <Button
                                    style={style.btnSubmit}
                                    labelStyle={{ color: COLORS.WHITE, fontSize: 18, }}
                                    onPress={() => submitComment(message)}
                                    loading={loading}
                                    disabled={btnDisabled}
                                >
                                    save
                                    <IconFA name="vote-yea" size={20} color={COLORS.WHITE} />
                                </Button>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            </View>
            <Snackbar
                style={style.snackBar}
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'ok',
                    onPress: () => {
                        setVisible(false);
                        setReload(!reload);
                    },
                }}>
                Voting with success
            </Snackbar>
        </ScrollView>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        height: height + 6,
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
        borderColor: COLORS.BLACKs,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        justifyContent:'center',
    },
    btnLabel:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    btnSubmit: {
        backgroundColor: COLORS.BLUE,
        marginTop: 12,
        width: width / 2
    },
    textCategory: {
        padding: 6,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#40494f',
        textAlign: 'center',
        color: COLORS.WHITE
    },
    textContext: {
        fontSize: 18,
        backgroundColor: '#40494f',
        textAlign: 'center',
        color: COLORS.WHITE,
        fontWeight:'100'
    },
    snackBar:{
        position:'absolute',
        bottom:10,
        height:50,
        width:Dimensions.get('screen').width-20,
    },
});

