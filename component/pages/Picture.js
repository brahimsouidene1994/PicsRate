import React from 'react';
import { Text,StyleSheet, Dimensions, Pressable, Alert, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PictureService from '../../services/picture.service';
/**grid display */
const rows = 3;
const cols = 2;
const marginHorizontal = 4;
const marginVertical = 6;
const width = (Dimensions.get('screen').width / cols) - (marginHorizontal * cols);
const height = (Dimensions.get('screen').height / rows);
/**grid display */

function Picture(props) {
    const { _id, contextPic, createdAt, path, status } = props.pic;
    const [loading , setLoading]= React.useState(false);

    const deletePicture = ()=>{
        setLoading(true);
        PictureService.deletePicture(_id)
            .then(()=>{
                Alert.alert(
                    "Success!!",
                    "You picture is deleted :)",
                    [
                      { text: "OK", onPress:()=>setLoading(false)}
                    ]
                  );
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    return (
        
        <Pressable
            onPress={() => {
                props.navigation.navigate('Picture Details',props.pic);
            }}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? 'rgb(210, 230, 255)'
                        : 'white'
                },
            ]}>
            <Text style={style.cardIcon}>
                {status ? 
                    <Icon name="eye-check" style={style.textStatusActivated}/> :
                    <Icon name="eye-off" style={style.textStatusDisactivated}/>
                }
            </Text>
            <ActivityIndicator size={50} animating={loading} color={'red'} style={style.cardActivityIndicator}/>  
            <Card style={style.boxContainer} mode={'outlined'}>
                <Card.Cover source={{ uri: path }} style={style.cardImage} />
                <Card.Actions style={{backgroundColor:'transparent', justifyContent:'space-between'}}>
                   <Text style={style.cardBottomText}>{contextPic}</Text>
                   <Text style={style.cardBottomText}>result</Text>
                   {!status?
                        <Icon name="delete-outline" size={25} onPress={()=>{
                            Alert.alert(
                                "Warning",
                                "Are you sure about deleting this picture!!",
                                [
                                  { text: "YES", onPress:()=>deletePicture()},
                                  { text: "Cancel"}
                                ]
                              );
                        }}/>
                        :
                        <Icon name="delete-off-outline" size={25} onPress={()=>{
                            Alert.alert(
                                "Warning",
                                "You picture is activated, you can't delete it :)",
                                [
                                  { text: "OK"}
                                ]
                              );
                        }}/>
                   }
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
        backgroundColor: '#f0f1f2',
        borderRadius: 5,
    },
    cardIcon:{
        width:100,
        height:100,
        position:'absolute',
        zIndex:50,
        top:10,
        left : 10,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    cardActivityIndicator:{
        width:100,
        height:100,
        position:'absolute',
        zIndex:50,
        top:50,
        left : 50,
    },

    cardImage: {
        width: width,
        height: height - 40,
        borderRadius: 5
    },
    textStatusActivated: {
        fontSize:50,
        color: '#00ad06',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 20
    },
    textStatusDisactivated: {
        fontSize:50,
        color: 'red',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 20
    },
    cardBottomText:{
        textTransform:'capitalize',
        fontSize:14,

    }
});
export default Picture