import React from 'react'
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from 'react-native';

import { usePictures } from '../../context/credentialsContext';
import DataPresentation from './DataPresentation';

import { TRAIT } from '../constants/Traits';
import { CATEGORY } from '../constants/Category';
import {COLORS} from '../constants/Colors';

export default function ModalDataVotes({ navigation, route }) {
    const { category } = route.params.picture;
    const { moyenne } = route.params;
    const { resultText } = route.params;

    const { comments } = usePictures();
    const [traitOneArray, setTraitOneArray] = React.useState([]);
    const [traitTwoArray, setTraitTwoArray] = React.useState([]);
    const [traitThreeArray, setTraitThreeArray] = React.useState([]);


    React.useEffect(() => {
        fillTraitsTables();
    }, []);

    const fillTraitsTables = () => {
        if(!comments) return;
        if(comments.length === 0) {
            
        }
        if(comments.length > 0){
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
    }

    function renderTraitsStat() {
        if(!category) return null;
        if (category === CATEGORY.SOCIAL) 
            return (
                <View style={{ flex: 1 }}>
                    <DataPresentation trait={TRAIT.CONFIDENT} color={COLORS.RED} tab={traitOneArray} />
                    <DataPresentation trait={TRAIT.AUTHENTIC} color={COLORS.GREEN} tab={traitTwoArray} />
                    <DataPresentation trait={TRAIT.FUN} color={COLORS.BLUE} tab={traitThreeArray} />
                </View>
            )
         if (category === CATEGORY.BUSINESS) 
            return (
                <View style={{ flex: 1 }}>
                    <DataPresentation trait={TRAIT.COMPETENT} color={COLORS.GREEN} tab={traitOneArray} />
                    <DataPresentation trait={TRAIT.LIKEBLE} color={COLORS.RED} tab={traitTwoArray} />
                    <DataPresentation trait={TRAIT.INFLUENTIAL} color={COLORS.BLUE} tab={traitThreeArray} />
                </View>
            )
        if (category === CATEGORY.DATING) 
            return (
                <View style={{ flex: 1 }}>
                    <DataPresentation trait={TRAIT.SMART} color={COLORS.BLUE} tab={traitOneArray} />
                    <DataPresentation trait={TRAIT.TRUSTWORTHY} color={COLORS.GREEN} tab={traitTwoArray} />
                    <DataPresentation trait={TRAIT.ATTRACTIVE} color={COLORS.RED} tab={traitThreeArray} />
                </View>
            )
        
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
                        <Text style={{ color: COLORS.GRAYLIGHT, fontWeight: 'normal' }}>{'Category : '} </Text>
                        {category}
                    </Text>
                    {traitOneArray.length > 0 ?
                        renderTraitsStat()
                        :
                        <ActivityIndicator size="large" color={COLORS.BLUE} animating={true} />
                    }
                    <Text style={style.pageSubTitle}>
                        <Text style={{ color: COLORS.GRAYLIGHT, fontWeight: 'normal' }}>{'Moyenne : '}</Text>
                        {moyenne}/30
                    </Text>
                    <Text style={style.pageSubTitle}>
                        <Text style={{ color: COLORS.GRAYLIGHT, fontWeight: 'normal' }}>{'Result : '}</Text>
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
        color: COLORS.BLUE,
        fontWeight: 'bold'
    },
    pageSubTitle: {
        fontSize: 24,
        color: COLORS.BLACK,
        fontWeight: 'bold'
    },
});

