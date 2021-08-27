import React from 'react'
import {
    View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator,
    KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, SafeAreaView, StatusBar
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
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
const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}> {children}
    </TouchableWithoutFeedback>
);

function Login({ navigation }) {

    const { handleStates } = React.useContext(CredentialsContext);
    const [loadingIndicator, setLoadingIndicator] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState("");

    const [eye, setEye] = React.useState('eye-off');
    const [visiblePwd, setVisiblePwd] = React.useState(true);

    const signIn = async (email, password) => {
        setLoadingIndicator(true);
        await AuthService.login(email, password).then(
            (user) => {
                setLoadingIndicator(false);
                handleStates(user, true);
            },
            (error) => {
                let resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoadingIndicator(false);
                setMessage(resMessage);
                Alert.alert(message);
            }
        );
    };

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
        <SafeAreaView style={style.containerSafe}>
            <ScrollView style={style.container}>
                <View >
                    <View style={style.shape}></View>
                    <View style={style.shape2}></View>

                    <Text style={style.pageName}>log in</Text>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "android" ? "padding" : "height"} style={style.formPage}>
                        <ActivityIndicator size="large" color="#257efa" animating={loadingIndicator} />
                        <Formik
                            onSubmit={values => console.log(values)}
                            validationSchema={validationSchema}
                            style={style.formPage}
                        >{(props) => {
                            return (

                                <Form>
                                    <MyInput
                                        label="Email"
                                        name="email"
                                        left={<TextInput.Icon name="email" color={(isTextInputFocused) =>
                                            isTextInputFocused ? '#257efa' : '#b5b5b5'
                                        } />}
                                        outlineColor={'#257efa'}
                                        mode={'outlined'}
                                        type="email"
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
                                    <Button
                                        style={style.btn}
                                        contentStyle={{ height: 50 }}
                                        labelStyle={{ color: "white", fontSize: 18, fontWeight: 'bold' }}
                                        mode="contained"
                                        color="#257efa"
                                        onPress={() => signIn(email, password)}
                                        disabled={
                                            props.errors.email || props.errors.password ?
                                                true
                                                :
                                                false
                                        }
                                    >
                                        sign in
                                    </Button>
                                </Form>
                            )
                        }}
                        </Formik>
                        <Text
                            style={style.textAccount}
                            onPress={() => navigation.navigate('Signup')}
                        >You don't have account? sign up</Text>
                        <Text style={style.textAccount} onPress={() => navigation.navigate('test page')}>forget your password?</Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    containerSafe: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    shape: {
        width: 200,
        height: 180,
        backgroundColor: '#257efa',
        borderBottomRightRadius: 200,

    },
    shape2: {
        position: 'absolute',
        top: 120,
        left: 150,
        width: 60,
        height: 60,
        backgroundColor: '#257efa',
        borderRadius: 100,

    },
    pageName: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 180,
        flex: 1,
        textAlign: 'center',
        fontSize: 35,
        color: '#257efa',
        marginTop: 50,
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    formPage: {
        flex: 1,
        marginTop: 30,
        padding: 20
    },
    input: {
        marginTop: 8,
    },
    btn: {
        marginTop: 8,
    },
    textAccount: {
        marginTop: 10,
        color: '#257efa',
        fontSize: 16,
        textTransform: 'capitalize'
    },
    errorText: {
        fontSize: 14,
        color: '#9c0000'
    }
});
export default Login