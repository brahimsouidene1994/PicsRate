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
    Alert,
    Platform
} from 'react-native';
import { TextInput, Button, Switch } from 'react-native-paper';
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

import { CATEGORY } from '../constants/Category';
import { TRAIT } from '../constants/Traits';
import {COLORS} from '../constants/Colors';

const MyInput = compose(
    handleTextInput,
    withNextInputAutoFocusInput
)(TextInput);
const Form = withNextInputAutoFocusForm(View);
const validationSchema = Yup.object().shape({
    context: Yup.string()
        .required("Please! Enter a context of this picture?*")
});

const width = Dimensions.get('screen').width / 1.5;
const height = (Dimensions.get('screen').height / 3) - 20;

const CategoryText = ({category}) =>{
    if(!category) return null;
    if(category === CATEGORY.SOCIAL)
        return(
            <Text style={styles.textDescription}>Traits: 
                <Text style={{color: COLORS.RED}}>{TRAIT.CONFIDENT}</Text>, 
                <Text style={{color: COLORS.GREEN}}>{TRAIT.AUTHENTIC}</Text>, 
                <Text style={{color: COLORS.BLUE}}>{TRAIT.FUN}</Text>
            </Text>
        );
    if(category === CATEGORY.BUSINESS)
        return(
            <Text style={styles.textDescription}>Traits: 
                <Text style={{color:COLORS.GREEN}}>{TRAIT.COMPETENT}</Text>, 
                <Text style={{color:COLORS.BLUE}}>{TRAIT.LIKEBLE}</Text>, 
                <Text style={{color:COLORS.RED}}>{TRAIT.INFLUENTIAL}</Text>
            </Text>
        );
    if(category === CATEGORY.DATING)
        return(
            <Text style={styles.textDescription}>Traits: 
                <Text style={{color:COLORS.BLUE}}>{TRAIT.SMART}</Text>, 
                <Text style={{color:COLORS.GREEN}}>{TRAIT.TRUSTWORTHY}</Text>, 
                <Text style={{color:COLORS.RED}}>{TRAIT.ATTRACTIVE}</Text>
            </Text>
        )      
}


