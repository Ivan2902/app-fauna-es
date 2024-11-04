import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.header}>
      <View style={styles.nav}>
        {/* Navegación a la pantalla "Datos" */}
        <TouchableOpacity onPress={() => navigation.navigate('Data')}>
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
    backgroundColor: '#800000',
    paddingVertical: width * 0.05,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  navItem: {
    color: '#fff',
    fontSize: width * 0.04,
  },
});

export default Header;
