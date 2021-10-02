import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from './constants/Colors';
import { CATEGORY } from './constants/Category';
import { TRAIT } from './constants/Traits';
export default function TraitsText({category}) {
    if (!category) return null;
    if (category === CATEGORY.SOCIAL)
        return (
            <Text style={styles.textDescription}>Traits:
                <Text style={{ color: COLORS.RED }}>{TRAIT.CONFIDENT}</Text>,
                <Text style={{ color: COLORS.GREEN }}>{TRAIT.AUTHENTIC}</Text>,
                <Text style={{ color: COLORS.BLUE }}>{TRAIT.FUN}</Text>
            </Text>
        );
    if (category === CATEGORY.BUSINESS)
        return (
            <Text style={styles.textDescription}>Traits:
                <Text style={{ color: COLORS.GREEN }}>{TRAIT.COMPETENT}</Text>,
                <Text style={{ color: COLORS.BLUE }}>{TRAIT.LIKEBLE}</Text>,
                <Text style={{ color: COLORS.RED }}>{TRAIT.INFLUENTIAL}</Text>
            </Text>
        );
    if (category === CATEGORY.DATING)
        return (
            <Text style={styles.textDescription}>Traits:
                <Text style={{ color: COLORS.BLUE }}>{TRAIT.SMART}</Text>,
                <Text style={{ color: COLORS.GREEN }}>{TRAIT.TRUSTWORTHY}</Text>,
                <Text style={{ color: COLORS.RED }}>{TRAIT.ATTRACTIVE}</Text>
            </Text>
        )
}
const styles = StyleSheet.create({
    textDescription: {
        fontSize: 16,
        color: '#6b6969',
        padding: 8
    },
});