import React from 'react';
import {
    View, Text, SafeAreaView, ScrollView, Image, StyleSheet, Dimensions,
    Pressable, Alert, ActivityIndicator, TouchableOpacity
} from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

import PictureService from "../../services/picture.service";
import CommentService from '../../services/comment.service';
import { CredentialsContext } from '../../context/credentialsContext';

import Icon from 'react-native-vector-icons/MaterialIcons';

/**grid display */
const rows = 3;
const cols = 2;
const width = (Dimensions.get('screen').width / cols);
const height = (Dimensions.get('screen').height / rows);
/**grid display */

export default function PictureDetails({ navigation, route }) {
    const [currentPicture, setCurrentPicture] = React.useState(null);
    const [btnState, setBtnState] = React.useState(false);
    const [commentsCount, setCommentsCount] = React.useState(0);

    const [votingResultText, setVotingResultText] = React.useState('');
    const [votingResultMoy, setVotingResultMoy] = React.useState(0);
    const [reactionsTot, setReactionsTot] = React.useState(0);
    const { _id } = route.params;
    const [loading, setLoading] = React.useState(false);

    const { loadCommentsOfPicture, comments } = React.useContext(CredentialsContext);

    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    React.useEffect(() => {
        getCurrentPicture(_id);
    }, [])
    const getCurrentPicture = (id) => {
        loadCommentsOfPicture(null)
        PictureService.getOnePicture(id)
            .then(response => {
                setCurrentPicture(response)
            })
            .catch((error) => Alert.alert(error));
        CommentService.getAllCommentOfPicture(id)
            .then((response) => {
                if (response) {
                    loadCommentsOfPicture(response);
                    setReactionsTot(response.length);
                    if(response.length === 0){
                        setVotingResultText('No voters yet')
                    }else{
                        countComment(response);
                        voteFormula(response);
                    }
                    //setCommentsCount(response.length)
                }
                else console.log('no comments')
            })
    }

    const countComment = (arrayComment)=>{
        let count = 0;
        arrayComment.forEach(element => {
            if(element.message !== null){
                count++
            }
        });
        setCommentsCount(count);
    }
    const voteFormula = (arrayVotes) =>{
        let votersCount = 0;
        let traitOne = 0;
        let traitTwo = 0;
        let traitThree = 0;
        arrayVotes.forEach(element => {
            if(element.voteOne && element.voteTwo && element.voteThree){
                votersCount++;
                traitOne += element.voteOne;
                traitTwo += element.voteTwo;
                traitThree += element.voteThree;
            }
        });
        let result = (traitOne + traitTwo + traitThree) /  votersCount;
        setVotingResultMoy(result);
        if(result <= 10 ){setVotingResultText('Bad')}
        else if((10 < result ) && (result < 15)){setVotingResultText('Somewhat')}
        else if((15 <= result ) && (result < 20)){setVotingResultText('Medium')}
        else if((20 <= result ) && (result < 25)){setVotingResultText('Good')}
        else if((25 <= result ) && (result < 30)){setVotingResultText('Exellent')}
        else {setVotingResultText('')}
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
        PictureService.getOnePicture(id)
            .then(response => {
                setCurrentPicture(response)
            })
            .catch((error) => Alert.alert(error));
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
                                        <Text style={{ color: 'green', fontSize: 14 }}> Activated</Text>
                                        :
                                        <Text style={{ color: 'red', fontSize: 14 }}> Desactivated</Text>}
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
                <View style={{ flex: 1, padding:10, alignItems:'center'}}>
                    <Button
                        style={style.btnComments}
                        contentStyle={{ height: 50 }}
                        labelStyle={{ color: "#000", fontSize: 16 }}
                        mode="contained"
                        color="#c0c0c0"
                        disabled={btnState}
                        onPress={() => navigation.navigate('My Modal Comments')}
                    >
                        Notes : {commentsCount}
                    </Button>
                    <TouchableOpacity 
                        onPress={() => 
                            navigation.navigate('My Modal Votes',{
                                picture:currentPicture, 
                                moyenne: votingResultMoy , 
                                resultText: votingResultText })}
                        >
                        <View style={style.btnVotes}>
                            <Text style={{fontSize:18, color:'#fff', fontWeight:'bold'}}>Voting result : {votingResultMoy}/30 </Text>
                            <Icon name={'read-more'} size={30} color={'#fff'}/>
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
        borderBottomColor: '#a2a8a3',
        borderBottomWidth: 1,
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
    infoLabel: {
        fontSize: 16,
        color: '#6b6969',
        textTransform: 'capitalize'

    },
    infoValue: {
        fontSize: 14,
        color: '#000'
    },
    btnComments:{
        borderRadius:40,
        width:width + 40
    },
    btnVotes:{
        backgroundColor:'#8a61fa',
        flexDirection:'row',  justifyContent:'center', alignItems:'center',
        marginTop : 20,
        borderRadius:50,
        width:width + 60,
        height:50,
    },
    snackBar:{
        position:'absolute',
        bottom:10,
        height:50,
        width:Dimensions.get('screen').width-20,
    }
});
