import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, Modal, Button, Alert } from 'react-native';

export default function HomeScreen() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('http://192.168.1.2:8080/skills'); // Altere o IP para o do seu backend
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Erro ao carregar skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (id) => {
    try {
      await fetch(`http://192.168.1.2:8080/skills/${id}`, { method: 'DELETE' }); // Altere o IP para o do seu backend
      fetchSkills();
    } catch (error) {
      console.error('Erro ao deletar skill:', error);
      Alert.alert('Erro', 'Não foi possível deletar a skill.');
    }
  };

  const renderSkill = ({ item }) => (
    <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Image source={{ uri: item.imageUrl }} style={{ width: 50, height: 50, borderRadius: 25 }} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
        <Text>{item.description}</Text>
        <TouchableOpacity onPress={() => setSelectedSkill(item)}>
          <Text style={{ color: 'blue', marginTop: 5 }}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteSkill(item.id)}>
          <Text style={{ color: 'red', marginTop: 5 }}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={skills}
        renderItem={renderSkill}
        keyExtractor={item => item.id.toString()}
        onRefresh={fetchSkills}
        refreshing={loading}
      />

      <TouchableOpacity style={{ padding: 20, backgroundColor: 'blue', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
        <Text style={{ color: 'white', fontSize: 18 }}>Adicionar Skill</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>{selectedSkill ? 'Editar Skill' : 'Adicionar Skill'}</Text>
            {/* Inputs para nome, descrição, e URL da imagem */}
            <Button title="Salvar" onPress={() => {/* Lógica para salvar skill */}} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
