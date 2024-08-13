import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

const SubmitButton = ({ label, onPress }) => {
    return (
        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        marginTop: 24
    },
    button: {
        backgroundColor: '#0ea5e9',
        padding: 8,
        borderRadius: 20,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default SubmitButton;
