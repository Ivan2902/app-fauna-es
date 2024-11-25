import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function PublicacionForm({ navigation, route }) {
  const { publicacion = {} } = route.params || {};
  const [titulo, setTitulo] = useState(publicacion.titulo || '');
  const [tipo, setTipo] = useState(publicacion.id_tipo_p || '1'); // Valor predeterminado del tipo
  const [fecha, setFecha] = useState(publicacion.fecha_p || new Date());
  const [imagenes, setImagenes] = useState(publicacion.imagenes || []);

  const [mostrarPickerFecha, setMostrarPickerFecha] = useState(false);

  const abrirPickerImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permiso.granted === false) {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para seleccionar imágenes.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!resultado.canceled) {
      setImagenes([...imagenes, ...resultado.assets.map((asset) => asset.uri)]);
    }
  };

  const eliminarImagen = (uri) => {
    setImagenes(imagenes.filter((imagen) => imagen !== uri));
  };

  const guardarPublicacion = async () => {
    const url = publicacion.id_publicacion 
      ? `http://192.168.1.120:3000/publicaciones/${publicacion.id_publicacion}` 
      : `http://192.168.1.120:3000/publicaciones`;

    const metodo = publicacion.id_publicacion ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          id_tipo_p: tipo,
          fecha_p: fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD
          id_usuario: 1, // Cambia por el ID del usuario autenticado
          imagenes, // Guarda las URIs de las imágenes
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Éxito', publicacion.id_publicacion ? 'Publicación actualizada' : 'Publicación registrada');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.error || 'Error al guardar publicación');
      }
    } catch (error) {
      console.error('Error al guardar publicación:', error);
      Alert.alert('Error', 'No se pudo guardar la publicación');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput 
        style={styles.input} 
        value={titulo} 
        onChangeText={setTitulo} 
        placeholder="Título de la publicación" 
      />

      <Text style={styles.label}>Tipo de Publicación:</Text>
      <TextInput 
        style={styles.input} 
        value={tipo} 
        onChangeText={setTipo} 
        placeholder="ID del tipo de publicación" 
        keyboardType="numeric" 
      />

      <Text style={styles.label}>Fecha:</Text>
      <TouchableOpacity onPress={() => setMostrarPickerFecha(true)} style={styles.datePicker}>
        <Text>{fecha.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {mostrarPickerFecha && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setMostrarPickerFecha(false);
            if (selectedDate) setFecha(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Imágenes:</Text>
      <View style={styles.imageContainer}>
        {imagenes.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity style={styles.deleteButton} onPress={() => eliminarImagen(uri)}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.addImageButton} onPress={abrirPickerImagen}>
        <Text style={styles.addImageButtonText}>Añadir Imágenes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={guardarPublicacion}>
        <Text style={styles.buttonText}>{publicacion.id_publicacion ? 'Actualizar' : 'Registrar'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5' },
  label: { fontSize: 18, marginBottom: 10 },
  input: { backgroundColor: '#fff', padding: 10, marginBottom: 20, borderRadius: 5, borderWidth: 1, borderColor: '#ddd' },
  datePicker: { padding: 10, backgroundColor: '#fff', marginBottom: 20, borderRadius: 5, borderWidth: 1, borderColor: '#ddd' },
  imageContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  imageWrapper: { position: 'relative', marginRight: 10, marginBottom: 10 },
  image: { width: 100, height: 100, borderRadius: 5 },
  deleteButton: { position: 'absolute', top: 5, right: 5, backgroundColor: '#ff0000', borderRadius: 15, padding: 5 },
  deleteButtonText: { color: '#fff', fontSize: 12 },
  addImageButton: { backgroundColor: '#6200ee', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  addImageButtonText: { color: '#fff', fontSize: 16 },
  button: { backgroundColor: '#6200ee', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
});
