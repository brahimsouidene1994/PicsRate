import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    Pressable,
    Alert
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import PictureService from '../../services/picture.service';
import IconIonic from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { CredentialsContext } from '../../context/credentialsContext';
import { compose } from "recompose";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    handleTextInput,
    withNextInputAutoFocusForm,
    withNextInputAutoFocusInput
} from "react-native-formik";

const MyInput = compose(
    handleTextInput,
    withNextInputAutoFocusInput
)(TextInput);
const Form = withNextInputAutoFocusForm(View);
const validationSchema = Yup.object().shape({
    context: Yup.string()
        .required("Please! Enter a context of this picture?*"),
    description: Yup.string()
});

const width = Dimensions.get('screen').width / 1.5;
const height = (Dimensions.get('screen').height / 3) - 20;



export default function AddPicture({ navigation }) {

    const { userCredentials } = React.useContext(CredentialsContext);

    const [selectedPricture, setSelectedPricture] = React.useState();
    const [context, setContext] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [btnDisabled, setBtnDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    let formdata = new FormData();

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
                style={styles.logoImage}
            />
        }
    }

    const savePicture = () =>{
        setBtnDisabled(true);
        setLoading(true);
        formdata.append("photo", {
                        uri:  Platform.OS === "android" ? 
                            selectedPricture.uri 
                            : 
                            selectedPricture.uri.replace("file://", ""),
                        name: selectedPricture.fileName, type: selectedPricture.type});
        formdata.append('context',context);
        formdata.append('description',description);
        formdata.append('userId',userCredentials.id);
        PictureService.saveNewPicture(formdata)
            .then((response) => {
                Alert.alert(
                    "New Picture Test",
                    "Your new picture is ready :)",
                    [
                    { text: "OK", onPress : ()=>navigation.navigate('Picture Details',response)}
                    ]
                );
                setLoading(false);
            })
            .catch((error) => Alert.alert(error))
    }
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.pageTitle}>New Picture</Text>
                    <View style={styles.bodyform}>
                        <Formik
                            onSubmit={values => console.log(values)}
                            validationSchema={validationSchema}
                            style={styles.formPage}
                        >{(props) => {
                            return (
                                <Form >
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <MyInput
                                            label="Context"
                                            name="context"
                                            outlineColor={'#257efa'}
                                            mode={'outlined'}
                                            type="text"
                                            style={styles.input}
                                            value={context}
                                            onChangeText={context => setContext(context)}
                                        />
                                        {props.touched.context && props.errors.context ?
                                        (<Text style={styles.errorText}>{props.errors.email} </Text>)
                                        : null
                                        }
                                        <MyInput
                                            multiline
                                            label="Description"
                                            name="description"
                                            outlineColor={'#257efa'}
                                            mode={'outlined'}
                                            type="text"
                                            numberOfLines={2}
                                            style={styles.input}
                                            value={description}
                                            onChangeText={description => setDescription(description)}
                                        />
                                        <View style={styles.inputImageSection}>
                                            <View style={styles.ImageSections}>
                                                {renderFileUri()}
                                            </View>
                                            <View style={styles.btnParentSection}>
                                                <TouchableOpacity onPress={() => launchCameraFn()} style={styles.btnSection}  >
                                                    <IconIonic name="camera" size={45} color="#257efa" />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => launchImageLibraryFn()} style={styles.btnSection}  >
                                                    <IconIonic name="images" size={40} color="#f5c236" />
                                                </TouchableOpacity>
                                                {selectedPricture ?
                                                    <TouchableOpacity onPress={() => setSelectedPricture(null)} style={styles.btnSection}  >
                                                        <IconAnt name="delete" size={40} color="#ffbaad" />
                                                    </TouchableOpacity>
                                                    :
                                                    null
                                                }
                                            </View>
                                        </View>
                                        <Button
                                            style={styles.btnSave}
                                            contentStyle={{ height: 50 }}
                                            labelStyle={{ color: "white", fontSize: 18, fontWeight: 'bold' }}
                                            mode="contained"
                                            color="#257efa"
                                            onPress={() => savePicture()}
                                            loading={loading}
                                            disabled={
                                                !context || !selectedPricture || btnDisabled? true : false
                                            }
                                        >
                                            Save
                                        </Button>
                                    </View>
                                </Form>
                            )
                        }}
                        </Formik>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#fff',
        flex: 1
    },
    scrollView: {
        flex: 1
    },
    container: {
        flex: 1,
    },
    pageTitle: {
        margin: 20,
        fontSize: 28,
        color: "#257efa",
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bodyform: {
        padding: 20,
        marginTop:-20
    },
    formPage: {
        flex: 1,
        width: Dimensions.get('screen').width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginTop: 8,
        width: width + 40
    },
    inputImageSection: {
        padding: 10,
        flex: 1,
        alignItems: 'center'
    },
    ImageSections: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height,
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
    },
    logoImage: {
        width: width - 20,
        height: height - 20,
        borderColor: '#e0ddd3',
        borderWidth: 1,
    },
    images: {
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
    },
    btnSave: {
        borderRadius: 50,
        width: width,
    },
    errorText: {
        fontSize: 14,
        color: '#9c0000'
    }
});
