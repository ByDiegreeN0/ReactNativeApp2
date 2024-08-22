import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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

const Signup = () => {
  const { control, handleSubmit, formState: { errors }, watch, trigger } = useForm();
  const [step, setStep] = useState(1);
  const password = watch("password");
  const navigation = useNavigation();

  const onSubmit = async (data) => {
    if (step === 1) {
      const isValid = await trigger(["name", "email"]);
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await trigger(["password", "passwordConfirm"]);
      if (isValid) {
        try {
          await AsyncStorage.setItem('userName', data.name);
          await AsyncStorage.setItem('userEmail', data.email);
          await AsyncStorage.setItem('userPassword', data.password);
          Alert.alert('Registro exitoso', 'Puedes iniciar sesión ahora');
          navigation.navigate('Profile');
        } catch (error) {
          console.error('Error storing registration data:', error);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <View style={styles.stepContainer}>
        {step === 1 && (
          <>
            <FormGroup
              id="name"
              label="Nombre"
              control={control}
              rules={{ required: "El nombre es obligatorio" }}
              errors={errors}
            />
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
          </>
        )}
        {step === 2 && (
          <>
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
            <FormGroup
              id="passwordConfirm"
              label="Confirmar Contraseña"
              control={control}
              rules={{
                required: "La confirmación de la contraseña es obligatoria",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              }}
              errors={errors}
              secureTextEntry
            />
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.redirect}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textRedirect}>Ya Tienes Cuenta?</Text>
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
  stepContainer: {
    marginBottom: 16,
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
  },
  button: {
    backgroundColor: '#C9184A',
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
    color: "#FF4D6D",
    margin: 10,
  },
});

export default Signup;
