import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

const PasswordInput = ({ placeholder, value, onChangeText }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={[styles.inputContainer, isFocused && styles.focusedContainer]}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={'gray'}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Icon name={secureTextEntry ? 'eye-off' : 'eye'} size={20} color="gray" />
            </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
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

export default PasswordInput;
