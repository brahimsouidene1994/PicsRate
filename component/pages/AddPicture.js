import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Button,
    Dimensions,
    TouchableOpacity,
    Pressable
} from 'react-native';
import { InputText } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import IconIonic from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';

const width = Dimensions.get('screen').width / 1.5;
const height = (Dimensions.get('screen').height / 3) - 20;

export default function AddPicture({ navigation }) {

    const [selectedPricture, setSelectedPricture] = React.useState();

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
                setSelectedPricture(response.assets[0]);
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
            // console.log('Response = ', response.assets[0]);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else if (response.assets[0]) {
                setSelectedPricture(response.assets[0]);
            } else {
                return null
            }
        });
    }

    function renderFileUri() {
        if (selectedPricture) {
            return (
                <Pressable
                    onPress={() => {
                        navigation.navigate('My Modal', selectedPricture.uri)
                    }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? 'rgb(210, 230, 255)'
                                : 'white'
                        },
                    ]}>
                    <Image
                        source={{ uri: selectedPricture.uri }}
                        style={styles.images}
                    />
                </Pressable>
            )
        } else {
            return <Image
                source={require('../../assets/Logo2.png')}
                style={styles.images}
            />
        }
    }
    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView}>
                <View>
                    <Text style={styles.pageTitle}>New Picture</Text>
                    <View style={styles.body}>
                        <View style={styles.ImageSections}>
                            {renderFileUri()}
                        </View>
                        <View style={styles.btnParentSection}>
                            <TouchableOpacity onPress={() => launchCameraFn()} style={styles.btnSection}  >
                                <IconIonic name="camera" size={45} color="#257efa" />
                                {/* <Text style={styles.btnText}>Directly Launch Camera</Text> */}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => launchImageLibraryFn()} style={styles.btnSection}  >
                                <IconIonic name="images" size={40} color="#f5c236" />
                                {/* <Text style={styles.btnText}>Directly Launch Image Library</Text> */}
                            </TouchableOpacity>
                            {selectedPricture?
                                <TouchableOpacity onPress={() => setSelectedPricture(null)} style={styles.btnSection}  >
                                    <IconAnt name="delete" size={40} color="#ffbaad" />
                                    {/* <Text style={styles.btnText}>Directly Launch Image Library</Text> */}
                                </TouchableOpacity>
                                :
                                null
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "#fff"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageTitle: {
        margin: 20,
        fontSize: 28,
        color: "#257efa",
        fontWeight: 'bold',
        textAlign: 'center'
    },
    body: {
        backgroundColor: "#fff",
        flexDirection: 'column',
        alignItems: 'center'
    },
    ImageSections: {
        display: 'flex',
        alignItems: 'center',
        padding: 5,
    },
    images: {
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
        width: width,
        height: height,
        borderColor: '#e0ddd3',
        borderWidth: 1,
    },
    btnParentSection: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    btnSection: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    }
});
