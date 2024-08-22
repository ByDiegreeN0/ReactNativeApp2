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
      {/* Encabezado de perfil de usuario */}
      <TouchableOpacity style={styles.header} onPress={handleHeaderPress}>
        <Icon name="person" size={30} color="#fff" />
        <Text style={styles.headerText}>Perfil de Usuario</Text>
      </TouchableOpacity>

      {/* Separación entre el header y los botones */}
      <View style={styles.separator} />

      {/* Contenedor para las filas de botones */}
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

          <TouchableOpacity style={styles.box} onPress={() => alert('Otra Seccion')}>
            <Icon name="apps" size={40} color="#fff" style={styles.icon} />
            <Text style={styles.text}>Otra Sección</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity style={styles.logoutButton}  onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between', // Espacio entre el contenido y el botón de cerrar sesión
  },
  header: {
    height: 60,
    backgroundColor: '#C9184A', // Color del header
    justifyContent: 'center', // Centra verticalmente el contenido del header
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    elevation: 3, // Sombra para el encabezado
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
    justifyContent: 'center', // Centra verticalmente los botones
    alignItems: 'center', // Centra horizontalmente los botones
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  box: {
    width: 160, // Ancho fijo para los botones
    height: 140, // Altura mayor para dar espacio a los iconos y texto
    backgroundColor: '#A4133C', // Color de los botones
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'column', // Alinea icono y texto verticalmente
    margin: 5,
    padding: 10,
  },
  icon: {
    marginBottom: 10, // Espacio entre el icono y el texto
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#C9184A', // Color del botón de cerrar sesión
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
