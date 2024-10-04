import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';

const PasswordRecovery = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Para evitar que el teclado cubra la vista en iOS/Android
    >
      <ImageBackground
        source={require('./assets/liebre.jpg')} // Cambia a la imagen de fondo que deseas usar
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Recuperar Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#666"
            keyboardType="email-address" // Añadido para ayudar al usuario a introducir un correo electrónico
            autoCapitalize="none" // Evitar mayúsculas automáticas en correos electrónicos
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enviar Enlace de Recuperación</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.footerText}>Acerca de</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerText}>Ayuda</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerText}>Contactos</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  overlay: {
    width: '85%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#D2A77A', // Color similar al botón "Acceder"
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#540b0e',
    padding: 15,
    justifyContent: 'space-around',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default PasswordRecovery;
