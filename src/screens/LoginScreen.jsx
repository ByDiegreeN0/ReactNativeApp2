import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

const FormGroup = ({ id, label, control, rules, errors }) => (
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
          secureTextEntry={id === 'password'}
          keyboardType={id === 'email' ? 'email-address' : 'default'}
          placeholder={label}
        />
      )}
    />
    {errors[id] && <Text style={styles.errorMessage}>{errors[id].message}</Text>}
  </View>
);

const Signin = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigation();

  const onSubmit = async (data) => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');

      if (data.email === storedEmail && data.password === storedPassword) {
        navigation.navigate('DashboardScreen'); // Redirige al DashboardScreen
      } else {
        Alert.alert('Error', 'Correo electrónico o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Inicio de Sesión</Text>
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
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.redirect} 
          onPress={() => navigation.navigate('RegisterScreen')} // Redirige al RegisterScreen
        >
          <Text style={styles.textRedirect}>No Tienes Cuenta?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginBottom: 8,
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
    marginBottom: 8,
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
    width: '100%'
  },
  textRedirect: {
    textAlign: "center",
    color: "#007bff",
    margin: 10,
  },
});

export default Signin;
