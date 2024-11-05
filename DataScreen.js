import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const DataScreen = ({ navigation }) => {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.128:3000/datos');

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
          <Text style={styles.textTitle}>Nombre Común: {item.nombre_comun}</Text>
          <Text style={styles.text}>Nombre Científico: {item.nombre_cientifico}</Text>
          <Text style={styles.text}>Dieta: {item.desc_dieta}</Text>
          <Text style={styles.text}>Estado de Conservación: {item.desc_estado}</Text>
          <Text style={styles.text}>Bandera: {item.desc_bandera}</Text>

          {/* Botón para ver detalles */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('DetailScreen', { item })}
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
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B0000',
    textAlign: 'center',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DataScreen;
