import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {

  const navigation = useNavigation();

  const handleHeaderPress = () => {
    alert('Perfil de Usuario presionado');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={handleHeaderPress}>
        <Icon name="person" size={30} color="#fff" />
        <Text style={styles.headerText}>Perfil de Usuario</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Videos')}>
            <Icon name="videocam" size={40} color="#fff" style={styles.icon} />
            <Text style={styles.text}>Galería de Videos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Images')}>
            <Icon name="photo-library" size={40} color="#fff" style={styles.icon} />
            <Text style={styles.text}>Galería de Imágenes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.box} onPress={() => alert('Galería de Audios')}>
            <Icon name="audiotrack" size={40} color="#fff" style={styles.icon} />
            <Text style={styles.text}>Galería de Audios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={() => alert('Cámara')}>
            <Icon name="camera-alt" size={40} color="#fff" style={styles.icon} />
            <Text style={styles.text}>Cámara</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#003554',
    justifyContent: 'space-between',
  },
  header: {
    height: 60,
    backgroundColor: '#0582ca',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    elevation: 3,
    marginBottom: 10,
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
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  box: {
    width: 160,
    height: 140,
    backgroundColor: '#006494',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'column',
    margin: 5,
    padding: 10,
  },
  icon: {
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#00a6fb',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Dashboard;
