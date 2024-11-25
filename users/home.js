import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Dimensions, Modal } from 'react-native';
import { useAuth } from '../components/AuthContext';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { login } = useAuth(); // Accede a la función `login` del contexto de autenticación
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // Estado para mostrar la animación de éxito
  const [showFailure, setShowFailure] = useState(false); // Estado para mostrar la animación de error

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.137.1:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user); // Inicia sesión guardando los datos del usuario en el contexto
        setShowSuccess(true); // Mostrar la animación de éxito
        setTimeout(() => {
          setShowSuccess(false); // Ocultar la animación después de 2 segundos
          navigation.navigate('AppContent'); // Redirige a la pantalla principal después de iniciar sesión
        }, 2000);
      } else {
        setShowFailure(true); // Mostrar la animación de error
        setTimeout(() => {
          setShowFailure(false); // Ocultar la animación después de 2 segundos
        }, 2000);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setShowFailure(true); // Mostrar la animación de error
      setTimeout(() => {
        setShowFailure(false); // Ocultar la animación después de 2 segundos
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/liebre.jpg')} 
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.centerContainer}>
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Inicio de Sesión</Text>
            <TextInput 
              placeholder="Correo" 
              placeholderTextColor="#000" 
              style={styles.inputWhite}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput 
              placeholder="Contraseña" 
              placeholderTextColor="#000" 
              style={styles.inputWhite}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Acceder</Text>
            </TouchableOpacity>

            <View style={styles.accountOptions}>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.optionText}>Crear cuenta</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('PasswordRecovery')}>
                <Text style={styles.optionText}>Recuperar contraseña</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <Text style={styles.footerText}>Acerca de</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Help')}>
            <Text style={styles.footerText}>Ayuda</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Contacts')}>
            <Text style={styles.footerText}>Contactos</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <StatusBar style="light" />

      {/* Modal para mostrar la animación de éxito */}
      {showSuccess && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../assets/success.json')}  // Ruta de tu animación de éxito
              autoPlay
              loop={false}
              style={{ width: 150, height: 150 }}
            />
          </View>
        </Modal>
      )}

      {/* Modal para mostrar la animación de error */}
      {showFailure && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../assets/success2.json')}  // Ruta de tu animación de error
              autoPlay
              loop={false}
              style={{ width: 150, height: 150 }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, width: '100%', height: '100%' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loginContainer: { backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 20, width: '80%', borderRadius: 10 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputWhite: { backgroundColor: '#fff', color: '#333', borderWidth: 1, borderColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 15 },
  button: { backgroundColor: '#d2a679', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
  accountOptions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  optionText: { color: '#d2a679', fontSize: 16, textDecorationLine: 'underline' },
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20, backgroundColor: '#540b0e', position: 'absolute', bottom: 0, width: '100%' },
  footerText: { color: '#fff', fontSize: 16 },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
});
