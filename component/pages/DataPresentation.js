import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import {COLORS} from '../constants/Colors';
const width = (Dimensions.get('screen').width);
const height = (Dimensions.get('screen').height);
export default function DataPresentation(props) {
    const [countRangeOne, setCountRangeOne] = React.useState(0);
    const [countRangeTow, setCountRangeTow] = React.useState(0);
    const [countRangeThree, setCountRangeThree] = React.useState(0);
    const {trait,color,tab}=props;
    React.useEffect(()=>{
        countRanges()
    },[])

    const countRanges = () =>{
        let c1 = 0;
        let c2 = 0;
        let c3 = 0;
        tab.forEach(element => {
            if(element <= 3)c1++;
            if((4 <= element) && (element <= 6))c2++;
            if((7 <= element) && (element <= 10))c3++;
        });
        setCountRangeOne(c1);
        setCountRangeTow(c2);
        setCountRangeThree(c3);
    }
    return (
        <View style={style.containerStat}>
            <Text style={style.traitText}>
                <Text style={{ color: color }}>
                    {trait}
                </Text>
            </Text>
            <View style={style.dataContainer}>
                <Text style={style.dataContainerValue}>
                    {countRangeOne}
                    <Text style={{fontSize:14, color:COLORS.GRAYDARK}}>{' Votes'}</Text>
                </Text>
                <Text style={style.dataContainerValue}>
                    {countRangeTow}
                    <Text style={{fontSize:14, color:COLORS.GRAYDARK}}>{' Votes'}</Text>
                </Text>
                <Text style={style.dataContainerValue}>
                    {countRangeThree}
                    <Text style={{fontSize:14, color:COLORS.GRAYDARK}}>{' Votes'}</Text>
                </Text>
            </View>
            <View style={style.underDataContainer}>
                <Text style={style.underDataContainerItem}>1/10 - 3/10</Text>
                <Text style={style.underDataContainerItem}>4/10 - 6/10</Text>
                <Text style={style.underDataContainerItem}>7/10 - 10/10</Text>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    containerStat:{
        flex:1,
        marginTop:20, 
        padding:15,
        alignItems:'center',
        width:width, 
    },
    traitText:{
        width:width-20,
        textAlign:'left',
        paddingBottom:7,
        fontSize: 18,
        fontWeight:'bold'
    },
    dataContainer:{
        flexDirection:'row', 
        justifyContent:'space-around',
        alignItems:'center',
        width:width-30, 
        height:30,
    },
    dataContainerValue:{
        fontSize: 18,

    },
    underDataContainer:{
        flexDirection:'row', 
        justifyContent:'space-around',
        alignItems:'center',
        width:width-30, 
        
    },
    underDataContainerItem:{
        borderTopColor: '#a2a8a3',
        borderTopWidth: 1,
        paddingTop:5,
        color: COLORS.GRAYDARK
    }

});