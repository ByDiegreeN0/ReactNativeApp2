import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Login from "./src/screens/RegisterScreen"; // Importar el componente con la primera letra en mayúscula

export default function App() {
  return (
    <View style={styles.container}>
      <Login /> {/* Utilizar el componente con la primera letra en mayúscula */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
