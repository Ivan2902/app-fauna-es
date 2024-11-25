import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Encabezado similar al de la pantalla principal */}
      <View style={styles.header}>
        <Text style={styles.title}>Acerca de la Aplicación</Text>
      </View>

      {/* Tarjeta para la institución */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tecnológico de Estudios Superiores de Valle de Bravo</Text>
        <Text style={styles.cardText}>
          Esta aplicación fue desarrollada por estudiantes del Tecnológico de Estudios Superiores de Valle de Bravo 
          con el objetivo de ayudar a la comunidad a conocer la fauna de la región y promover su conservación.
        </Text>
      </View>

      {/* Sección de los miembros del equipo */}
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Miembros del equipo</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.memberName}>Asesora: M en I.S.C. Araceli Guerrero Alonso</Text>
        <Text style={styles.memberRole}>Encargada de la supervisión y apoyo en el desarrollo del proyecto.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.memberName}>Estudiante: Ivan Rodríguez Perales</Text>
        <Text style={styles.memberRole}>Desarrollador de la interfaz de usuario y funciones clave de la aplicación.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.memberName}>Estudiante: Gerardo Hassan Zepeda Gutierrez</Text>
        <Text style={styles.memberRole}>Encargado del desarrollo de la base de datos y la integración de API.</Text>
      </View>

      {/* Botón de regresar */}
      <TouchableOpacity style={styles.button} onPress={() => {/* Navegación de regreso, opcional */}}>
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#800000',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#800000',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  sectionTitleContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#800000',
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#800000',
  },
  memberRole: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AboutScreen;