export default function AddPicture({ navigation }) {

    const { userCredentials } = React.useContext(CredentialsContext);

    const [selectedPricture, setSelectedPricture] = React.useState(null);

    const [context, setContext] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [commentStatusSwitcher, setCommentStatusSwitcher] = React.useState(false);
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
    
    const resetFields = () =>{
        setCategory('');
        setContext('');
        setSelectedPricture(null);
    }

    const savePicture = () =>{
        setBtnDisabled(true);
        setLoading(true);
        formdata.append("photo", {
                        uri:  Platform.OS === "android"  || Platform.OS === "ios" || Platform.OS === "windows" ? 
                            selectedPricture.uri 
                            : 
                            selectedPricture.uri.replace("file://", ""),
                        name: selectedPricture.fileName, type: selectedPricture.type});
        formdata.append('category',category);
        formdata.append('context',context);
        formdata.append('commentsStatus', commentStatusSwitcher);
        formdata.append('userId',userCredentials.id);
        PictureService.saveNewPicture(formdata)
            .then((response) => {
                Alert.alert(
                    "New Picture Test",
                    "Your new picture is ready :)",
                    [
                    { text: "OK", onPress : ()=>{
                        resetFields();
                        navigation.navigate('Picture Details',response)
                    }}
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
                                        <Text style={styles.textDescription}>Each category tests different traits.</Text>
                                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                                            <Button
                                                style={styles.btnSocial}
                                                color={category === CATEGORY.SOCIAL?COLORS.BLUE:COLORS.GRAYLIGHT}
                                                contentStyle={{ height: 50 }}
                                                labelStyle={{ color: COLORS.WHITE, fontSize: 16 }}
                                                mode="contained"
                                                onPress={() => setCategory(CATEGORY.SOCIAL)}
                                            >
                                                {CATEGORY.SOCIAL}
                                            </Button>
                                            <Button
                                                style={styles.btnBusiness}
                                                color={category === CATEGORY.BUSINESS ?COLORS.BLUE:COLORS.GRAYLIGHT}
                                                contentStyle={{ height: 50 }}
                                                labelStyle={{ color: COLORS.WHITE, fontSize: 16 }}
                                                mode="contained"
                                                onPress={() => setCategory(CATEGORY.BUSINESS)}                           
                                            >
                                                {CATEGORY.BUSINESS}
                                            </Button>
                                            <Button
                                                style={styles.btnDating}
                                                color={category === CATEGORY.DATING ?COLORS.BLUE:COLORS.GRAYLIGHT}
                                                contentStyle={{ height: 50 }}
                                                labelStyle={{ color: COLORS.WHITE, fontSize: 16 }}
                                                mode="contained"
                                                onPress={() => setCategory(CATEGORY.DATING)}
                                            >
                                                {CATEGORY.DATING}
                                            </Button>
                                        </View>
                                        <View>
                                            <CategoryText category={category} />
                                        </View>
                                        <MyInput
                                            label="Title"
                                            name="context"
                                            outlineColor={COLORS.BLUE}
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
                                        <View style={styles.switcherContainer}>
                                            <Text style={{fontSize:17}}>Activate comments ?</Text>
                                            <Switch 
                                                value={commentStatusSwitcher} 
                                                onValueChange={()=>setCommentStatusSwitcher(!commentStatusSwitcher)} 
                                                color={COLORS.BLUE}
                                                style={{width:100}}
                                            />
                                            {commentStatusSwitcher?<Text style={{fontSize:17}}>On</Text>:<Text style={{fontSize:17}}>Off</Text>}
                                        </View>
                                        <View style={styles.inputImageSection}>
                                            <View style={styles.ImageSections}>
                                                {renderFileUri()}
                                            </View>
                                            <View style={styles.btnParentSection}>
                                                <TouchableOpacity onPress={() => launchCameraFn()} style={styles.btnSection}  >
                                                    <IconIonic name="camera" size={45} color={COLORS.BLUE} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => launchImageLibraryFn()} style={styles.btnSection}  >
                                                    <IconIonic name="images" size={40} color={COLORS.YELLOW} />
                                                </TouchableOpacity>
                                                {selectedPricture ?
                                                    <TouchableOpacity onPress={() => setSelectedPricture(null)} style={styles.btnSection}  >
                                                        <IconAnt name="delete" size={40} color={COLORS.COOLRED} />
                                                    </TouchableOpacity>
                                                    :
                                                    null
                                                }
                                            </View>
                                        </View>
                                        <Button
                                            style={styles.btnSave}
                                            contentStyle={{ height: 50 }}
                                            labelStyle={{ color: COLORS.WHITE, fontSize: 18, fontWeight: 'bold' }}
                                            mode="contained"
                                            color={COLORS.BLUE}
                                            onPress={() => savePicture()}
                                            loading={loading}
                                            disabled={
                                                !category || !context || !selectedPricture || btnDisabled? true : false
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
        color: COLORS.BLUE,
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
    switcherContainer:{
        marginTop:15,
        padding : 10, 
        flexDirection:'row', 
        justifyContent:'space-around'
    },
    inputImageSection: {
        padding: 20,
        flex: 1,
        flexDirection:'row',
        alignItems: 'center'
    },
    ImageSections: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 140,
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
    },
    logoImage: {
        width: 140,
        height: 140,
        borderColor: '#e0ddd3',
        borderWidth: 1,
    },
    images: {
        borderRadius: 10,
        width: 140,
        height: 140,
        borderColor: '#e0ddd3',
        borderWidth: 1,
    },
    btnParentSection: {
        flex:1,
        justifyContent: 'space-around',
        alignItems:'center'
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
    },
    textDescription:{
        fontSize:16,
        color:'#6b6969',
        padding:8
    },
    btnSocial:{
        borderRadius :0,
        borderTopLeftRadius:30,
        borderBottomLeftRadius:30,
    },
    btnBusiness:{
        borderRadius:0,
        marginLeft:5,
        marginRight:5
    },
    btnDating:{
        borderRadius :0,
        borderTopRightRadius:30,
        borderBottomRightRadius:30,
    }
});
