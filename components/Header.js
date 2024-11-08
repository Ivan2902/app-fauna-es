import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';

const { width } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Función para alternar la visibilidad del menú desplegable
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <View style={styles.header}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate('Data')} style={styles.navButton}>
          <Text style={styles.navItem}>Explorar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.navButton}>
          <Text style={styles.navItem}>Acerca de</Text>
        </TouchableOpacity>

        {user ? (
          <>
            {/* Botón con el nombre del usuario */}
            <TouchableOpacity onPress={toggleDropdown} style={styles.navButton}>
              <Text style={styles.navItem}>{user.name}</Text>
            </TouchableOpacity>

            {/* Menú desplegable dentro de un Modal */}
            <Modal
              visible={isDropdownVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setDropdownVisible(false)}
            >
              <TouchableOpacity 
                style={styles.modalBackground}
                activeOpacity={1} 
                onPress={() => setDropdownVisible(false)}
              >
                <View style={styles.dropdown}>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('AppContent');
                    setDropdownVisible(false);
                  }}>
                    <Text style={styles.dropdownItem}>Publicaciones</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity onPress={() => {
                    logout();
                    setDropdownVisible(false);
                  }}>
                    <Text style={styles.dropdownItem}>Cerrar Sesión</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
          </>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navButton}>
            <Text style={styles.navItem}>Iniciar sesión</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#800000',
    paddingVertical: width * 0.06,
    paddingHorizontal: width * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    borderRadius: 8,
    paddingHorizontal: width * 0.03,
    paddingVertical: 8,
    marginHorizontal: width * 0.02,
  },
  navItem: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fondo semitransparente para el modal
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#ffffff', // Fondo blanco del menú desplegable
    borderRadius: 16,  // Bordes redondeados
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    width: width * 0.7, // Ajusta el ancho según sea necesario
    alignItems: 'center',
  },
  dropdownItem: {
    color: '#800000', // Color rojo en el texto del menú
    paddingVertical: 12,
    fontSize: width * 0.045,
    fontWeight: '500',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#d3d3d3', // Separador gris claro
    width: '100%',
    marginVertical: 8,
  },
});

export default Header;
