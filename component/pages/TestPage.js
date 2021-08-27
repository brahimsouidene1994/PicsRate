import React from 'react';
import { Button, View, StyleSheet, Text } from "react-native";
import { compose } from "recompose";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    handleTextInput,
    withNextInputAutoFocusForm,
    withNextInputAutoFocusInput
} from "react-native-formik";
import { TextInput } from 'react-native-paper';

const MyInput = compose(
    handleTextInput,
    withNextInputAutoFocusInput
)(TextInput);
const Form = withNextInputAutoFocusForm(View);
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("please! email?")
        .email("well that's not an email"),
    password: Yup.string()
        .required()
        .min(5, "pretty sure this will be hacked")
});
export default function TestPage() {
    return (
        <Formik
            validationSchema={validationSchema}
            style={style.formPage}
        >{(props) => {
            return (
                <Form>
                    <MyInput label="Email" name="email" outlineColor={'#257efa'} mode={'outlined'} type="email" style={style.input} />
                    <Text>{props.errors.email?props.errors.email:null}</Text>
                    <MyInput label="Password" name="password" outlineColor={'#257efa'} mode={'outlined'} type="password" style={style.input}/>
                    <Button  onPress={props.handleSubmit} title="SUBMIT" />
                </Form>
            )
        }}
        </Formik>
    )
}

const style = StyleSheet.create({
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
    }
});