import React from 'react';
import {
    View, Text, SafeAreaView, ScrollView, Image, StyleSheet, Dimensions,
    Pressable, Alert, ActivityIndicator, TouchableOpacity
} from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import PictureService from "../../services/picture.service";
import CommentService from '../../services/comment.service';
import { usePictures } from '../../context/credentialsContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageModal from 'react-native-image-modal';
import { COLORS } from '../constants/Colors';

/**grid display */
const rows = 3;
const cols = 2;
const width = (Dimensions.get('screen').width / cols);
const height = (Dimensions.get('screen').height / rows);
/**grid display */

export default function PictureDetails({ navigation, route }) {
    const  _id  = route.params;
    const { loadCommentsOfPicture } = usePictures();

    const [currentPicture, setCurrentPicture] = React.useState(null);
    const [btnState, setBtnState] = React.useState(false);
    const [commentsCount, setCommentsCount] = React.useState(0);
    const [commentsStatus, setcommentsStatus] = React.useState(false);
    const [votingResultText, setVotingResultText] = React.useState('');
    const [votingResultMoy, setVotingResultMoy] = React.useState(0);
    const [reactionsTot, setReactionsTot] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    React.useEffect(() => {
        if(!currentPicture)getCurrentPicture(_id);
    }, [currentPicture])
    const getCurrentPicture = (id) => {
        loadCommentsOfPicture(null)
        PictureService.getOnePicture(id)
            .then(response => {
                if (response === null) return;
                if (response) {
                    setCurrentPicture(response);
                    setcommentsStatus(response.commentsStatus);
                }
            })
            .catch((error) => Alert.alert(error));
        CommentService.getAllCommentOfPicture(id)
            .then((response) => {
                if (response === null) return;
                if (response) {
                    loadCommentsOfPicture(response);
                    setReactionsTot(response.length);
                    if (response.length === 0) {
                        setVotingResultText('No voters yet')
                    } else {
                        countComment(response);
                        voteFormula(response);
                    }
                }
                else console.log('no comments');
            })
    }

    const countComment = (arrayComment) => {
        if (arrayComment === null) return;
        if (arrayComment.length === 0) setCommentsCount(0);
        if (arrayComment.length > 0) {
            let count = 0;
            arrayComment.forEach(element => {
                if (element.message !== null) {
                    count++
                }
            });
            setCommentsCount(count);
        }
    }

    const voteFormula = (arrayVotes) => {
        if (arrayVotes === null) return;
        if (arrayVotes.length === 0) {
            setVotingResultText('No voters yet');
            setVotingResultMoy(0);
        }
        if (arrayVotes.length > 0) {
            let votersCount = 0;
            let traitOne = 0;
            let traitTwo = 0;
            let traitThree = 0;
            arrayVotes.forEach(element => {
                if (element.voteOne && element.voteTwo && element.voteThree) {
                    votersCount++;
                    traitOne += element.voteOne;
                    traitTwo += element.voteTwo;
                    traitThree += element.voteThree;
                }
            });
            let result = (traitOne + traitTwo + traitThree) / votersCount;
            setVotingResultMoy(result);
            if (result <= 10) setVotingResultText('Bad');
            if ((10 < result) && (result < 15)) setVotingResultText('Somewhat');
            if ((15 <= result) && (result < 20)) setVotingResultText('Medium');
            if ((20 <= result) && (result < 25)) setVotingResultText('Good');
            if ((25 <= result) && (result < 30)) setVotingResultText('Exellent');
        }
    }

    const handleStatus = (id, status) => {
        setBtnState(true);
        setLoading(true);
        PictureService.patchPictureStatus(id, status)
            .then(() => {
                setVisible(true);
                setLoading(false);
                setBtnState(false);
            })
            .catch((error) => Alert.alert(error));
            setCurrentPicture(prevCurrentPictureState => {
                let updatedPicture = Object.assign({}, prevCurrentPictureState);
                updatedPicture.status = status;
                return  updatedPicture ;
            });
            // changePictureStatus(_id, status);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={style.container}>
                <View style={style.containerOne}>
                    <Text style={style.pageTitle}>Details</Text>
                    {!currentPicture ?
                        <ActivityIndicator size="large" color={COLORS.BLUE} animating={true} />
                        :
                        <View style={style.containerInfo}>
                            <View style={style.imageContainer}>
                                    <ImageModal
                                        resizeMode="contain"
                                        source={{
                                            uri: currentPicture.path,
                                        }}
                                        style={style.image}
                                    />
                            </View>
                            <View style={style.info}>
                                <Text style={style.infoLabel}>Categoy :
                                    <Text style={style.infoValue}>{currentPicture.category}</Text>
                                </Text>
                                <Text style={style.infoLabel}>Title :
                                    <Text style={style.infoValue}>{currentPicture.contextPic}</Text>
                                </Text>
                                <Text style={style.infoLabel}>Created at :
                                    <Text style={style.infoValue}>{currentPicture.createdAt}</Text>
                                </Text>
                                <Text style={style.infoLabel} >Status :
                                    {currentPicture.status ?
                                        <Text style={{ color: COLORS.GREEN, fontSize: 14 }}> Activated</Text>
                                        :
                                        <Text style={{ color: COLORS.RED, fontSize: 14 }}> Desactivated</Text>}
                                </Text>
                                <Text style={style.infoLabel}>Voters :
                                    <Text style={style.infoValue}>{reactionsTot}</Text>
                                </Text>
                                <Text style={style.infoLabel}>Result :
                                    <Text style={style.infoValue}>{votingResultText}</Text>
                                </Text>
                                {currentPicture.status ?
                                    <Button
                                        style={{ borderRadius: 40 }}
                                        contentStyle={{ height: 50 }}
                                        labelStyle={{ color: COLORS.WHITE, fontSize: 16, fontWeight: 'bold' }}
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
                                        labelStyle={{ color: COLORS.WHITE, fontSize: 16, fontWeight: 'bold' }}
                                        mode="contained"
                                        color={COLORS.BLUE}
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
                <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                    <Button
                        style={style.btnComments}
                        contentStyle={{ height: 50 }}
                        labelStyle={{ color: COLORS.BLACK, fontSize: 16 }}
                        mode="contained"
                        color={COLORS.GRAYLIGHT}
                        disabled={btnState}
                        onPress={() => navigation.navigate('My Modal Comments')}
                    >
                        Notes : {commentsCount}
                    </Button>
                    {!commentsStatus ?
                        <Text>The comments of this picture is disabled</Text>
                        :
                        null
                    }
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('My Modal Votes', {
                                picture: currentPicture,
                                moyenne: votingResultMoy,
                                resultText: votingResultText
                            })}
                    >
                        <View style={style.btnDataStats}>
                            <Text style={{ fontSize: 18, color: COLORS.WHITE, fontWeight: 'bold' }}>STATISTICS </Text>
                            <Icon name={'read-more'} size={30} color={COLORS.WHITE} />
                        </View>
                    </TouchableOpacity>
                </View>


            </ScrollView>
            <Snackbar
                style={style.snackBar}
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'ok',
                    onPress: () => {
                        setVisible(false)
                    },
                }}>
                Your Status updated successfuly
            </Snackbar>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    container: {
        backgroundColor: COLORS.WHITE,
        flex: 1,
    },
    containerOne: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageTitle: {
        margin: 20,
        fontSize: 28,
        color: COLORS.BLUE,
        fontWeight: 'bold'
    },
    containerInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.GRAYBORDER,
        borderBottomWidth: 1,
    },
    imageContainer:{ 
        padding:10, 
        borderRightColor: COLORS.GRAYBORDER, 
        borderRightWidth: 1 
    },
    image: {
        width: width-10 ,
        height: height -10,
        borderRadius: 10,
    },
    info: {
        width: width-10,
        height: height ,
        justifyContent: 'space-around',
        padding: 10
    },
    infoLabel: {
        fontSize: 16,
        color: COLORS.DARKLABEL,
        textTransform: 'capitalize'

    },
    infoValue: {
        fontSize: 14,
        color: COLORS.BLACK
    },
    btnComments: {
        borderRadius: 40,
        width: width + 40
    },
    btnDataStats: {
        backgroundColor: COLORS.VIOLET,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 50,
        width: width + 60,
        height: 50,
    },
    snackBar: {
        position: 'absolute',
        bottom: 10,
        height: 50,
        width: Dimensions.get('screen').width - 20,
    }
});
