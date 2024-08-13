import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

const InputField = ({ placeholder, value, onChangeText }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Animated.View entering={FadeInDown.duration(1000).springify()} style={[styles.inputContainer, isFocused && styles.focusedContainer]}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={'gray'}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        padding: 14,
        paddingLeft: 20,
        borderRadius: 20,
        width: '100%',
        height: 48,
        marginBottom: 16
    },
    focusedContainer: {
        backgroundColor: '#e5e7eb'
    },
    input: {
        flex: 1,
        fontSize: 18
    }
});

export default InputField;
