import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const Dashboard = () => {

  const handleHeaderPress = () => {
    alert('Perfil de Usuario presionado');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={handleHeaderPress}>
        <Icon name="person" size={30} color="#fff" />
        <Text style={styles.headerText}>Perfil de Usuario</Text>
      </TouchableOpacity>

      {/* Separación entre el header y los botones */}
      <View style={styles.separator} />

      <TouchableOpacity style={styles.box} onPress={() => alert('Galería de Videos')}>
        <Icon name="videocam" size={40} color="#fff" />
        <Text style={styles.text}>Galería de Videos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => alert('Galería de Imágenes')}>
        <Icon name="photo-library" size={40} color="#fff" />
        <Text style={styles.text}>Galería de Imágenes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => alert('Galería de Audios')}>
        <Icon name="audiotrack" size={40} color="#fff" />
        <Text style={styles.text}>Galería de Audios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => alert('Otra Sección')}>
        <Icon name="apps" size={40} color="#fff" />
        <Text style={styles.text}>Otra Sección</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    height: 60,
    backgroundColor: '#3E4A89',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  separator: {
    height: 20, 
  },
  box: {
    width: '90%',
    height: 100,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 15,
    alignSelf: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default Dashboard;
