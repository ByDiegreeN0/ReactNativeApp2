import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente para el formulario
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

// Componente principal de registro
const Signup = ({ onRegister }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();
  const [step, setStep] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const password = watch("password");

  const onSubmit = async (data) => {
    if (step === 1) {
      const isValid = await trigger(["name", "email"]);
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await trigger(["password", "passwordConfirm"]);
      if (isValid) {
        try {
          await AsyncStorage.setItem('isAuthenticated', 'true');
          onRegister();
          setShowDialog(true);
        } catch (error) {
          console.error('Error storing authentication status:', error);
        }
      }
    }
  };

  const handleKeepSession = async (keep) => {
    try {
      if (keep) {
        await AsyncStorage.setItem('session', 'local');
      } else {
        await AsyncStorage.setItem('session', 'session');
      }
      setShowDialog(false);
      // Navigate to another screen or handle post-registration logic
    } catch (error) {
      console.error('Error handling session storage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      {step === 1 && (
        <View style={styles.stepContainer}>
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
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepContainer}>
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
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      )}

      {showDialog && (
        <View style={styles.dialogOverlay}>
          <View style={styles.dialogContent}>
            <Text style={styles.dialogTitle}>Mantener sesión</Text>
            <Text>¿Desea mantener la sesión iniciada?</Text>
            <View style={styles.dialogActions}>
              <TouchableOpacity style={styles.dialogButton} onPress={() => handleKeepSession(true)}>
                <Text style={styles.dialogButtonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dialogButton} onPress={() => handleKeepSession(false)}>
                <Text style={styles.dialogButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  dialogOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContent: {
    width: 300,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dialogActions: {
    flexDirection: 'row',
    marginTop: 16,
  },
  dialogButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
    margin: 5,
  },
  dialogButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Signup;
