import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

const CheckBox = ({ label }) => {
    const [checked, setChecked] = useState(false);

    return (
        <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setChecked(!checked)} style={styles.checkbox}>
                <Icon name={checked ? 'check-square' : 'square'} size={20} color="gray" />
                <Text style={styles.checkboxLabel}>{label}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        width: '100%',
        marginTop: 16
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkboxLabel: {
        marginLeft: 8,
        color: 'gray'
    }
});

export default CheckBox;
