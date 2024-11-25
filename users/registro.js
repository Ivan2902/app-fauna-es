import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Dimensions, Alert, Modal } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // Estado para mostrar la animación de éxito

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://192.168.137.1:3000/register', {  // Usar la IP especial para el emulador Android
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);  // Mostrar animación de éxito
        setTimeout(() => {
          setShowSuccess(false);  // Ocultar animación después de 2 segundos
          navigation.navigate('Home');  // Redirige a la pantalla de inicio
        }, 2000);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      Alert.alert('Error', 'Error al conectar con el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/liebre.jpg')} style={styles.background} resizeMode="cover">
        <View style={styles.centerContainer}>
          <View style={styles.loginContainer}>
            <TextInput
              placeholder="Nombre"
              placeholderTextColor="#000"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Correo"
              placeholderTextColor="#000"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#000"
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              placeholder="Confirmar contraseña"
              placeholderTextColor="#000"
              style={styles.input}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>

        <StatusBar style="light" />

        {/* Modal para mostrar la animación de éxito */}
        {showSuccess && (
          <Modal transparent={true} animationType="fade">
            <View style={styles.animationContainer}>
              <LottieView
                source={require('../assets/success.json')}  // Ruta de tu animación
                autoPlay
                loop={false}
                style={{ width: 150, height: 150 }}
              />
            </View>
          </Modal>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, width: '100%', height: '100%' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loginContainer: { backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 20, width: '80%', borderRadius: 10 },
  input: { backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#000', padding: 10, borderRadius: 5, marginBottom: 15 },
  button: { backgroundColor: '#d2a679', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
