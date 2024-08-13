import { View, Image, StatusBar, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import PasswordInput from '../components/PasswordInput';
import SubmitButton from '../components/SubmitButton';
import CheckBox from '../components/CheckBox';
import AlertModal from '../components/AlertModal';
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe o AsyncStorage


export default function LoginScreen() {
    useEffect(() => {
        // Bloqueia a orientação para retrato
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

        // libera a orientação quando o componente for desmontado:
        return () => {
            ScreenOrientation.unlockAsync();
        };
    }, []);

    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [savePassword, setSavePassword] = useState(false); // Estado para salvar senha
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Carrega o nome de usuário e senha salvos do AsyncStorage
        loadSavedCredentials();
    }, []);

    const loadSavedCredentials = async () => {
        try {
            const savedUsername = await AsyncStorage.getItem('username');
            const savedPassword = await AsyncStorage.getItem('password');
            if (savedUsername && savedPassword) {
                setUsername(savedUsername);
                setPassword(savedPassword);
                setSavePassword(true);
            }
        } catch (error) {
            console.error('Erro ao carregar credenciais salvas:', error);
        }
    };

    const saveCredentials = async () => {
        try {
            if (savePassword) {
                await AsyncStorage.setItem('username', username);
                await AsyncStorage.setItem('password', password);
            } else {
                await AsyncStorage.removeItem('username');
                await AsyncStorage.removeItem('password');
            }
        } catch (error) {
            console.error('Erro ao salvar credenciais:', error);
        }
    };

    // Função para realizar o login (adaptada para chamar o backend)
    const handleLogin = async () => {
        if (!username || !password) {
            setModalMessage('Ambos os campos são obrigatórios!');
            setModalVisible(true);
            return; // Impede o envio da requisição se os campos estiverem vazios
        }

        setLoading(true);

        try {
            const response = await fetch('http://192.168.1.11:8080/login', { // Substitua pela URL correta do seu backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.accessToken; // Supondo que o backend retorna um token JWT

                // Salve o token em algum lugar seguro (ex: AsyncStorage, contexto global, etc.)
                // ...

                // Salve as credenciais se o usuário marcou a opção
                await saveCredentials();

                // Navegue para a tela Home
                navigation.navigate('Home');
            } else {
                const errorData = await response.json();
                setModalMessage(errorData.message || 'Erro ao fazer login. Verifique suas credenciais.');
                setModalVisible(true);
            }
        } catch (error) {
            console.error('Erro na requisição de login:', error);
            setModalMessage('Erro ao fazer login. Tente novamente mais tarde.');
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="bg-white h-full w-full">

            <StatusBar style="light" />

            {/* --------------------------------- IMAGENS ---------------------------------*/}
            <Image className="h-full w-full absolute" source={require('../assets/images/bg.png')} />
            <View className="flex-row justify-around w-full absolute">
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-[255px] w-[90px]" source={require('../assets/images/light.png')} />
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className="h-[160px] w-[65px]" source={require('../assets/images/light.png')} />
            </View>

            {/* --------------------------------- TITULO ---------------------------------*/}
            <View className="h-full w-full flex justify-around pt-60 pb-12">
                <View className="flex items-center mb-10">
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
                        Login
                    </Animated.Text>
                </View>

                {/* --------------------------------- FORMULARIO ---------------------------------*/}
                <View className="flex items-center mx-4 space-y-6">
                    <InputField placeholder='Username' value={username} onChangeText={setUsername} />
                    <PasswordInput placeholder='Password' value={password} onChangeText={setPassword} />
                    <CheckBox label="Save Password" checked={savePassword} onChange={setSavePassword} />
                    {/* Removido "Keep me logged in" */}
                    <SubmitButton label="Login" onPress={handleLogin} />

                    {/* --------------------------------- LINK DE CADASTRO ---------------------------------*/}
                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="w-5/6 mt-6 flex items-center">
                        <TouchableOpacity onPress={() => navigation.push('Signup')}>
                            <Text className="text-gray-600">Não tem uma conta? <Text className="text-sky-600">Cadastre-se</Text></Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

            </View>
            {/* --------------------------------- MODAL -------------------------------- */}
            <AlertModal visible={modalVisible} message={modalMessage} loading={loading} onClose={() => setModalVisible(false)} />

        </View>
    );
}
