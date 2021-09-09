import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import SliderVote from './sliderVote/Slider';

export default function SliderTraits({ category }) {
    
    if (category === 'Social') {
        return (
            <View style={{alignItems: 'stretch', justifyContent:'space-around' }}>
                <SliderVote text={'Confident : '} colorTitle={'#eb4034'} voteFunc={1}/>
                <SliderVote text={'Authentic : '} colorTitle={'#1cc41a'} voteFunc={2}/>
                <SliderVote text={'Fun : '} colorTitle={'#1a7ac4'} voteFunc={3}/>
            </View>
        )
    } else if (category === 'Business') {
        return (
            <View style={{alignItems: 'stretch', justifyContent:'space-around' }}>
                <SliderVote text={'Competent : '} colorTitle={'#1cc41a'} voteFunc={1}/>
                <SliderVote text={'Likable : '} colorTitle={'#eb4034'} voteFunc={2}/>
                <SliderVote text={'Influential : '} colorTitle={'#1a7ac4'} voteFunc={3}/>
            </View>
        )
    } else if (category === 'Dating') {
        return (
            <View style={{alignItems: 'stretch', justifyContent:'space-around' }}>
                <SliderVote text={'Smart : '} colorTitle={'#1a7ac4'}voteFunc={1}/>
                <SliderVote text={'Trustworthy : '} colorTitle={'#1cc41a'} voteFunc={2}/>
                <SliderVote text={'Attractive : '} colorTitle={'#eb4034'} voteFunc={3}/>
            </View>
        )
    } else {
        return (null);
    }
}

