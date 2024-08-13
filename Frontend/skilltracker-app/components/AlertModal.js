import { View, Text, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';

const AlertModal = ({ visible, message, loading, onClose }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-6 rounded-xl shadow-lg w-3/4">
                    {!loading && <Text className="text-xl font-bold mb-4">Alert</Text>}
                    <Text className="mb-6 text-center">{message}</Text>
                    {loading && <ActivityIndicator size="large" color="#0ea5e9" />}
                    {!loading && (
                        <TouchableOpacity onPress={onClose} className="bg-sky-500 p-2 rounded-xl mt-4">
                            <Text className="text-white text-center">Close</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default AlertModal;
