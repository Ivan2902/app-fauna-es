import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Linking } from 'react-native';

// Simulamos algunos datos de instituciones
const institutions = [
  {
    id: 1,
    name: 'CONAFOR',
    description: 'Organización dedicada a la conservación de la fauna silvestre en México.',
    image: require('../assets/conafor.png'), // Logo de la institución
    website: 'https://www.gob.mx/conafor',
  },
  {
    id: 2,
    name: 'CONANP',
    description: 'La Comisión Nacional de Áreas Naturales Protegidas.',
    image: require('../assets/CONAP.png'),
    website: 'https://www.gob.mx/conanp',
  },
  {
    id: 3,
    name: 'ONG',
    description: 'ONG internacional con programas para la preservación de especies en peligro.',
    image: require('../assets/ONG.jpg'),
    website: 'https://www.plataformaong.org',
  },
];

const InstitutionsSection = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Instituciones Especializadas</Text>

        {/* Renderizamos la lista de instituciones */}
        {institutions.map((institution) => (
          <View key={institution.id} style={styles.institutionContainer}>
            <View style={styles.institutionInfo}>
              <Text style={styles.institutionName}>{institution.name}</Text>
              <Text style={styles.institutionDescription}>{institution.description}</Text>
            </View>
            <View style={styles.rightSection}>
              <Image source={institution.image} style={styles.institutionImage} />
              <TouchableOpacity
                style={styles.moreInfoButton}
                onPress={() => {
                  // Abre el enlace de la web de la institución
                  Linking.openURL(institution.website);
                }}
              >
                <Text style={styles.moreInfoButtonText}>Visitar Sitio Web</Text>
              </TouchableOpacity>
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
  institutionContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: 'space-between', // Mueve los elementos a los extremos
  },
  institutionInfo: {
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  institutionImage: {
    width: 60,
    height: 60,
    marginBottom: 10, // Espacio entre la imagen y el botón
  },
  institutionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  institutionDescription: {
    fontSize: 14,
    color: '#555555',
    marginVertical: 5,
  },
  moreInfoButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  moreInfoButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default InstitutionsSection;
