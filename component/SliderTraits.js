import React from 'react'
import { View, StyleSheet} from 'react-native'
import SliderVote from './sliderVote/Slider';
import { TRAIT } from './constants/Traits';
import { COLORS } from './constants/Colors';
import { CATEGORY } from './constants/Category';
export default function SliderTraits({ category }) {
    if( !category ) return null;
    if (category === CATEGORY.SOCIAL) 
        return (
            <View style={style.container}>
                <SliderVote text={TRAIT.CONFIDENT+' : '} colorTitle={COLORS.RED} voteFunc={1}/>
                <SliderVote text={TRAIT.AUTHENTIC+' : '} colorTitle={COLORS.GREEN} voteFunc={2}/>
                <SliderVote text={TRAIT.FUN+' : '} colorTitle={COLORS.BLUE} voteFunc={3}/>
            </View>
        );
    if (category === CATEGORY.BUSINESS) 
        return (
            <View style={style.container}>
                <SliderVote text={TRAIT.COMPETENT+' : '} colorTitle={COLORS.GREEN} voteFunc={1}/>
                <SliderVote text={TRAIT.LIKEBLE+' : '} colorTitle={COLORS.RED} voteFunc={2}/>
                <SliderVote text={TRAIT.INFLUENTIAL+' : '} colorTitle={COLORS.BLUE} voteFunc={3}/>
            </View>
        );
    if (category === CATEGORY.DATING) 
        return (
            <View style={style.container}>
                <SliderVote text={TRAIT.SMART+' : '} colorTitle={COLORS.BLUE}voteFunc={1}/>
                <SliderVote text={TRAIT.TRUSTWORTHY+' : '} colorTitle={COLORS.GREEN} voteFunc={2}/>
                <SliderVote text={TRAIT.ATTRACTIVE+' : '} colorTitle={COLORS.RED} voteFunc={3}/>
            </View>
        );
}
const style = StyleSheet.create({
    container:{
        alignItems: 'stretch', 
        justifyContent:'space-around' 
    }
});

