import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const Dashboard = () => {

  const handleHeaderPress = () => {
    alert('Perfil de Usuario presionado');
  };

  const handleLogout = () => {
    alert('Cerrar Sesión presionado');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={handleHeaderPress}>
        <Icon name="person" size={30} color="#fff" />
        <Text style={styles.headerText}>Perfil de Usuario</Text>
      </TouchableOpacity>

      {/* Separación entre el header y los botones */}
      <View style={styles.separator} />

      {/* Contenedor para las filas de botones */}
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.box} onPress={() => alert('Galería de Videos')}>
            <Icon name="videocam" size={40} color="#fff" />
            <Text style={styles.text}>Galería de Videos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={() => alert('Galería de Imágenes')}>
            <Icon name="photo-library" size={40} color="#fff" />
            <Text style={styles.text}>Galería de Imágenes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.box} onPress={() => alert('Galería de Audios')}>
            <Icon name="audiotrack" size={40} color="#fff" />
            <Text style={styles.text}>Galería de Audios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={() => alert('Otra Sección')}>
            <Icon name="apps" size={40} color="#fff" />
            <Text style={styles.text}>Otra Sección</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003554', // Color de fondo de la paleta
    padding: 10,
    justifyContent: 'space-between', // Espacio entre el contenido y el botón de cerrar sesión
  },
  header: {
    height: 60,
    backgroundColor: '#0582ca', // Color del header
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
    height: 100,
    backgroundColor: '#00a6fb', // Color de los botones
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#051923', // Color del botón de cerrar sesión
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
