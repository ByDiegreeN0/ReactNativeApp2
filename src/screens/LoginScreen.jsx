import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const FormGroup = ({ id, label, control, rules, errors, secureTextEntry = false }) => (
  <View style={styles.formGroup}>
    <Text style={styles.label}>{label}</Text>
    <Controller
      control={control}
      name={id}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={[styles.input, errors[id] && styles.inputError]}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder={label}
          secureTextEntry={secureTextEntry}
        />
      )}
    />
    {errors[id] && <Text style={styles.errorMessage}>{errors[id].message}</Text>}
  </View>
);

const Signin = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState(''); // Estado para el error de login
  const navigation = useNavigation();

  const onSubmit = async (data) => {
    try {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');

      if (data.email === storedEmail && data.password === storedPassword) {
        setLoginError(''); // Limpiar error si es correcto
        navigation.navigate('Profile');
      } else {
        setLoginError('Correo electrónico o contraseña incorrectos'); // Establecer mensaje de error
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      setLoginError('Hubo un problema al intentar iniciar sesión'); // Establecer mensaje de error general
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <View style={styles.formContainer}>
        <FormGroup
          id="email"
          label="Correo Electrónico"
          control={control}
          rules={{
            required: "El correo electrónico es obligatorio",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@.]{2,}$/,
              message: "El correo electrónico no es válido",
            },
          }}
          errors={errors}
        />
        <FormGroup
          id="password"
          label="Contraseña"
          control={control}
          rules={{
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          }}
          errors={errors}
          secureTextEntry
        />
        
        {/* Mostrar mensaje de error de login si existe */}
        {loginError ? <Text style={styles.errorMessage}>{loginError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.redirect}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.textRedirect}>¿No tienes cuenta?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formContainer: {
    marginTop: 24,
  },
  formGroup: {
    marginBottom: 16,
    width: 300,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  redirect: {
    marginTop: 16,
  },
  textRedirect: {
    textAlign: "center",
    color: "#007bff",
    margin: 10,
  },
});

export default Signin;
