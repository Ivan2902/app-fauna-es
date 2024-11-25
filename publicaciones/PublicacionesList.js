import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Instala @expo/vector-icons si no lo tienes

export default function PublicacionesList({ navigation }) {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const cargarPublicaciones = async () => {
      try {
        const response = await fetch('http://192.168.1.120:3000/publicaciones');
        const data = await response.json();
        setPublicaciones(data);
      } catch (error) {
        console.error('Error al cargar publicaciones:', error);
      }
    };

    cargarPublicaciones();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id_publicacion.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('PublicacionForm', { publicacion: item })}
          >
            <Text style={styles.title}>{item.titulo}</Text>
            <Text>{item.tipo_publicacion}</Text>
            <Text>{item.fecha_p}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('PublicacionForm')}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { padding: 20, borderBottomWidth: 1, borderColor: '#ddd' },
  title: { fontSize: 18, fontWeight: 'bold' },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6200ee',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
