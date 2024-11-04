import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const DataScreen = () => {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.137.1:3000/datos');

        if (!response.ok) {
          throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Especies Registradas</Text>
      {error && (
        <Text style={styles.error}>Error: {error}</Text>
      )}
      {datos.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Image
            source={{ uri: item.multimedia }}
            style={styles.image}
            resizeMode="cover"
            onError={(e) => console.log('Error cargando imagen:', e.nativeEvent.error)}
          />
          <Text style={styles.text}>Nombre Común: {item.nombre_comun}</Text>
          <Text style={styles.text}>Nombre Científico: {item.nombre_cientifico}</Text>
          <Text style={styles.text}>Dieta: {item.desc_dieta}</Text>
          <Text style={styles.text}>Estado de Conservación: {item.desc_estado}</Text>
          <Text style={styles.text}>Bandera: {item.desc_bandera}</Text>

          {/* Botón personalizado */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log(`Ver detalles de: ${item.nombre_comun}`)}
          >
            <Text style={styles.buttonText}>Ver</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#8B0000',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#f5f5f5',
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#8B0000',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#8B0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DataScreen;
