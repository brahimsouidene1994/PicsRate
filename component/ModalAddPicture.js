import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import IconIonic from 'react-native-vector-icons/Ionicons';
import {COLORS} from './constants/Colors';

const width = Dimensions.get('screen').width;
export default function ModalAddPicture({ modalVisibility, handleModalAddPictureVisibility, handleSelectedPicture }) {
    const launchCameraFn = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else if (response.assets[0]) {
                handleModalAddPictureVisibility();
                handleSelectedPicture(response.assets[0]);
            } else {
                return null
            }
        });

    }

    const launchImageLibraryFn = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
             
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else if (response.assets[0]) {
                handleModalAddPictureVisibility();
                handleSelectedPicture(response.assets[0]);
            } else {
                return null
            }
        });
    }
    return (
        <View style={{ flex: 1 }}>
            <Modal
                isVisible={modalVisibility}
                style={style.modalContainer}
                animationInTiming={700}
                backdropTransitionInTiming={700}
                hasBackdrop={true}
                onBackdropPress={() => handleModalAddPictureVisibility()}
            >
                <Text style={style.titleModal}>Choose picture</Text>
                <View style={style.btnsContainer}>
                    <TouchableOpacity onPress={() => launchCameraFn()} style={style.btnSection}  >
                        <IconIonic name="camera" size={55} color={COLORS.BLUE} />
                        <Text>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => launchImageLibraryFn()} style={style.btnSection}  >
                        <IconIonic name="images" size={50} color={COLORS.YELLOW} />
                        <Text>Gallery</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}
const style = StyleSheet.create({
    modalContainer: {
        height: 150,
        width: width,
        backgroundColor: '#f2efed',
        position: 'absolute',
        bottom: 0,
        margin: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop:10,
        justifyContent:'flex-start'
    },
    titleModal:{
        textAlign:'center',
        fontSize:20,
        textTransform:'capitalize',
        paddingBottom:20
    },
    btnsContainer: {
        flexDirection: 'row',
        alignContent: 'center'
    },
    btnSection: {
        width:width/2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
