import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: 'https://your-image-url-here' }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Text style={styles.menuText}>Explorar</Text>
          <Text style={styles.menuText}>Acerca de</Text>
          <Text style={styles.menuText}>Iniciar sesión</Text>
        </View>
        
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Inicio de Sesión</Text>
          <TextInput 
            placeholder="Usuario" 
            placeholderTextColor="#fff" 
            style={styles.input} 
          />
          <TextInput 
            placeholder="Correo" 
            placeholderTextColor="#fff" 
            style={styles.input} 
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Regiones</Text>
          <Text style={styles.footerText}>Ayuda</Text>
          <Text style={styles.footerText}>Contactos</Text>
        </View>
        
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
  },
  loginContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color: '#fff',
  },
  button: {
    backgroundColor: '#d2a679',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#540b0e',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
  },
});
