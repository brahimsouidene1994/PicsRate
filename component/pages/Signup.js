import React from 'react';
import {
    View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, ActivityIndicator, Alert
    , TouchableWithoutFeedback, Keyboard
} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { TextInput, Button, RadioButton, Checkbox } from 'react-native-paper';

import { CredentialsContext } from '../../context/credentialsContext';

import AuthService from "../../services/auth.service";

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
    email: Yup.string()
        .required("Please! Enter Email?*")
        .email("Well that's not an email*"),
    password: Yup.string()
        .required("Enter your password")
        .min(6, "Password must be atleast 6 characteres*")
});

GoogleSignin.configure({
    webClientId: '322491027615-didkpi7vkkml6np7m9dbe870q35q9fjp.apps.googleusercontent.com',
    offlineAccess: true
});
function Signup() {
    const { handleStates } = React.useContext(CredentialsContext);

    const [loadingIndicator, setLoadingIndicator] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState("");
    const [checkedContrat, setCheckedContrat] = React.useState(false);
    const [checkedBtnSexe, setCheckedBtnSexe] = React.useState("MALE");
    const [eye, setEye] = React.useState('eye-off');
    const [visiblePwd, setVisiblePwd] = React.useState(false);

    const [userGoogleInfo, setUserGoogleInfo] = React.useState({});

    //sign up 
    const createUser = (email, password, sexe) => {
        setLoadingIndicator(true);
        AuthService.register(email, password, sexe).then(
            (userInfo) => {
                setLoadingIndicator(false);
                handleStates(userInfo, true);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                Alert.alert(message);
                setLoadingIndicator(false);
            }
        );
    };


    //sign up with google
    const _signIn = async () => {
        setLoadingIndicator(!loadingIndicator);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // setUserGoogleInfo({userInfo});
            // axios.post('http://192.168.1.15:3000/api/auth/signupGoogle', userGoogleInfo.email)
            // .then((res) => {
            //     setLoadingIndicator(false);
            //     persistLogin(res.data);
            // }).catch((error) => {
            //     console.log(error)
            // });
            console.warn("successfully logged in")
            console.log(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.warn("user cancelled the login flow")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.warn("operation (e.g. sign in) is in progress already")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.warn("play services not available or outdated")
            } else {
                console.warn(error)
                // some other error happened
            }
        }
    }
    const handleVisibilityPassword = () => {
        setVisiblePwd(!visiblePwd);
        if (visiblePwd) {
            setEye('eye');
        }
        else {
            setEye('eye-off');
        }
    }
    return (
        <ScrollView
            keyboardShouldPersistTaps='handled'
            style={style.container}>
            <Text style={style.title}>Sign up</Text>
            {/* <GoogleSigninButton
                style={{ height: 60 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={_signIn}
                // disabled={loadingIndicator}
                disabled={true}
            /> */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "android" || Platform.OS === "ios" ? "position" : "padding"} style={style.formPage}>
                {/* <Text style={style.orText}>or</Text> */}
                {/* <ActivityIndicator size="large" color="#257efa" animating={loadingIndicator} /> */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <Formik
                        onSubmit={values => console.log(values)}
                        validationSchema={validationSchema}
                        style={style.formContainer}
                    >{(props) => {
                        return (

                            <Form>
                                <MyInput
                                    label="Email"
                                    name="email"
                                    outlineColor={'#257efa'}
                                    mode={'outlined'}
                                    type="email"
                                    left={<TextInput.Icon name="email" color={(isTextInputFocused) =>
                                        isTextInputFocused ? '#257efa' : '#b5b5b5'
                                    } />}
                                    style={style.input}
                                    value={email}
                                    onChangeText={email => setEmail(email)}
                                />
                                {props.touched.email && props.errors.email ?
                                    (<Text style={style.errorText}>{props.errors.email} </Text>)
                                    : null
                                }
                                <MyInput
                                    label="Password"
                                    name="password"
                                    outlineColor={'#257efa'}
                                    mode={'outlined'}
                                    type="text"
                                    left={<TextInput.Icon name="lock" color={(isTextInputFocused) =>
                                        isTextInputFocused ? '#257efa' : '#b5b5b5'
                                    } />}
                                    right={
                                        <TextInput.Icon name={eye}
                                            color={(isTextInputFocused) =>
                                                isTextInputFocused ? '#257efa' : '#b5b5b5'
                                            }
                                            onPress={() => handleVisibilityPassword()}
                                        />
                                    }
                                    style={style.input}
                                    secureTextEntry={visiblePwd}
                                    value={password}
                                    onChangeText={password => setPassword(password)}
                                />
                                {props.touched.password && props.errors.password ?
                                    (<Text style={style.errorText}>{props.errors.password} </Text>)
                                    : null
                                }
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={{ flexDirection: 'row', alignItems: "center", padding: 10 }}>
                                        <RadioButton
                                            color={'#257efa'}
                                            uncheckedColor={'#257efa'}
                                            value="MALE"
                                            status={checkedBtnSexe === 'MALE' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedBtnSexe('MALE')}
                                        />
                                        <Text>Male</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        <RadioButton
                                            color={'#257efa'}
                                            uncheckedColor={'#257efa'}
                                            value="FEMALE"
                                            status={checkedBtnSexe === 'FEMALE' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckedBtnSexe('FEMALE')}
                                        />
                                        <Text>Female</Text>
                                    </View>
                                </View>
                                <View style={{ padding:15,flexDirection: 'row', alignItems: "center" }}>
                                    <Checkbox
                                        status={checkedContrat ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setCheckedContrat(!checkedContrat);
                                        }}
                                    />
                                    <Text>Accept contrat</Text>
                                </View>
                                <Button
                                    style={style.btn}
                                    contentStyle={{ height: 50 }}
                                    labelStyle={{ color: "white", fontSize: 18, fontWeight: 'bold' }}
                                    mode="contained"
                                    color="#257efa"
                                    onPress={() => createUser(email, password, checkedBtnSexe)}
                                    disabled={
                                        props.errors.email || props.errors.password || !checkedContrat?
                                            true
                                            :
                                            false
                                    }
                                    loading={loadingIndicator}
                                >
                                    sign up
                                </Button>
                            </Form>
                        )
                    }}
                    </Formik>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 35,
        color: '#257efa',
        marginTop: 50,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 50
    },
    orText: {
        color: '#b5b5b5',
        fontSize: 18,
        textAlign: 'center',
        margin: 8
    },
    formPage: {
        flex: 1,
        marginTop: 30,
    },
    formContainer: {
        flex: 1,
        padding: 6
    },
    input: {
        height: 50,
        marginBottom: 10
    },
    errorText: {
        fontSize: 14,
        color: '#9c0000'
    }

});
export default Signup
