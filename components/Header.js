import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation(); // Hook para la navegación
  
  return (
    <View style={styles.header}>
      <View style={styles.nav}>
        <TouchableOpacity>
          <Text style={styles.navItem}>Explorar</Text>
        </TouchableOpacity>
        
        {/* Navegación a la pantalla "Acerca de" */}
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text style={styles.navItem}>Acerca de</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navItem}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#800000', // Color de fondo del header
    paddingVertical: width * 0.05, // Ajuste proporcional al ancho de la pantalla
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribuye los elementos por igual
    width: '80%', // El 80% del ancho de la pantalla
  },
  navItem: {
    color: '#fff', // Color de texto
    fontSize: width * 0.04, // Tamaño de la fuente proporcional al ancho de la pantalla
  },
});

export default Header;
