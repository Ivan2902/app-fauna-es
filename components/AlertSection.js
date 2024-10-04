import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

// Simulamos algunos datos de enfermedades zoonóticas
const diseases = [
  {
    id: 1,
    name: 'Rabia',
    description: 'Una enfermedad viral que afecta el sistema nervioso de los mamíferos.',
    image: require('../assets/rabia.png'), // Imagen representativa
  },
  {
    id: 2,
    name: 'Leptospirosis',
    description: 'Una infección bacteriana transmitida por animales, especialmente roedores.',
    image: require('../assets/leptospirosis.png'),
  },
  {
    id: 3,
    name: 'Toxoplasmosis',
    description: 'Infección causada por un parásito comúnmente encontrado en gatos.',
    image: require('../assets/toxoplasmosis.png'),
  },
];

const AlertSection = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Enfermedades Zoonóticas</Text>

        {/* Renderizamos la lista de enfermedades */}
        {diseases.map((disease) => (
          <View key={disease.id} style={styles.diseaseContainer}>
            <Image source={disease.image} style={styles.diseaseImage} />
            <View style={styles.diseaseInfo}>
              <Text style={styles.diseaseName}>{disease.name}</Text>
              <Text style={styles.diseaseDescription}>{disease.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B0000', // Color rojo oscuro para el título
    textAlign: 'center',
    marginBottom: 20,
  },
  diseaseContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8', // Fondo claro para contraste
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  diseaseImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  diseaseInfo: {
    flex: 1,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  diseaseDescription: {
    fontSize: 14,
    color: '#555555',
    marginVertical: 5,
  },
});

export default AlertSection;
