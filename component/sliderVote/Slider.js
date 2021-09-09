import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Label from './Label';
import Notch from './Notch';

import { CredentialsContext } from '../../context/credentialsContext';

export default function SliderVote({text, colorTitle, voteFunc}) {
    const {choseVoteOne, choseVoteTwo, choseVoteThree} = React.useContext(CredentialsContext);
    const [valueSelected, setValueSelected] = React.useState(1);
    const renderThumb = React.useCallback(() => <Thumb color={colorTitle}/>, []);
    const renderRail = React.useCallback(() => <Rail />, []);
    const renderRailSelected = React.useCallback(() => <RailSelected color={colorTitle}/>, []);
    const renderLabel = React.useCallback(value => <Label text={value} color={colorTitle}/>, []);
    const renderNotch = React.useCallback(() => <Notch />, []);
    const handleValueChange = React.useCallback((low, high, test) => {
        setValueSelected(low);
        if(voteFunc === 1){
            choseVoteOne(low)
        }else if (voteFunc === 2){
            choseVoteTwo(low)
        }else{
            choseVoteThree(low)
        }
    }, [valueSelected]);
    return (
        <View style={style.container}>
        <Text style={{fontSize:18, textAlign:'center',marginBottom:10, color : colorTitle}}>
            {text}
            <Text style={style.valueSelected}>{valueSelected}</Text> 
            /10
        </Text>
        <Slider    
            floatingLabel={true} 
            min={1}
            max={10}
            step={1}
            disableRange={true}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
        />
        </View>
    )
}
const style = StyleSheet.create({
    container :{
        height:80,
        flex :1,
    },
    valueSelected:{
       color:'#000',
       fontSize:22,
       fontWeight:'bold' 
    }
});



