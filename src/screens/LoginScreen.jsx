import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

FormGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const CustomDialog = ({ visible, onClose, onConfirm }) => (
  <Modal
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.dialogOverlay}>
      <View style={styles.dialogContent}>
        <Text style={styles.dialogTitle}>Mantener sesión</Text>
        <Text style={styles.dialogText}>¿Desea mantener la sesión iniciada?</Text>
        <View style={styles.dialogActions}>
          <TouchableOpacity style={styles.button} onPress={() => onConfirm(true)}>
            <Text style={styles.buttonText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onConfirm(false)}>
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const Signin = ({ onLogin }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    // En una aplicación real, aquí harías una llamada a tu API de autenticación
    setShowDialog(true);
  };

  const handleKeepSession = async (keep) => {
    try {
      if (keep) {
        await AsyncStorage.setItem('isAuthenticated', 'true');
      } else {
        // Solo almacenar en la sesión actual, la lógica exacta puede variar
        // En React Native, esta lógica puede no ser necesaria, ya que AsyncStorage persiste datos
        await AsyncStorage.setItem('isAuthenticated', 'true');
      }
      setShowDialog(false);
      onLogin();
      // Navegar a otra pantalla (usar navegación de React Navigation)
      // navigation.navigate('DashboardLinks');
    } catch (error) {
      console.error('Error storing authentication status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.text}>
          Bienvenidos al acortador de links TinyFy. Si ya tienes una cuenta, inicia sesión para continuar. Si no tienes una cuenta, crea una para comenzar.
        </Text>
        <TouchableOpacity onPress={() => {/* Navegar a Signup */}}>
          <Text style={styles.redirectText}>
            ¿No tienes cuenta? <Text style={styles.link}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
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
      </View>
      <CustomDialog 
        visible={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleKeepSession}
      />
    </View>
  );
};

Signin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  welcome: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  redirectText: {
    fontSize: 16,
    color: '#007bff',
  },
  link: {
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 24,
  },
  formGroup: {
    marginBottom: 16,
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
  dialogOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dialogContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 4,
    width: '80%',
    alignItems: 'center',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dialogText: {
    fontSize: 16,
    marginBottom: 16,
  },
  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Signin;
