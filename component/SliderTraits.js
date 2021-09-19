import React from 'react'
import { View, StyleSheet} from 'react-native'
import SliderVote from './sliderVote/Slider';
import { TRAIT } from './Traits';
import { COLORS } from './Colors';
import { CATEGORY } from './Category';
export default function SliderTraits({ category }) {
    
    if (category === CATEGORY.SOCIAL) {
        return (
            <View style={style.container}>
                <SliderVote text={TRAIT.CONFIDENT+' : '} colorTitle={COLORS.RED} voteFunc={1}/>
                <SliderVote text={TRAIT.AUTHENTIC+' : '} colorTitle={COLORS.GREEN} voteFunc={2}/>
                <SliderVote text={TRAIT.FUN+' : '} colorTitle={COLORS.BLUE} voteFunc={3}/>
            </View>
        )
    } else if (category === CATEGORY.BUSINESS) {
        return (
            <View style={style.container}>
                <SliderVote text={TRAIT.COMPETENT+' : '} colorTitle={COLORS.GREEN} voteFunc={1}/>
                <SliderVote text={TRAIT.LIKEBLE+' : '} colorTitle={COLORS.RED} voteFunc={2}/>
                <SliderVote text={TRAIT.INFLUENTIAL+' : '} colorTitle={COLORS.BLUE} voteFunc={3}/>
            </View>
        )
    } else if (category === CATEGORY.DATING) {
        return (
            <View style={style.container}>
                <SliderVote text={TRAIT.SMART+' : '} colorTitle={COLORS.BLUE}voteFunc={1}/>
                <SliderVote text={TRAIT.TRUSTWORTHY+' : '} colorTitle={COLORS.GREEN} voteFunc={2}/>
                <SliderVote text={TRAIT.ATTRACTIVE+' : '} colorTitle={COLORS.RED} voteFunc={3}/>
            </View>
        )
    } else {
        return (null);
    }
}
const style = StyleSheet.create({
    container:{
        alignItems: 'stretch', 
        justifyContent:'space-around' 
    }
});

