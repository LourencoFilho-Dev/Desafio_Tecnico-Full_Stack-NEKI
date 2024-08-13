import { View, Image, StatusBar, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import PasswordInput from '../components/PasswordInput';
import SubmitButton from '../components/SubmitButton';
import AlertModal from '../components/AlertModal';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function SignupScreen() {

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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword) {
      setModalMessage('Todos os campos são obrigatórios!');
      setModalVisible(true);
      return; // Impede o envio da requisição se os campos estiverem vazios
    }

    if (password !== confirmPassword) {
      setModalMessage('As senhas não coincidem!');
      setModalVisible(true);
      return; // Impede o envio da requisição se as senhas não coincidem
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.1.11:8080/register', { // Substitua pela URL correta do seu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setModalMessage('Cadastro realizado com sucesso!');
        setModalVisible(true);
        setTimeout(() => {
          setLoading(false);
          setModalVisible(false);
          navigation.navigate('Login'); // Navega para a tela de login após o cadastro
        }, 2000);
      } else {
        const errorData = await response.json();
        setModalMessage(errorData.message || 'Erro ao realizar o cadastro.');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Erro na requisição de cadastro:', error);
      setModalMessage('Erro ao realizar o cadastro. Tente novamente mais tarde.');
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
            Cadastro
          </Animated.Text>
        </View>

        {/* --------------------------------- FORMULARIO ---------------------------------*/}
        <View className="flex items-center mx-4 space-y-6">
          <InputField placeholder='Username' value={username} onChangeText={setUsername} />
          <PasswordInput placeholder='Password' value={password} onChangeText={setPassword} />
          <PasswordInput placeholder='Confirm Password' value={confirmPassword} onChangeText={setConfirmPassword} />
          <SubmitButton label="Cadastrar" onPress={handleSignup} />

          {/* --------------------------------- LINK DE LOGIN ---------------------------------*/}
          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="w-5/6 mt-6 flex items-center">
            <TouchableOpacity onPress={() => navigation.push('Login')}>
              <Text className="text-gray-600">Já tem uma conta? <Text className="text-sky-600">Faça login</Text></Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

      </View>
      {/* --------------------------------- MODAL -------------------------------- */}
      <AlertModal visible={modalVisible} message={modalMessage} loading={loading} onClose={() => setModalVisible(false)} />

    </View>
  );
}
