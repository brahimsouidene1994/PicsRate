import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import SliderVote from './sliderVote/Slider';

import { CredentialsContext } from '../context/credentialsContext';
export default function SliderTraits({ category }) {
    const {choseVoteOne,
        choseVoteTwo,
        choseVoteThree} = React.useContext(CredentialsContext);
    if (category === 'Social') {
        return (
            <View style={{alignItems: 'stretch', justifyContent:'space-around' }}>
                <SliderVote text={'Confident'} colorTitle={'#eb4034'} fnt={choseVoteOne}/>
                <SliderVote text={'Authentic'} colorTitle={'#1cc41a'} fnt={choseVoteTwo}/>
                <SliderVote text={'Fun'} colorTitle={'#1a7ac4'} fnt={choseVoteThree}/>
            </View>
        )
    } else if (category === 'Business') {
        return (
            <View style={{alignItems: 'stretch', justifyContent:'space-around' }}>
                <SliderVote text={'Competent'} colorTitle={'#1cc41a'} fnt={choseVoteOne}/>
                <SliderVote text={'Likable'} colorTitle={'#eb4034'} fnt={choseVoteTwo}/>
                <SliderVote text={'Influential'} colorTitle={'#1a7ac4'}/>
            </View>
        )
    } else if (category === 'Dating') {
        return (
            <View style={{alignItems: 'stretch', justifyContent:'space-around' }}>
                <SliderVote text={'Smart'} colorTitle={'#1a7ac4'} fnt={choseVoteOne}/>
                <SliderVote text={'Trustworthy'} colorTitle={'#1cc41a'} fnt={choseVoteTwo}/>
                <SliderVote text={'Attractive'} colorTitle={'#eb4034'} fnt={choseVoteThree}/>
            </View>
        )
    } else {
        return (null);
    }
}

