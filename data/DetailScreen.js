// DetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const DetailScreen = ({ route }) => {
  const { item } = route.params;

  if (!item) {
    return <Text>No se encontraron datos para mostrar.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{item.nombre_comun}</Text>
      <Text style={styles.subtitle}>{item.nombre_cientifico}</Text>

      {/* Imagen principal */}
      <Image
        source={{ uri: item.multimedia }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Información general de la especie */}
      <View style={styles.infoContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hábitat:</Text>
          <Text style={styles.sectionText}>{item.habitat}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tamaño:</Text>
          <Text style={styles.sectionText}>{item.tamaño}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Familia:</Text>
          <Text style={styles.sectionText}>{item.familia}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dieta:</Text>
          <Text style={styles.sectionText}>{item.desc_dieta}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estado de Conservación:</Text>
          <Text style={styles.sectionText}>{item.desc_estado}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entorno:</Text>
          <Text style={styles.sectionText}>{item.entorno}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bandera:</Text>
          <Text style={styles.sectionText}>{item.desc_bandera}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grupo:</Text>
          <Text style={styles.sectionText}>{item.grupo}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enfermedades:</Text>
          <Text style={styles.sectionText}>
            {item.enfermedades ? item.enfermedades : "No se han reportado enfermedades."}
          </Text>
        </View>
      </View>

      {/* Descripción */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Descripción</Text>
        <Text style={styles.descriptionText}>{item.descripcion}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B0000',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#8B0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
  },
  descriptionContainer: {
    backgroundColor: '#B22222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default DetailScreen;
