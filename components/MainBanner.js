import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import liebre from '../assets/mapaches.jpg'; // Importación de la imagen

const MainBanner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.title}>Descubre todas las especies que habitan en Valle de Bravo</Text>
      <Image source={liebre} style={styles.image} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver todos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#8B0000', // Fondo rojo oscuro para el contenedor
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center', // Centrar el contenido horizontalmente
  },
  title: {
    color: '#ffffff', // Texto blanco para contraste sobre el fondo rojo
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10, // Espacio entre el título y la imagen
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 15, // Espacio entre la imagen y el botón
  },
  button: {
    backgroundColor: '#f8f8f8', // Fondo claro para el botón
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#8B0000', // Texto rojo oscuro para el botón, a juego con el contenedor
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainBanner;
