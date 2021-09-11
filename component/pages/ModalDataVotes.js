import React from 'react'
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from 'react-native';

import { CredentialsContext } from '../../context/credentialsContext';
import DataPresentation from './DataPresentation';

const width = (Dimensions.get('screen').width);
const height = (Dimensions.get('screen').height);

export default function ModalDataVotes({ navigation, route }) {
    const { category } = route.params.picture;
    const { moyenne } = route.params;
    const { resultText } = route.params;

    const { comments } = React.useContext(CredentialsContext);
    const [traitOneArray, setTraitOneArray] = React.useState([]);
    const [traitTwoArray, setTraitTwoArray] = React.useState([]);
    const [traitThreeArray, setTraitThreeArray] = React.useState([]);


    React.useEffect(() => {
        fillTraitsTables();
    }, []);

    const fillTraitsTables = () => {
        let t1 = [];
        let t2 = [];
        let t3 = [];
        comments.forEach(element => {
            if (element.voteOne) {
                t1.push(element.voteOne);
                t2.push(element.voteTwo);
                t3.push(element.voteThree);
            }
        });
        setTraitOneArray(t1);
        setTraitTwoArray(t2);
        setTraitThreeArray(t3);
    }

    function renderTraitsStat() {
        if (category === 'Social') {
            return (
                <View style={{ flex: 1 }}>
                    <DataPresentation trait={'Confident : '} color={'#eb4034'} tab={traitOneArray} />
                    <DataPresentation trait={'Authentic : '} color={'#1cc41a'} tab={traitTwoArray} />
                    <DataPresentation trait={'Fun : '} color={'#1a7ac4'} tab={traitThreeArray} />
                </View>
            )
        } else if (category === 'Business') {
            return (
                <View style={{ flex: 1 }}>
                    <DataPresentation trait={'Competent : '} color={'#1cc41a'} tab={traitOneArray} />
                    <DataPresentation trait={'Likable : '} color={'#eb4034'} tab={traitTwoArray} />
                    <DataPresentation trait={'Influential : '} color={'#1a7ac4'} tab={traitThreeArray} />
                </View>
            )
        } else if (category === 'Dating') {
            return (
                <View style={{ flex: 1 }}>
                    <DataPresentation trait={'Smart : '} color={'#1a7ac4'} tab={traitOneArray} />
                    <DataPresentation trait={'Trustworthy : '} color={'#1cc41a'} tab={traitTwoArray} />
                    <DataPresentation trait={'Attractive : '} color={'#eb4034'} tab={traitThreeArray} />
                </View>
            )
        } else {
            return null
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={style.container}>
                <View style={style.containerView}>
                    <StatusBar
                        hidden={true}
                    />
                    <Text style={style.pageTitle}>Statistics</Text>
                    <Text style={style.pageSubTitle}>
                        <Text style={{ color: '#c0c0c0', fontWeight: 'normal' }}>{'Category : '} </Text>
                        {category}
                    </Text>
                    {traitOneArray.length > 0 ?
                        renderTraitsStat()
                        :
                        <ActivityIndicator size="large" color="#257efa" animating={true} />
                    }
                    <Text style={style.pageSubTitle}>
                        <Text style={{ color: '#c0c0c0', fontWeight: 'normal' }}>{'Moyenne : '}</Text>
                        {moyenne}/30
                    </Text>
                    <Text style={style.pageSubTitle}>
                        <Text style={{ color: '#c0c0c0', fontWeight: 'normal' }}>{'Result : '}</Text>
                        {resultText}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1
    },
    containerView: {
        flex: 1,
        alignItems: 'center'
    },
    pageTitle: {
        margin: 20,
        fontSize: 28,
        color: "#257efa",
        fontWeight: 'bold'
    },
    pageSubTitle: {
        fontSize: 24,
        color: "#000",
        fontWeight: 'bold'
    },
});

