import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Imagen de fondo 'liebre.jpg' */}
      <ImageBackground 
        source={require('./assets/liebre.jpg')} 
        style={styles.background}
        resizeMode="cover"
      >
        {/* Formulario de registro */}
        <View style={styles.centerContainer}>
          <View style={styles.loginContainer}>
            <TextInput 
              placeholder="Usuario" 
              placeholderTextColor="#000"  // Color del placeholder a negro
              style={styles.input} 
            />
            <TextInput 
              placeholder="Correo" 
              placeholderTextColor="#000"  // Color del placeholder a negro
              style={styles.input} 
              keyboardType="email-address"
            />
            <TextInput 
              placeholder="Contraseña" 
              placeholderTextColor="#000"  // Color del placeholder a negro
              style={styles.input} 
              secureTextEntry={true}
            />
            <TextInput 
              placeholder="Confirmar contraseña" 
              placeholderTextColor="#000"  // Color del placeholder a negro
              style={styles.input} 
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Barra inferior */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => alert('Acerca de')}>
            <Text style={styles.footerButtonText}>Acerca de</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => alert('Ayuda')}>
            <Text style={styles.footerButtonText}>Ayuda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => alert('Contactos')}>
            <Text style={styles.footerButtonText}>Contactos</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="light" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, width: '100%', height: '100%' },
  centerContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  loginContainer: { 
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    padding: 20, 
    width: '80%', 
    borderRadius: 10 
  },
  input: { 
    backgroundColor: 'rgba(255, 255, 255, 0.9)',  // TextInput en blanco
    color: '#000',  // Texto en negro
    padding: 10,  
    borderRadius: 5, 
    marginBottom: 15 
  },
  button: { 
    backgroundColor: '#d2a679',  // Color ajustado del botón
    padding: 15, 
    borderRadius: 5, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18 
  },
  footer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    backgroundColor: '#540b0e',  // Color de fondo de la barra inferior
    padding: 15 
  },
  footerButton: {
    padding: 10
  },
  footerButtonText: {
    color: '#fff',  // Color de texto de los botones de la barra inferior
    fontSize: 16
  }
});
